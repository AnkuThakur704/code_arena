import { Inter } from "next/font/google";
import "./css/CodeArena.css"; 

const inter = Inter({ subsets: ["latin"] });

export default function CodeArena() {
  return (
    <main className={`${inter.className} relative min-h-screen w-full`}>
      <div className="relative z-20 flex min-h-screen flex-col px-6 py-12 md:px-16 md:py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Left Column: Content */}
          <div className="md:col-span-7 flex flex-col items-start gap-8 mt-10 md:mt-20">
            
            <div className="space-y-2">
              <h1 className="cyber-title-subtle text-5xl md:text-7xl font-black tracking-tighter">
                CODE ARENA
              </h1>
              <p className="text-cyan-400/90 text-lg md:text-xl font-semibold uppercase tracking-widest">
                The Ultimate Competitive Programming Battle
              </p>
            </div>

            <div className="space-y-2 text-lg text-zinc-300 font-medium leading-tight border-l-2 border-cyan-500/30 pl-6">
              <p>Sharpen your algorithms.</p>
              <p>Challenge the best minds.</p>
              <p>Enter the arena.</p>
            </div>

            {/* Event Details Card */}
            <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <DetailItem label="Date" value="15 April 2026" icon="📅" />
                <DetailItem label="Duration" value="2 Hours" icon="🕒" />
                <DetailItem label="Platform" value="Codeforces Style" icon="🏆" />
                <DetailItem label="Eligibility" value="Open to All" icon="👥" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button className="btn-arena-primary">
                Enter Arena
              </button>
              <button className="btn-arena-secondary">
                View Rules
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Simple JS component for the detail rows
function DetailItem({ label, value, icon }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-2xl opacity-80">{icon}</span>
      <div>
        <span className="text-zinc-500 text-xs uppercase font-bold tracking-tighter block">{label}</span>
        <span className="text-white text-sm block font-medium">{value}</span>
      </div>
    </div>
  );
}