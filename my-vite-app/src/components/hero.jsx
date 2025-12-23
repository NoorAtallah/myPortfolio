'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ExternalLink, Mail, Phone, MapPin, Github } from 'lucide-react';

const BlackHolePortfolio = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [journeyPhase, setJourneyPhase] = useState('approach');
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Use refs to avoid transition flashing
  const transitionTimeoutRef = useRef(null);
  const phaseUpdateTimeoutRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring animations for scroll-based values
  const cameraDistance = useSpring(
    useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [80, 40, 15, 8, 3]),
    { stiffness: 100, damping: 30, mass: 0.5 }
  );
  
  const redshift = useSpring(
    useTransform(scrollYProgress, [0, 0.4, 0.6, 0.8, 1], [0, 0.2, 0.5, 0.8, 1]),
    { stiffness: 80, damping: 25, mass: 0.3 }
  );

  // Memoized phase calculation to prevent unnecessary re-renders
  const calculatePhase = useCallback((value) => {
    if (value < 0.25) return { phase: 'approach', speed: 1 };
    if (value < 0.5) return { phase: 'skills', speed: 0.7 };
    if (value < 0.75) return { phase: 'horizon', speed: 0.3 };
    if (value < 0.95) return { phase: 'inside', speed: 0.1 };
    return { phase: 'singularity', speed: 0.05 };
  }, []);

  // Separate effect for scroll tracking - removed journeyPhase dependency
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const { phase: newPhase, speed: newTimeSpeed } = calculatePhase(value);
      
      // Update time speed immediately (no transition needed)
      setTimeSpeed(newTimeSpeed);
      
      // Only update phase if it actually changed
      if (newPhase !== journeyPhase) {
        // Clear any pending timeouts
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
        if (phaseUpdateTimeoutRef.current) {
          clearTimeout(phaseUpdateTimeoutRef.current);
        }
        
        // Direct phase update without transition state
        setJourneyPhase(newPhase);
      }
    });

    return () => {
      unsubscribe();
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      if (phaseUpdateTimeoutRef.current) {
        clearTimeout(phaseUpdateTimeoutRef.current);
      }
    };
  }, [scrollYProgress, calculatePhase, journeyPhase]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 20, 80);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear any existing canvas
    while (canvasRef.current.firstChild) {
      canvasRef.current.removeChild(canvasRef.current.firstChild);
    }
    canvasRef.current.appendChild(renderer.domElement);

    // Black hole singularity
    const singularityGeometry = new THREE.SphereGeometry(2, 32, 32);
    const singularityMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const singularity = new THREE.Mesh(singularityGeometry, singularityMaterial);
    scene.add(singularity);

    // Event horizon layers with pink/violet
    const horizonLayers = [];
    for (let i = 0; i < 3; i++) {
      const horizonGeometry = new THREE.SphereGeometry(2.5 + i * 0.5, 32, 32);
      const horizonMaterial = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xFF2182 : 0x8b5cf6,
        transparent: true,
        opacity: 0.3 - i * 0.1,
        side: THREE.BackSide,
      });
      const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
      horizonLayers.push(horizon);
      scene.add(horizon);
    }

    // Accretion disk with pink/violet shader
    const accretionDiskGeometry = new THREE.RingGeometry(5, 35, 128);
    const accretionDiskMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        intensity: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float intensity;
        varying vec2 vUv;
        
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          
          // Multiple spiral layers
          float spiral1 = sin(angle * 8.0 + time * 3.0 - dist * 12.0) * 0.5 + 0.5;
          float spiral2 = sin(angle * 5.0 - time * 2.0 - dist * 8.0) * 0.5 + 0.5;
          float spiral = mix(spiral1, spiral2, 0.5);
          
          // Pink to violet gradient
          vec3 innerColor = vec3(1.0, 0.95, 0.98);
          vec3 midColor = vec3(1.0, 0.13, 0.51); // #FF2182
          vec3 outerColor = vec3(0.55, 0.36, 0.97); // #8b5cf6
          
          vec3 color;
          if (dist < 0.5) {
            color = mix(innerColor, midColor, dist * 2.0);
          } else {
            color = mix(midColor, outerColor, (dist - 0.5) * 2.0);
          }
          
          float brightness = spiral * (1.0 - dist * 0.4) * intensity;
          gl_FragColor = vec4(color * brightness, brightness * 0.9);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const accretionDisk = new THREE.Mesh(accretionDiskGeometry, accretionDiskMaterial);
    accretionDisk.rotation.x = Math.PI / 2;
    scene.add(accretionDisk);

    // Optimized particles spiraling into black hole
    const particleCount = 2000;
    const particlesGeometry = new THREE.InstancedBufferGeometry();
    const baseSphereGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    particlesGeometry.index = baseSphereGeometry.index;
    particlesGeometry.attributes.position = baseSphereGeometry.attributes.position;
    particlesGeometry.attributes.normal = baseSphereGeometry.attributes.normal;

    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleData = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 40;
      const height = (Math.random() - 0.5) * 12;
      const originalColor = Math.random() > 0.5 
        ? new THREE.Color(0xFF2182)
        : new THREE.Color(0x8b5cf6);

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = height;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      particleColors[i * 3] = originalColor.r;
      particleColors[i * 3 + 1] = originalColor.g;
      particleColors[i * 3 + 2] = originalColor.b;

      particleData.push({
        angle,
        radius,
        height,
        speed: 0.008 + Math.random() * 0.015,
        originalColor,
      });
    }

    particlesGeometry.setAttribute('instancePosition', new THREE.InstancedBufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('instanceColor', new THREE.InstancedBufferAttribute(particleColors, 3));

    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute vec3 instancePosition;
        attribute vec3 instanceColor;
        varying vec3 vColor;
        
        void main() {
          vColor = instanceColor;
          vec3 transformed = position + instancePosition;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          gl_FragColor = vec4(vColor, 0.8);
        }
      `,
      transparent: true,
    });

    const particlesMesh = new THREE.Mesh(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Gravitational lensing rings
    const lensingRings = [];
    for (let i = 0; i < 5; i++) {
      const points = [];
      const segments = 100;
      const radius = 10 + i * 4;
      
      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        ));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15 - i * 0.02,
      });
      const ring = new THREE.Line(geometry, material);
      ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      lensingRings.push(ring);
      scene.add(ring);
    }

    // Tunnel effect (for inside black hole)
    const tunnelSegments = [];
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.TorusGeometry(5 - i * 0.15, 0.5, 16, 100);
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xFF2182 : 0x8b5cf6,
        transparent: true,
        opacity: 0,
        wireframe: true,
      });
      const segment = new THREE.Mesh(geometry, material);
      segment.position.z = i * 2;
      tunnelSegments.push(segment);
      scene.add(segment);
    }

    // Stars with instancing
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const starsPositions = new Float32Array(starCount * 3);
    const starsColors = new Float32Array(starCount * 3);
    const originalStarsColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 100 + Math.random() * 100;

      starsPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starsPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starsPositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color().setHSL(0.6, 0.2, 0.8 + Math.random() * 0.2);
      starsColors[i * 3] = color.r;
      starsColors[i * 3 + 1] = color.g;
      starsColors[i * 3 + 2] = color.b;
      
      originalStarsColors[i * 3] = color.r;
      originalStarsColors[i * 3 + 1] = color.g;
      originalStarsColors[i * 3 + 2] = color.b;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starsColors, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x222222, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xFF2182, 6, 100);
    pointLight1.position.set(0, 0, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 4, 80);
    pointLight2.position.set(0, 15, 0);
    scene.add(pointLight2);

    // Animation with optimizations
    let time = 0;
    let animationId;
    let currentDistance = 80;
    let currentRedshift = 0;
    let currentTimeSpeed = 1;
    
    // Smooth lerp function
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    // Subscribe to spring values with proper cleanup
    const unsubDistance = cameraDistance.on('change', (value) => {
      currentDistance = value;
    });

    const unsubRedshift = redshift.on('change', (value) => {
      currentRedshift = value;
    });

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Ultra-smooth time speed transition
      currentTimeSpeed = lerp(currentTimeSpeed, timeSpeed, 0.08);
      time += 0.01 * currentTimeSpeed;

      // Smooth camera movement
      camera.position.z = lerp(camera.position.z, currentDistance, 0.1);
      camera.position.y = lerp(camera.position.y, 20 - (80 - currentDistance) * 0.3, 0.1);
      camera.lookAt(0, 0, 0);

      // Smooth FOV transitions
      const targetFov = 75 + Math.max(0, (80 - currentDistance) / 80) * 30;
      camera.fov = lerp(camera.fov, targetFov, 0.05);
      camera.updateProjectionMatrix();

      // Accretion disk
      accretionDiskMaterial.uniforms.time.value = time;
      accretionDisk.rotation.z += 0.003 * currentTimeSpeed;

      const targetDiskScale = 1 + (80 - currentDistance) / 80;
      const currentScale = accretionDisk.scale.x;
      const newScale = lerp(currentScale, targetDiskScale, 0.05);
      accretionDisk.scale.set(newScale, newScale, 1);

      // Event horizon pulse
      horizonLayers.forEach((layer, i) => {
        const scale = 1 + Math.sin(time * 2 + i * 0.5) * 0.05;
        layer.scale.set(scale, scale, scale);
        layer.rotation.y += 0.001 * (i + 1) * currentTimeSpeed;
      });

      // Optimized particles spiral
      const positions = particlesGeometry.attributes.instancePosition.array;
      const colors = particlesGeometry.attributes.instanceColor.array;

      for (let i = 0; i < particleCount; i++) {
        const particle = particleData[i];
        particle.angle += particle.speed * currentTimeSpeed;
        particle.radius -= particle.speed * 1.5 * currentTimeSpeed;
        particle.height *= 0.998;

        if (particle.radius < 2) {
          particle.radius = 55;
          particle.height = (Math.random() - 0.5) * 12;
          particle.angle = Math.random() * Math.PI * 2;
        }

        positions[i * 3] = Math.cos(particle.angle) * particle.radius;
        positions[i * 3 + 1] = particle.height;
        positions[i * 3 + 2] = Math.sin(particle.angle) * particle.radius;

        colors[i * 3] = particle.originalColor.r * (1 - currentRedshift * 0.3);
        colors[i * 3 + 1] = particle.originalColor.g * (1 - currentRedshift * 0.5);
        colors[i * 3 + 2] = particle.originalColor.b * (1 - currentRedshift * 0.7);
      }

      particlesGeometry.attributes.instancePosition.needsUpdate = true;
      particlesGeometry.attributes.instanceColor.needsUpdate = true;

      // Gravitational lensing
      lensingRings.forEach((ring, i) => {
        ring.rotation.z += 0.0005 * (i + 1) * currentTimeSpeed;
        const distortionAmount = Math.max(0, (80 - currentDistance) / 80);
        const targetScale = 1 + distortionAmount * 0.3;
        const currentRingScale = ring.scale.x;
        const newRingScale = lerp(currentRingScale, targetScale, 0.05);
        ring.scale.set(newRingScale, newRingScale, 1);
        
        const material = ring.material;
        const targetOpacity = (0.15 - i * 0.02) * (1 + distortionAmount);
        material.opacity = lerp(material.opacity, targetOpacity, 0.05);
      });

      // Tunnel effect
      const insideAmount = Math.max(0, (currentDistance - 15) / -15);
      tunnelSegments.forEach((segment, i) => {
        segment.position.z = -currentDistance + i * 2;
        const material = segment.material;
        const targetOpacity = insideAmount * 0.4;
        material.opacity = lerp(material.opacity, targetOpacity, 0.05);
        segment.rotation.z += 0.01 * currentTimeSpeed * (i + 1);
      });

      // Smooth stars redshift
      const starsCol = stars.geometry.attributes.color.array;
      
      for (let i = 0; i < starCount; i++) {
        starsCol[i * 3] = lerp(starsCol[i * 3], originalStarsColors[i * 3] * (1 - currentRedshift * 0.4), 0.05);
        starsCol[i * 3 + 1] = lerp(starsCol[i * 3 + 1], originalStarsColors[i * 3 + 1] * (1 - currentRedshift * 0.6), 0.05);
        starsCol[i * 3 + 2] = lerp(starsCol[i * 3 + 2], originalStarsColors[i * 3 + 2] * (1 - currentRedshift * 0.3), 0.05);
      }
      stars.geometry.attributes.color.needsUpdate = true;
      stars.rotation.y += 0.0001 * currentTimeSpeed;

      // Smooth lighting intensity
      const targetLight1 = 6 + Math.sin(time * 2) * 2;
      const targetLight2 = 4 + Math.cos(time * 1.5) * 1;
      pointLight1.intensity = lerp(pointLight1.intensity, targetLight1, 0.1);
      pointLight2.intensity = lerp(pointLight2.intensity, targetLight2, 0.1);

      // Scene fog with smooth transitions
      const darknessAmount = Math.max(0, (80 - currentDistance) / 80);
      if (!scene.fog) {
        const fogColor = new THREE.Color(0x000000);
        fogColor.r = currentRedshift * 0.2;
        scene.fog = new THREE.Fog(fogColor, 20 * (1 - darknessAmount), 150 * (1 - darknessAmount * 0.5));
      } else {
        const fog = scene.fog;
        const fogColor = new THREE.Color(0x000000);
        fogColor.r = currentRedshift * 0.2;
        fog.color.lerp(fogColor, 0.05);
        fog.near = lerp(fog.near, 20 * (1 - darknessAmount), 0.05);
        fog.far = lerp(fog.far, 150 * (1 - darknessAmount * 0.5), 0.05);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      unsubDistance();
      unsubRedshift();
      window.removeEventListener('resize', handleResize);
      
      if (canvasRef.current && renderer.domElement.parentNode === canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      
      // Proper cleanup
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      accretionDiskGeometry.dispose();
      accretionDiskMaterial.dispose();
      singularityGeometry.dispose();
      singularityMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      baseSphereGeometry.dispose();
      
      horizonLayers.forEach(layer => {
        layer.geometry.dispose();
        layer.material.dispose();
      });
      
      lensingRings.forEach(ring => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      
      tunnelSegments.forEach(segment => {
        segment.geometry.dispose();
        segment.material.dispose();
      });
      
      renderer.dispose();
    };
  }, [cameraDistance, redshift, timeSpeed]);

  const projects = [
    { 
      id: 1, 
      title: 'CalculateYourRefund', 
      type: 'Tax Platform', 
      location: 'Canada', 
      link: 'https://calculateyourrefund.com/',
      description: 'Streamlined web app for quick and easy tax refund calculations',
      status: 'Live'
    },
    { 
      id: 2, 
      title: 'CodeLake', 
      type: 'Web Dev Services', 
      location: 'Canada', 
      link: 'https://code-five-eta.vercel.app/',
      description: 'Web development services website',
      status: 'Live'
    },
    { 
      id: 3, 
      title: 'RoyalDelta', 
      type: 'Trading & Investment', 
      location: 'Canada', 
      link: 'https://royald.vercel.app/',
      description: 'Corporate website for a global trading and investment company',
      status: 'Live'
    },
    { 
      id: 4, 
      title: 'Riverside Journeys', 
      type: 'Travel Agency', 
      location: 'Canada', 
      link: 'https://www.riversidejourneys.com/',
      description: 'Travel agency focused on immersive global experiences',
      status: 'Live'
    },
    { 
      id: 5, 
      title: 'AccountLink CPA', 
      type: 'Accounting & Tax', 
      location: 'Canada', 
      link: 'https://www.accountlinkcpa.com/',
      description: 'Professional platform for accounting and tax services',
      status: 'Live'
    },
    { 
      id: 6, 
      title: 'CoreDigital360', 
      type: 'Marketing & Software', 
      location: 'Jordan', 
      link: 'https://www.coredigital360.com/',
      description: 'Marketing and software services company',
      status: 'Live'
    },
    { 
      id: 7, 
      title: 'Keifna', 
      type: 'Food Manufacturing', 
      location: 'Jordan', 
      link: 'https://www.keifna.com/',
      description: 'Instant coffee & dough factory website',
      status: 'Live'
    },
    { 
      id: 8, 
      title: 'Gamma Drones', 
      type: 'E-Commerce', 
      location: 'Canada', 
      link: 'https://gamma-woad.vercel.app/',
      description: 'Drone products e-commerce platform',
      status: 'Live'
    },
    { 
      id: 9, 
      title: 'Casa Di Consiglio', 
      type: 'Law Firm', 
      location: 'UAE', 
      link: 'https://casadiconsiglio.com/',
      description: 'Professional law firm website',
      status: 'Live'
    },
    { 
      id: 10, 
      title: 'Topaz Technology', 
      type: 'VPS Hosting', 
      location: 'Jordan', 
      link: 'https://www.topaz-technology.com/',
      description: 'VPS hosting company',
      status: 'Development'
    },
    { 
      id: 11, 
      title: 'MAR United', 
      type: 'E-Commerce', 
      location: 'UAE', 
      link: 'https://www.mar-united.ae/',
      description: 'E-commerce for Dead Sea products',
      status: 'Development'
    },
    { 
      id: 12, 
      title: 'Dolce e Luce', 
      type: 'Beauty Salon', 
      location: 'USA', 
      link: 'https://www.dolceelucesalon.com/',
      description: 'Professional salon website',
      status: 'Development'
    },
    { 
      id: 13, 
      title: 'SHAAS', 
      type: 'AI Solutions', 
      location: 'UAE', 
      link: 'https://shaas-e17x.vercel.app/',
      description: 'AI-powered website solutions',
      status: 'Development'
    },
    { 
      id: 14, 
      title: 'Task2 Demo', 
      type: 'Portfolio Demo', 
      location: 'Demo', 
      link: 'https://task2-azure-zeta.vercel.app/',
      description: 'Demo website showcase',
      status: 'Demo'
    },
    { 
      id: 15, 
      title: 'Law Firm Demo', 
      type: 'Portfolio Demo', 
      location: 'Demo', 
      link: 'https://law-firm-mu-liart.vercel.app/',
      description: 'Law firm template demo',
      status: 'Demo'
    },
  ];

  const getPhaseInfo = () => {
    switch (journeyPhase) {
      case 'approach':
        return {
          title: 'NOOR ATALLAH',
          subtitle: 'Full Stack Developer',
          color: 'text-[#FF2182]',
        };
      case 'skills':
        return {
          title: 'EXPERTISE',
          subtitle: 'Technical Capabilities',
          color: 'text-violet-400',
        };
      case 'horizon':
        return {
          title: 'PORTFOLIO',
          subtitle: 'Spiraling into view',
          color: 'text-[#FF2182]',
        };
      case 'inside':
        return {
          title: 'DEEP DIVE',
          subtitle: 'Beyond the horizon',
          color: 'text-purple-400',
        };
      case 'singularity':
        return {
          title: 'CONTACT',
          subtitle: 'At the core',
          color: 'text-white',
        };
      default:
        return {
          title: 'NOOR ATALLAH',
          subtitle: 'Full Stack Developer',
          color: 'text-[#FF2182]',
        };
    }
  };

  const phaseInfo = getPhaseInfo();
  const scrollProgress = scrollYProgress.get() * 100;

  // Spring configuration for UI elements
  const springConfig = { stiffness: 100, damping: 30, mass: 0.8 };

  return (
    <div ref={containerRef} className="relative w-full bg-black" style={{ height: '500vh' }}>
      {/* 3D Scene */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <div ref={canvasRef} className="w-full h-full" />
        
        {/* Vignette overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 1],
              [
                'radial-gradient(circle at center, transparent 100%, rgba(0,0,0,0.9) 100%)',
                'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.9) 100%)'
              ]
            ),
          }}
        />
      </div>

      {/* UI Overlay */}
      <div className="fixed top-0 left-0 w-full h-screen z-10 pointer-events-none">
        
        {/* Phase Title */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
          <motion.div
            key={journeyPhase}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              animate={{ 
                textShadow: [
                  '0 0 20px currentColor',
                  '0 0 40px currentColor',
                  '0 0 20px currentColor',
                ],
              }}
              transition={{ 
                textShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
              className={`text-7xl md:text-9xl font-black transition-colors duration-700 ${phaseInfo.color}`}
            >
              {phaseInfo.title}
            </motion.h1>
            <p className="text-white/60 text-xl mt-4 transition-opacity duration-700">
              {phaseInfo.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Journey Progress Bar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-8 top-1/2 -translate-y-1/2"
        >
          <div className="relative w-2 h-[70vh] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ 
                height: useSpring(
                  useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                  springConfig
                )
              }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#FF2182] via-violet-500 to-[#FF2182]"
            />
            
            {/* Phase markers */}
            <div className="absolute top-[25%] left-0 right-0 h-[2px] bg-white/50" />
            <div className="absolute top-[50%] left-0 right-0 h-[2px] bg-white/50" />
            <div className="absolute top-[75%] left-0 right-0 h-[2px] bg-white/50" />
          </div>

          <div className="mt-4 text-white/50 text-xs uppercase tracking-wider">
            Journey
          </div>
        </motion.div>

        {/* Time Dilation Indicator */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-8 top-12"
        >
          <motion.div 
            className="bg-black/70 backdrop-blur-xl border border-[#FF2182]/30 rounded-lg p-6 min-w-[200px]"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255, 33, 130, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-[#FF2182]/60 text-xs uppercase tracking-wider mb-2">
              Time Dilation
            </div>
            <motion.div 
              className="text-[#FF2182] text-4xl font-black font-mono mb-1"
            >
              {(timeSpeed * 100).toFixed(0)}%
            </motion.div>
            <motion.div 
              className="text-white/40 text-xs"
            >
              {timeSpeed < 0.3 ? 'Time nearly frozen' : timeSpeed < 0.7 ? 'Time slowing' : 'Normal flow'}
            </motion.div>
          </motion.div>

          {/* Distance */}
          <motion.div 
            className="bg-black/70 backdrop-blur-xl border border-[#FF2182]/30 rounded-lg p-6 mt-4"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255, 33, 130, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-[#FF2182]/60 text-xs uppercase tracking-wider mb-2">
              Distance
            </div>
            <motion.div className="text-[#FF2182] text-4xl font-black font-mono">
              {cameraDistance.get().toFixed(1)}km
            </motion.div>
          </motion.div>

          {/* Redshift */}
          <motion.div 
            className="bg-black/70 backdrop-blur-xl border border-violet-500/30 rounded-lg p-6 mt-4"
            whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-violet-400/60 text-xs uppercase tracking-wider mb-2">
              Redshift
            </div>
            <motion.div className="text-violet-400 text-4xl font-black font-mono">
              {(redshift.get() * 100).toFixed(0)}%
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator (only at start) */}
        {scrollProgress < 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-center"
            >
              <div className="text-[#FF2182] text-sm uppercase tracking-wider mb-2">
                Scroll to descend
              </div>
              <div className="text-6xl">↓</div>
            </motion.div>
          </motion.div>
        )}

        {/* Skills Section */}
        <AnimatePresence mode="wait">
          {journeyPhase === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-6xl px-8 pointer-events-auto"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Frontend', skills: ['React.js', 'Next.js', 'Three.js', 'Tailwind CSS', 'Framer Motion'] },
                  { title: 'Backend', skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'] },
                  { title: 'Tools & DevOps', skills: ['Git', 'AWS', 'Vercel', 'Docker', 'VPS Management'] },
                ].map((category, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="bg-black/70 backdrop-blur-xl border border-[#FF2182]/30 rounded-lg p-6"
                  >
                    <h3 className="text-2xl font-black text-[#FF2182] mb-4">{category.title}</h3>
                    <div className="space-y-2">
                      {category.skills.map((skill, i) => (
                        <div key={i} className="text-white/70 text-sm">{skill}</div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Portfolio Section */}
          {journeyPhase === 'horizon' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-6xl px-8 pointer-events-auto"
            >
              <div className="grid md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02, borderColor: '#FF2182' }}
                    className="bg-black/70 backdrop-blur-xl border border-[#FF2182]/30 rounded-lg p-6 cursor-pointer transition-all"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      {project.status && (
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                          project.status === 'Live' 
                            ? 'bg-green-500/20 text-green-400' 
                            : project.status === 'Development'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {project.status}
                        </span>
                      )}
                    </div>
                    <p className="text-violet-400 text-sm">{project.type} • {project.location}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Inside Messages */}
          {journeyPhase === 'inside' && (
            <motion.div
              key="inside"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <div className="text-purple-400 text-2xl font-light mb-4">
                Spacetime has inverted
              </div>
              <div className="text-white/40 text-lg">
                All paths lead to the singularity
              </div>
            </motion.div>
          )}

          {/* Singularity Contact */}
          {journeyPhase === 'singularity' && (
            <motion.div
              key="singularity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xl pointer-events-auto px-8"
            >
              <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      textShadow: [
                        '0 0 40px #ffffff',
                        '0 0 80px #ffffff',
                        '0 0 40px #ffffff',
                      ],
                    }}
                    transition={{ 
                      scale: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                      textShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
                    }}
                    className="text-white text-9xl font-black mb-8"
                  >
                    ∞
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white text-4xl font-light mb-4"
                  >
                    SINGULARITY REACHED
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white/60 text-xl mb-12"
                  >
                    Let's connect at the core
                  </motion.div>
                </div>

                <div className="bg-black/90 border-4 border-[#FF2182] rounded-lg p-12">
                  <div className="grid md:grid-cols-2 gap-4 mb-10">
                    {[
                      { icon: Mail, label: 'Email', value: 'nooratallah1999@gmail.com', link: 'mailto:nooratallah1999@gmail.com' },
                      { icon: Phone, label: 'Phone', value: '+962 786 075 693', link: 'tel:+962786075693' },
                      { icon: MapPin, label: 'Location', value: 'Zarqa, Jordan', link: null },
                      { icon: Github, label: 'GitHub', value: '@nooratallah', link: 'https://github.com/nooratallah' },
                    ].map((item, idx) => (
                      <motion.a
                        key={idx}
                        href={item.link || '#'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, borderColor: '#FF2182' }}
                        className="flex items-center gap-4 p-5 border-2 border-violet-500/50 hover:border-violet-500 bg-black/50 rounded-lg transition-all"
                      >
                        <item.icon className="w-6 h-6 text-[#FF2182]" />
                        <div>
                          <div className="text-xs text-[#FF2182] uppercase tracking-wider">{item.label}</div>
                          <div className="text-white/90 text-sm">{item.value}</div>
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    onClick={() => window.location.href = 'mailto:nooratallah1999@gmail.com'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-5 bg-gradient-to-r from-[#FF2182] to-violet-500 text-black font-black text-2xl uppercase rounded-lg"
                  >
                    START PROJECT
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl pointer-events-auto"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full mx-8 bg-black/90 border-4 border-[#FF2182] rounded-lg p-12 relative"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl"
                >
                  ✕
                </button>

                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-4xl font-black text-[#FF2182]">{selectedProject.title}</h3>
                  {selectedProject.status && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      selectedProject.status === 'Live' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                        : selectedProject.status === 'Development'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    }`}>
                      {selectedProject.status}
                    </span>
                  )}
                </div>
                
                <p className="text-violet-400 text-lg mb-4">{selectedProject.type} • {selectedProject.location}</p>
                
                {selectedProject.description && (
                  <p className="text-white/60 text-base mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>
                )}

                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-gradient-to-r from-[#FF2182] to-violet-500 text-black text-center font-black text-xl uppercase rounded-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-[#FF2182]/50 transition-all"
                >
                  Visit Site
                  <ExternalLink className="w-6 h-6" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Physics Info (bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <motion.p 
            key={journeyPhase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#FF2182]/50 text-sm font-mono"
          >
            {journeyPhase === 'approach' && 'Gravitational pull increasing'}
            {journeyPhase === 'skills' && 'Approaching event horizon'}
            {journeyPhase === 'horizon' && 'Time dilation in effect'}
            {journeyPhase === 'inside' && 'Spaghettification in progress'}
            {journeyPhase === 'singularity' && 'Infinite curvature achieved'}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default BlackHolePortfolio;