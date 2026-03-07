export default function AboutCompetition() {
  return (
    <section className="relative w-full py-24 px-6 md:px-16 overflow-hidden">

      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            About The Arena
          </h2>

          <p className="text-cyan-400/80 mt-4 text-lg max-w-2xl mx-auto">
            A battlefield for logic, speed, and precision. Only the sharpest minds rise to the top.
          </p>

          <div className="h-[2px] w-24 bg-cyan-500 mx-auto mt-6 opacity-40"></div>
        </div>

        {/* Content Card */}
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 overflow-hidden">

          {/* Decorative background text */}
          <div className="absolute -top-10 -right-5 text-[16rem] font-black opacity-[0.03] select-none pointer-events-none">
            CA
          </div>

          <div className="grid md:grid-cols-2 gap-12 relative z-10">

            {/* Left Text */}
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

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <FeatureCard
                icon="⚡"
                title="Fast Paced"
                desc="Solve multiple algorithmic challenges within a limited time window."
              />

              <FeatureCard
                icon="🧠"
                title="Logic Driven"
                desc="Problems test your understanding of data structures and algorithms."
              />

              <FeatureCard
                icon="📊"
                title="Live Leaderboard"
                desc="Track your ranking in real time as competitors submit solutions."
              />

              <FeatureCard
                icon="🏆"
                title="Top Performers"
                desc="Compete for recognition and prove your problem solving ability."
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-500 hover:scale-[1.03] hover:border-cyan-400/40 backdrop-blur-md overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>

      {/* floating icon */}
      <div className="absolute right-4 top-4 text-4xl opacity-20 group-hover:opacity-40 transition-transform duration-500 group-hover:-translate-y-1">
        {icon}
      </div>

      {/* content */}
      <div className="relative z-10">
        <h3 className="text-white font-semibold mb-2">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
      </div>

      {/* decorative corner bracket */}
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-white/20"></div>

    </div>
  );
}