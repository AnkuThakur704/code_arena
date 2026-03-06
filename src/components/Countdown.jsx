"use client";
import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  // Set your event date here
  const targetDate = new Date("2024-05-20T00:00:00").getTime();

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

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="relative group">
        {/* Animated Glow Backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        
        {/* The Card */}
        <div className="relative w-20 h-24 md:w-32 md:h-40 bg-black/40 border border-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-500/50 rounded-tr-lg" />
          
          {/* The Number */}
          <span className="text-4xl md:text-7xl font-black text-white tracking-tighter tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
          
          {/* Subtle Scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
        </div>
      </div>
      <span className="mt-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-12 flex flex-col items-center justify-center bg-transparent">
      <div className="flex gap-4 md:gap-8">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
      
      {/* "Status" indicator below the timer */}
      <div className="mt-10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[10px] font-mono text-orange-500/80 uppercase tracking-widest">
          System Online // Initializing Competition Sequence
        </span>
      </div>
    </section>
  );
};

export default Countdown;