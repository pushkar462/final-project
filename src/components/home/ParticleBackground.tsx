
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  particleCount?: number;
  particleColor?: string;
  backgroundColor?: string;
  speed?: number;
  particleSize?: number;
  interactive?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 200,
  particleColor = "#ffffff",
  backgroundColor = "transparent",
  speed = 0.1,
  particleSize = 1,
  interactive = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 20;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(backgroundColor, 1);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particles = new THREE.BufferGeometry();
    const particleCount3 = particleCount * 3;
    const positions = new Float32Array(particleCount3);
    const velocities = new Float32Array(particleCount3);
    
    for (let i = 0; i < particleCount3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 20; // x
      positions[i + 1] = (Math.random() - 0.5) * 20; // y
      positions[i + 2] = (Math.random() - 0.5) * 20; // z
      
      // Velocity
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Material with custom shader
    const material = new THREE.PointsMaterial({
      color: particleColor,
      size: particleSize,
      transparent: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    // Create point system
    const pointSystem = new THREE.Points(particles, material);
    scene.add(pointSystem);
    
    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      mousePosition.current = {
        x: ((event.clientX - rect.left) / width) * 2 - 1,
        y: -((event.clientY - rect.top) / height) * 2 + 1
      };
    };
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    // Animation loop
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      
      const positions = particles.attributes.position.array as Float32Array;
      
      // Update particle positions
      for (let i = 0; i < particleCount3; i += 3) {
        // Move particles based on their velocity
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Wrap around edges
        if (positions[i] > 10) positions[i] = -10;
        if (positions[i] < -10) positions[i] = 10;
        if (positions[i + 1] > 10) positions[i + 1] = -10;
        if (positions[i + 1] < -10) positions[i + 1] = 10;
        if (positions[i + 2] > 10) positions[i + 2] = -10;
        if (positions[i + 2] < -10) positions[i + 2] = 10;
      }
      
      particles.attributes.position.needsUpdate = true;
      
      // Interactive rotation based on mouse position
      if (interactive) {
        pointSystem.rotation.x += (mousePosition.current.y * 0.1 - pointSystem.rotation.x) * speed * 0.05;
        pointSystem.rotation.y += (mousePosition.current.x * 0.1 - pointSystem.rotation.y) * speed * 0.05;
      } else {
        pointSystem.rotation.x += 0.001;
        pointSystem.rotation.y += 0.0015;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (container?.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      material.dispose();
      particles.dispose();
      renderer.dispose();
    };
  }, [particleCount, particleColor, backgroundColor, speed, particleSize, interactive]);
  
  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }} 
    />
  );
};

export default ParticleBackground;
