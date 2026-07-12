"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  image: string;
  live: string;
  github: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  features,
  image,
  live,
  github,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]"
    >
      {/* Image Placeholder */}
     <div className="relative h-56 w-full overflow-hidden">
  <Image
    src={image}
    alt={title}
    fill
    className="object-cover transition-transform duration-500 hover:scale-105"
  />
</div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-3 text-gray-400">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="mt-6 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="mt-6 space-y-2">
          {features.map((feature) => (
            <p
              key={feature}
              className="text-sm text-gray-300"
            >
              ✓ {feature}
            </p>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-3">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-500"
            >
              View Project
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-700 px-5 py-2 text-white transition hover:border-indigo-500"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}