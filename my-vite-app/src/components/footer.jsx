// src/components/Footer.js
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Code, ChevronRight } from 'lucide-react';

const Footer = () => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#0A1235] text-white relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      
      {/* Decorative gradient accent at top */}
      <div className="h-1 bg-gradient-to-r from-[#D87EE8] via-[#7A93D8] to-[#0A1235]"></div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* About Column */}
          <div className="md:col-span-5">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FF9EFF]/20 flex items-center justify-center mr-3">
                <Code className="h-5 w-5 text-[#FF9EFF]" />
              </div>
              <h3 className="text-xl font-bold">Noor Atallah</h3>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Full stack developer specializing in creating modern, responsive web applications 
              with a focus on user experience and performance.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://github.com/your-username" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-black/30 backdrop-blur-sm rounded-full text-white border border-white/10 hover:bg-[#FF9EFF]/20 hover:text-[#FF9EFF] hover:border-[#FF9EFF]/30 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://linkedin.com/in/your-username" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-black/30 backdrop-blur-sm rounded-full text-white border border-white/10 hover:bg-[#FF9EFF]/20 hover:text-[#FF9EFF] hover:border-[#FF9EFF]/30 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:nooratallah1999@gmail.com" 
                className="p-3 bg-black/30 backdrop-blur-sm rounded-full text-white border border-white/10 hover:bg-[#FF9EFF]/20 hover:text-[#FF9EFF] hover:border-[#FF9EFF]/30 transition-all duration-300"
                aria-label="Email Contact"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center">
              <span className="inline-block w-6 h-0.5 bg-[#FF9EFF] mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-white/70 hover:text-[#FF9EFF] transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight size={16} className="mr-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div className="md:col-span-3 md:col-start-10">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center">
              <span className="inline-block w-6 h-0.5 bg-[#FF9EFF] mr-2"></span>
              Services
            </h3>
            <ul className="space-y-3">
              {[
                'Web Development', 
                'Frontend Development', 
                'Backend Development', 
                'Responsive Design', 
                'UI/UX Optimization'
              ].map((service) => (
                <li key={service} className="text-white/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Stylized divider */}
        <div className="relative my-10">
          <div className="absolute left-0 w-full h-px bg-white/10"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#FF9EFF]/50 to-transparent"></div>
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white/60 text-sm mb-6 md:mb-0"
          >
            © {new Date().getFullYear()} Noor Atallah. All rights reserved.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5, scale: 1.1 }}
            onClick={scrollToTop}
            className="p-4 rounded-full bg-[#FF9EFF] hover:bg-[#FF9EFF]/80 text-[#0A1235] font-bold transition-colors duration-300 shadow-lg shadow-[#FF9EFF]/20"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
      
      {/* Optional additional accent at bottom */}
      <div className="h-1 bg-black"></div>
    </footer>
  );
};

export default Footer;