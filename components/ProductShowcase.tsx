"use client";

import { useState, useRef } from "react";
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

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const [textInput, setTextInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyDIO7RwO_l0EPoywEMvpUY8u4bGzMeCowI";
    const GEMINI_MODEL = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-3.1-pro-preview";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    try {
      let requestBody;

      if (activeTab === "text") {
        if (!textInput.trim()) {
          throw new Error("Please enter some text, a statement, or an article URL.");
        }

        requestBody = {
          contents: [
            {
              parts: [
                {
                  text: `You are the narrative verification engine of WITNESS, a premium narrative intelligence platform.
Analyze the following text or URL content and evaluate its factual truthfulness, consensus status, and narrative mapping.
You MUST respond with a valid JSON object matching this schema exactly:
{
  "status": "REAL" | "MANIPULATED" | "CONFLICTING",
  "confidence": number,
  "summary": "a concise summary of your findings",
  "keyClaims": [
    {
      "claim": "short claim description",
      "status": "Verified" | "Contradictory" | "Unverified",
      "explanation": "brief reason why"
    }
  ],
  "sourceDiversity": "description of sources and outlets reporting on this",
  "recommendation": "actionable tip for the reader"
}
Do not return any markdown formatting (no backticks, no \`\`\`json blocks), just the raw JSON string.

Content to analyze:
${textInput}`
                }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json"
          }
        };
      } else {
        if (!imageFile) {
          throw new Error("Please select an image file to scan.");
        }

        const base64Data = await fileToBase64(imageFile);
        requestBody = {
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: imageFile.type,
                    data: base64Data
                  }
                },
                {
                  text: `You are the verification engine of WITNESS, a premium narrative intelligence platform.
Analyze this uploaded image for alterations, fake elements, deepfake artifacts, or misleading contexts.
You MUST respond with a valid JSON object matching this schema exactly:
{
  "status": "REAL" | "MANIPULATED" | "CONFLICTING",
  "confidence": number,
  "summary": "a concise summary of your findings",
  "keyClaims": [
    {
      "claim": "short claim description",
      "status": "Verified" | "Contradictory" | "Unverified",
      "explanation": "brief reason why"
    }
  ],
  "sourceDiversity": "description of image origin or capture context",
  "recommendation": "actionable tip for the reader"
}
Do not return any markdown formatting, just the raw JSON string.`
                }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json"
          }
        };
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to contact the verification engine. Please check your network connection.");
      }

      const data = await response.json();
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Received empty response from the verification engine.");
      }

      const resultText = data.candidates[0].content.parts[0].text;
      let cleanText = resultText.trim();
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      }
      const parsed = JSON.parse(cleanText) as VerificationResult;
      setResult(parsed);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during verification.");
    } finally {
      setIsLoading(false);
    }
  };

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
            maxWidth: "1024px",
            margin: "0 auto",
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
              witness.app/analyzer
            </div>
          </div>

          {/* Combined Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Video Showcase */}
            <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] flex flex-col justify-between bg-[var(--bg-elevated)] text-left">
              <div>
                <h3 className="font-serif text-lg mb-2 text-[var(--accent-warm)]">Product Showcase</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                  Experience a short demonstration of the automated ingestion dashboard aggregating live channels.
                </p>
              </div>
              <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-black">
                <video
                  src="https://res.cloudinary.com/droyin31u/video/upload/v1781347010/Pin_on_gifys_l6tgnw.mp4"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: Live Interactive Dashboard */}
            <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-[var(--bg-surface)]">
              {!result && !isLoading && (
                <div className="flex flex-col h-full justify-between text-left">
                  <div>
                    {/* Header */}
                    <h3 className="font-serif text-lg mb-1 text-[var(--text-primary)]">Interactive Narrative Engine</h3>
                    <p className="text-xs text-[var(--text-secondary)] mb-6">
                      Verify factual claims in real time. Paste a statement or upload an image to consult the consensus engine.
                    </p>

                    {/* Tab Selection */}
                    <div className="flex gap-4 mb-4 border-b border-[var(--border-subtle)] pb-1.5">
                      <button
                        onClick={() => {
                          setActiveTab("text");
                          setError(null);
                        }}
                        className={`pb-1 text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${
                          activeTab === "text"
                            ? "border-[var(--accent-warm)] text-[var(--text-primary)]"
                            : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        }`}
                      >
                        Text & Links
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("image");
                          setError(null);
                        }}
                        className={`pb-1 text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${
                          activeTab === "image"
                            ? "border-[var(--accent-warm)] text-[var(--text-primary)]"
                            : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        }`}
                      >
                        Scan Image
                      </button>
                    </div>

                    {/* Content Inputs */}
                    {activeTab === "text" ? (
                      <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Paste a news statement, article text, or URL here to verify..."
                        className="w-full h-36 p-3 text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-warm)] resize-none"
                      />
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center h-36 border border-dashed border-[var(--border-subtle)] rounded-lg bg-[var(--bg-elevated)] p-4 text-center relative hover:border-[var(--accent-warm)] transition-all cursor-pointer"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        {imageFile ? (
                          <div className="text-xs text-[var(--text-primary)]">
                            <span className="font-semibold text-[var(--accent-warm)]">Image Selected: </span>
                            {imageFile.name}
                          </div>
                        ) : (
                          <>
                            <span className="text-xs text-[var(--text-secondary)] mb-1.5">
                              Drag & drop or <span className="text-[var(--accent-warm)] underline">browse image</span>
                            </span>
                            <span className="text-[10px] text-[var(--text-muted)]">PNG, JPG, or WEBP</span>
                          </>
                        )}
                      </div>
                    )}

                    {error && (
                      <p className="mt-3 text-xs text-red-400 font-semibold">{error}</p>
                    )}
                  </div>

                  <button
                    onClick={handleVerify}
                    className="mt-6 w-full py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-warm)]"
                  >
                    Run Verification Engine
                  </button>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-warm)] mb-4" />
                  <p className="text-xs text-[var(--text-secondary)] tracking-widest uppercase font-mono">
                    Consulting Consensus Graph...
                  </p>
                </div>
              )}

              {/* Result State */}
              {result && !isLoading && (
                <div className="flex flex-col h-full justify-between text-left">
                  <div>
                    {/* Top Assessment */}
                    <div className="flex justify-between items-center mb-5 pb-3 border-b border-[var(--border-subtle)]">
                      <div>
                        <span className="text-[10px] tracking-widest uppercase text-[var(--text-muted)]">Factual Verdict</span>
                        <div className={`text-sm font-bold tracking-wider ${
                          result.status === "REAL"
                            ? "text-green-400"
                            : result.status === "MANIPULATED"
                            ? "text-red-400"
                            : "text-amber-400"
                        }`}>
                          {result.status === "REAL"
                            ? "✓ VERIFIED REAL"
                            : result.status === "MANIPULATED"
                            ? "⚠ MANIPULATED / MISLEADING"
                            : "⧗ CONFLICTING NARRATIVES"}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] tracking-widest uppercase text-[var(--text-muted)]">Truth Score</span>
                        <div className="text-2xl font-serif text-[var(--accent-warm)] font-bold">
                          {result.confidence}%
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-5 italic bg-[var(--bg-elevated)] p-3 rounded-lg border border-[var(--border-subtle)]">
                      "{result.summary}"
                    </p>

                    {/* Key Claims Breakdown */}
                    <div className="mb-5">
                      <div className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-2.5">Narrative Mapping</div>
                      <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                        {result.keyClaims.map((claim, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-semibold text-[var(--text-primary)]">{claim.claim}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                claim.status === "Verified"
                                  ? "bg-green-950/40 text-green-400 border border-green-900/50"
                                  : claim.status === "Contradictory"
                                  ? "bg-red-950/40 text-red-400 border border-red-900/50"
                                  : "bg-amber-950/40 text-amber-400 border border-amber-900/50"
                              }`}>
                                {claim.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{claim.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Meta Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                      <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                        <div className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-1">Source Context</div>
                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{result.sourceDiversity}</p>
                      </div>
                      <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                        <div className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-1">Recommendation</div>
                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{result.recommendation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={() => {
                      setResult(null);
                      setTextInput("");
                      setImageFile(null);
                    }}
                    className="w-full py-2.5 rounded-full border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-warm)] transition-all"
                  >
                    Scan Another Story
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
