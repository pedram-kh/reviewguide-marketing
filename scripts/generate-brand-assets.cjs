#!/usr/bin/env node
/**
 * Generates the ReviewGuide brand asset set from public/brand/icon-source.png
 * (ticket 4.6, PART B). Run with: node scripts/generate-brand-assets.cjs
 *
 * Outputs (all under public/):
 *   - favicon.ico            (16/32/48, flat-silhouette variant — see below)
 *   - icon-192.png           (full-detail render, padded onto the dark bg)
 *   - icon-512.png           (full-detail render, padded onto the dark bg)
 *   - apple-touch-icon.png   (180x180, full-detail render on the dark bg —
 *                             iOS fills transparency with white otherwise)
 *   - og-image.png           (1200x630, light cream/gold theme matching the
 *                             ticket-6.5 landing redesign — see ticket 6.5a.
 *                             Rendered via next/og's ImageResponse with the
 *                             site's actual Plus Jakarta Sans, bundled as TTF
 *                             under scripts/fonts/ so this stays offline-
 *                             reproducible instead of depending on a Google
 *                             Fonts fetch at generation time.)
 *   - favicon-preview-*.png  (16px renders, upscaled 8x nearest-neighbor so
 *                             they're actually inspectable — deleted once
 *                             reviewed, not shipped)
 *
 * Also writes public/brand/icon-flat-silhouette.png (1024x1024) — the
 * simplified variant, kept around as the documented source of favicon.ico
 * rather than only living inside the .ico container.
 *
 * favicon.ico/icon-192/icon-512/apple-touch-icon intentionally still pad onto
 * the ORIGINAL dark background (BG/AMBER/BUBBLE_DARK below) — ticket 6.5a
 * only asked to re-theme the OG image, not the app icons, and re-running this
 * script regenerates those unchanged (same source, same consts, same bytes).
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

const BG = "#0A0806"; // matches the OLD landing's near-black background — favicon/app icons only
const AMBER = "#ffb069"; // matches the existing gradient end color (app/icon.tsx) — favicon/app icons only
const BUBBLE_DARK = "#241a12"; // sampled dominant dark-bronze tone from icon-source.png

// og-image.png only (ticket 6.5a) — the current light theme's actual tokens, copied from
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

// A hand-authored flat silhouette: rounded speech-bubble body + small tail,
// dark fill, with a solid 5-point amber star centered — the "no metallic
// texture" simplification the ticket asks for when the photoreal source is
// illegible at 16px. Proportioned to roughly match icon-source.png's own
// bubble-with-tail silhouette (a circle with a jagged tail bottom-left).
const STAR_POINTS = (() => {
  const cx = 512, cy = 480, rOuter = 230, rInner = 95, points = 5;
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return pts.join(" ");
})();

const FLAT_SVG = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <path d="M512 40
           a 440 440 0 1 1 -180 838
           l -40 90
           a 12 12 0 0 1 -22 -8
           l 8 -96
           a 440 440 0 0 1 234 -824 Z"
        fill="${BUBBLE_DARK}" />
  <polygon points="${STAR_POINTS}" fill="${AMBER}" />
</svg>`;

async function main() {
  fs.mkdirSync(BRAND_DIR, { recursive: true });

  // 1) Flat silhouette master (also kept as a standalone brand asset).
  const flatBuffer = await sharp(Buffer.from(FLAT_SVG)).png().toBuffer();
  fs.writeFileSync(path.join(BRAND_DIR, "icon-flat-silhouette.png"), flatBuffer);

  // 2) 16px preview of BOTH candidates, upscaled 8x (nearest-neighbor) so the
  // actual pixel result at real favicon size is inspectable rather than
  // guessed at.
  const detailed16 = await sharp(SOURCE).resize(16, 16, { fit: "contain" }).png().toBuffer();
  await sharp(detailed16)
    .resize(128, 128, { kernel: "nearest" })
    .toFile(path.join(OUT, "_preview-detailed-16px-upscaled.png"));

  const flat16 = await sharp(flatBuffer).resize(16, 16, { fit: "contain" }).png().toBuffer();
  await sharp(flat16)
    .resize(128, 128, { kernel: "nearest" })
    .toFile(path.join(OUT, "_preview-flat-16px-upscaled.png"));

  // 3) favicon.ico — decided after visually reviewing the two previews above
  // (see the PROGRESS.md ticket 4.6 row for which one won and why). Built
  // from the flat silhouette per that review. `imagesToIco` wants decoded
  // {width, height, data:RGBA-buffer} objects, not PNG-encoded buffers.
  const sizes = [16, 32, 48];
  const icoInputs = await Promise.all(
    sizes.map(async (s) => {
      const { data, info } = await sharp(flatBuffer)
        .resize(s, s)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      return { width: info.width, height: info.height, data };
    })
  );
  const icoBuffer = await imagesToIco(icoInputs);
  fs.writeFileSync(path.join(OUT, "favicon.ico"), icoBuffer);

  // 4) Full-detail PNG icons — padded onto the dark bg (not left transparent;
  // apple-touch-icon in particular gets a white fill from iOS if transparent).
  async function paddedIcon(size, filename) {
    const iconSize = Math.round(size * 0.82);
    const icon = await sharp(SOURCE).resize(iconSize, iconSize, { fit: "contain" }).toBuffer();
    await sharp({
      create: { width: size, height: size, channels: 4, background: BG },
    })
      .composite([{ input: icon, gravity: "center" }])
      .png()
      .toFile(path.join(OUT, filename));
  }
  await paddedIcon(192, "icon-192.png");
  await paddedIcon(512, "icon-512.png");
  await paddedIcon(180, "apple-touch-icon.png");

  // 5) OG image (1200x630) — ticket 6.5a re-theme: the landing is now a light
  // cream/gold design (ticket 6.5), so the OG card must match rather than
  // still preview a dark card that no longer matches what the link unfurls
  // into. Logo mark + wordmark composition mirrors components/logo.tsx's
  // `.logo-mark` (same sparkle glyph, same gold gradient, scaled up) on the
  // site's own cream gradient background, set in Plus Jakarta Sans — the
  // landing's actual font (bundled as TTF under scripts/fonts/, downloaded
  // once from Google Fonts; see scripts/fonts/README.md) instead of Geist,
  // which the landing hasn't used since the 6.5 redesign.
  const jakartaBold = fs.readFileSync(path.join(FONTS_DIR, "PlusJakartaSans-700.ttf"));
  const jakartaMedium = fs.readFileSync(path.join(FONTS_DIR, "PlusJakartaSans-500.ttf"));
  // Same sparkle path as components/icons.tsx's SparkleIcon, inlined as a data-URI
  // SVG (satori/@vercel-og can't render arbitrary JSX icon components directly).
  const sparkleSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.9 6.1 20.2l1.2-6.6L2.5 9l6.6-.9L12 2z" fill="#ffffff"/></svg>';
  const sparkleDataUrl = `data:image/svg+xml;base64,${Buffer.from(sparkleSvg).toString("base64")}`;

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
            type: "div",
            props: {
              style: {
                width: 160,
                height: 160,
                borderRadius: 50,
                background: `linear-gradient(135deg, ${OG_GOLD} 0%, ${OG_GOLD_DEEP} 100%)`,
                boxShadow: "0 24px 60px -20px rgba(255,158,0,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              children: {
                type: "img",
                props: { src: sparkleDataUrl, width: 84, height: 84 },
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                marginTop: 36,
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
  console.log("  public/favicon.ico (16/32/48, flat silhouette)");
  console.log("  public/icon-192.png, icon-512.png, apple-touch-icon.png (full detail)");
  console.log("  public/og-image.png (1200x630, light cream/gold theme — ticket 6.5a)");
  console.log("  public/brand/icon-flat-silhouette.png (flat master)");
  console.log("  public/_preview-detailed-16px-upscaled.png, _preview-flat-16px-upscaled.png (review only)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
