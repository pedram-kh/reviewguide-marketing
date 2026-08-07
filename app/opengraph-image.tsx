import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: "#c9a988",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          ReviewGuide
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.15,
            backgroundImage: "linear-gradient(180deg, #ffffff 0%, #ffcf9e 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Każda opinia dostaje odpowiedź.
        </div>
        <div style={{ fontSize: 30, color: "#9a9a9a", marginTop: 28 }}>
          Automatyczne odpowiedzi na opinie Google dla restauracji
        </div>
      </div>
    ),
    size,
  );
}
