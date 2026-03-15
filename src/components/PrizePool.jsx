"use client";
import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';
import { motion } from "framer-motion";
import "./css/PrizePool.css";

const PrizePool = () => {
  const mainPrizes = [
    {
      rank: "2nd",
      amount: "7,000",
      title: "Silver",
      icon: <Medal size={40} />,
      color: "border-zinc-400",
      text: "text-zinc-400",
      glow: "shadow-zinc-500/10",
      order: "order-2 md:order-1",
      height: "h-[320px] md:h-[380px]"
    },
    {
      rank: "1st",
      amount: "10,000",
      title: "Gold",
      icon: <Trophy size={56} />,
      color: "border-orange-500",
      text: "text-orange-500",
      glow: "shadow-orange-600/30",
      order: "order-1 md:order-2",
      height: "h-[400px] md:h-[460px]"
    },
    {
      rank: "3rd",
      amount: "4,000",
      title: "Bronze",
      icon: <Award size={40} />,
      color: "border-orange-900/50",
      text: "text-orange-900",
      glow: "shadow-orange-900/10",
      order: "order-3 md:order-3",
      height: "h-[280px] md:h-[320px]"
    }
  ];

  const specialPrizes = [
    {
      rank: "Beginner",
      amount: "4,000",
      title: "Rising Star",
      icon: <Award size={40} />,
      color: "border-cyan-500/40",
      text: "text-cyan-400",
      glow: "shadow-cyan-500/10",
      description: "Best Beginners Team Category"
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter"
          >
            Prize <span className="text-orange-500">Pool</span>
          </motion.h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-light">
            Rewarding the most efficient and creative algorithmic solutions.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-transparent mx-auto mt-6 rounded-full" />
        </div>

        {/* [MAIN PODIUM] */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-4 mb-24">
          {mainPrizes.map((prize, index) => (
            <PrizeCard key={index} prize={prize} index={index} />
          ))}
        </div>

        {/* [SPECIAL RECOGNITION] */}
        <div className="pt-12 border-t border-white/5">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] mb-2 block">Special recognition</span>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic">Rising Star Award</h3>
          </motion.div>

          <div className="flex justify-center">
            {specialPrizes.map((prize, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`max-w-md w-full bg-white/[0.03] border-2 border-cyan-500/20 rounded-[2.5rem] p-10 backdrop-blur-3xl relative overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity text-cyan-400">
                  {prize.icon}
                </div>
                <div className="relative z-10">
                   <span className="text-cyan-400 text-[10px] font-black uppercase tracking-widest block mb-1">GRANT: ₹{prize.amount}</span>
                   <h4 className="text-2xl font-black text-white mb-2">{prize.title}</h4>
                   <p className="text-zinc-500 text-sm leading-relaxed">{prize.description}</p>
                </div>
                <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-cyan-500/5 select-none pointer-events-none uppercase italic">STAR</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PrizeCard = ({ prize, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    whileHover={{ y: -15, scale: 1.02 }}
    className={`relative w-full md:w-1/3 flex flex-col p-1 rounded-3xl border-2 transition-all duration-500 backdrop-blur-2xl bg-gradient-to-b from-white/10 to-transparent 
    ${prize.color} ${prize.glow} ${prize.order} ${prize.height} overflow-hidden group`}
  >
    {/* Large Rank Number */}
    <div className="absolute top-[-20px] right-[-10px] text-[18rem] font-black opacity-[0.04] select-none group-hover:opacity-[0.08] transition-all duration-500 pointer-events-none z-0 tracking-tighter leading-none">
      {prize.rank[0]}
    </div>

    {/* Floating Icon */}
    <div className={`absolute right-8 top-20 opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:-translate-y-4 z-0 ${prize.text}`}>
      {prize.icon}
    </div>

    {/* Status Header */}
    <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 z-10 bg-black/40 backdrop-blur-md">
      <span className={`text-xs font-black tracking-widest uppercase ${prize.text}`}>
        RANK {prize.rank}
      </span>
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full bg-white/10"></div>
        <div className={`w-6 h-2 rounded-full ${prize.rank === "1st" ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-white/20'}`}></div>
      </div>
    </div>

    {/* Card Body */}
    <div className="flex-1 flex flex-col p-10 z-10 relative">
      <div className="mt-4 mb-auto">
         <h3 className="text-white text-3xl font-black italic tracking-tighter uppercase">{prize.title}</h3>
         <div className="w-12 h-1.5 bg-current opacity-60 mt-2 rounded-full" style={{color: prize.rank === '1st' ? '#f97316' : prize.rank === '2nd' ? '#94a3b8' : '#78350f'}}></div>
      </div>
      
      {/* Cash Display */}
      <div className="pb-4">
         <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest block mb-1">Grant Allocation</span>
         <div className="flex items-baseline gap-1">
            <span className={`text-3xl font-bold ${prize.text}`}>₹</span>
            <span className="text-6xl md:text-7xl font-black text-white tracking-tighter">
              {prize.amount}
            </span>
         </div>
      </div>
    </div>
  </motion.div>
);



export default PrizePool;