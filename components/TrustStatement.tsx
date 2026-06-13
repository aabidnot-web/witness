"use client";

import { motion } from "framer-motion";
import { fadeIn, viewportConfig } from "@/lib/animations";

export default function TrustStatement() {
  return (
    <section
      style={{
        padding: "var(--space-section-sm) 0",
        position: "relative",
      }}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="section-container section-container--narrow"
        style={{ textAlign: "center" }}
      >
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)",
            lineHeight: 1.7,
            color: "var(--text-tertiary)",
            letterSpacing: "0.01em",
          }}
        >
          We do not decide what is true.
          <br />
          We reveal what is being reported.
        </p>
      </motion.div>
    </section>
  );
}
