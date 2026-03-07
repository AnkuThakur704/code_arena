"use client";
import { Zap, BrainCircuit, BarChart3, Trophy } from 'lucide-react';

export default function AboutCompetition() {
  return (
    <section className="relative w-full py-24 px-6 md:px-16 overflow-hidden">
      
      <div className="max-w-6xl mx-auto">

        {/* Section Heading - Already floating */}
        <div className="text-center mb-16 animate-float-slow">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter">
            About The <span className="text-orange-500">Arena</span>
          </h2>
          <p className="text-zinc-500 mt-4 text-lg max-w-2xl mx-auto">
            A battlefield for logic, speed, and precision. Only the sharpest minds rise to the top.
          </p>
        </div>

        {/* WRAPPER FOR MAIN CARD FLOATING */}
        <div className="float-main-card">
          {/* Main Content Card */}
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 relative shadow-2xl">
             {/* Subtle corner accents */}
             <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/30 rounded-tl-2xl" />
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-2xl" />

            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* Left Text (Paragraph) */}
              <div className="space-y-6 text-zinc-300 leading-relaxed text-lg">
                <p>
                  <span className="text-cyan-400 font-semibold">Code Arena</span> is a 
                  competitive programming challenge designed to test your ability 
                  to think logically, solve complex problems, and implement efficient 
                  algorithms under time pressure.
                </p>

                <p>
                  Participants will face a carefully curated set of algorithmic 
                  problems inspired by real competitive programming contests. 
                  Speed, correctness, and optimization will determine who climbs 
                  the leaderboard.
                </p>

                <p>
                  Whether you're a beginner exploring algorithms or an experienced 
                  competitor chasing the top spot, the arena welcomes all warriors 
                  ready to prove their coding skills.
                </p>
              </div>

              {/* Right Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FeatureCard
                  icon={<Zap className="text-yellow-400" />}
                  title="Fast Paced"
                  desc="Solve multiple algorithmic challenges within a limited time window."
                  floatClass="float-box-1"
                />
                <FeatureCard
                  icon={<BrainCircuit className="text-cyan-400" />}
                  title="Logic Driven"
                  desc="Problems test your understanding of data structures and algorithms."
                  floatClass="float-box-2"
                />
                <FeatureCard
                  icon={<BarChart3 className="text-orange-400" />}
                  title="Live Leaderboard"
                  desc="Track your ranking in real time as competitors submit solutions."
                  floatClass="float-box-3"
                />
                <FeatureCard
                  icon={<Trophy className="text-purple-400" />}
                  title="Top Performers"
                  desc="Compete for recognition and prove your problem solving ability."
                  floatClass="float-box-4"
                />
              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* HEAVY MAIN CARD FLOAT */
        .float-main-card {
          animation: heavyFloat 8s ease-in-out infinite;
          will-change: transform;
        }

        /* INDIVIDUAL SMALL CARD FLOATS */
        .float-box-1 { animation: spaceFloat 7s ease-in-out infinite; animation-delay: 0s; }
        .float-box-2 { animation: spaceFloat 8s ease-in-out infinite; animation-delay: -1.5s; }
        .float-box-3 { animation: spaceFloat 7.5s ease-in-out infinite; animation-delay: -3s; }
        .float-box-4 { animation: spaceFloat 9s ease-in-out infinite; animation-delay: -4.5s; }
        
        .animate-float-slow { animation: spaceFloat 10s ease-in-out infinite; }

        @keyframes spaceFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(0.5deg); }
        }

        @keyframes heavyFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
      `}</style>
    </section>
  );
}

function FeatureCard({ icon, title, desc, floatClass }) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-500 group relative ${floatClass}`}>
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/0 group-hover:border-white/40 transition-all" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/0 group-hover:border-white/40 transition-all" />
      <div className="mb-3 transition-transform group-hover:scale-110 duration-300">
        {icon}
      </div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}