"use client";

import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { useRef } from "react";

const parallaxImages = [
  {
    src: "https://i.pinimg.com/736x/7d/e9/20/7de920ca4207899296718f9962c37a77.jpg",
    alt: "Truth and perspective",
  },
  {
    src: "https://i.pinimg.com/1200x/a1/a2/e9/a1a2e9703786fbc4fee169bc0df935d7.jpg",
    alt: "Editorial newsroom",
  },
  {
    src: "https://i.pinimg.com/1200x/49/7d/2d/497d2db6ce8ba00f298a1f07a2ea6415.jpg",
    alt: "Global media landscape",
  },
  {
    src: "https://i.pinimg.com/736x/b2/dd/9d/b2dd9d01539efe52362a9cb50231ac6e.jpg",
    alt: "Information networks",
  },
  {
    src: "https://i.pinimg.com/736x/59/ee/3e/59ee3e22c1a6c9e0580785a2a112b77b.jpg",
    alt: "Breaking news coverage",
  },
  {
    src: "https://i.pinimg.com/736x/f2/27/02/f22702fae644f0f553a4d74a4b2a96a7.jpg",
    alt: "Investigative journalism",
  },
];

const spring = { stiffness: 70, damping: 25, restDelta: 0.001 };

export default function ZoomParallax() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, spring);

  const scale4 = useTransform(smooth, [0, 1], [1, 4]);
  const scale5 = useTransform(smooth, [0, 1], [1, 5]);
  const scale6 = useTransform(smooth, [0, 1], [1, 6]);
  const scale8 = useTransform(smooth, [0, 1], [1, 8]);
  const scale9 = useTransform(smooth, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  const textOpacity = useTransform(smooth, [0, 0.1, 0.25], [1, 1, 0]);

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>

        {/* Heading overlay */}
        <motion.div
          style={{
            opacity: textOpacity,
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              textAlign: "center",
              textShadow: "0 4px 40px rgba(0,0,0,0.6)",
            }}
          >
            Stories are everywhere.
            <br />
            <span style={{ fontStyle: "italic", color: "var(--accent-warm)" }}>
              Truth requires assembly.
            </span>
          </h2>
        </motion.div>

        {/* Images */}
        {parallaxImages.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale, willChange: "transform" }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                index === 1
                  ? "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]"
                  : ""
              } ${
                index === 2
                  ? "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]"
                  : ""
              } ${
                index === 3
                  ? "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]"
                  : ""
              } ${
                index === 4
                  ? "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]"
                  : ""
              } ${
                index === 5
                  ? "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]"
                  : ""
              }`}
            >
              <div
                className="relative h-[25vh] w-[25vw]"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: index === 0
                    ? "0 12px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)"
                    : "0 8px 40px rgba(0,0,0,0.35)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  style={{
                    filter: index === 0
                      ? "brightness(0.88) saturate(0.9)"
                      : "brightness(0.75) saturate(0.8)",
                    transform: "translateZ(0)",
                  }}
                />
                {/* Dark overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: index === 0
                      ? "linear-gradient(180deg, rgba(5,5,8,0.05) 0%, rgba(5,5,8,0.2) 100%)"
                      : "linear-gradient(180deg, rgba(5,5,8,0.12) 0%, rgba(5,5,8,0.35) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Vignette */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, rgba(5,5,8,0.75) 100%)",
          }}
        />
      </div>
    </div>
  );
}
