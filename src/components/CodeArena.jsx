'use client';

import { useRef } from 'react';
import { Calendar, Clock, Trophy, Users, Terminal, Zap, ChevronRight } from 'lucide-react';
import PlanetScene from './PlanetScene';

const CodeArena = () => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden">
      
      {/* 1. THE PLANET */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-end">
        <div className="w-full h-full lg:w-[75%] lg:h-full transform translate-x-10">
          
          <PlanetScene />
        </div>
      </div>

      {/* 2. THE CONTENT (Lower Z-index than rings, or same if you want rings on top) */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 lg:pl-24 lg:pr-10 py-12">
        
        {/* Left Content Section */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
          
          <div className="mb-6 animate-fade-in">
            <h1 className="text-6xl lg:text-7xl font-black mb-0 tracking-tighter leading-[0.85] text-white">
              CODE ARENA'26
            </h1>
          </div>

          <p className="text-xl lg:text-2xl text-zinc-400 font-light mb-10 tracking-wide animate-fade-in-delayed max-w-xl">
            The <span className="text-white font-medium">Ultimate</span> Competitive Programming Battle.
          </p>

          <div className="space-y-4 mb-12 animate-fade-in-delayed-2">
            <FeatureLine icon={<Zap size={18} className="text-yellow-400" />} text="High-stakes algorithmic challenges" />
            <FeatureLine icon={<Terminal size={18} className="text-cyan-400" />} text="Real-time live scoring system" />
            <FeatureLine icon={<Trophy size={18} className="text-purple-400" />} text="Certificates and recognition" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in-delayed-3">
            <StatCard label="Date" value="11 April" icon={<Calendar size={16} />} />
            <StatCard label="Time" value="2 Hours" icon={<Clock size={16} />} />
            <StatCard label="Format" value="ICPC Style" icon={<Trophy size={16} />} />
            <StatCard label="Access" value="Global" icon={<Users size={16} />} />
          </div>

          <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-delayed-4">
            {/* pointer-events-auto is needed because the parent has pointer-events-none */}
            <button className="pointer-events-auto group relative px-10 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-xl transition-all">
              <span className="flex items-center gap-2 uppercase relative z-10">
                Enter Arena <ChevronRight size={20} />
              </span>
            </button>
            <button className="pointer-events-auto px-10 py-4 border border-white/20 hover:bg-white/5 text-white font-bold rounded-xl transition-all backdrop-blur-md uppercase">
              View Rules
            </button>
          </div>
        </div>

        {/* Right Side is now empty because PlanetScene is absolute-positioned above */}
        <div className="hidden lg:block lg:w-[100%]" />
      </div>

      <style jsx>{`
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-fade-in-delayed { animation: fadeIn 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-in-delayed-2 { animation: fadeIn 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-fade-in-delayed-3 { animation: fadeIn 0.8s ease-out 0.6s forwards; opacity: 0; }
        .animate-fade-in-delayed-4 { animation: fadeIn 0.8s ease-out 0.8s forwards; opacity: 0; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
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