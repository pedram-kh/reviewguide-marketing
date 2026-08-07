import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            fontFamily: "sans-serif",
            backgroundImage: "linear-gradient(180deg, #fff4e6 0%, #ffb069 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          R
        </div>
      </div>
    ),
    size,
  );
}
