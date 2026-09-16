import { ImageResponse } from "next/og";

export const alt = "Purposetone — Craft first. Career second. Noise never.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "#F3EDE4",
          color: "#121212",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 42,
            fontWeight: 600,
          }}
        >
          purpose
          <span style={{ color: "#D86528" }}>tone</span>
        </div>
        <div
          style={{
            marginTop: 24,
            height: 3,
            width: 180,
            background: "#B87333",
          }}
        />
        <div
          style={{
            marginTop: 36,
            fontSize: 48,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Craft first. Career second. Noise never.
        </div>
        <div style={{ marginTop: 24, fontSize: 22, color: "#6E6A62" }}>
          Mentor-grade notes for makers.
        </div>
      </div>
    ),
    size,
  );
}
