// src/components/Hero.js
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Hero = () => {
  const backgroundRef = useRef(null);
  
  // Create animated background effect with CSS - darker gradient for better contrast
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      
      // Darker gradient colors for better contrast with text
      backgroundRef.current.style.background = `
        radial-gradient(
          circle at ${x * 100}% ${y * 100}%,
          #D87EE8 0%,
          #7A93D8 45%,
          #0A1235 100%
        )
      `;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const glassCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    }
  };
  
  // Tech stack items with icons
  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Express", icon: "🚂" },
    { name: "Next.js", icon: "▲" },
    { name: "Three.js", icon: "🎮" }
  ];

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Animated background - darker base gradient */}
      <div 
        ref={backgroundRef} 
        className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-[#D87EE8] via-[#7A93D8] to-[#0A1235]"
      />
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 z-1 bg-black/30"></div>
      
      {/* Decorative elements - floating bubbles with better contrast */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/15 backdrop-blur-sm"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`
            }}
          />
        ))}
      </div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      
      {/* Main content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-4">
        <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Text content - improved contrast */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center space-x-2 px-4 py-1.5 mb-6 rounded-full backdrop-blur-md bg-black/40 border border-white/20 text-white"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF9EFF] animate-pulse"></span>
              <span className="text-sm font-medium">Full Stack Developer</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-md"
            >
              Hi, I'm <span className="text-[#FF9EFF]">Noor Atallah</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white mb-8 max-w-xl drop-shadow-md"
            >
              I build modern, responsive web applications with React, Node.js, and Three.js, 
              combining creativity with technical expertise.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-3 mb-10"
            >
              {techStack.map((tech, index) => (
                <motion.span 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center px-3 py-1.5 rounded-lg backdrop-blur-md bg-black/40 border border-white/20 text-white"
                >
                  <span className="mr-2">{tech.icon}</span>
                  <span>{tech.name}</span>
                </motion.span>
              ))}
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 items-center"
            >
              <a 
                href="#projects" 
                className="px-6 py-3 rounded-lg bg-[#FF9EFF] hover:bg-[#FF9EFF]/80 text-[#0A1235] font-bold transition-all duration-300 flex items-center shadow-lg shadow-[#FF9EFF]/30"
              >
                View Projects <ArrowRight className="ml-2" size={16} />
              </a>
              
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full backdrop-blur-md bg-black/40 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full backdrop-blur-md bg-black/40 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:nooratallah1999@gmail.com"
                  className="p-3 rounded-full backdrop-blur-md bg-black/40 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  aria-label="Email Contact"
                >
                  <Mail size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Visual element - Abstract geometric shape with better contrast */}
          <motion.div
            variants={glassCardVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:block relative"
          >
            <div className="relative z-10">
              {/* Abstract shape with more pronounced glassmorphism */}
              <div className="w-full aspect-square rounded-full bg-gradient-to-br from-[#D87EE8]/30 to-[#7A93D8]/40 backdrop-blur-xl border border-white/30 shadow-xl shadow-[#0A1235]/40 flex items-center justify-center overflow-hidden">
                {/* Inner elements with better visibility */}
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-[#FF9EFF]/50 filter blur-md animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-2/3 h-2/3 rounded-full bg-[#7A93D8]/50 filter blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#D87EE8]/10 to-[#0A1235]/20 mix-blend-overlay"></div>
                
                {/* Code symbols - more visible */}
                <div className="absolute top-1/4 left-1/3 text-white/40 text-5xl font-mono rotate-12">{`{}`}</div>
                <div className="absolute bottom-1/3 right-1/4 text-white/40 text-4xl font-mono rotate-45">{`</>`}</div>
                <div className="absolute top-1/2 right-1/3 text-white/40 text-3xl font-mono -rotate-12">{`()`}</div>
              </div>
            </div>
            
            {/* Floating cards with better contrast */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-10 -right-10 w-32 h-32 rounded-2xl bg-[#7A93D8]/40 backdrop-blur-md border border-white/30 shadow-lg rotate-12 z-20"
            ></motion.div>
            
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-5 -left-5 w-24 h-24 rounded-2xl bg-[#D87EE8]/40 backdrop-blur-md border border-white/30 shadow-lg -rotate-12 z-20"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;