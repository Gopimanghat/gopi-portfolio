"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import SkillCard from "./SkillCard";
import { skillCategories } from "./skillsData";

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-[#0B0F19] py-28 text-white"
    >
      <Container>
        <SectionTitle
          title="My Tech Stack"
          subtitle="Technologies I use to build modern web applications."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <SkillCard
                title={category.title}
                skills={category.skills}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}