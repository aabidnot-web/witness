"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

const categories = [
  "Media Organizations",
  "Research Institutions",
  "Policy Analysts",
  "Investigative Journalists",
  "Global Think Tanks",
  "Independent Newsrooms",
];

export default function SocialProof() {
  return (
    <section
      style={{
        padding: "var(--space-section-sm) 0",
      }}
    >
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{ textAlign: "center" }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "2rem",
            }}
          >
            Trusted by professionals who demand accuracy
          </motion.p>
          <motion.div
            variants={staggerContainer}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "clamp(0.5rem, 1.5vw, 1rem)",
            }}
          >
            {categories.map((cat) => (
              <motion.div
                key={cat}
                variants={fadeUp}
                style={{
                  padding: "10px 22px",
                  borderRadius: "999px",
                  border: "1px solid var(--border-subtle)",
                  fontSize: "0.78rem",
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.04em",
                  transition: "border-color 300ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                {cat}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
