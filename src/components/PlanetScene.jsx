'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PlanetScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // --- 1. ENHANCED PLANET TEXTURE ---
    const createPlanetTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024; canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      // Deep Space Base
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#0a0a2e');
      grad.addColorStop(0.5, '#16213e');
      grad.addColorStop(1, '#0a0a2e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add "Continents" or Surface Variation
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = `rgba(60, 130, 246, ${Math.random() * 0.2})`;
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 200, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add Cyber Grid/Circuitry Lines
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      return new THREE.CanvasTexture(canvas);
    };

    // --- 2. THE PLANET BODY ---
    const planetGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: createPlanetTexture(),
      metalness: 0.4,
      roughness: 0.7,
      emissive: new THREE.Color(0x112244),
      emissiveIntensity: 0.5,
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // --- 3. ATMOSPHERIC GLOW (Fresnel Effect) ---
    const atmoGeom = new THREE.SphereGeometry(1.52, 64, 64);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmoGeom, atmoMat);
    scene.add(atmosphere);

    // --- 4. VOLUMETRIC RINGS (The "Saturn" Look) ---
    const createRings = () => {
      const points = [];
      const colors = [];
      const color = new THREE.Color();
      const numPoints = 12000;

      for (let i = 0; i < numPoints; i++) {
        // Spread points in a flat disc
        const r = 2.0 + Math.random() * 1.2;
        const theta = Math.random() * Math.PI * 2;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        const y = (Math.random() - 0.5) * 0.05; // Tiny thickness

        points.push(x, y, z);
        
        // Multicolored ring particles
        const mixedColor = Math.random() > 0.5 ? 0x22d3ee : 0x818cf8;
        color.setHex(mixedColor);
        colors.push(color.r, color.g, color.b);
      }

      const ringGeom = new THREE.BufferGeometry();
      ringGeom.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      ringGeom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const ringMat = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(ringGeom, ringMat);
    };

    const rings = createRings();
    rings.rotation.x = Math.PI * 0.05; // Tilt the rings
    rings.rotation.z = Math.PI * 0.05;
    scene.add(rings);

    // --- 5. LIGHTING ---
    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const rimLight = new THREE.PointLight(0x22d3ee, 10, 10);
    rimLight.position.set(-5, -2, -2);
    scene.add(rimLight);

    const ambient = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambient);

    // --- ANIMATION ---
    const animate = () => {
      requestAnimationFrame(animate);
      planet.rotation.y += 0.002;
      rings.rotation.y += 0.0005;
      
      // Floating motion
      const time = Date.now() * 0.001;
      planet.position.y = Math.sin(time) * 0.05;
      rings.position.y = Math.sin(time) * 0.05;
      atmosphere.position.y = Math.sin(time) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};

export default PlanetScene;