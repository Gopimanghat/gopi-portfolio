"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ExperienceCard from "./ExperienceCard";
import { experiences } from "./experienceData";

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-[#0B0F19] py-28 text-white"
    >
      <Container>
        <SectionTitle
          title="Experience"
          subtitle="Real-world development experience."
        />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <ExperienceCard {...exp} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}