"use client";
import { motion } from "framer-motion";

export default function Sponsors() {
  const sponsorlogos = [
    { name: "Google", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", icon: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Amazon", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Meta", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Nvidia", icon: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
    { name: "Intel", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282020%29.svg" },
  ];

  // Duplicate for infinite marquee
  const marqueeLogos = [...sponsorlogos, ...sponsorlogos];

  return (
    <section className="relative w-full py-32 px-6 md:px-16 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-magenta-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
              Our <span className="text-purple-500">Sponsors</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Empowering the next generation of algorithmic pioneers through strategic collaboration.
            </p>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-transparent mx-auto mt-8 opacity-30" />
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              animate={{ x: [0, -100 * sponsorlogos.length] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex gap-12 py-10"
            >
              {marqueeLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex items-center justify-center p-8 w-64 h-32 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-xl group hover:border-purple-500/40 transition-colors duration-500 relative"
                >
                  <img
                    src={logo.icon}
                    alt={logo.name}
                    className="h-10 object-contain brightness-0 invert opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  {/* Hover Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
