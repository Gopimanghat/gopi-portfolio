"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import { education } from "./educationData";

export default function Education() {
  return (
    <section
      id="education"
      className="bg-white py-28 text-black"
    >
      <Container>
        <SectionTitle
          title="Education"
          subtitle="Academic background that supports my development journey."
        />

        <div className="space-y-8">
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {item.degree}
                    </h3>

                    <p className="text-indigo-600 mt-1">
                      {item.institution}
                    </p>
                  </div>

                  <span className="text-gray-500">
                    {item.duration}
                  </span>
                </div>

                <p className="mt-5 text-gray-600">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}