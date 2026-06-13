"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportPage() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ name: string; size: string; type: string } | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = sessionStorage.getItem("scanned_image");
    const m = sessionStorage.getItem("scanned_image_meta");
    if (img) setImageSrc(img);
    if (m) setMeta(JSON.parse(m));
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <main style={{
      minHeight: "100vh",
      background: "#050508",
      color: "#f7f1e8",
      fontFamily: "var(--font-body)",
      padding: "0",
    }}>

      {/* ── Top Bar ── */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "18px clamp(1.5rem, 5vw, 4rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        background: "rgba(5,5,8,0.92)",
        backdropFilter: "blur(12px)",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none", border: "none",
              fontFamily: "var(--font-serif)",
              fontSize: "1.25rem", color: "#f7f1e8",
              cursor: "pointer", letterSpacing: "-0.02em",
            }}
          >
            Wit<span style={{ fontStyle: "italic", color: "#c8a97e" }}>ness</span>
          </button>
          <span style={{
            fontFamily: "monospace", fontSize: "10px",
            color: "rgba(247,241,232,0.35)",
            letterSpacing: "0.12em", textTransform: "uppercase",
          }}>
            / report
          </span>
        </div>

        <button
          onClick={() => router.push("/")}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "999px", padding: "6px 16px",
            fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.08em",
            textTransform: "uppercase", color: "rgba(247,241,232,0.55)",
            cursor: "pointer", transition: "all 200ms",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = "#f7f1e8";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(247,241,232,0.55)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          ← New Scan
        </button>
      </div>

      {/* ── Page Content ── */}
      <div style={{
        maxWidth: 1040,
        margin: "0 auto",
        padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2rem, 4vw, 3rem)",
        alignItems: "start",
      }}
      className="report-grid"
      >

        {/* ── LEFT: Image ── */}
        <div>
          {/* Image container */}
          <div style={{
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "#0a0a0e",
            aspectRatio: "4/3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="Scanned artifact"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <div style={{
                textAlign: "center",
                fontFamily: "monospace",
                fontSize: 11,
                color: "rgba(247,241,232,0.2)",
                padding: "2rem",
              }}>
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                No artifact in session
              </div>
            )}
          </div>

          {/* File meta */}
          {meta && (
            <div style={{
              marginTop: 16,
              padding: "14px 18px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "#0a0a0e",
              fontFamily: "monospace",
              fontSize: 11,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}>
              {[
                ["Filename", meta.name],
                ["Size", meta.size],
                ["Format", meta.type],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(247,241,232,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{k}</span>
                  <span style={{ color: "rgba(247,241,232,0.85)", maxWidth: "60%", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Risk meter */}
          <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "#0a0a0e" }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(247,241,232,0.35)", marginBottom: 14 }}>
              Risk Indicators
            </div>
            {[
              { label: "Factual Confidence", value: 18, color: "#f87171" },
              { label: "Emotional Framing", value: 85, color: "#fbbf24" },
              { label: "Evidence Depth", value: 12, color: "#f87171" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 10, marginBottom: 5 }}>
                  <span style={{ color: "rgba(247,241,232,0.5)" }}>{label}</span>
                  <span style={{ color }}>{value}%</span>
                </div>
                <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Report ── */}
        <div style={{
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.07)",
          background: "#0a0a0e",
          padding: "clamp(1.5rem, 4vw, 2.5rem)",
        }}>
          {/* Doc header */}
          <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#c8a97e", marginBottom: 6 }}>
              Witness Narrative Intelligence
            </div>
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "#f7f1e8",
              lineHeight: 1.15,
              margin: 0,
            }}>
              Analysis Report
            </h1>
            <div style={{ display: "flex", gap: 20, marginTop: 10, fontFamily: "monospace", fontSize: 10, color: "rgba(247,241,232,0.3)" }}>
              <span>{new Date().toLocaleDateString("en-GB")}</span>
              <span>CASE: WIT-9830</span>
              <span>CLASS-3</span>
            </div>
          </div>

          {/* Verdict badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 14px", borderRadius: 999,
            border: "1px solid rgba(251,191,36,0.25)",
            background: "rgba(251,191,36,0.06)",
            marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fbbf24", display: "inline-block" }} />
            <span style={{ fontFamily: "monospace", fontSize: 10, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              ⚠ Not Independently Verified
            </span>
          </div>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            <Section label="Event Classification" value="Military Conflict / Breaking News" />

            <Section label="Content Type" value="Television news broadcasts displaying multiple wartime claims and military success narratives." />

            <div>
              <SectionLabel>Observed Claims</SectionLabel>
              <ul style={{ margin: "8px 0 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  "Aircraft reportedly destroyed",
                  "Military assets reportedly neutralized",
                  "Cross-border operations reported",
                  "Retaliatory strikes reported",
                ].map(item => (
                  <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#f87171", fontFamily: "monospace", fontSize: 11, marginTop: 1, flexShrink: 0 }}>—</span>
                    <span style={{ fontSize: 13, color: "rgba(247,241,232,0.75)", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ padding: "14px 16px", borderRadius: 8, border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <SectionLabel>Initial Risk Assessment</SectionLabel>
                <span style={{ fontFamily: "monospace", fontSize: 10, background: "#f87171", color: "#050508", padding: "2px 8px", borderRadius: 999, fontWeight: 700 }}>HIGH</span>
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                {["Information warfare","Propaganda","Misreporting","Incomplete information","Rapid amplification before verification"].map(r => (
                  <li key={r} style={{ fontSize: 12, color: "rgba(248,113,113,0.8)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{r}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <MiniCard label="Emotional Framing" value="High" color="#fbbf24" items={["Victory language","Breaking-news urgency","Nationalistic framing"]} />
              <MiniCard label="Verification Depth" value="Low" color="#f87171" items={["No primary sources","No cross-references","Broadcast graphics only"]} />
            </div>

            <div style={{ padding: "14px 16px", borderRadius: 8, border: "1px solid rgba(251,191,36,0.15)", background: "rgba(251,191,36,0.03)" }}>
              <SectionLabel>Verification Status</SectionLabel>
              <p style={{ margin: "8px 0 0", fontSize: 12, color: "rgba(247,241,232,0.65)", lineHeight: 1.7, fontFamily: "var(--font-body)" }}>
                The screenshot confirms these claims were <em>broadcast</em>. It does not confirm the claims are <em>true</em>.
              </p>
            </div>

            <div>
              <SectionLabel>Recommendation</SectionLabel>
              <ul style={{ margin: "8px 0 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                {["Seek official statements","Cross-check international sources","Look for satellite imagery or primary evidence","Do not share until independently verified"].map(r => (
                  <li key={r} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#c8a97e", fontFamily: "monospace", fontSize: 11, marginTop: 1, flexShrink: 0 }}>›</span>
                    <span style={{ fontSize: 12, color: "rgba(247,241,232,0.65)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verdict quote */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 20,
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(0.8rem, 1.4vw, 0.9rem)",
              color: "rgba(247,241,232,0.5)",
              fontStyle: "italic",
              lineHeight: 1.7,
              textAlign: "center",
            }}>
              "Broadcast confirms reporting. Image alone is insufficient to confirm events occurred. Additional verification required."
            </div>
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div style={{
        maxWidth: 1040, margin: "0 auto",
        padding: "0 clamp(1.5rem, 5vw, 3rem) clamp(2rem, 5vw, 4rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(247,241,232,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Witness Narrative Assurance Network
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: "9px 20px", borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "none", color: "rgba(247,241,232,0.55)",
              fontFamily: "monospace", fontSize: 10,
              textTransform: "uppercase", letterSpacing: "0.08em",
              cursor: "pointer", transition: "all 200ms",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#f7f1e8"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(247,241,232,0.55)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            Print PDF
          </button>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "9px 24px", borderRadius: 999,
              border: "none", background: "#f7f1e8",
              color: "#050508",
              fontFamily: "monospace", fontSize: 10,
              textTransform: "uppercase", letterSpacing: "0.08em",
              cursor: "pointer", fontWeight: 700,
              transition: "background 200ms",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#c8a97e"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#f7f1e8"; }}
          >
            New Scan →
          </button>
        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        @media (max-width: 720px) {
          .report-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media print {
          button { display: none !important; }
        }
      `}</style>
    </main>
  );
}

// ── Small helpers ──
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "monospace", fontSize: 10,
      textTransform: "uppercase", letterSpacing: "0.1em",
      color: "rgba(247,241,232,0.35)",
    }}>
      {children}
    </div>
  );
}

function Section({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <p style={{ margin: "6px 0 0", fontSize: 13, color: "rgba(247,241,232,0.75)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{value}</p>
    </div>
  );
}

function MiniCard({ label, value, color, items }: { label: string; value: string; color: string; items: string[] }) {
  return (
    <div style={{ padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(247,241,232,0.35)" }}>{label}</span>
        <span style={{ fontFamily: "monospace", fontSize: 10, color }}>{value}</span>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map(i => (
          <li key={i} style={{ fontSize: 11, color: "rgba(247,241,232,0.5)", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>· {i}</li>
        ))}
      </ul>
    </div>
  );
}
