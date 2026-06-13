"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, viewportConfig } from "@/lib/animations";
import Hls from "hls.js";

export default function ProductShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = "https://v1-c.pinimg.com/videos/iht/hls/4d/44/fa/4d44fa00c126c82f536e2ef0c53a523d_720w.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [src]);

  return (
    <section
      style={{
        padding: "var(--space-section) 0",
      }}
    >
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            textAlign: "center",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Every story, <span style={{ fontStyle: "italic" }}>decoded</span>
          </motion.h2>
        </motion.div>

        {/* Browser Mockup */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            borderRadius: "16px",
            border: "1px solid var(--border-subtle)",
            overflow: "hidden",
            background: "var(--bg-surface)",
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          {/* Browser Chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 20px",
              borderBottom: "1px solid var(--border-subtle)",
              background: "var(--bg-elevated)",
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              {["#ff5f57", "#ffbd2e", "#28ca42"].map((c) => (
                <div
                  key={c}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: c,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.03em",
              }}
            >
              witness.app/dashboard
            </div>
          </div>

          {/* Video Player */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              background: "#000",
              overflow: "hidden",
            }}
          >
            <video
              ref={videoRef}
              controls
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
