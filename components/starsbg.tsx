
export default function StarBackground() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden">
     <video
        autoPlay
        loop
        muted
        playsInline
      
       preload="auto"
        className="absolute top-0 left-0 min-w-full min-h-full object-cover"
      >
        <source src="/dnaStar.mp4" type="video/mp4" />your browser
      </video>

      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
}

{/* <video width="320" height="240" controls >
      <source src="/stars.mp4" type="video/mp4" />
     
    </video> */}



    