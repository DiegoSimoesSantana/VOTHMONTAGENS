import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(145deg, #eef3f5 0%, #f7f4ed 100%)",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "linear-gradient(180deg, #102f45 0%, #07131d 100%)",
            border: "6px solid #f2b705",
            borderRadius: 34,
            boxShadow: "0 18px 36px rgba(11, 37, 56, 0.18)",
            display: "flex",
            flexDirection: "column",
            height: 138,
            justifyContent: "center",
            overflow: "hidden",
            paddingBottom: 6,
            position: "relative",
            width: 138,
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, rgba(242, 183, 5, 0) 0%, rgba(242, 183, 5, 0.18) 45%, rgba(242, 183, 5, 0.45) 100%)",
              display: "flex",
              height: 14,
              position: "absolute",
              right: -18,
              top: 20,
              transform: "rotate(-24deg)",
              width: 82,
            }}
          />
          <div
            style={{
              color: "#f6f3eb",
              display: "flex",
              fontFamily: "Arial",
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: 4,
              lineHeight: 1,
              marginLeft: 4,
              textTransform: "uppercase",
            }}
          >
            VOTH
          </div>
          <div
            style={{
              alignItems: "center",
              color: "#f2b705",
              display: "flex",
              fontFamily: "Arial",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
              marginTop: 8,
              textTransform: "uppercase",
            }}
          >
            INDUSTRIAL
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}