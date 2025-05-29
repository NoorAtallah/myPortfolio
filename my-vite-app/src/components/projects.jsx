// src/components/Projects.js
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Code, ChevronRight, ArrowRight } from 'lucide-react';

const Projects = () => {
  const [selectedId, setSelectedId] = useState(null);
  const containerRef = useRef(null);
  
  // Project data
  const projects = [
    {
      id: 1,
      title: 'CalculateYourRefund.com',
      description: 'A streamlined web app for quick and easy tax refund calculations.',
      longDescription: 'This comprehensive tax platform streamlines the filing process with intuitive forms, automatic calculations, and secure data handling. Users can track refunds in real-time and connect with tax professionals for personalized assistance.',
      image: '/calculateyourrefund.jpg',
      placeholder: 'linear-gradient(to right, #D87EE8, #7A93D8)',
      technologies: ['Node.js', 'Next.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
      category: 'fullstack',
      liveLink: 'https://calculateyourrefund.com/',
      featured: true
    },
    {
      id: 2,
      title: 'CodeLake Enterprise',
      description: 'Web development services site offering custom solutions for businesses.',
      longDescription: 'CodeLake Enterprise is an end-to-end solution for businesses needing web development services. The platform showcases interactive project timelines, service customization tools, and client testimonials.',
      image: '/codelake.jpg',
      placeholder: 'linear-gradient(to right, #D87EE8, #7A93D8)',
      technologies: ['React', 'Node.js', 'Three.js', 'MongoDB', 'Tailwind CSS'],
      category: 'fullstack',
      liveLink: 'https://codelakeenterprise.com/',
      featured: true
    },
    {
      id: 3,
      title: 'Royal Delta Group',
      description: 'A corporate website for a global trading and investment company.',
      longDescription: 'Royal Delta Group serves as a strategic partner for businesses seeking growth. The platform features interactive data visualizations for market analysis, personalized consultation booking, and resource libraries with immersive 3D elements.',
      image: '/royaldelta.jpg',
      placeholder: 'linear-gradient(to right, #D87EE8, #7A93D8)',
      technologies: ['React', 'Node.js', 'Three.js', 'Express', 'Framer Motion'],
      category: 'frontend',
      liveLink: 'https://www.royaldeltagroup.com/',
      featured: true
    },
    {
      id: 4,
      title: 'Riverside Journeys',
      description: 'A travel agency website focused on immersive global experiences.',
      longDescription: 'Riverside Journeys offers unique travel experiences around the world. The website features interactive destination guides, booking capabilities, travel itineraries, and immersive imagery to inspire wanderlust and adventure.',
      image: '/riversidejourneys.jpg',
      placeholder: 'linear-gradient(to right, #7A93D8, #0A1235)',
      technologies: ['React', 'Next.js', 'MongoDB', 'Stripe', 'Google Maps API'],
      category: 'fullstack',
      liveLink: 'https://www.riversidejourneys.com/',
      featured: false
    },
    {
      id: 5,
      title: 'AccountLink CPA',
      description: 'A professional site for an accounting and tax services firm.',
      longDescription: 'AccountLink CPA provides accounting and tax services to individuals and businesses. The website features service descriptions, team profiles, client testimonials, and a secure client portal for document sharing and communication.',
      image: '/accountlink.jpg',
      placeholder: 'linear-gradient(to right, #7A93D8, #0A1235)',
      technologies: ['HTML5', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      category: 'frontend',
      liveLink: 'https://www.accountlinkcpa.com/',
      featured: false
    }
  ];
  
  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  // Project modal
  const ProjectModal = ({ project }) => {
    if (!project) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
        onClick={() => setSelectedId(null)}
      >
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-[#0A1235] border border-white/10 rounded-xl overflow-hidden max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-xl shadow-[#D87EE8]/20 m-2"
          onClick={e => e.stopPropagation()}
        >
          {/* Project Image Header */}
          <div 
            className="h-48 sm:h-56 md:h-64 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${project.image})`, 
              backgroundColor: project.placeholder ? 'transparent' : '#D87EE8',
              backgroundImage: project.image ? `url(${project.image})` : project.placeholder
            }}
          >
            <div className="h-full w-full bg-black/40 p-4 sm:p-6 flex flex-col justify-end backdrop-blur-sm">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-md">{project.title}</h3>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span 
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 sm:px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium border border-white/10">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Project Content */}
          <div className="p-4 sm:p-6">
            <div className="mb-6 sm:mb-8">
              <h4 className="text-lg font-bold text-white mb-2">Project Overview</h4>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {project.longDescription}
              </p>
            </div>
            
            <div className="mb-6 sm:mb-8">
              <h4 className="text-lg font-bold text-white mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-[#D87EE8]/20 text-[#FF9EFF] rounded-full text-xs sm:text-sm font-medium border border-[#D87EE8]/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {project.liveLink && (
                <a 
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 sm:px-6 py-3 bg-[#FF9EFF] hover:bg-[#FF9EFF]/80 text-[#0A1235] rounded-lg font-bold flex items-center justify-center transition-colors duration-300 shadow-lg shadow-[#FF9EFF]/20 text-sm sm:text-base"
                >
                  <ExternalLink size={16} className="mr-2" /> Visit Website
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Get selected project
  const selectedProject = projects.find(p => p.id === selectedId);
  
  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll();
  const yBubble1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBubble2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yBubble3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section id="projects" className="py-16 sm:py-20 min-h-screen bg-gradient-to-b from-[#0A1235] to-[#192965] relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      
      {/* Decorative elements - floating shapes with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ y: yBubble1 }}
          className="absolute top-20 left-[5%] w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full bg-[#D87EE8]/10 blur-2xl"
        />
        <motion.div 
          style={{ y: yBubble2 }}
          className="absolute top-[40%] right-[15%] w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 rounded-full bg-[#7A93D8]/15 blur-3xl"
        />
        <motion.div 
          style={{ y: yBubble3 }}
          className="absolute bottom-[10%] left-[20%] w-36 sm:w-54 md:w-72 h-36 sm:h-54 md:h-72 rounded-full bg-[#FF9EFF]/10 blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white inline-block drop-shadow-md"
          >
            My <span className="text-[#FF9EFF]">Portfolio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-white/80 px-4"
          >
            Explore my latest work — from tax calculators to corporate websites and travel platforms.
          </motion.p>
        </div>
        
        {/* Featured Project - Full Width Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
            {/* Background with gradient overlay */}
            <div 
              className="relative h-80 sm:h-96 md:h-[500px] w-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${projects[0].image})`,
                backgroundImage: projects[0].image ? `url(${projects[0].image})` : projects[0].placeholder
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1235]/90 via-[#0A1235]/70 sm:via-[#0A1235]/50 to-transparent">
                <div className="h-full flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 md:px-12 max-w-full sm:max-w-2xl">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-md leading-tight">{projects[0].title}</h3>
                  <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">{projects[0].longDescription}</p>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-6 sm:mb-8">
                    {projects[0].technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button 
                      onClick={() => setSelectedId(projects[0].id)}
                      className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg bg-[#FF9EFF] hover:bg-[#FF9EFF]/80 text-[#0A1235] font-bold transition-all duration-300 flex items-center justify-center shadow-lg shadow-[#FF9EFF]/30 text-sm sm:text-base"
                    >
                      View Details <ChevronRight className="ml-2" size={16} />
                    </button>
                    
                    {projects[0].liveLink && (
                      <a 
                        href={projects[0].liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg bg-transparent border border-white/20 hover:bg-white/10 text-white font-medium transition-all duration-300 flex items-center justify-center text-sm sm:text-base"
                      >
                        Visit Site <ExternalLink className="ml-2" size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Projects Horizontal Scroll */}
        <div className="mb-16 sm:mb-20">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 px-2 sm:px-0"
          >
            Recent <span className="text-[#FF9EFF]">Projects</span>
          </motion.h3>
          
          <div className="relative">
            <div className="overflow-x-auto pb-6 sm:pb-8 -mx-4 px-4 scrollbar-hide">
              <div className="flex space-x-4 sm:space-x-6" style={{ width: 'max-content' }}>
                {projects.slice(1, 5).map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setSelectedId(project.id)}
                    className="w-[280px] sm:w-[300px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group"
                  >
                    {/* Project card with glass effect */}
                    <div className="bg-black/30 backdrop-blur-sm h-full border border-white/10 rounded-xl overflow-hidden">
                      <div 
                        className="h-32 sm:h-40 relative overflow-hidden"
                        style={{ 
                          backgroundImage: project.image ? `url(${project.image})` : project.placeholder,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3 sm:p-4">
                          <div>
                            <h4 className="text-white font-bold text-sm sm:text-base">{project.title}</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {project.technologies.slice(0, 2).map((tech, index) => (
                                <span key={index} className="text-xs text-white/80">{tech}</span>
                              ))}
                              {project.technologies.length > 2 && (
                                <span className="text-xs text-white/80">+{project.technologies.length - 2}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-[#7A93D8]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="px-3 sm:px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm">View Project</span>
                        </div>
                      </div>
                      
                      <div className="p-3 sm:p-4">
                        <p className="text-white/80 text-xs sm:text-sm mb-3 line-clamp-3 leading-relaxed">{project.description}</p>
                        <div className="flex items-center text-[#FF9EFF] text-xs sm:text-sm font-medium">
                          Explore <ArrowRight size={12} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Staggered Showcase with Timeline */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-bold text-white mb-8 sm:mb-12 px-2 sm:px-0"
          >
            Project <span className="text-[#FF9EFF]">Timeline</span>
          </motion.h3>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[15px] sm:left-[15px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D87EE8] via-[#7A93D8] to-[#0A1235] transform lg:translate-x-[-1px]"></div>
            
            {/* Timeline items */}
            <div className="space-y-12 sm:space-y-16 lg:space-y-24">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-0 sm:left-0 lg:left-1/2 top-0 w-8 h-8 rounded-full bg-[#FF9EFF] border-4 border-[#0A1235] shadow-lg transform translate-x-[-14px] lg:translate-x-[-16px] z-10"></div>
                  
                  {/* Content */}
                  <div className="ml-8 sm:ml-12 lg:ml-0 lg:w-1/2 lg:px-8">
                    <div
                      onClick={() => setSelectedId(project.id)}
                      className={`bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] lg:hover:scale-[1.03] ${
                        index % 2 === 0 ? 'lg:mr-4' : 'lg:ml-4'
                      }`}
                    >
                      <div className="p-4 sm:p-6">
                        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">{project.title}</h4>
                        <p className="text-white/80 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <span 
                              key={index}
                              className="px-2 sm:px-3 py-1 bg-[#D87EE8]/10 text-[#FF9EFF] rounded-full text-xs sm:text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <button className="text-[#FF9EFF] font-medium flex items-center text-sm sm:text-base">
                          View Project <ChevronRight size={14} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Modal */}
      <AnimatePresence>
        {selectedId && <ProjectModal project={selectedProject} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;