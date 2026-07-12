"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "./ProjectCard";
import { projects } from "./projectsData";

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-white py-28 text-black"
    >
      <Container>
        <SectionTitle
          title="Featured Projects"
          subtitle="A selection of projects showcasing my experience in full-stack development, AI integration, and real-world problem solving."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                features={project.features}
                image={project.image}
                live={project.live}
                github={project.github}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}