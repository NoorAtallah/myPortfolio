// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun, Code } from 'lucide-react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header transparency
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Animation variants for navbar items
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Navigation Links
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'backdrop-blur-md bg-[#0A1235]/80 border-b border-white/10 py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="w-10 h-10 rounded-full bg-[#FF9EFF]/20 flex items-center justify-center">
              <Code className="h-5 w-5 text-[#FF9EFF]" />
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#D87EE8] to-[#7A93D8] bg-clip-text text-transparent">
              Noor Atallah
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                className="text-white/80 hover:text-[#FF9EFF] transition-all duration-300 font-medium text-sm relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF9EFF] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}

            {/* Dark Mode Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full bg-black/30 border border-white/10 text-[#FF9EFF] hover:bg-[#FF9EFF]/20 transition-all duration-300"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun size={18} className="text-[#FF9EFF]" />
              ) : (
                <Moon size={18} className="text-[#FF9EFF]" />
              )}
            </motion.button>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            {/* Dark Mode Toggle (Mobile) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              onClick={toggleDarkMode}
              className="mr-2 p-2 rounded-full bg-black/30 border border-white/10 text-[#FF9EFF]"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun size={18} className="text-[#FF9EFF]" />
              ) : (
                <Moon size={18} className="text-[#FF9EFF]" />
              )}
            </motion.button>

            {/* Menu Toggle Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              onClick={toggleMenu}
              className="p-2 rounded-full bg-black/30 border border-white/10 text-white"
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 py-4 bg-[#0A1235]/95 backdrop-blur-md rounded-lg border border-white/10 shadow-xl"
          >
            <div className="flex flex-col space-y-1 px-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/80 hover:text-[#FF9EFF] py-3 border-b border-white/10 font-medium flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9EFF] mr-2 opacity-0 group-hover:opacity-100"></span>
                  {link.name}
                </motion.a>
              ))}
              
              {/* Additional call to action in mobile menu */}
              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                className="mt-4 px-4 py-2.5 bg-[#FF9EFF] text-[#0A1235] rounded-lg font-bold text-center shadow-lg shadow-[#FF9EFF]/20"
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;