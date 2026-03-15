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

    // Closer camera for smaller appearance
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Planet Texture (same quality, smaller size)
    const createPlanetTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 2048;
      canvas.height = 1024;

      const ctx = canvas.getContext("2d");

      const noise = (x, y, octaves = 4) => {
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        for (let i = 0; i < octaves; i++) {
          value += (Math.sin(x * frequency * 0.01) * Math.sin(y * frequency * 0.01)) * amplitude;
          amplitude *= 0.5;
          frequency *= 2;
        }
        return value;
      };

      const baseGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      baseGrad.addColorStop(0, "#1a1f4a");
      baseGrad.addColorStop(0.3, "#2a3f6a");
      baseGrad.addColorStop(0.5, "#3a5a8a");
      baseGrad.addColorStop(0.7, "#2a4a7a");
      baseGrad.addColorStop(1, "#1a2f5a");

      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let layer = 0; layer < 5; layer++) {
        const scale = 0.5 + layer * 0.3;
        for (let y = 0; y < canvas.height; y += 4) {
          for (let x = 0; x < canvas.width; x += 4) {
            const n = noise(x * scale, y * scale);
            if (n > 0.1) {
              const alpha = Math.max(0, (n - 0.1) * 0.8);
              const hueShift = n * 20;
              ctx.fillStyle = `rgba(100,${120 + hueShift},${200 + hueShift},${alpha * 0.6})`;
              ctx.fillRect(x, y, 8, 8);
            }
          }
        }
      }

      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 80 + 30;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(255,${100 + Math.random() * 100},150,0.6)`);
        g.addColorStop(0.4, `rgba(150,${80 + Math.random() * 80},200,0.3)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(200, 220, 255, 0.08)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      for (let i = 0; i < 40; i++) {
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(
          canvas.width * 0.25, y + (Math.random() - 0.5) * 40,
          canvas.width * 0.75, y + (Math.random() - 0.5) * 40,
          canvas.width, y
        );
        ctx.stroke();
      }

      for (let i = 0; i < 5000; i++) {
        ctx.fillStyle = "rgba(255,255,255,0.02)";
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
      }

      return new THREE.CanvasTexture(canvas);
    };

    // SMALLER Planet (1.0 instead of 1.5)
    const planetGeometry = new THREE.SphereGeometry(1.0, 128, 64);
    const planetTexture = createPlanetTexture();
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetTexture,
      normalMap: planetTexture,
      normalScale: new THREE.Vector2(0.3, 0.3),
      metalness: 0.1,
      roughness: 0.7,
      emissive: new THREE.Color(0x1a2555),
      emissiveIntensity: 0.25
    });

    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.castShadow = true;
    planet.receiveShadow = true;
    scene.add(planet);

    // Adjusted Atmosphere for smaller planet
    const atmoGeom1 = new THREE.SphereGeometry(1.03, 64, 64);
    const atmoMat1 = new THREE.MeshBasicMaterial({
      color: 0x66aaff,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const atmosphere1 = new THREE.Mesh(atmoGeom1, atmoMat1);
    scene.add(atmosphere1);

    const atmoGeom2 = new THREE.SphereGeometry(1.08, 64, 64);
    const atmoMat2 = new THREE.MeshBasicMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmosphere2 = new THREE.Mesh(atmoGeom2, atmoMat2);
    scene.add(atmosphere2);

    // SMALLER Rings - Scaled down and fit to container
    const createRingLayer = (innerR, outerR, size, count, opacity) => {
      const points = [];
      const colors = [];
      const color = new THREE.Color();

      for (let i = 0; i < count; i++) {
        const r = innerR + Math.random() * (outerR - innerR);
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * 0.1;

        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        const y = Math.sin(phi) * r * 0.02;

        points.push(x, y, z);

        const brightness = 0.4 + Math.random() * 0.6;
        if (Math.random() > 0.7) {
          color.setHSL(0.1, 0.2, brightness);
        } else {
          color.setHSL(0.08, 0.15, brightness * 0.8);
        }
        colors.push(color.r, color.g, color.b);
      }

      const ringGeom = new THREE.BufferGeometry();
      ringGeom.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      ringGeom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const ringMat = new THREE.PointsMaterial({
        size: size,
        vertexColors: true,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      return new THREE.Points(ringGeom, ringMat);
    };

    const rings = [
      // Smaller, tighter rings that fit the screen
      createRingLayer(1.4, 1.8, 0.012, 12000, 0.8),   // Inner
      createRingLayer(1.85, 2.4, 0.018, 18000, 0.65), // Middle  
      createRingLayer(2.45, 2.9, 0.022, 8000, 0.4),   // Outer
      createRingLayer(1.8, 1.85, 0.008, 1500, 0.3),   // Gap 1
      createRingLayer(2.4, 2.45, 0.008, 1000, 0.2)    // Gap 2
    ];

    rings.forEach((ring, i) => {
      ring.rotation.x = Math.PI * 0.08 + i * 0.005;
      ring.rotation.z = Math.PI * 0.03;
      scene.add(ring);
    });

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(5, 3, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const rimLight = new THREE.PointLight(0x44bbff, 1.2, 15);
    rimLight.position.set(-4, -1, -3);
    scene.add(rimLight);

    const ambient = new THREE.AmbientLight(0x202040, 0.4);
    scene.add(ambient);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
      starsVertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, sizeAttenuation: false });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Mouse controls
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.0005;

      planet.rotation.y += 0.008;
      planet.rotation.z += 0.0002;
      planet.position.y = Math.sin(time * 0.3) * 0.02;  // Smaller float

      rings.forEach((ring, i) => {
        ring.rotation.y += 0.001 + i * 0.0001;
      });

      atmosphere1.rotation.y = planet.rotation.y;
      atmosphere2.rotation.y = planet.rotation.y;
      atmosphere1.position.copy(planet.position);
      atmosphere2.position.copy(planet.position);

      camera.position.x = Math.sin(mouseX * 2) * 8;
      camera.position.z = Math.cos(mouseX * 2) * 8;
      camera.position.y = Math.sin(mouseY * 2) * 0.8;
      camera.lookAt(planet.position);

      stars.rotation.y += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    />
  );
};

export default PlanetScene;
