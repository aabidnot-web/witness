"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  staggerContainerSlow,
  viewportConfig,
} from "@/lib/animations";

const headlines = [
  {
    region: "Source A",
    outlet: "International Wire",
    headline: "Diplomatic Talks Resume After Border Tensions Ease",
    tone: "Neutral",
    toneColor: "rgba(130, 180, 140, 0.7)",
  },
  {
    region: "Source B",
    outlet: "Regional Daily",
    headline: "Government Responds to Provocation with Strong Defense Measures",
    tone: "Assertive",
    toneColor: "rgba(200, 169, 126, 0.7)",
  },
  {
    region: "Source C",
    outlet: "State Media",
    headline: "Unilateral Aggression Threatens Regional Peace and Stability",
    tone: "Hostile",
    toneColor: "rgba(180, 120, 120, 0.7)",
  },
  {
    region: "Source D",
    outlet: "Independent Analysis",
    headline: "Both Sides Escalate Rhetoric While Facts Remain Contested",
    tone: "Analytical",
    toneColor: "rgba(140, 150, 190, 0.7)",
  },
  {
    region: "Source E",
    outlet: "Social Media Aggregate",
    headline: "Breaking: Conflict Erupts! Citizens Report Chaos on the Ground",
    tone: "Sensational",
    toneColor: "rgba(190, 140, 100, 0.7)",
  },
];

export default function Comparison() {
  return (
    <section
      id="product"
      style={{
        padding: "var(--space-section) 0",
        overflow: "hidden",
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
            One event. Five headlines.
            <br />
            <span style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>
              Which one shaped your opinion?
            </span>
          </motion.h2>
        </motion.div>

        {/* Flow Diagram */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "clamp(2rem, 4vw, 3.5rem)",
          }}
        >
          {["One Event", "Five Headlines", "Five Narratives", "One Consensus Layer"].map(
            (step, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                {i > 0 && (
                  <div
                    style={{
                      width: "1px",
                      height: "28px",
                      background: "var(--border-medium)",
                      marginBottom: "0.75rem",
                    }}
                  />
                )}
                <div
                  style={{
                    padding: "8px 24px",
                    borderRadius: "999px",
                    border: `1px solid ${i === 3 ? "var(--accent-warm)" : "var(--border-subtle)"}`,
                    background: i === 3 ? "var(--accent-warm-dim)" : "var(--bg-surface)",
                    fontSize: "0.82rem",
                    letterSpacing: "0.04em",
                    color: i === 3 ? "var(--accent-warm)" : "var(--text-secondary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {step}
                </div>
              </motion.div>
            )
          )}
        </motion.div>

        {/* Headline Cards */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(0.75rem, 1.5vw, 1rem)",
          }}
        >
          {headlines.map((item) => (
            <motion.div
              key={item.region}
              variants={fadeUp}
              style={{
                padding: "clamp(1.25rem, 2vw, 1.75rem)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "14px",
                background: "var(--bg-surface)",
                transition:
                  "border-color 400ms ease, transform 400ms cubic-bezier(0.32,0.72,0,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--text-tertiary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {item.region}
                </span>
                <span
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    border: `1px solid ${item.toneColor}`,
                    color: item.toneColor,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {item.tone}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  marginBottom: "0.5rem",
                }}
              >
                {item.outlet}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  color: "var(--text-primary)",
                }}
              >
                &ldquo;{item.headline}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
