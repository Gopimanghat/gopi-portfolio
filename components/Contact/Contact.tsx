"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { ResumeButton } from "../ui/Button";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#0B0F19] py-28 text-white"
    >
      <Container>
        <SectionTitle
          title="Let's Build Something Great Together"
          subtitle="Have an opportunity or just want to connect? I'd love to hear from you."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-3xl border border-gray-800 bg-[#111827] p-10"
        >
          <div className="space-y-6">

            <div>
              <h3 className="font-semibold text-indigo-400">
                Email
              </h3>
              <p>gopimathilakath@gmail.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-indigo-400">
                LinkedIn
              </h3>
              <p>www.linkedin.com/in/gopikrishnan-m-a74a693b8</p>
            </div>

            <ResumeButton />

          </div>
        </motion.div>
      </Container>
    </section>
  );
}