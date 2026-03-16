
import React, { useEffect, useRef } from 'react';

interface Particle {
  ox: number; 
  oy: number;
  oz: number;
  size: number;
  pulse: number;
  pulseSpeed: number;
}

interface ProjectedParticle {
  x: number;
  y: number;
  z: number;
  scale: number;
  pulseVal: number;
}

const InteractiveGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true 
    });
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const isMobile = width < 768;
    const particleCount = isMobile ? 40 : 100; 
    const radius = Math.min(width, height) / (isMobile ? 2.2 : 2.8); 
    const connectionDistance = isMobile ? 80 : 120;
    const connectionDistanceSq = connectionDistance * connectionDistance;
    const mouseInteractionDistance = 140;
    const focalLength = 400;

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      particles.push({ 
        ox: x, oy: y, oz: z, 
        size: Math.random() * 1.2 + 0.4,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.015 + Math.random() * 0.02
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) / (width / 2);
      targetMouseY = (e.clientY - height / 2) / (height / 2);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.0008; 

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      const targetTiltX = mouseY * 0.4;
      const targetTiltY = mouseX * 0.4;
      currentTiltX += (targetTiltX - currentTiltX) * 0.04;
      currentTiltY += (targetTiltY - currentTiltY) * 0.04;

      const rotY = time + currentTiltY;
      const rotX = -currentTiltX;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected: ProjectedParticle[] = particles.map(p => {
        p.pulse += p.pulseSpeed;
        
        let y1 = p.oy * cosX - p.oz * sinX;
        let z1 = p.oy * sinX + p.oz * cosX;
        let x2 = p.ox * cosY + z1 * sinY;
        let z2 = -p.ox * sinY + z1 * cosY;
        
        // Proteção contra divisão por zero e escala excessiva
        const depth = focalLength + z2;
        const scale = focalLength / (depth > 1 ? depth : 1);
        
        return { 
          x: width / 2 + x2 * scale, 
          y: height / 2 + y1 * scale, 
          z: z2, 
          scale,
          pulseVal: (Math.sin(p.pulse) + 1) / 2
        };
      });

      const sMX = (mouseX * width / 2) + width / 2;
      const sMY = (mouseY * height / 2) + height / 2;

      ctx.lineWidth = 0.6;
      const skipStep = isMobile ? 4 : 2; 
      
      for (let i = 0; i < particleCount; i++) {
        const p1 = projected[i];
        if (p1.z > radius * 0.3) continue; 

        const dxM = p1.x - sMX;
        const dyM = p1.y - sMY;
        const d2M = dxM * dxM + dyM * dyM;
        
        if (d2M < mouseInteractionDistance * mouseInteractionDistance) {
          const mAlpha = (1 - Math.sqrt(d2M) / mouseInteractionDistance) * 0.12;
          ctx.strokeStyle = `rgba(168, 85, 247, ${mAlpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(sMX, sMY);
          ctx.stroke();
        }

        for (let j = i + 1; j < particleCount; j += skipStep) {
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < connectionDistanceSq) {
            const dist = Math.sqrt(d2);
            const depthOpacity = Math.max(0, (radius - ((p1.z + p2.z) / 2)) / (radius * 2));
            const alpha = (1 - dist / connectionDistance) * 0.1 * depthOpacity;
            
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particleCount; i++) {
        const p = projected[i];
        const particle = particles[i];
        const depthAlpha = Math.max(0.05, (radius - p.z) / (radius * 1.5));
        const finalSize = particle.size * p.scale * (1 + p.pulseVal * 0.25);
        
        ctx.fillStyle = `rgba(165, 180, 252, ${depthAlpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, finalSize, 0, Math.PI * 2);
        ctx.fill();

        if (p.z < -radius * 0.2 && p.pulseVal > 0.85) {
          ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, finalSize * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default React.memo(InteractiveGlobe);
