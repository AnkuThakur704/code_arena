"use client";
import { useEffect, useRef } from "react";

const SpaceBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // --- Configuration ---
    const STAR_COUNT = 200;
    const NEBULA_COUNT = 6;
    // Deep purples, cosmic blues, and a hint of magenta for the "smoke"
    const nebulaColors = [
      "rgba(93, 42, 176, 0.15)", // Deep Purple
      "rgba(26, 42, 108, 0.12)", // Midnight Blue
      "rgba(139, 0, 255, 0.1)",  // Electric Violet
      "rgba(0, 210, 255, 0.08)", // Cyan Glow
    ];

    let stars = [];
    let nebulas = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // 1. Initialize Stars
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      }));

      // 2. Initialize "Aura Smoke" (Nebula Clouds)
      nebulas = Array.from({ length: NEBULA_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 500 + 300, // Large smoke clouds
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        vx: (Math.random() - 0.5) * 0.3, // Slow drift X
        vy: (Math.random() - 0.5) * 0.3, // Slow drift Y
        pulse: 0,
        pulseSpeed: Math.random() * 0.01,
      }));
    };

    const draw = () => {
      // Clear with a deep space black/blue gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, "#020205");
      bgGradient.addColorStop(1, "#050510");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- Draw Aura Smoke ---
      ctx.globalCompositeOperation = "screen";
      nebulas.forEach((n) => {
        n.pulse += n.pulseSpeed;
        const currentRadius = n.radius + Math.sin(n.pulse) * 50;

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, currentRadius);
        grad.addColorStop(0, n.color);
        grad.addColorStop(0.5, n.color.replace("0.1", "0.05"));
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Update Position (Drifting)
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around screen edges smoothly
        if (n.x < -n.radius) n.x = canvas.width + n.radius;
        if (n.x > canvas.width + n.radius) n.x = -n.radius;
        if (n.y < -n.radius) n.y = canvas.height + n.radius;
        if (n.y > canvas.height + n.radius) n.y = -n.radius;
      });

      // --- Draw Stars ---
      ctx.globalCompositeOperation = "source-over";
      stars.forEach((s) => {
        // Twinkle effect
        s.opacity += s.twinkleSpeed;
        if (s.opacity > 1 || s.opacity < 0.2) s.twinkleSpeed *= -1;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.opacity)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional: slight star drift for parallax
        s.y += 0.05;
        if (s.y > canvas.height) s.y = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const handleResize = () => init();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default SpaceBackground;