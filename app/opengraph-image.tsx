import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Model World Cup";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(circle at 72% 35%, rgba(216,184,74,0.45), transparent 30%), linear-gradient(135deg, #050505 0%, #120b02 48%, #000 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(0,0,0,0.05), rgba(216,184,74,0.14), rgba(0,0,0,0.15))"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 40,
            width: 170,
            height: 170,
            border: "6px solid #d8b84a",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            background: "rgba(0,0,0,0.55)"
          }}
        >
          <div style={{ fontSize: 54, lineHeight: 1 }}>🏆</div>
          <div style={{ marginTop: 8, fontSize: 23, fontWeight: 900, letterSpacing: 6, color: "#d8b84a" }}>AIWC</div>
        </div>
        <div style={{ position: "absolute", left: 48, top: 245, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: 14, color: "#d8b84a" }}>AI MODEL</div>
          <div style={{ marginTop: 10, fontSize: 96, fontWeight: 900, letterSpacing: 3, lineHeight: 0.95 }}>WORLD CUP</div>
          <div style={{ marginTop: 34, display: "flex", gap: 18, alignItems: "center", fontSize: 34, letterSpacing: 4, color: "#f5f5f5" }}>
            <span>48 Models</span>
            <span style={{ color: "#d8b84a" }}>•</span>
            <span>12 Groups</span>
            <span style={{ color: "#d8b84a" }}>•</span>
            <span>One Champion</span>
          </div>
          <div
            style={{
              marginTop: 42,
              width: 360,
              height: 78,
              borderRadius: 999,
              background: "linear-gradient(90deg,#a98221,#f4dc82,#b48a27)",
              color: "#050505",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: 8
            }}
          >
            VOTE NOW
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 58,
            bottom: 65,
            width: 360,
            height: 470,
            borderRadius: "180px 180px 44px 44px",
            border: "10px solid #d8b84a",
            background: "linear-gradient(180deg, rgba(216,184,74,0.95), rgba(45,31,4,0.7))",
            boxShadow: "0 0 80px rgba(216,184,74,0.45)"
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 130,
            top: 78,
            width: 220,
            height: 220,
            borderRadius: 999,
            background: "radial-gradient(circle at 35% 30%, #f8e39b, #8b6a18 46%, #050505 72%)",
            border: "6px solid #d8b84a"
          }}
        />
        <div style={{ position: "absolute", left: 48, right: 48, bottom: 34, height: 2, background: "linear-gradient(90deg, transparent, #d8b84a, transparent)" }} />
      </div>
    ),
    size
  );
}
