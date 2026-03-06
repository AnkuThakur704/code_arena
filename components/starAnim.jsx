"use client";
import { useEffect, useRef } from "react";

const CanvasAnimation = () => {
  const canvasRef = useRef(null);

  const maxParticles = 120;
  const particles = useRef([]);
  const particlePool = useRef([]);

  class Particle {
    constructor(x, y) {
      this.init(x, y);
    }

    init(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 1.5 + 0.5;
      this.lifeSpan = 120;
      this.alpha = 1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.lifeSpan--;
      this.alpha = Math.max(0, this.lifeSpan / 120);
    }

    draw(ctx) {
      ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
      ctx.shadowColor = "rgba(255,255,255,0.8)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const draw = (ctx, width, height) => {
    particles.current.forEach((particle, index) => {
      particle.update();
      particle.draw(ctx);

      if (particle.lifeSpan <= 0) {
        particlePool.current.push(particle);
        particles.current.splice(index, 1);
      }
    });

    if (particles.current.length < maxParticles) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      let particle;
      if (particlePool.current.length > 0) {
        particle = particlePool.current.pop();
        particle.init(x, y);
      } else {
        particle = new Particle(x, y);
      }

      particles.current.push(particle);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw(ctx, canvas.width, canvas.height);
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        background: "#000",
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    />
  );
};

export default CanvasAnimation;