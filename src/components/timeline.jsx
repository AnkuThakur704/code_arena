"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Timeline() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.8
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

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
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gradient-to-br from-slate-950 via-slate-900/50 to-purple-900/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-indigo-500/5 -z-10 blur-3xl" />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-8 py-4 bg-white/3 backdrop-blur-xl rounded-3xl border border-white/10 mb-8 shadow-2xl"
          >
            <div />
            <span className="text-lg font-bold text-zinc-300 uppercase tracking-wide">Event Timeline</span>
          </motion.div>
          
          <motion.h2
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent leading-tight mb-6"
          >
            Competition Journey
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Follow our carefully crafted roadmap as we bring together the brightest minds in competitive programming.
          </motion.p>
        </motion.div>

        {/* Centered Timeline - Left/Right Alternating */}
        <div className="relative">
          {/* Central Timeline Line */}
          <motion.div
            style={{ scaleY, opacity }}
            className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[3px] h-full bg-gradient-to-b from-purple-400 via-pink-400 to-indigo-500 origin-top rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] z-10"
          />

          <div className="space-y-20">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -60 : 60, y: 40 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 18
                  }}
                  viewport={{ once: true, margin: "-10%" }}
                  className="relative flex items-center justify-center"
                >
                  {/* Connector line to card */}
                  <motion.div
                    className={`absolute w-20 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-20 ${isEven ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/2'}`}
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
                  />

                  {/* Premium Node - Center */}
                  <motion.div
                   
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.15 + 0.2,
                      type: "spring",
                      stiffness: 400,
                      damping: 20
                    }}
                  >
                    <div className="w-4 h-4 bg-white/20 rounded-full shadow-lg" />
                  </motion.div>

                  {/* Glassmorphism Card - Alternating Sides */}
                  <motion.div
                    className={`max-w-lg backdrop-blur-2xl bg-white/4 hover:bg-white/8 border border-white/15 hover:border-purple-500/40 rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/25 transition-all duration-700 absolute ${isEven ? '-left-80' : '-right-80'} md:relative md:${isEven ? 'ml-auto' : 'mr-auto'}`}
                    whileHover={{
                      y: -12,
                      scale: 1.02,
                      transition: { duration: 0.4, type: "spring" }
                    }}
                    initial={{ scale: 0.95 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.15 + 0.5 }}
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 animate-ping flex-shrink-0" />
                      <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white via-zinc-100 to-purple-100 bg-clip-text leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                      {step.desc}
                    </p>
                    <motion.div
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-purple-500/40 text-purple-200 font-bold text-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="animate-pulse">{step.time}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
