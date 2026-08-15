#!/usr/bin/env node
/**
 * Generates the ReviewGuide brand asset set from public/brand/icon-source.png.
 * Run with: node scripts/generate-brand-assets.cjs
 *
 * Ticket 6.7 replaced icon-source.png (the Stakeholder's new gold-star mark) and rewrote this
 * script around it. The previous source (ticket 4.6) was a "photoreal" render with a large
 * transparent margin around a small centered glyph, illegible at 16px — hence that version's
 * separate hand-authored "flat silhouette" SVG fallback used only for favicon.ico, and its
 * 0.82-scale-then-pad-onto-a-background treatment for the app icons. This source needs neither:
 * it is already a complete, self-contained icon tile (its own rounded-square shape, gradient,
 * shadow, and embossed star are baked into the pixels, with only a ~2% transparent margin), and
 * it stays legible down to 16px on direct resize — verified in this ticket's report by rendering
 * and visually inspecting 16/32px previews before deciding not to build a simplified variant.
 *
 * Outputs (all under public/):
 *   - favicon.ico            (16/32/48, direct resize of icon-source.png, alpha preserved)
 *   - icon-192.png           (direct resize, composited onto opaque white)
 *   - icon-512.png           (direct resize, composited onto opaque white)
 *   - apple-touch-icon.png   (180x180, direct resize, composited onto opaque white — iOS fills
 *                             transparent apple-touch-icons with white anyway; compositing
 *                             ourselves makes that deterministic instead of platform-dependent)
 *   - og-image.png           (1200x630, unchanged light cream/gold composition from ticket 6.5a,
 *                             just with the new mark embedded in place of the old gold-box +
 *                             inline-sparkle-SVG composite — see below)
 *   - brand/mark.png         (152x152, NEW — transparent background, direct resize, no white
 *                             padding. The nav/footer `.logo-mark` and the OG image both render
 *                             the mark against a known site background (the cream theme), not an
 *                             arbitrary one, so they use this instead of icon-192.png: pasting a
 *                             white-padded square onto a cream background would show a faint
 *                             seam that pasting a transparent one does not.)
 *   - favicon-preview-16px-upscaled.png  (16px render, upscaled 8x nearest-neighbor so the real
 *                             favicon size is actually inspectable — deleted once reviewed, not
 *                             shipped)
 *
 * public/brand/icon-flat-silhouette.png (the old mark's hand-drawn fallback) is deleted by this
 * ticket, not regenerated — it depicted the OLD mark's speech-bubble silhouette and has no
 * equivalent need under the new source.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { imagesToIco } = require("png-to-ico");
const { ImageResponse } = require("next/dist/compiled/@vercel/og");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "public/brand/icon-source.png");
const OUT = path.join(ROOT, "public");
const BRAND_DIR = path.join(ROOT, "public/brand");
const FONTS_DIR = path.join(__dirname, "fonts");

// og-image.png (ticket 6.5a) — the current light theme's actual tokens, copied from
// app/globals.css's :root so this doesn't quietly drift from the live palette.
const OG_CREAM_GRADIENT = "linear-gradient(135deg, #fff4e0 0%, #fff9f0 55%, #eefaf3 100%)";
const OG_GOLD = "#ffb627";
const OG_GOLD_DEEP = "#ff9e00";
const OG_INK = "#1b2330";
const OG_INK_SOFT = "#4a5568";

if (!fs.existsSync(SOURCE)) {
  console.error(`FATAL: ${SOURCE} does not exist. Stakeholder was supposed to place it there.`);
  process.exit(1);
}

async function main() {
  fs.mkdirSync(BRAND_DIR, { recursive: true });

  // 1) 16px preview, upscaled 8x (nearest-neighbor) so the actual pixel result at real favicon
  // size is inspectable rather than guessed at. Only one candidate this time (see module note).
  const preview16 = await sharp(SOURCE).resize(16, 16, { fit: "contain" }).png().toBuffer();
  await sharp(preview16)
    .resize(128, 128, { kernel: "nearest" })
    .toFile(path.join(OUT, "favicon-preview-16px-upscaled.png"));

  // 2) favicon.ico — direct resize, alpha preserved (browsers render transparent favicons fine).
  const sizes = [16, 32, 48];
  const icoInputs = await Promise.all(
    sizes.map(async (s) => {
      const { data, info } = await sharp(SOURCE)
        .resize(s, s, { fit: "contain" })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      return { width: info.width, height: info.height, data };
    })
  );
  const icoBuffer = await imagesToIco(icoInputs);
  fs.writeFileSync(path.join(OUT, "favicon.ico"), icoBuffer);

  // 3) PWA/apple-touch icons — composited onto opaque white so the result is identical on every
  // platform rather than depending on each one's own transparent-PNG handling.
  async function opaqueIcon(size, filename) {
    const resized = await sharp(SOURCE).resize(size, size, { fit: "contain" }).toBuffer();
    await sharp({
      create: { width: size, height: size, channels: 4, background: "#ffffff" },
    })
      .composite([{ input: resized, gravity: "center" }])
      .png()
      .toFile(path.join(OUT, filename));
  }
  await opaqueIcon(192, "icon-192.png");
  await opaqueIcon(512, "icon-512.png");
  await opaqueIcon(180, "apple-touch-icon.png");

  // 4) brand/mark.png — transparent, for uses against the site's own known background (nav,
  // footer, OG image) rather than an arbitrary platform background.
  await sharp(SOURCE).resize(152, 152, { fit: "contain" }).png().toFile(path.join(BRAND_DIR, "mark.png"));

  // 5) OG image (1200x630) — same composition as ticket 6.5a, mark swapped in. Satori (next/og)
  // renders <img> from a data URI same as before (previously the inline sparkle SVG); this embeds
  // a small resized copy of the new mark instead of drawing a gold box + separate glyph, since the
  // new mark already contains its own "box" (rounded shape, gradient, shadow).
  const jakartaBold = fs.readFileSync(path.join(FONTS_DIR, "PlusJakartaSans-700.ttf"));
  const jakartaMedium = fs.readFileSync(path.join(FONTS_DIR, "PlusJakartaSans-500.ttf"));
  const markForOg = await sharp(SOURCE).resize(360, 360, { fit: "contain" }).png().toBuffer();
  const markDataUrl = `data:image/png;base64,${markForOg.toString("base64")}`;

  const ogImage = new ImageResponse(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: OG_CREAM_GRADIENT,
          position: "relative",
        },
        children: [
          {
            type: "div",
            props: {
              // Same accent-bar treatment as .price-card::before / .final-cta::before.
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: 14,
                background: `linear-gradient(90deg, ${OG_GOLD}, ${OG_GOLD_DEEP})`,
                display: "flex",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                right: -80,
                top: "50%",
                width: 620,
                height: 620,
                transform: "translateY(-50%)",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,182,39,0.25) 0%, rgba(255,182,39,0) 70%)",
                display: "flex",
              },
            },
          },
          {
            type: "img",
            props: { src: markDataUrl, width: 168, height: 168 },
          },
          {
            type: "div",
            props: {
              style: {
                marginTop: 30,
                fontSize: 96,
                fontWeight: 700,
                color: OG_INK,
                fontFamily: "Plus Jakarta Sans",
                letterSpacing: -2,
                display: "flex",
              },
              children: "ReviewGuide",
            },
          },
          {
            type: "div",
            props: {
              style: {
                marginTop: 22,
                fontSize: 30,
                fontWeight: 500,
                color: OG_INK_SOFT,
                fontFamily: "Plus Jakarta Sans",
                display: "flex",
              },
              children: "Automatyczne odpowiedzi na opinie Google",
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Plus Jakarta Sans", data: jakartaBold, weight: 700, style: "normal" },
        { name: "Plus Jakarta Sans", data: jakartaMedium, weight: 500, style: "normal" },
      ],
    }
  );
  const ogArrayBuffer = await ogImage.arrayBuffer();
  fs.writeFileSync(path.join(OUT, "og-image.png"), Buffer.from(ogArrayBuffer));

  console.log("Brand assets generated:");
  console.log("  public/favicon.ico (16/32/48, direct resize)");
  console.log("  public/icon-192.png, icon-512.png, apple-touch-icon.png (white-padded)");
  console.log("  public/brand/mark.png (152x152, transparent — nav/footer/OG use)");
  console.log("  public/og-image.png (1200x630, light cream/gold theme, new mark embedded)");
  console.log("  public/favicon-preview-16px-upscaled.png (review only)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
