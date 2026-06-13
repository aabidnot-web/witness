"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Dither from "./Dither";

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Dither Background Effect */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.28,
        }}
      >
        <Dither
          waveColor={[0.78, 0.66, 0.49]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.7}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.12}
        />
      </div>

      {/* Radial Gradient Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200, 169, 126, 0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "920px",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
        }}
      >

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.6rem, 7vw, 5.2rem)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
            marginBottom: "1.8rem",
          }}
        >
          You were never meant
          <br />
          <span style={{ fontStyle: "italic", color: "var(--accent-warm)" }}>
            to see the whole story.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
            lineHeight: 1.75,
            color: "var(--text-secondary)",
            maxWidth: "640px",
            margin: "0 auto 3rem",
          }}
        >
          Every publisher tells a version. Witness reveals the full narrative by
          comparing reporting across sources, regions, and perspectives in real
          time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#product"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              borderRadius: "999px",
              background: "var(--text-primary)",
              color: "var(--bg-primary)",
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 320ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(200,169,126,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Analyze a Story
            <span style={{ fontSize: "1.1em" }}>→</span>
          </a>

          <a
            href="#how-it-works"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "999px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              fontWeight: 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 320ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            Watch Demo
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background:
            "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
