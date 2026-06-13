"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

const problems = [
  {
    title: "Selective Reporting",
    description:
      "Most outlets show only part of the picture. Critical context is routinely excluded based on editorial priorities, ownership, or geography.",
  },
  {
    title: "Narrative Framing",
    description:
      "The same event can produce completely different conclusions depending on which facts are emphasized and which are quietly omitted.",
  },
  {
    title: "Information Overload",
    description:
      "Users cannot compare hundreds of sources themselves. The sheer volume makes independent verification functionally impossible.",
  },
];

export default function Problem() {
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
          style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Reality is singular.
            <br />
            <span style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>
              Narratives are not.
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              variants={fadeUp}
              className={i === 0 ? "col-span-12" : "col-span-12 md:col-span-6"}
              style={{
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "16px",
                background: "var(--bg-surface)",
                transition: "border-color 400ms ease, transform 400ms cubic-bezier(0.32, 0.72, 0, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent-warm)",
                  fontFamily: "var(--font-body)",
                  marginBottom: "1rem",
                }}
              >
                0{i + 1}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.2,
                }}
              >
                {problem.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.88rem, 1.2vw, 0.98rem)",
                  lineHeight: 1.75,
                  color: "var(--text-secondary)",
                  maxWidth: i === 0 ? "640px" : "none",
                }}
              >
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
