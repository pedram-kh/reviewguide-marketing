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
 *   - og-image.png           (1200x630, icon + wordmark via next/og's
 *                             ImageResponse so the text uses the exact same
 *                             Geist font the landing renders with)
 *   - favicon-preview-*.png  (16px renders, upscaled 8x nearest-neighbor so
 *                             they're actually inspectable — deleted once
 *                             reviewed, not shipped)
 *
 * Also writes public/brand/icon-flat-silhouette.png (1024x1024) — the
 * simplified variant, kept around as the documented source of favicon.ico
 * rather than only living inside the .ico container.
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

const BG = "#0A0806"; // matches the landing's near-black background
const AMBER = "#ffb069"; // matches the existing gradient end color (app/icon.tsx)
const BUBBLE_DARK = "#241a12"; // sampled dominant dark-bronze tone from icon-source.png

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

  // 5) OG image (1200x630) — icon at ~400px centered-left, "ReviewGuide"
  // wordmark to its right, rendered via next/og's ImageResponse (satori)
  // with the exact Geist font the landing itself uses (bundled ttf, not a
  // system-font guess), a subtle amber glow behind the icon, on the
  // landing's own near-black background.
  const geistFont = fs.readFileSync(
    path.join(ROOT, "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf")
  );
  const iconDataUrl = `data:image/png;base64,${fs.readFileSync(SOURCE).toString("base64")}`;

  const ogImage = new ImageResponse(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: BG,
          padding: "0 60px",
          position: "relative",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                left: 40,
                top: "50%",
                width: 560,
                height: 560,
                transform: "translateY(-50%)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,176,105,0.35) 0%, rgba(255,176,105,0) 70%)",
                display: "flex",
              },
            },
          },
          {
            type: "img",
            props: {
              src: iconDataUrl,
              width: 400,
              height: 420,
              style: { objectFit: "contain", flexShrink: 0 },
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                marginLeft: 56,
                maxWidth: 660,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 96,
                      fontWeight: 700,
                      color: "#ffffff",
                      fontFamily: "Geist",
                      letterSpacing: -2,
                    },
                    children: "ReviewGuide",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      marginTop: 20,
                      fontSize: 28,
                      color: "#c9a988",
                      fontFamily: "Geist",
                    },
                    children: "Automatyczne odpowiedzi na opinie Google",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Geist", data: geistFont, weight: 700, style: "normal" }],
    }
  );
  const ogArrayBuffer = await ogImage.arrayBuffer();
  fs.writeFileSync(path.join(OUT, "og-image.png"), Buffer.from(ogArrayBuffer));

  console.log("Brand assets generated:");
  console.log("  public/favicon.ico (16/32/48, flat silhouette)");
  console.log("  public/icon-192.png, icon-512.png, apple-touch-icon.png (full detail)");
  console.log("  public/og-image.png (1200x630)");
  console.log("  public/brand/icon-flat-silhouette.png (flat master)");
  console.log("  public/_preview-detailed-16px-upscaled.png, _preview-flat-16px-upscaled.png (review only)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
