import React from "react";
import { Trophy, Medal, Award, Star } from "lucide-react";

const PrizePool = () => {
  const prizes = [
    {
      id: "second",
      rank: "🥈 2nd",
      amount: "₹7,000",
      title: "Silver Medal",
      icon: <Medal size={40} className="text-zinc-200" />,
      palette: "from-zinc-800/8 to-zinc-900/6 border-zinc-600/14",
    },
    {
      id: "first",
      rank: "🥇 1st",
      amount: "₹10,000",
      title: "Gold Trophy",
      icon: <Trophy size={56} className="text-amber-400 drop-shadow-md" />,
      palette: "from-amber-400/8 to-amber-600/6 border-amber-400/22",
      highlight: true,
    },
    {
      id: "third",
      rank: "🥉 3rd",
      amount: "₹4,000",
      title: "Bronze Award",
      icon: <Award size={40} className="text-orange-800" />,
      palette: "from-orange-900/8 to-orange-900/4 border-orange-900/20",
    },
    {
      id: "beginner",
      rank: "🎉 Beginner",
      amount: "₹4,000",
      title: "Beginner Prize",
      icon: <Star size={38} className="text-emerald-300" />,
      palette: "from-emerald-700/6 to-emerald-900/4 border-emerald-600/14",
    },
  ];

  return (
    <section className="relative py-20 px-6 md:px-12 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Soft back glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[520px] rounded-full bg-gradient-to-br from-amber-500/6 via-purple-700/6 to-emerald-400/6 blur-3xl pointer-events-none" />

      {/* Extra small decorative dots (subtle) */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.02)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-200 to-amber-400 mb-3">
            Prize Pool
          </h2>

          <div className="mx-auto w-24 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 mb-4 shadow-sm" />

          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">
            Rewards for top performers — plus a beginner prize so newcomers have a chance to win.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-end">
          {prizes.map((prize) => (
            <article
              key={prize.id}
              className={`group relative overflow-hidden rounded-3xl border backdrop-blur-lg p-5 md:p-7 transition-transform duration-450 transform
                hover:-translate-y-3 hover:shadow-2xl
                border-white/6 bg-gradient-to-b ${prize.palette}
                motion-reduce:transition-none motion-reduce:transform-none`}
              role="article"
              aria-labelledby={`prize-${prize.id}-title`}
            >
              {/* layered overlays for depth */}
              <div
                className={`absolute inset-0 pointer-events-none rounded-3xl ${
                  prize.highlight ? "bg-gradient-to-tr from-amber-50/6 via-white/2 to-amber-200/4" : "bg-black/0"
                }`}
                aria-hidden="true"
              />

              {/* rotating soft gradient for highlighted card */}
              {prize.highlight && (
                <>
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-30 blur-2xl animate-spin-slow motion-reduce:animate-none pointer-events-none"
                    style={{
                      background:
                        "conic-gradient(from 0deg at 50% 50%, rgba(255,205,78,0.12), rgba(236,72,153,0.06), rgba(79,70,229,0.06), rgba(255,205,78,0.12))",
                      mixBlendMode: "screen",
                    }}
                  />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-amber-400/18 pointer-events-none" />
                </>
              )}

              {/* small top-right decorative spark */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                className="absolute top-3 right-3 opacity-10 pointer-events-none"
                aria-hidden="true"
              >
                <circle cx="40" cy="40" r="20" fill="rgba(255,255,255,0.03)" />
              </svg>

              {/* Icon area */}
              <div className="relative flex justify-center mb-3">
                {/* soft halo */}
                <div
                  className={`absolute -top-6 w-24 h-24 rounded-full opacity-20 blur-sm ${
                    prize.highlight ? "bg-amber-400/40" : "bg-white/5"
                  } transform scale-105`}
                />
                <div
                  className={`relative z-10 p-3 rounded-2xl ${
                    prize.highlight ? "bg-white/6" : "bg-white/4"
                  } shadow-[0_8px_30px_rgba(0,0,0,0.5)]`}
                >
                  {prize.icon}
                </div>
              </div>

              {/* Rank & title */}
              <div className="text-center">
                <div id={`prize-${prize.id}-title`} className="text-sm md:text-base  font-semibold mb-1">
                  {prize.rank}
                </div>
                <div className="text-[10px] md:text-xs tracking-widest uppercase mb-3">
                  {prize.title}
                </div>

                {/* Amount with micro stroke and gradient */}
                <div
                  className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 1px 0 rgba(255,255,255,0.25)",
                  }}
                >
                  {prize.amount}
                </div>

                <p className="mt-2 text-[13px] ">
                  {prize.highlight
                    ? "Champion reward — trophy, goodies & recognition."
                    : prize.id === "beginner"
                    ? "A beginner-friendly prize to encourage participation."
                    : "A prestigious prize for outstanding performance."}
                </p>
              </div>

              {/* CTA / subtle footer */}
              <div className="mt-5 flex justify-center">
                <button
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-shadow duration-300
                    ${prize.highlight ? "bg-amber-500 text-amber-900 shadow-md hover:brightness-105" : "bg-white/6 text-white hover:bg-white/8"}`}
                  aria-label={`View details for ${prize.title}`}
                >
                  View details
                </button>
              </div>

              {/* subtle bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/6 to-transparent opacity-70 pointer-events-none" />
            </article>
          ))}
        </div>
      </div>

      {/* component-scoped styles (keyframes) */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 18s linear infinite; }
        /* small tweak for the hover smoothness */
        .duration-450 { transition-duration: 450ms; }
      `}</style>
    </section>
  );
};

export default PrizePool;