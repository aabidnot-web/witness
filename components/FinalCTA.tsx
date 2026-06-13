"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

export default function FinalCTA() {
  return (
    <section
      style={{
        padding: "var(--space-section) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(900px, 90vw)",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(200, 169, 126, 0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="section-container"
        style={{
          textAlign: "center",
          position: "relative",
        }}
      >
        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
            marginBottom: "1.5rem",
          }}
        >
          See the story
          <br />
          <span style={{ fontStyle: "italic" }}>behind the story.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            maxWidth: "520px",
            margin: "0 auto 2.5rem",
          }}
        >
          Join the next generation of narrative intelligence. Be among the first
          to access Witness.
        </motion.p>

        <motion.div variants={fadeUp}>
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 40px",
              borderRadius: "999px",
              background:
                "linear-gradient(135deg, var(--accent-warm) 0%, #b8944f 100%)",
              color: "var(--bg-primary)",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              transition:
                "all 400ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(200,169,126,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Request Early Access
            <span style={{ fontSize: "1.15em" }}>→</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
