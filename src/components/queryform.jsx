'use client'
import { useState } from "react";
export default function QueryForm() {
    const [formdata, setformdata] = useState({})

    const handleSubmit = async(e)=>{
        e.preventDefault()
        //save the query 
        console.log(formdata)
    }

  return (
    <section className="relative w-full py-20 px-5 sm:px-8 md:px-16">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Send a Query
          </h2>

          <p className="text-cyan-400/80 mt-3 text-sm sm:text-base">
            Have a question about Code Arena? Reach out and we’ll help you. 
          </p>

          <div className="h-0.5 w-20 bg-cyan-500 mx-auto mt-5 opacity-40"></div>
        </div>

        {/* Form Card */}
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden">

          {/* Background decoration */}
          <div className="absolute -top-10 -right-5 text-[10rem] md:text-[12rem] font-black opacity-[0.03] pointer-events-none select-none">
            ?
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-xs sm:text-sm text-zinc-400 mb-2 uppercase tracking-wide">
                  Name
                </label>
                <input
                name="name"
                onChange={(e)=>setformdata({...formdata,Name:e.target.value})}
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your name"
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-zinc-400 mb-2 uppercase tracking-wide">
                  Email
                </label>
                <input
                name="email"
                onChange={(e)=>setformdata({...formdata,Email:e.target.value})}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs sm:text-sm text-zinc-400 mb-2 uppercase tracking-wide">
                Subject
              </label>
              <input
              name="subject"
                onChange={(e)=>setformdata({...formdata,Subject:e.target.value})}
                autoComplete="off"
                type="text"
                placeholder="Subject"
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs sm:text-sm text-zinc-400 mb-2 uppercase tracking-wide">
                Message
              </label>
              <textarea
              name="message"
                onChange={(e)=>setformdata({...formdata,Message:e.target.value})}
                rows="5"
                placeholder="Write your message..."
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-400 transition resize-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full sm:w-auto sm:px-10 py-3 rounded-lg bg-cyan-500 text-black font-semibold tracking-wide hover:bg-cyan-400 transition"
            >
              Send Message
            </button>

          </form>

          {/* Decorative corners */}
          <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-white/20"></div>
          <div className="absolute bottom-3 left-3 w-2 h-2 border-l border-b border-white/20"></div>

        </div>
      </div>
    </section>
  );
}