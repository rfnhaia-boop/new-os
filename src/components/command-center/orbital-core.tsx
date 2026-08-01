"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface OrbitalCoreProps {
  bootPhase: number;
  cx: number;
  cy: number;
  isSpeaking: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  size: number;
  opacityBase: number;
  // Unique offsets for organic floating animation
  rx: number;
  ry: number;
  rz: number;
}

export function OrbitalCore({ bootPhase, cx, cy, isSpeaking }: OrbitalCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const speedRef = useRef(1);

  // Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;
      // Map to canvas coordinate space (600x600)
      mouseRef.current.x = cx + (e.clientX - windowCenterX);
      mouseRef.current.y = cy + (e.clientY - windowCenterY);
      mouseRef.current.active = true;
    };
    
    const handleMouseLeave = () => { mouseRef.current.active = false; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [cx, cy]);

  // High-Performance Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI displays for crisp particle rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 600 * dpr;
    canvas.height = 600 * dpr;
    ctx.scale(dpr, dpr);

    const numDots = 550; // High density
    const baseRadius = 140;
    const points: Point3D[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    // Generate Points using Fibonacci lattice with organic displacement
    for (let i = 0; i < numDots; i++) {
      const y = 1 - (i / (numDots - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const randomOffset = 1 + (Math.random() - 0.5) * 0.15;
      
      points.push({
        x: Math.cos(theta) * radiusAtY * randomOffset,
        y: y * randomOffset,
        z: Math.sin(theta) * radiusAtY * randomOffset,
        size: 1 + Math.random() * 2.5,
        opacityBase: 0.3 + Math.random() * 0.7,
        // Individual life parameters
        rx: Math.random() * Math.PI * 2,
        ry: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI * 2,
      });
    }

    let animationFrameId: number;
    let time = 0;
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 16.66;
      lastTime = currentTime;

      // Smooth Speed interpolation (Very alive, not static)
      const targetSpeed = isSpeaking ? 16 : 2.0;
      speedRef.current += (targetSpeed - speedRef.current) * 0.05 * dt;
      time += 0.003 * speedRef.current * dt;

      // Clear Canvas
      ctx.clearRect(0, 0, 600, 600);
      
      const activeRadius = isSpeaking ? baseRadius * 1.1 : baseRadius;
      
      // Draw Ambient Glow if Speaking
      if (isSpeaking) {
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, activeRadius * 1.4);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.08)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, activeRadius * 1.4, 0, Math.PI * 2);
        ctx.fill();
        
        // Dynamic expanding inner ring
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 10 + (Math.sin(time * 8) * 3), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Core Rotation Angles
      const angleY = time * 0.8;
      const angleX = time * 0.4;
      const angleZ = time * 0.2;

      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      const cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);

      // Project Points to 3D Space
      const projected = points.map((p, i) => {
        // Organic life: Every point floats individually
        const floatX = Math.cos(time * 3 + p.rx) * 3;
        const floatY = Math.sin(time * 3 + p.ry) * 3;
        const floatZ = Math.sin(time * 4 + p.rz) * 3;

        const px = (p.x * activeRadius) + floatX;
        const py = (p.y * activeRadius) + floatY;
        const pz = (p.z * activeRadius) + floatZ;

        // Apply Rotations
        let x1 = px * cosY - pz * sinY;
        let z1 = px * sinY + pz * cosY;

        let y1 = py * cosX - z1 * sinX;
        let z2 = py * sinX + z1 * cosX;

        let x2 = x1 * cosZ - y1 * sinZ;
        let y2 = x1 * sinZ + y1 * cosZ;

        let finalX = cx + x2;
        let finalY = cy + y2;
        let sizeMultiplier = 1;

        // Mouse Hover Physics (Repel & Bulge)
        if (mouseRef.current.active) {
          const dx = finalX - mouseRef.current.x;
          const dy = finalY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const hoverRadius = 85;
          
          if (dist < hoverRadius) {
            const t = Math.max(0, Math.min(1, (hoverRadius - dist) / hoverRadius));
            // Smoothstep curve
            const intensity = t * t * (3 - 2 * t);
            
            sizeMultiplier = 1 + intensity * 2.5;
            const pushForce = intensity * 20;
            
            if (dist > 0.1) {
              x2 += (dx / dist) * pushForce;
              y2 += (dy / dist) * pushForce;
              finalX = cx + x2;
              finalY = cy + y2;
            }
          }
        }

        const depth = (z2 + activeRadius) / (2 * activeRadius);
        
        return {
          i,
          x: finalX,
          y: finalY,
          z: z2,
          s: p.size * (0.3 + depth * 0.8) * sizeMultiplier,
          opacity: p.opacityBase * (0.1 + depth * 0.9),
        };
      });

      // Sort by Z to ensure proper 3D rendering (back points rendered first)
      projected.sort((a, b) => a.z - b.z);

      // Draw all projected points to Canvas
      for (const p of projected) {
        // Some points are subtle grey, others pure white
        ctx.fillStyle = p.i % 5 === 0 ? `rgba(161, 161, 170, ${p.opacity})` : `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        // Draw perfect circles instead of squares
        ctx.arc(p.x, p.y, p.s / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [cx, cy, isSpeaking]);

  const containerVariants = {
    hidden: { scale: 0.2, opacity: 0, rotateZ: -60 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      rotateZ: 0,
      transition: { type: "spring", damping: 15, stiffness: 60, mass: 1.5, duration: 1.5 }
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-[600px] h-[600px] flex items-center justify-center pointer-events-auto"
      >
        <canvas
          ref={canvasRef}
          style={{ width: "600px", height: "600px" }}
          className="max-w-full max-h-full" // Removed cursor-crosshair
        />
      </motion.div>
    </div>
  );
}
