// src/components/Contact.js
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, ChevronRight, ArrowRight } from 'lucide-react';

const Contact = () => {
  const containerRef = useRef(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll();
  const yBubble1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBubble2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#0A1235] to-[#192965] relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      
      {/* Decorative elements - floating shapes with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ y: yBubble1 }}
          className="absolute top-20 left-[15%] w-64 h-64 rounded-full bg-[#D87EE8]/10 blur-2xl"
        />
        <motion.div 
          style={{ y: yBubble2 }}
          className="absolute top-[40%] right-[10%] w-80 h-80 rounded-full bg-[#7A93D8]/15 blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white inline-block drop-shadow-md"
          >
            Get In <span className="text-[#FF9EFF]">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-white/80 mb-8"
          >
            I'm currently available for freelance work and open to new opportunities. 
            Feel free to reach out if you have a project in mind or just want to connect!
          </motion.p>
        </div>
        
        {/* Main content area with glassmorphism effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl">
            {/* Background glowing gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D87EE8]/5 to-[#7A93D8]/5"></div>
            
            {/* Content */}
            <div className="relative p-10 md:p-16">
              {/* Two column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Left column - Contact info */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div 
                    variants={itemVariants}
                    className="mb-12"
                  >
                    <h3 className="text-2xl font-bold mb-8 text-white">
                      <span className="inline-block w-10 h-1 bg-[#FF9EFF] mr-3 rounded-full align-middle"></span>
                      Connect With Me
                    </h3>
                    
                    <div className="space-y-8 ml-4">
                      <div className="flex items-start group">
                        <div className="p-3 rounded-full bg-black/30 border border-white/10 text-[#FF9EFF] mr-4 group-hover:bg-[#FF9EFF]/20 transition-all duration-300">
                          <Mail size={20} />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">Email</h4>
                          <a 
                            href="mailto:nooratallah1999@gmail.com" 
                            className="text-white/80 hover:text-[#FF9EFF] transition-colors"
                          >
                            nooratallah1999@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start group">
                        <div className="p-3 rounded-full bg-black/30 border border-white/10 text-[#FF9EFF] mr-4 group-hover:bg-[#FF9EFF]/20 transition-all duration-300">
                          <Phone size={20} />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">Phone</h4>
                          <a 
                            href="tel:+962786075693" 
                            className="text-white/80 hover:text-[#FF9EFF] transition-colors"
                          >
                            +962 786 075 693
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start group">
                        <div className="p-3 rounded-full bg-black/30 border border-white/10 text-[#FF9EFF] mr-4 group-hover:bg-[#FF9EFF]/20 transition-all duration-300">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">Location</h4>
                          <p className="text-white/80">
                            Zarqa, Jordan
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="ml-4">
                    <h4 className="text-lg font-medium text-white mb-4">Follow Me</h4>
                    <div className="flex space-x-3">
                      <a 
                        href="https://github.com/your-username" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-black/30 backdrop-blur-sm rounded-full text-white border border-white/10 hover:bg-[#FF9EFF]/20 hover:text-[#FF9EFF] hover:border-[#FF9EFF]/30 transition-all duration-300 shadow-lg"
                        aria-label="GitHub Profile"
                      >
                        <Github size={20} />
                      </a>
                      <a 
                        href="https://linkedin.com/in/your-username" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-black/30 backdrop-blur-sm rounded-full text-white border border-white/10 hover:bg-[#FF9EFF]/20 hover:text-[#FF9EFF] hover:border-[#FF9EFF]/30 transition-all duration-300 shadow-lg"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin size={20} />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Right column - Resume & call to action */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col justify-between"
                >
                  <motion.div 
                    variants={itemVariants}
                    className="mb-10"
                  >
                    <div className="rounded-2xl overflow-hidden">
                      {/* Decorative gradient header */}
                      <div className="h-3 bg-gradient-to-r from-[#D87EE8] to-[#7A93D8]"></div>
                      
                      {/* Content */}
                      <div className="bg-black/30 backdrop-blur-sm p-8 border border-white/10">
                        <h4 className="text-xl font-bold mb-4 text-white">
                          Looking for a developer?
                        </h4>
                        <p className="text-white/80 mb-6">
                          I'm currently available for freelance work and open to new opportunities. If you're looking for a developer to build your next project, let's talk!
                        </p>
                        <a 
                          href="/resume.pdf" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-[#FF9EFF] hover:bg-[#FF9EFF]/80 text-[#0A1235] rounded-lg font-bold transition-all duration-300 shadow-lg shadow-[#FF9EFF]/20"
                        >
                          <ExternalLink size={16} className="mr-2" /> Download Resume
                        </a>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <div className="rounded-2xl bg-gradient-to-br from-[#D87EE8]/20 to-[#7A93D8]/20 backdrop-blur-sm border border-white/10 p-8">
                      <h4 className="text-xl font-bold mb-3 text-white">Ready to start a project?</h4>
                      <p className="text-white/80 mb-6">
                        Send me an email or schedule a call and let's discuss your ideas. I'm excited to hear about your project!
                      </p>
                      
                      <a 
                        href="mailto:nooratallah1999@gmail.com?subject=Project%20Inquiry" 
                        className="flex items-center text-[#FF9EFF] font-medium hover:underline"
                      >
                        Send an email <ArrowRight size={16} className="ml-2" />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom section - call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto text-center mt-20"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">
            Let's create something <span className="text-[#FF9EFF]">amazing</span> together
          </h3>
          
          <a 
            href="#home" 
            className="inline-flex items-center px-8 py-4 rounded-full bg-black/30 border border-white/10 backdrop-blur-sm text-white hover:bg-[#FF9EFF]/20 hover:border-[#FF9EFF]/30 transition-all duration-300"
          >
            Back to top <ChevronRight size={16} className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;