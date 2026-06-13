"use client";

import { motion } from "framer-motion";
import { fadeIn, viewportConfig } from "@/lib/animations";

export default function Quote() {
  return (
    <section
      style={{
        padding: "var(--space-section) 0",
        position: "relative",
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(200, 169, 126, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="section-container section-container--narrow"
        style={{
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "1px",
            background: "var(--accent-warm)",
            margin: "0 auto 2.5rem",
            opacity: 0.4,
          }}
        />
        <blockquote
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.3,
            letterSpacing: "-0.015em",
            color: "var(--text-primary)",
            margin: 0,
            padding: 0,
            border: "none",
          }}
        >
          The most dangerous misinformation isn&apos;t false.
          <br />
          <span style={{ color: "var(--accent-warm)" }}>
            It&apos;s incomplete.
          </span>
        </blockquote>
        <div
          style={{
            width: "48px",
            height: "1px",
            background: "var(--accent-warm)",
            margin: "2.5rem auto 0",
            opacity: 0.4,
          }}
        />
      </motion.div>
    </section>
  );
}
