"use client";

import { motion } from "framer-motion";
import { lineReveal, staggerContainerSlow, viewportConfig } from "@/lib/animations";

const lines = [
  { text: "The internet solved distribution.", italic: false },
  { text: "AI solved generation.", italic: false },
  { text: "Verification remains unsolved.", italic: true },
  { text: "", italic: false },
  { text: "The future of information is not faster news.", italic: false },
  { text: "It is better understanding.", italic: true },
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      style={{
        padding: "var(--space-section) 0",
      }}
    >
      <div className="section-container section-container--narrow">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {lines.map((line, i) =>
            line.text === "" ? (
              <div key={i} style={{ height: "clamp(2rem, 4vw, 3rem)" }} />
            ) : (
              <motion.p
                key={i}
                variants={lineReveal}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)",
                  fontWeight: 400,
                  lineHeight: 1.35,
                  letterSpacing: "-0.015em",
                  color: line.italic
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  fontStyle: line.italic ? "italic" : "normal",
                  marginBottom: "0.15em",
                }}
              >
                {line.text}
              </motion.p>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
