"use client";
import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const targetDate = new Date("2026-04-11T00:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-12 flex flex-col items-center justify-center bg-transparent">
      <div className="flex gap-4 md:gap-8">
        {/* DAYS */}
        <div className="flex flex-col items-center wave-card-1">
          <Card value={timeLeft.days} label="Days" />
        </div>
        
        {/* HOURS */}
        <div className="flex flex-col items-center wave-card-2">
          <Card value={timeLeft.hours} label="Hours" />
        </div>

        {/* MINUTES */}
        <div className="flex flex-col items-center wave-card-3">
          <Card value={timeLeft.minutes} label="Mins" />
        </div>

        {/* SECONDS */}
        <div className="flex flex-col items-center wave-card-4">
          <Card value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
      
      <div className="mt-10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[10px] font-mono text-orange-500/80 uppercase tracking-widest">
          System Online // Initializing Competition Sequence
        </span>
      </div>

      <style jsx>{`
        /* The specific wave animation classes */
        /* Each card gets a unique speed and a unique delay */
        .wave-card-1 { 
          animation: float-random 5.7s ease-in-out infinite; 
          animation-delay: 0.2s; 
        }
        .wave-card-2 { 
          animation: float-random 6.3s ease-in-out infinite; 
          animation-delay: -1.5s; /* Negative delay starts the animation mid-way */
        }
        .wave-card-3 { 
          animation: float-random 5.9s ease-in-out infinite; 
          animation-delay: 0.8s; 
        }
        .wave-card-4 { 
          animation: float-random 6.1s ease-in-out infinite; 
          animation-delay: -3.2s; 
        }

        @keyframes float-random {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); } /* Slightly higher float for more impact */
        }

        .prize-card {
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        .prize-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          transition: 0.5s;
        }

        .prize-card:hover::before {
          left: 150%;
        }
      `}</style>
    </section>
  );
};

// Internal Card UI helper to keep code clean
const Card = ({ value, label }) => (
  <>
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative w-20 h-24 md:w-32 md:h-40 bg-black/40 border border-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center prize-card">
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-500/50 rounded-tr-lg" />
        <span className="text-4xl md:text-7xl font-black text-white tracking-tighter tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
      </div>
    </div>
    <span className="mt-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold">
      {label}
    </span>
  </>
);

export default Countdown;