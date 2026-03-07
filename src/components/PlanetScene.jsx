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
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // ---------------- PLANET TEXTURE ----------------

    const createPlanetTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;

      const ctx = canvas.getContext("2d");

      // --- base deep space color ---
      const baseGrad = ctx.createLinearGradient(0,0,canvas.width,canvas.height);

      baseGrad.addColorStop(0,"#0a0f2c");
      baseGrad.addColorStop(0.4,"#141a3f");
      baseGrad.addColorStop(0.7,"#1f2a5a");
      baseGrad.addColorStop(1,"#090d22");

      ctx.fillStyle = baseGrad;
      ctx.fillRect(0,0,canvas.width,canvas.height);

      // --- cloud noise layers ---
      for(let layer=0; layer<6; layer++){

        for(let i=0;i<80;i++){

          const x = Math.random()*canvas.width;
          const y = Math.random()*canvas.height;
          const r = Math.random()*120 + 40;

          const g = ctx.createRadialGradient(x,y,0,x,y,r);

          g.addColorStop(0,`rgba(${80+Math.random()*80},${80+Math.random()*80},${180+Math.random()*70},0.35)`);
          g.addColorStop(0.6,"rgba(80,90,160,0.15)");
          g.addColorStop(1,"transparent");

          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x,y,r,0,Math.PI*2);
          ctx.fill();
        }
      }

      // --- nebula glow patches ---
      for(let i=0;i<30;i++){

        const x = Math.random()*canvas.width;
        const y = Math.random()*canvas.height;
        const r = Math.random()*140 + 60;

        const g = ctx.createRadialGradient(x,y,0,x,y,r);

        if(Math.random()>0.5){

          g.addColorStop(0,"rgba(255,120,200,0.7)");
          g.addColorStop(0.4,"rgba(170,80,255,0.4)");

        } else {

          g.addColorStop(0,"rgba(255,170,90,0.7)");
          g.addColorStop(0.4,"rgba(255,120,180,0.35)");

        }

        g.addColorStop(1,"transparent");

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2);
        ctx.fill();
      }

      // --- gas streaks / swirling atmosphere ---
      ctx.strokeStyle = "rgba(200,220,255,0.05)";
      ctx.lineWidth = 2;

      for(let i=0;i<60;i++){

        const y = Math.random()*canvas.height;

        ctx.beginPath();

        ctx.moveTo(0,y);

        ctx.bezierCurveTo(
          canvas.width*0.3,
          y + Math.random()*60-30,
          canvas.width*0.6,
          y + Math.random()*60-30,
          canvas.width,
          y
        );

        ctx.stroke();
      }

      // --- micro grain for realism ---
      for(let i=0;i<2000;i++){

        ctx.fillStyle="rgba(255,255,255,0.03)";
        ctx.fillRect(
          Math.random()*canvas.width,
          Math.random()*canvas.height,
          1,
          1
        );
      }

      return new THREE.CanvasTexture(canvas);
    };

    // ---------------- PLANET ----------------

    const planetGeometry = new THREE.SphereGeometry(1.5,64,64);

    const planetMaterial = new THREE.MeshStandardMaterial({
      map:createPlanetTexture(),
      metalness:0.25,
      roughness:0.85,
      emissive:new THREE.Color(0x1a2048),
      emissiveIntensity:0.35
    });

    const planet = new THREE.Mesh(planetGeometry,planetMaterial);
    scene.add(planet);

    // ---------------- ATMOSPHERE ----------------

    const atmoGeom = new THREE.SphereGeometry(1.52,64,64);

    const atmoMat = new THREE.MeshBasicMaterial({
      color:0x88aaff,
      transparent:true,
      opacity:0.12,
      side:THREE.BackSide
    });

    const atmosphere = new THREE.Mesh(atmoGeom,atmoMat);
    scene.add(atmosphere);

    // ---------------- RINGS (UNCHANGED) ----------------

    const createRings = () => {

      const points=[];
      const colors=[];
      const color=new THREE.Color();

      const numPoints=12000;

      for(let i=0;i<numPoints;i++){

        const r=2.0 + Math.random()*1.2;
        const theta=Math.random()*Math.PI*2;

        const x=Math.cos(theta)*r;
        const z=Math.sin(theta)*r;
        const y=(Math.random()-0.5)*0.05;

        points.push(x,y,z);

        const mixedColor=Math.random()>0.5 ? 0x22d3ee : 0x818cf8;

        color.setHex(mixedColor);

        colors.push(color.r,color.g,color.b);
      }

      const ringGeom=new THREE.BufferGeometry();

      ringGeom.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(points,3)
      );

      ringGeom.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(colors,3)
      );

      const ringMat=new THREE.PointsMaterial({
        size:0.02,
        vertexColors:true,
        transparent:true,
        opacity:0.6,
        blending:THREE.AdditiveBlending
      });

      return new THREE.Points(ringGeom,ringMat);
    };

    const rings=createRings();

    rings.rotation.x=Math.PI*0.05;
    rings.rotation.z=Math.PI*0.05;

    scene.add(rings);

    // ---------------- LIGHTING ----------------

    const sunLight=new THREE.DirectionalLight(0xffffff,2);
    sunLight.position.set(5,3,5);
    scene.add(sunLight);

    const rimLight=new THREE.PointLight(0x22d3ee,10,10);
    rimLight.position.set(-5,-2,-2);
    scene.add(rimLight);

    const ambient=new THREE.AmbientLight(0x404040,0.5);
    scene.add(ambient);

    // ---------------- ANIMATION ----------------

    const animate=()=>{

      requestAnimationFrame(animate);

      planet.rotation.y+=0.002;
      rings.rotation.y+=0.0005;

      const time=Date.now()*0.001;

      planet.position.y=Math.sin(time)*0.05;
      rings.position.y=Math.sin(time)*0.05;
      atmosphere.position.y=Math.sin(time)*0.05;

      renderer.render(scene,camera);
    };

    animate();

    const handleResize=()=>{

      camera.aspect=
        containerRef.current.clientWidth /
        containerRef.current.clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener("resize",handleResize);

    return () => {
      window.removeEventListener("resize",handleResize);
      renderer.dispose();
    };

  },[]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    />
  );
};

export default PlanetScene;