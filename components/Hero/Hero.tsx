"use client";

import { motion } from "framer-motion";
import Button, { ResumeButton } from "../ui/Button";
import Container from "../ui/Container";
import Image from "next/image";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
} from "react-icons/si";
import BackgroundEffects from "../ui/BackgroundEffects";

export default function Hero() {
  return (
    <section
  id="home"
  className="relative min-h-screen overflow-hidden bg-[#0B0F19] pt-20 lg:pt-0"
>
      <BackgroundEffects />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_60%)]" />
      <Container>
        <div className="relative z-10 grid min-h-screen items-center gap-12 lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
          >
            <p className="mb-4 text-lg text-indigo-400">
              👋 Hello, I'm
            </p>

           <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-indigo-400 via-white to-cyan-400 bg-clip-text text-transparent">
  GOPIKRISHNAN M
              </span>
            </h1>

            <h2 className="mt-6 max-w-xl text-3xl font-bold leading-snug text-white">
              Turning ideas into reliable web applications.
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
              Full Stack Developer • AI & ML Student
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button className="shadow-lg shadow-indigo-500/30"
  onClick={() =>
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" })
  }
>View Projects
              </Button>

              <ResumeButton/>
            </div>
          </motion.div>

          {/* Right */}
   {/* Right */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="flex justify-center"
>
  <div className="relative">

    {/* Glow */}
    <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-[80px]" />

    {/* React */}
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration: 4 }}
      className="absolute -left-8 top-12 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
    >
      <SiReact className="text-3xl text-cyan-400" />
    </motion.div>

    {/* Next */}
    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{ repeat: Infinity, duration: 5 }}
      className="absolute -right-10 top-24 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
    >
      <SiNextdotjs className="text-3xl text-white" />
    </motion.div>

    {/* Node */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 6 }}
      className="absolute bottom-10 -left-6 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
    >
      <SiNodedotjs className="text-3xl text-green-400" />
    </motion.div>

    {/* Python */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 5 }}
      className="absolute bottom-4 -right-10 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
    >
      <SiPython className="text-3xl text-yellow-400" />
    </motion.div>

    {/* Photo */}
      <div className="relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] lg:h-[390px] lg:w-[390px] overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
    
        <Image
  src="/Passport_Photograph.jpg"
  alt="Profile"
  fill
  priority
  className="rounded-full object-cover"
/>
      
    </div>

  </div>
</motion.div>

        </div>
      </Container>
    </section>
  );
}