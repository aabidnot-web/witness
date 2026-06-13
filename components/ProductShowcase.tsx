"use client";

import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, viewportConfig } from "@/lib/animations";

const verifiedFacts = [
  { claim: "Diplomatic channels remain open between both nations", sources: 14, confidence: "high" },
  { claim: "Military deployments occurred along the northern border", sources: 9, confidence: "high" },
  { claim: "Civilian evacuations initiated in three border districts", sources: 7, confidence: "medium" },
];

const conflicting = [
  { claim: "First strike attribution", sources: "4 vs 3", note: "Contradictory accounts" },
  { claim: "Casualty numbers", sources: "Range: 0–12", note: "Unverified" },
];

export default function ProductShowcase() {
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
              witness.app/report/border-tensions-2025
            </div>
          </div>

          {/* App Content */}
          <div style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            {/* Top Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {[
                { label: "Truth Score", value: "86", unit: "/ 100", accent: true },
                { label: "Sources Analyzed", value: "47", unit: "" },
                { label: "Confirmations", value: "18", unit: "independent" },
                { label: "Conflicts", value: "4", unit: "claims" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "1.25rem",
                    borderRadius: "12px",
                    border: "1px solid var(--border-subtle)",
                    background: stat.accent ? "var(--accent-warm-dim)" : "var(--bg-elevated)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                      fontFamily: "var(--font-body)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                      fontWeight: 400,
                      color: stat.accent ? "var(--accent-warm)" : "var(--text-primary)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                    {stat.unit && (
                      <span
                        style={{
                          fontSize: "0.45em",
                          color: "var(--text-tertiary)",
                          marginLeft: "4px",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {stat.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Two Column Layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {/* Verified Facts */}
              <div
                style={{
                  padding: "1.25rem",
                  borderRadius: "12px",
                  border: "1px solid var(--border-subtle)",
                  background: "var(--bg-elevated)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(130,180,140,0.8)",
                    fontFamily: "var(--font-body)",
                    marginBottom: "1rem",
                  }}
                >
                  ✓ Verified Facts
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {verifiedFacts.map((fact) => (
                    <div
                      key={fact.claim}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "8px",
                        background: "rgba(130,180,140,0.04)",
                        border: "1px solid rgba(130,180,140,0.08)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.85rem",
                          color: "var(--text-primary)",
                          lineHeight: 1.5,
                          marginBottom: "0.3rem",
                        }}
                      >
                        {fact.claim}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.75rem",
                          fontSize: "0.65rem",
                          color: "var(--text-tertiary)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <span>{fact.sources} sources</span>
                        <span
                          style={{
                            color:
                              fact.confidence === "high"
                                ? "rgba(130,180,140,0.8)"
                                : "var(--accent-warm)",
                          }}
                        >
                          {fact.confidence} confidence
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conflicting Reports */}
              <div
                style={{
                  padding: "1.25rem",
                  borderRadius: "12px",
                  border: "1px solid var(--border-subtle)",
                  background: "var(--bg-elevated)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(180,120,120,0.8)",
                    fontFamily: "var(--font-body)",
                    marginBottom: "1rem",
                  }}
                >
                  ⚠ Conflicting Reports
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {conflicting.map((item) => (
                    <div
                      key={item.claim}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "8px",
                        background: "rgba(180,120,120,0.04)",
                        border: "1px solid rgba(180,120,120,0.08)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.85rem",
                          color: "var(--text-primary)",
                          lineHeight: 1.5,
                          marginBottom: "0.3rem",
                        }}
                      >
                        {item.claim}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.75rem",
                          fontSize: "0.65rem",
                          color: "var(--text-tertiary)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <span>{item.sources}</span>
                        <span style={{ color: "rgba(180,120,120,0.8)" }}>{item.note}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Source Diversity Bar */}
                <div style={{ marginTop: "1.25rem" }}>
                  <div
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                      fontFamily: "var(--font-body)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Source Diversity
                  </div>
                  <div
                    style={{
                      height: "4px",
                      borderRadius: "999px",
                      background: "var(--bg-subtle)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "72%",
                        borderRadius: "999px",
                        background:
                          "linear-gradient(90deg, var(--accent-warm) 0%, rgba(130,180,140,0.6) 100%)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "0.62rem",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-body)",
                      marginTop: "0.25rem",
                    }}
                  >
                    72% — Good diversity across 6 regions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
