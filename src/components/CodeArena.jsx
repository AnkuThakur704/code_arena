'use client';

import { useRef } from 'react';
import { Calendar, Clock, Trophy, Users, Terminal, Zap, ChevronRight } from 'lucide-react';
import PlanetScene from './PlanetScene';
import { motion, useScroll, useTransform } from "framer-motion";

const CodeArena = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yPlanet = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scalePlanet = useTransform(scrollYProgress, [0, 1], [0.8, 1.5]); // Start smaller to give room for zoom
  const rotatePlanet = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={containerRef} className="relative min-h-[120dvh] w-full"> {/* Increased height for better scroll feel */}
      
      {/* 1. THE PLANET - No overflow on parent means no clipping */}
      <motion.div 
        style={{ y: yPlanet, scale: scalePlanet, rotate: rotatePlanet }}
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center lg:justify-end overflow-visible"
      >
        <div className="w-full h-full lg:w-[85%] lg:h-[120%] transform lg:translate-x-32 opacity-80 lg:opacity-100">
          <PlanetScene />
        </div>
      </motion.div>

      {/* 2. THE CONTENT - Orbital entry feel */}
      <motion.div 
        style={{ opacity: opacityContent }}
        className="relative z-10 flex flex-col justify-center min-h-[100dvh] px-6 md:px-12 lg:pl-24 py-20"
      >
        
        {/* Left Content Section */}
        <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-0 tracking-tighter leading-[0.85] text-white">
              CODE <span className="text-orange-500">ARENA'26</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-400 font-light mb-10 tracking-wide max-w-xl"
          >
            The <span className="text-white font-medium underline decoration-orange-500/50 underline-offset-4">Ultimate</span> Competitive Programming Battle for the next generation of engineers.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-4 mb-12"
          >
            <FeatureLine icon={<Zap size={18} className="text-yellow-400" />} text="High-stakes algorithmic challenges" />
            <FeatureLine icon={<Terminal size={18} className="text-cyan-400" />} text="Real-time live scoring system" />
            <FeatureLine icon={<Trophy size={18} className="text-purple-400" />} text="Certificates and recognition" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 w-full max-w-2xl"
          >
            <StatCard label="Date" value="11 April" icon={<Calendar size={16} />} />
            <StatCard label="Time" value="2 Hours" icon={<Clock size={16} />} />
            <StatCard label="Format" value="ICPC Style" icon={<Trophy size={16} />} />
            <StatCard label="Access" value="Global" icon={<Users size={16} />} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
          >
            <button className="pointer-events-auto group relative px-10 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-xl transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)]">
              <span className="flex items-center justify-center gap-2 uppercase relative z-10">
                Enter Arena <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="pointer-events-auto px-10 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-bold rounded-xl transition-all backdrop-blur-md uppercase">
              View Rules
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const FeatureLine = ({ icon, text }) => (
  <div className="flex items-center gap-4 group cursor-default">
    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-white/30 transition-all">
      {icon}
    </div>
    <span className="text-zinc-300 group-hover:text-white transition-colors">{text}</span>
  </div>
);

const StatCard = ({ label, value, icon }) => (
  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
    <div className="text-zinc-500 flex items-center gap-2 mb-1">
      {icon}
      <span className="text-[10px] uppercase font-black tracking-widest">{label}</span>
    </div>
    <p className="text-white font-bold">{value}</p>
  </div>
);

export default CodeArena;