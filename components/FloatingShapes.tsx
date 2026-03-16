
import React, { useEffect, useRef } from 'react';

const FloatingShapes: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    class Shape {
        x: number;
        y: number;
        size: number;
        rotationX: number;
        rotationY: number;
        speedX: number;
        speedY: number;
        speedRotX: number;
        speedRotY: number;
        type: 'cube' | 'pyramid';
        color: string;

        constructor(w: number, h: number) {
            this.x = Math.random() * w;
            this.y = Math.random() * h + h; 
            this.size = Math.random() * 40 + 20;
            this.rotationX = Math.random() * Math.PI;
            this.rotationY = Math.random() * Math.PI;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = -(Math.random() * 0.5 + 0.2); 
            this.speedRotX = (Math.random() - 0.5) * 0.02;
            this.speedRotY = (Math.random() - 0.5) * 0.02;
            this.type = Math.random() > 0.5 ? 'cube' : 'pyramid';
            // Atualizado para tons de Roxo e Fúcsia
            this.color = Math.random() > 0.5 ? 'rgba(168, 85, 247,' : 'rgba(216, 180, 254,';
        }

        update(w: number, h: number) {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotationX += this.speedRotX;
            this.rotationY += this.speedRotY;

            if (this.y < -100) {
                this.y = h + 100;
                this.x = Math.random() * w;
            }
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.strokeStyle = this.color + '0.25)'; // Aumentei a opacidade levemente
            ctx.lineWidth = 1.5;
            ctx.beginPath();

            const project = (x: number, y: number, z: number) => {
                const scale = 1;
                let x1 = x * Math.cos(this.rotationY) - z * Math.sin(this.rotationY);
                let z1 = x * Math.sin(this.rotationY) + z * Math.cos(this.rotationY);
                let y1 = y * Math.cos(this.rotationX) - z1 * Math.sin(this.rotationX);
                return { x: this.x + x1 * scale, y: this.y + y1 * scale };
            };

            const s = this.size;
            
            if (this.type === 'cube') {
                const nodes = [
                    [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
                    [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s]
                ];
                const p = nodes.map(n => project(n[0], n[1], n[2]));
                
                const edges = [
                    [0,1], [1,2], [2,3], [3,0],
                    [4,5], [5,6], [6,7], [7,4],
                    [0,4], [1,5], [2,6], [3,7]
                ];

                edges.forEach(e => {
                    ctx.moveTo(p[e[0]].x, p[e[0]].y);
                    ctx.lineTo(p[e[1]].x, p[e[1]].y);
                });

            } else {
                const nodes = [
                    [-s, s, -s], [s, s, -s], [s, s, s], [-s, s, s],
                    [0, -s, 0]
                ];
                const p = nodes.map(n => project(n[0], n[1], n[2]));

                const edges = [
                    [0,1], [1,2], [2,3], [3,0],
                    [0,4], [1,4], [2,4], [3,4]
                ];
                
                edges.forEach(e => {
                    ctx.moveTo(p[e[0]].x, p[e[0]].y);
                    ctx.lineTo(p[e[1]].x, p[e[1]].y);
                });
            }

            ctx.stroke();
        }
    }

    const shapes: Shape[] = [];
    const numShapes = 8; // Reduzido para melhor performance

    for(let i=0; i<numShapes; i++) shapes.push(new Shape(width, height));

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        shapes.forEach(shape => {
            shape.update(width, height);
            shape.draw(ctx);
        });
        animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen" />;
};

export default FloatingShapes;
