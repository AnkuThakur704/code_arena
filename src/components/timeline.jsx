"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Timeline() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      title: "Registration Opens",
      desc: "Participants sign up and prepare for the coding battle.",
      time: "11 March 09:00 AM"
    },
    {
      title: "Contest Begins",
      desc: "Algorithmic challenges unlock and the battle starts.",
      time: "11 April 10:00 AM"
    },
    {
      title: "Leaderboard Battle",
      desc: "Participants compete to climb the rankings.",
      time: "11 April"
    },
    {
      title: "Winners Announced",
      desc: "Top performers are recognized and rewarded.",
      time: "12 April 03:00 PM"
    }
  ];

  return (
    <section ref={ref} className="py-24 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Competition <span className="text-orange-500">Timeline</span>
          </h2>
          <p className="text-zinc-500 mt-4 text-lg max-w-2xl mx-auto ">
            Follow the flow of the arena as the competition unfolds.
          </p>
        </div>

        <div className="relative">

          {/* timeline line */}
          <div className="absolute left-4 top-0 w-[2px] h-full bg-white/10"></div>

          {/* animated progress */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 top-0 w-[2px] h-full bg-orange-500 origin-top"
          />

          <div className="space-y-20">

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative pl-14"
              >
                {/* node */}
                <div className="absolute left-2 top-2 h-5 w-5 rounded-full bg-orange-500 shadow-[0_0_10px_#22d3ee]" />

                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6">
                  <h3 className="text-white text-lg font-semibold">
                    {step.title}
                  </h3>

                  <p className="text-zinc-400 mt-2 text-sm">
                    {step.desc}
                  </p>

                  <span className="text-orange-400 text-xs mt-3 block">
                    {step.time}
                  </span>
                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}