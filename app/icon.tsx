import { ImageResponse } from "next/og";

export const size = {
  width: 256,
  height: 256,
};

export const contentType = "image/png";

export default function Icon() {
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
            border: "8px solid #f2b705",
            borderRadius: 44,
            boxShadow: "0 26px 52px rgba(11, 37, 56, 0.2)",
            display: "flex",
            flexDirection: "column",
            height: 196,
            justifyContent: "center",
            overflow: "hidden",
            paddingBottom: 8,
            position: "relative",
            width: 196,
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, rgba(242, 183, 5, 0) 0%, rgba(242, 183, 5, 0.22) 45%, rgba(242, 183, 5, 0.55) 100%)",
              display: "flex",
              height: 20,
              position: "absolute",
              right: -26,
              top: 28,
              transform: "rotate(-24deg)",
              width: 120,
            }}
          />
          <div
            style={{
              color: "#f6f3eb",
              display: "flex",
              fontFamily: "Arial",
              fontSize: 78,
              fontWeight: 900,
              letterSpacing: 6,
              lineHeight: 1,
              marginLeft: 6,
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
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 5,
              marginTop: 10,
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