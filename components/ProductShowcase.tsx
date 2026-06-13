"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const SAMPLE_CLAIMS = [
  {
    title: "PM Leaked WhatsApp Voice Clip",
    text: "Leaked WhatsApp audio recording of the Prime Minister discussing covert financial transactions and budget overrides for the upcoming quarter.",
    type: "text" as const
  },
  {
    title: "California Forest Thermal Beams",
    text: "Satellite clips allegedly showing high-altitude directed energy beams striking northern California woods, starting the 2024 wildfire outbreaks.",
    type: "text" as const
  },
  {
    title: "Cybernetic Microchip Neural Bio-Hybrid",
    text: "Classified photograph showing a biological petri dish where a silicon microprocessor is connected to living cortical neurons inside a research facility.",
    type: "text" as const
  }
];

const SCAN_STEPS = [
  "Initializing verification stack...",
  "Querying global media index (84 active channels)...",
  "Analyzing semantic drift & narrative variance...",
  "Evaluating consensus agreement score...",
  "Compiling audit verdict report..."
];

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const [textInput, setTextInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanningStep, setScanningStep] = useState(0);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scanning step animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setScanningStep(0);
      interval = setInterval(() => {
        setScanningStep((prev) => {
          if (prev < SCAN_STEPS.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

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
      const file = e.target.files[0];
      setImageFile(file);
      setError(null);
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerSampleAudit = (text: string) => {
    setActiveTab("text");
    setTextInput(text);
    // Trigger audit in the next tick
    setTimeout(() => {
      const btn = document.getElementById("trigger-audit-btn");
      if (btn) btn.click();
    }, 100);
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

      // Ensure minimal animation delay for the scan steps to look premium
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
        background: "radial-gradient(circle at 50% 50%, rgba(200, 169, 126, 0.03) 0%, transparent 70%)"
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

        {/* Dashboard Mockup Container */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="rounded-2xl border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-surface)] max-w-[1140px] mx-auto shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        >
          {/* Browser Chrome Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
            <div className="flex gap-2">
              {["#ff5f57", "#ffbd2e", "#28ca42"].map((c) => (
                <div
                  key={c}
                  className="w-3 height-3 rounded-full opacity-60"
                  style={{ width: "10px", height: "10px", backgroundColor: c }}
                />
              ))}
            </div>
            <div className="text-[10px] text-[var(--text-muted)] font-mono tracking-widest uppercase">
              witness.terminal // raw_consensus_audit
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-green-400 bg-green-950/30 border border-green-900/40 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              SYSTEM SECURE
            </div>
          </div>

          {/* Interactive Console Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* LEFT SIDEBAR: Active Logs & Metrics */}
            <div className="lg:col-span-4 p-6 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg text-[var(--accent-warm)]">Audit Registry</h3>
                  <span className="font-mono text-[9px] text-[var(--text-muted)]">3 MOCK FEEDS</span>
                </div>
                
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] font-mono">
                  <div>
                    <div className="text-[8px] text-[var(--text-muted)] uppercase tracking-wider">Active Engine</div>
                    <div className="text-xs text-[var(--text-primary)] mt-0.5">GEMINI 3.1 PRO</div>
                  </div>
                  <div>
                    <div className="text-[8px] text-[var(--text-muted)] uppercase tracking-wider">Index Nodes</div>
                    <div className="text-xs text-[var(--text-primary)] mt-0.5">84 Channels</div>
                  </div>
                </div>

                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-4">
                  Select a registered sample case to pre-load and trigger an automated narrative scan:
                </p>

                {/* Sample Claims */}
                <div className="space-y-3">
                  {SAMPLE_CLAIMS.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => triggerSampleAudit(sample.text)}
                      className="w-full text-left p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--accent-warm)] hover:bg-[var(--bg-subtle)] transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent-warm)] uppercase truncate max-w-[85%]">
                          {sample.title}
                        </span>
                        <span className="text-[8px] font-mono text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] font-bold">
                          AUDIT
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--text-secondary)] leading-normal line-clamp-2 italic">
                        "{sample.text}"
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sidebar footer status */}
              <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] font-mono text-[9px] text-[var(--text-muted)] flex justify-between items-center">
                <span>STABILITY: 99.98%</span>
                <span>V3.1_PRO</span>
              </div>
            </div>

            {/* RIGHT PANEL: Live Interactive Workspace */}
            <div className="lg:col-span-8 p-6 flex flex-col justify-between bg-[var(--bg-surface)] relative">
              
              {/* 1. INPUT WORKSPACE */}
              {!result && !isLoading && (
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-serif text-xl text-[var(--text-primary)] mb-1">Narrative Analysis Chamber</h3>
                        <p className="text-xs text-[var(--text-secondary)]">
                          Upload media or input assertions to query the consensus ledger.
                        </p>
                      </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-6 mb-6 border-b border-[var(--border-subtle)] pb-2">
                      <button
                        onClick={() => {
                          setActiveTab("text");
                          setError(null);
                        }}
                        className={`pb-2 text-xs font-mono tracking-widest uppercase border-b-2 transition-all cursor-pointer ${
                          activeTab === "text"
                            ? "border-[var(--accent-warm)] text-[var(--text-primary)]"
                            : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        }`}
                      >
                        [ Claim / URL Audit ]
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("image");
                          setError(null);
                        }}
                        className={`pb-2 text-xs font-mono tracking-widest uppercase border-b-2 transition-all cursor-pointer ${
                          activeTab === "image"
                            ? "border-[var(--accent-warm)] text-[var(--text-primary)]"
                            : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        }`}
                      >
                        [ Spectrum Image Scan ]
                      </button>
                    </div>

                    {/* Input Forms */}
                    <div className="min-h-[190px]">
                      {activeTab === "text" ? (
                        <textarea
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          placeholder="Paste public claim, narrative statements, or article URLs here to verify truth value..."
                          className="w-full h-[180px] p-4 text-xs font-mono bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-warm)] focus:ring-1 focus:ring-[var(--accent-warm-dim)] resize-none transition-all"
                        />
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center justify-center h-[180px] border border-dashed border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] p-6 text-center relative hover:border-[var(--accent-warm)] transition-all cursor-pointer group"
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          {imagePreview ? (
                            <div className="flex items-center gap-4 text-left max-w-full">
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[var(--border-subtle)] flex-shrink-0 bg-black">
                                <img src={imagePreview} alt="Selected preview" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="text-xs font-mono text-[var(--text-primary)] mb-1 truncate max-w-[240px]">
                                  {imageFile?.name}
                                </div>
                                <div className="text-[10px] text-[var(--text-secondary)] uppercase font-mono">
                                  SIZE: {(imageFile!.size / 1024).toFixed(1)} KB
                                </div>
                                <div className="text-[10px] text-[var(--accent-warm)] mt-1.5 underline cursor-pointer">
                                  Change Image
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <svg className="w-8 h-8 text-[var(--text-muted)] mb-3 group-hover:text-[var(--accent-warm)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-xs text-[var(--text-secondary)] mb-1">
                                Drag image here or <span className="text-[var(--accent-warm)] underline">browse files</span>
                              </span>
                              <span className="text-[9px] text-[var(--text-muted)] font-mono">PNG, JPG, OR WEBP // MULTIMODAL METADATA CHECK</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {error && (
                      <div className="mt-4 p-3 rounded-lg border border-red-900/40 bg-red-950/20 text-xs font-mono text-red-400 flex items-center gap-2">
                        <span>⚠</span>
                        <span>{error}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions & Stats Bar */}
                  <div className="mt-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                      <div className="font-mono text-[9px] text-[var(--text-muted)] flex gap-4">
                        <span>STDOUT: IDLE</span>
                        <span>LATENCY: ~140ms</span>
                      </div>
                      
                      <button
                        id="trigger-audit-btn"
                        onClick={handleVerify}
                        className="w-full sm:w-auto px-8 py-3 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase transition-all bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-warm)] cursor-pointer"
                      >
                        RUN AUDIT ENGINE
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. LOADING STATE: Futuristic Terminal Stream */}
              {isLoading && (
                <div className="flex flex-col justify-center items-center h-full py-16 text-left">
                  <div className="w-full max-w-[500px] p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] font-mono">
                    <div className="flex justify-between items-center mb-4 border-b border-[var(--border-subtle)] pb-2 text-[10px] text-[var(--text-muted)]">
                      <span>WITNESS CORE ENGINE // ACTIVE</span>
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-warm)] animate-ping" />
                    </div>
                    
                    <div className="space-y-2.5 min-h-[140px]">
                      {SCAN_STEPS.map((step, idx) => (
                        <div
                          key={idx}
                          className={`text-xs transition-opacity duration-300 ${
                            idx <= scanningStep ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <span className={`${idx === scanningStep ? "text-[var(--accent-warm)]" : "text-green-500"}`}>
                            {idx < scanningStep ? "✓" : idx === scanningStep ? "⧗" : " "}
                          </span>{" "}
                          <span className={idx === scanningStep ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}>
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[9px] text-[var(--text-muted)]">
                      <span>DECODING NARRATIVE GRAPH...</span>
                      <span>{((scanningStep + 1) * 20)}% COMPLETE</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. DETAILED ASSESSMENTS AND VISUALS */}
              {result && !isLoading && (
                <div className="flex flex-col h-full justify-between text-left">
                  
                  {/* Verdict & Score Layout */}
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6 pb-4 border-b border-[var(--border-subtle)]">
                      <div className="md:col-span-8">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-[var(--text-muted)]">Factual Assessment</span>
                        <div className={`text-xl font-serif font-bold tracking-wider mt-1 ${
                          result.status === "REAL"
                            ? "text-green-400"
                            : result.status === "MANIPULATED"
                            ? "text-red-400"
                            : "text-amber-400"
                        }`}>
                          {result.status === "REAL"
                            ? "✓ NARRATIVE VERIFIED REAL"
                            : result.status === "MANIPULATED"
                            ? "⚠ MANIPULATED / MISLEADING"
                            : "⧗ CONFLICTING PERSPECTIVES"}
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mt-2 italic bg-[var(--bg-elevated)] p-3 rounded-lg border border-[var(--border-subtle)]">
                          "{result.summary}"
                        </p>
                      </div>

                      {/* Circular Gauge */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center border-l border-[var(--border-subtle)] pl-4">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-[var(--text-muted)] mb-2">Consensus Consensus</span>
                        <div className="relative flex items-center justify-center">
                          <svg viewBox="0 0 100 100" className="w-20 h-20 transform -rotate-90">
                            {/* Track */}
                            <circle cx="50" cy="50" r="42" fill="transparent" stroke="var(--border-subtle)" strokeWidth="6" />
                            {/* Indicator */}
                            <circle
                              cx="50"
                              cy="50"
                              r="42"
                              fill="transparent"
                              stroke={result.status === "REAL" ? "#10b981" : result.status === "MANIPULATED" ? "#ef4444" : "#f59e0b"}
                              strokeWidth="6"
                              strokeDasharray={2 * Math.PI * 42}
                              strokeDashoffset={(2 * Math.PI * 42) * (1 - result.confidence / 100)}
                              strokeLinecap="round"
                              style={{ transition: "stroke-dashoffset 1s ease-out" }}
                            />
                          </svg>
                          <div className="absolute text-center">
                            <span className="text-base font-serif font-bold text-[var(--text-primary)]">
                              {result.confidence}%
                            </span>
                            <span className="block text-[8px] font-mono text-[var(--text-muted)] -mt-1">TRUTH</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bento Grid: Breakdown of findings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      
                      {/* Left: Narrative Claims list */}
                      <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                        <div className="text-[9px] font-mono tracking-widest uppercase text-[var(--text-muted)] mb-3">Narrative Maps</div>
                        <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                          {result.keyClaims.map((claim, idx) => (
                            <div key={idx} className="p-2.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                              <div className="flex justify-between items-center mb-1 gap-2">
                                <span className="text-[11px] font-semibold text-[var(--text-primary)] truncate">{claim.claim}</span>
                                <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase ${
                                  claim.status === "Verified"
                                    ? "bg-green-950/40 text-green-400 border border-green-900/40"
                                    : claim.status === "Contradictory"
                                    ? "bg-red-950/40 text-red-400 border border-red-900/40"
                                    : "bg-amber-950/40 text-amber-400 border border-amber-900/40"
                                }`}>
                                  {claim.status}
                                </span>
                              </div>
                              <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{claim.explanation}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Context & Recom */}
                      <div className="flex flex-col gap-4">
                        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex-1">
                          <div className="text-[9px] font-mono tracking-widest uppercase text-[var(--text-muted)] mb-1.5">Source Dispersion</div>
                          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{result.sourceDiversity}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex-1">
                          <div className="text-[9px] font-mono tracking-widest uppercase text-[var(--text-muted)] mb-1.5">Platform Action</div>
                          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{result.recommendation}</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Reset Actions */}
                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[var(--text-muted)]">STDOUT: REPORT GENERATED</span>
                    <button
                      onClick={() => {
                        setResult(null);
                        setTextInput("");
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="px-6 py-2.5 rounded-full border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-warm)] transition-all cursor-pointer uppercase"
                    >
                      Audit New Claim
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
