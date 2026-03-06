import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';
import "./css/PrizePool.css";

const PrizePool = () => {
  const prizes = [
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

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-2 uppercase italic">
            PRIZE <span className="text-orange-500">POOL</span>
          </h2>
          <p className="text-zinc-500 font-mono text-xs tracking-[0.4em] uppercase">
            Recognizing the Elite Algorithmic Minds
          </p>
          <div className="h-1 w-24 bg-orange-600 mx-auto mt-4 rounded-full opacity-50" />
        </div>

        {/* Prize Podium */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4">
          {prizes.map((prize, index) => (
            <div 
              key={index} 
              className={`relative w-full md:w-1/3 flex flex-col p-1 rounded-2xl border-2 transition-all duration-500 hover:scale-[1.03] backdrop-blur-xl bg-gradient-to-b from-white/10 to-transparent 
              ${prize.color} ${prize.glow} ${prize.order} ${prize.height} overflow-hidden group prize-card`}
            >
              {/* [BACK LAYER] Large Rank Number */}
              <div className="absolute top-[-20px] right-[-10px] text-[18rem] font-black opacity-[0.04] select-none group-hover:opacity-[0.08] transition-all duration-500 pointer-events-none z-0 tracking-tighter leading-none">
                {prize.rank[0]}
              </div>

              {/* [MIDDLE LAYER] Floating Icon - Slightly offset from center */}
              <div className={`absolute right-8 top-20 opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:-translate-y-2 z-0 ${prize.text}`}>
                {prize.icon}
              </div>

              {/* [FRONT LAYER] Status Header */}
              <div className="flex justify-between items-center px-5 py-3 border-b border-white/10 z-10 bg-black/40 backdrop-blur-md">
                <span className={`text-[10px] font-black tracking-widest uppercase ${prize.text}`}>
                  RANK {prize.rank}
                </span>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                  <div className={`w-4 h-1.5 rounded-full ${prize.rank === "1st" ? 'bg-orange-500' : 'bg-white/20'}`}></div>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 flex flex-col p-8 z-10 relative">
                <div className="mt-4 mb-auto">
                   <h3 className="text-white text-2xl font-bold italic tracking-tight uppercase">{prize.title}</h3>
                   <div className="w-10 h-1 bg-current opacity-40 mt-1" style={{color: prize.rank === '1st' ? '#f97316' : '#71717a'}}></div>
                </div>
                
                {/* Cash Display */}
                <div className="pb-4">
                   <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest block mb-1">Grant Allocation</span>
                   <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-bold ${prize.text}`}>₹</span>
                      <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                        {prize.amount}
                      </span>
                   </div>
                   
                   {/* Decorative data-line */}
                   <div className="w-full h-[1px] bg-white/10 mt-6 relative">
                      <div 
                        className={`absolute top-0 left-0 h-full bg-current ${prize.text} shadow-[0_0_8px_currentColor]`} 
                        style={{width: prize.rank === '1st' ? '100%' : prize.rank === '2nd' ? '70%' : '40%'}}
                      ></div>
                   </div>
                </div>
              </div>

              {/* Technical Brackets */}
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-white/20 pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-2 h-2 border-l border-b border-white/20 pointer-events-none z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizePool;