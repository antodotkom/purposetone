import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          background: "#260336",
          color: "#FDF1CA",
          borderRadius: 8,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#FDF1CA">
          <path d="M9 5.2v9.35a3.15 3.15 0 1 0 1.7 2.82V9.1l8.1-1.55v6.2a3.15 3.15 0 1 0 1.7 2.82V4.15L9 5.2Z" />
        </svg>
      </div>
    ),
    size,
  );
}
