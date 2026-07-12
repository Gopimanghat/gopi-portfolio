"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Image from "next/image";


const highlights = [
  "Full Stack Development",
  "AI & Machine Learning",
  "Problem Solver",
  "Team Collaboration",
];

export default function About() {
  return (
    <section id="about" className="py-28 bg-white text-black">
      <Container>
        <SectionTitle
          title="Who I Am"
          subtitle="A quick introduction beyond my resume."
        />

        <div className="grid gap-16 lg:grid-cols-2 items-center">
          
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Card>
              <div className="relative mx-auto h-[320px] w-full max-w-md overflow-hidden rounded-3xl border border-white/10">
  <Image
    src="/about/workspace.jpg"
    alt="Developer Workspace"
    fill
    className="object-cover"
  />
</div>
            </Card>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-lg leading-8 text-gray-600">
              I'm an MCA student specializing in AI & ML with a passion
              for creating scalable web applications. I enjoy solving
              real-world problems through clean code, modern technologies,
              and continuous learning.
            </p>

            <div className="mt-8 space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-indigo-600">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button
  onClick={() =>
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" })
  }
>
  More About Me
</Button>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}