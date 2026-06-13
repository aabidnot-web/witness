"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, viewportConfig } from "@/lib/animations";

interface KeyClaim {
  claim: string;
  status: "Verified" | "Contradictory" | "Unverified";
  explanation: string;
}

interface VerificationResult {
  status: "REAL" | "MANIPULATED" | "CONFLICTING";
  confidence: number;
  summary: string;
  keyClaims: KeyClaim[];
  sourceDiversity: string;
  recommendation: string;
}

const SCAN_STEPS = [
  "Ingesting source...",
  "Cross-referencing media index...",
  "Scoring narrative variance...",
  "Finalizing verdict...",
];

export default function ProductShowcase() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const [textInput, setTextInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isLoading) {
      setScanStep(0);
      t = setInterval(() => setScanStep((p) => (p < SCAN_STEPS.length - 1 ? p + 1 : p)), 600);
    }
    return () => clearInterval(t);
  }, [isLoading]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    // Image path → redirect to /report
    if (activeTab === "image") {
      if (!imageFile || !imagePreview) {
        setError("Please select an image.");
        setIsLoading(false);
        return;
      }
      sessionStorage.setItem("scanned_image", imagePreview);
      sessionStorage.setItem("scanned_image_meta", JSON.stringify({
        name: imageFile.name,
        size: `${(imageFile.size / 1024).toFixed(1)} KB`,
        type: imageFile.type,
      }));
      await new Promise((r) => setTimeout(r, 2400));
      router.push("/report");
      return;
    }

    // Text path → call Gemini
    if (!textInput.trim()) {
      setError("Please enter a claim or URL.");
      setIsLoading(false);
      return;
    }

    const KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyDIO7RwO_l0EPoywEMvpUY8u4bGzMeCowI";
    const MODEL = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-3.1-pro-preview";
    const URL_API = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;

    try {
      const res = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are the narrative verification engine of WITNESS.\nAnalyze the following and respond ONLY with valid JSON matching this schema:\n{\n  "status": "REAL"|"MANIPULATED"|"CONFLICTING",\n  "confidence": number,\n  "summary": string,\n  "keyClaims": [{"claim": string, "status": "Verified"|"Contradictory"|"Unverified", "explanation": string}],\n  "sourceDiversity": string,\n  "recommendation": string\n}\n\nContent:\n${textInput}` }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      });

      if (!res.ok) throw new Error("Verification engine unreachable.");
      const data = await res.json();
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!raw) throw new Error("Empty response.");

      let clean = raw.trim().replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      await new Promise((r) => setTimeout(r, 1800));
      setResult(JSON.parse(clean) as VerificationResult);
    } catch (e: any) {
      setError(e.message || "Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  };

  const verdictColor =
    result?.status === "REAL" ? "#4ade80"
    : result?.status === "MANIPULATED" ? "#f87171"
    : "#fbbf24";

  const verdictLabel =
    result?.status === "REAL" ? "Verified Real"
    : result?.status === "MANIPULATED" ? "Manipulated"
    : "Conflicting";

  return (
    <section style={{ padding: "var(--space-section) 0" }}>
      <div className="section-container">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
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
          <motion.p
            variants={fadeUp}
            style={{
              marginTop: "1rem",
              fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
            }}
          >
            Paste a claim or upload a screenshot. Get an instant verdict.
          </motion.p>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            borderRadius: "14px",
            border: "1px solid var(--border-subtle)",
            background: "var(--bg-surface)",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Chrome bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 18px",
            borderBottom: "1px solid var(--border-subtle)",
            background: "var(--bg-elevated)",
          }}>
            {["#ff5f57","#ffbd2e","#28ca42"].map((c) => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.65 }} />
            ))}
            <div style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "monospace",
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
            }}>
              witness.app — narrative engine
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>

            {/* === INPUT STATE === */}
            {!isLoading && !result && (
              <>
                {/* Tabs */}
                <div style={{
                  display: "flex",
                  gap: "24px",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingBottom: "1px",
                }}>
                  {(["text","image"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => { setActiveTab(tab); setError(null); }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        paddingBottom: "10px",
                        fontSize: "11px",
                        fontFamily: "monospace",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)",
                        borderBottom: activeTab === tab ? "1px solid var(--accent-warm)" : "1px solid transparent",
                        transition: "color 200ms, border-color 200ms",
                      }}
                    >
                      {tab === "text" ? "Claim / URL" : "Image Scan"}
                    </button>
                  ))}
                </div>

                {/* Text Input */}
                {activeTab === "text" && (
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Paste a news claim, statement, or article URL..."
                    style={{
                      width: "100%",
                      height: "140px",
                      padding: "14px 16px",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "10px",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      resize: "none",
                      outline: "none",
                      transition: "border-color 200ms",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent-warm)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
                  />
                )}

                {/* Image Input */}
                {activeTab === "image" && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      height: "140px",
                      border: "1px dashed var(--border-subtle)",
                      borderRadius: "10px",
                      background: "var(--bg-elevated)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      cursor: "pointer",
                      transition: "border-color 200ms",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent-warm)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)")}
                  >
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
                    {imagePreview ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <img src={imagePreview} alt="preview" style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 6, border: "1px solid var(--border-subtle)" }} />
                        <div>
                          <div style={{ fontSize: "12px", color: "var(--text-primary)", fontFamily: "monospace" }}>{imageFile?.name}</div>
                          <div style={{ fontSize: "11px", color: "var(--accent-warm)", marginTop: 4, cursor: "pointer" }}>Change file</div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <svg width="22" height="22" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                          Drop image or <span style={{ color: "var(--accent-warm)" }}>browse</span>
                        </span>
                        <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "monospace" }}>PNG · JPG · WEBP</span>
                      </>
                    )}
                  </div>
                )}

                {/* Error */}
                {error && (
                  <p style={{ marginTop: "12px", fontSize: "12px", color: "#f87171", fontFamily: "monospace" }}>⚠ {error}</p>
                )}

                {/* Submit */}
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={handleVerify}
                    style={{
                      padding: "10px 28px",
                      borderRadius: "999px",
                      border: "none",
                      background: "var(--text-primary)",
                      color: "var(--bg-primary)",
                      fontFamily: "monospace",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "background 200ms",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--accent-warm)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--text-primary)")}
                  >
                    {activeTab === "image" ? "Scan Image →" : "Run Verification →"}
                  </button>
                </div>
              </>
            )}

            {/* === LOADING STATE === */}
            {isLoading && (
              <div style={{ padding: "40px 0", textAlign: "center" }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "2px solid var(--border-subtle)",
                  borderTopColor: "var(--accent-warm)",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 24px",
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

                <div style={{ fontFamily: "monospace", fontSize: "11px", lineHeight: 2.2 }}>
                  {SCAN_STEPS.map((step, i) => (
                    <div key={i} style={{
                      color: i < scanStep ? "var(--text-muted)" : i === scanStep ? "var(--accent-warm)" : "transparent",
                      transition: "color 300ms",
                    }}>
                      {i < scanStep ? "✓" : i === scanStep ? "›" : "·"} {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* === RESULT STATE === */}
            {result && !isLoading && (
              <div>
                {/* Verdict header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid var(--border-subtle)",
                }}>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
                      Factual Verdict
                    </div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: verdictColor, letterSpacing: "-0.01em" }}>
                      {verdictLabel}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
                      Confidence
                    </div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: verdictColor, lineHeight: 1 }}>
                      {result.confidence}%
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "24px",
                  paddingLeft: "12px",
                  borderLeft: `2px solid ${verdictColor}40`,
                }}>
                  {result.summary}
                </p>

                {/* Claims */}
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                    Key Claims
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 200, overflowY: "auto" }}>
                    {result.keyClaims.map((c, i) => {
                      const clr = c.status === "Verified" ? "#4ade80" : c.status === "Contradictory" ? "#f87171" : "#fbbf24";
                      return (
                        <div key={i} style={{
                          padding: "10px 14px",
                          background: "var(--bg-elevated)",
                          borderRadius: 8,
                          borderLeft: `2px solid ${clr}60`,
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                        }}>
                          <span style={{ fontFamily: "monospace", fontSize: "10px", color: clr, marginTop: 2, flexShrink: 0 }}>
                            {c.status === "Verified" ? "✓" : c.status === "Contradictory" ? "✗" : "?"}
                          </span>
                          <div>
                            <div style={{ fontSize: "12px", color: "var(--text-primary)", fontWeight: 600, marginBottom: 2 }}>{c.claim}</div>
                            <div style={{ fontSize: "11px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{c.explanation}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendation + Reset */}
                <div style={{
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                }}>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-body)", maxWidth: "60%", lineHeight: 1.6 }}>
                    {result.recommendation}
                  </p>
                  <button
                    onClick={() => { setResult(null); setTextInput(""); setImageFile(null); setImagePreview(null); }}
                    style={{
                      padding: "8px 20px",
                      borderRadius: "999px",
                      border: "1px solid var(--border-subtle)",
                      background: "none",
                      color: "var(--text-secondary)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 200ms",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent-warm)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                    }}
                  >
                    New Scan
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </section>
  );
}
