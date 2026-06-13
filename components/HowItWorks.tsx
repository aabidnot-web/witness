"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Collect reporting from dozens of diverse sources across regions, languages, and editorial positions. No single perspective dominates.",
  },
  {
    number: "02",
    title: "Compare",
    description:
      "Analyze language, framing, emphasis, and omission. Surface how the same facts produce different narratives based on editorial context.",
  },
  {
    number: "03",
    title: "Verify",
    description:
      "Cross-reference claims across all collected sources. Identify independent confirmations, contradictions, and unsupported assertions.",
  },
  {
    number: "04",
    title: "Understand",
    description:
      "Generate a comprehensive narrative intelligence report with truth scoring, source diversity metrics, and timeline reconstruction.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
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
            marginBottom: "clamp(3rem, 6vw, 5rem)",
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
            From noise to{" "}
            <span style={{ fontStyle: "italic" }}>clarity</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              style={{
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "16px",
                background: "var(--bg-surface)",
                display: "flex",
                flexDirection: "column",
                transition:
                  "border-color 400ms ease, transform 400ms cubic-bezier(0.32,0.72,0,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,169,126,0.2)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "var(--accent-warm)",
                  marginBottom: "1.25rem",
                }}
              >
                {step.number}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                  lineHeight: 1.75,
                  color: "var(--text-secondary)",
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
