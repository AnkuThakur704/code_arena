export default function Sponsors() {
    const sponsorlogos = ["/sponsors/logo1.png","/sponsors/logo1.png","/sponsors/logo1.png","/sponsors/logo1.png"]
  return (
    <section className="relative w-full py-24 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Our Sponsors
          </h2>

          <p className="text-cyan-400/80 mt-4 text-lg max-w-2xl mx-auto">
            Code Arena is supported by organizations that believe in innovation,
            competitive spirit, and the future of technology.
          </p>
        </div>

        {/* Sponsor Container */}
        <div className="bg-white/5 w-full border border-white/10 backdrop-blur-md rounded-2xl p-10">

          <div className="  flex md:flex-row flex-col gap-10">
            {sponsorlogos.map((logo,key)=>{
                return(
                    <div key={key} className="flex items-center justify-center h-32 w-52 border m-auto border-white/10 rounded-xl bg-white/5 hover:border-cyan-400/40 transition">
              <img src={logo} alt="Sponsor" className="h-10 object-contain" />
            </div>
                )
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

{/* <div className="flex items-center justify-center h-24 w-40 border border-white/10 rounded-xl bg-white/5 hover:border-cyan-400/40 transition">
              <img src="/sponsors/logo2.png" alt="Sponsor 2" className="h-10 object-contain" />
            </div>

            <div className="flex items-center justify-center h-24 w-40 border border-white/10 rounded-xl bg-white/5 hover:border-cyan-400/40 transition">
              <img src="/sponsors/logo3.png" alt="Sponsor 3" className="h-10 object-contain" />
            </div>

            <div className="flex items-center justify-center h-24 w-40 border border-white/10 rounded-xl bg-white/5 hover:border-cyan-400/40 transition">
              <img src="/sponsors/logo4.png" alt="Sponsor 4" className="h-10 object-contain" />
            </div> */}