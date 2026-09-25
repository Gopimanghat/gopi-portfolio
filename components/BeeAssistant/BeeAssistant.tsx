"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { beeComments, greetingMessage, introMessage } from "./beeComments";

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "contact",
];

type BubblePhase = "greeting" | "hidden" | "intro" | "section";

export default function BeeAssistant() {
  const [currentSection, setCurrentSection] = useState("home");
  const [phase, setPhase] = useState<BubblePhase>("greeting");
  const hasScrolledRef = useRef(false);

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });

  const top = useTransform(smoothProgress, [0, 1], ["12vh", "82vh"]);

  const left = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["82%", "88%", "80%", "88%", "80%", "85%"]
  );

  // Greet immediately on page load, then hide until the visitor scrolls
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPhase((prev) => (prev === "greeting" ? "hidden" : prev));
    }, 3200);
    return () => window.clearTimeout(timer);
  }, []);

  // On first scroll, show the "I'm also coming" line, then switch to section comments
  useEffect(() => {
    const handleFirstScroll = () => {
      if (hasScrolledRef.current) return;
      hasScrolledRef.current = true;

      setPhase("intro");
      window.setTimeout(() => {
        setPhase("section");
      }, 2800);

      window.removeEventListener("scroll", handleFirstScroll);
    };

    window.addEventListener("scroll", handleFirstScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleFirstScroll);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const bubbleText =
    phase === "greeting"
      ? greetingMessage
      : phase === "intro"
      ? introMessage
      : phase === "section"
      ? beeComments[currentSection] || beeComments.home
      : null;

  return (
    <motion.div
      style={{ top, left }}
      className="pointer-events-none fixed z-[90] flex -translate-x-1/2 flex-col items-center"
    >
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        {bubbleText && (
          <motion.div
            key={bubbleText}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mb-2 max-w-[220px] rounded-2xl rounded-br-sm border border-white/10 bg-[#111827]/95 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg backdrop-blur-sm"
          >
            {bubbleText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bee */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [-6, 6, -6],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-6xl drop-shadow-[0_4px_14px_rgba(250,204,21,0.4)]"
      >
        🐝
      </motion.div>
    </motion.div>
  );
}