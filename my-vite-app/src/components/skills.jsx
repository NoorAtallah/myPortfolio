// src/components/Skills.js
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Server, Database, Figma, Globe, Layers, ChevronRight } from 'lucide-react';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const containerRef = useRef(null);
  
  // Define skill categories with icons
  const categories = [
    { id: 'frontend', label: 'Frontend', icon: <Globe size={20} /> },
    { id: 'backend', label: 'Backend', icon: <Server size={20} /> },
    { id: 'database', label: 'Database', icon: <Database size={20} /> },
    { id: 'design', label: 'Design', icon: <Figma size={20} /> },
    { id: 'frameworks', label: 'Frameworks', icon: <Layers size={20} /> },
    { id: 'tools', label: 'Tools', icon: <Code size={20} /> },
  ];
  
  // Define skills for each category
  const skillsByCategory = {
    frontend: [
      { name: 'HTML5', level: 95, icon: '/icons/html5.svg' },
      { name: 'CSS3', level: 90, icon: '/icons/css3.svg' },
      { name: 'JavaScript', level: 88, icon: '/icons/javascript.svg' },
      { name: 'React.js', level: 90, icon: '/icons/react.svg' },
      { name: 'Three.js', level: 75, icon: '/icons/threejs.svg' },
      { name: 'Anime.js', level: 70, icon: '/icons/animejs.svg' },
    ],
    backend: [
      { name: 'Node.js', level: 85, icon: '/icons/nodejs.svg' },
      { name: 'Express.js', level: 85, icon: '/icons/express.svg' },
      { name: 'RESTful APIs', level: 80, icon: '/icons/api.svg' },
      { name: 'Authentication', level: 80, icon: '/icons/auth.svg' },
      { name: 'Postman', level: 85, icon: '/icons/postman.svg' },
      { name: 'Mongoose', level: 75, icon: '/icons/mongoose.svg' },
    ],
    database: [
      { name: 'MongoDB', level: 85, icon: '/icons/mongodb.svg' },
      { name: 'PostgreSQL', level: 75, icon: '/icons/postgresql.svg' },
      { name: 'Database Design', level: 80, icon: '/icons/dbdesign.svg' },
      { name: 'Data Modeling', level: 75, icon: '/icons/datamodel.svg' },
      { name: 'Query Optimization', level: 70, icon: '/icons/queryopt.svg' },
      { name: 'CRUD Operations', level: 90, icon: '/icons/crud.svg' },
    ],
    design: [
      { name: 'Figma', level: 75, icon: '/icons/figma.svg' },
      { name: 'Responsive Design', level: 90, icon: '/icons/responsive.svg' },
      { name: 'UI/UX Principles', level: 80, icon: '/icons/uiux.svg' },
      { name: 'Tailwind CSS', level: 85, icon: '/icons/tailwind.svg' },
      { name: 'Color Theory', level: 70, icon: '/icons/color.svg' },
      { name: 'Typography', level: 75, icon: '/icons/typography.svg' },
    ],
    frameworks: [
      { name: 'Next.js', level: 85, icon: '/icons/nextjs.svg' },
      { name: 'React Native', level: 60, icon: '/icons/reactnative.svg' },
      { name: 'Express.js', level: 85, icon: '/icons/express.svg' },
      { name: 'Bootstrap', level: 80, icon: '/icons/bootstrap.svg' },
      { name: 'Material UI', level: 70, icon: '/icons/mui.svg' },
      { name: 'Tailwind CSS', level: 85, icon: '/icons/tailwind.svg' },
    ],
    tools: [
      { name: 'Git & GitHub', level: 90, icon: '/icons/git.svg' },
      { name: 'VS Code', level: 95, icon: '/icons/vscode.svg' },
      { name: 'AWS', level: 70, icon: '/icons/aws.svg' },
      { name: 'Vercel', level: 80, icon: '/icons/vercel.svg' },
      { name: 'Render', level: 75, icon: '/icons/render.svg' },
      { name: 'WordPress', level: 65, icon: '/icons/wordpress.svg' },
    ],
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
  const yBubble2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yBubble3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-[#192965] to-[#0A1235] relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      
      {/* Decorative elements - floating shapes with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ y: yBubble1 }}
          className="absolute top-20 right-[5%] w-64 h-64 rounded-full bg-[#D87EE8]/10 blur-2xl"
        />
        <motion.div 
          style={{ y: yBubble2 }}
          className="absolute top-[40%] left-[15%] w-80 h-80 rounded-full bg-[#7A93D8]/15 blur-3xl"
        />
        <motion.div 
          style={{ y: yBubble3 }}
          className="absolute bottom-[10%] right-[20%] w-72 h-72 rounded-full bg-[#FF9EFF]/10 blur-3xl"
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
            Technical <span className="text-[#FF9EFF]">Skills</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-white/80"
          >
            My proficiency in various technologies and tools that I use to build modern web applications.
          </motion.p>
        </div>
        
        {/* Glowing skill orb - visual centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mb-16 w-64 h-64 md:w-80 md:h-80"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D87EE8]/30 to-[#7A93D8]/30 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(216,126,232,0.3)]">
            <div className="absolute inset-0 bg-[#0A1235]/40 mix-blend-overlay"></div>
            
            {/* Inner glow */}
            <div className="absolute inset-[15%] rounded-full bg-[#FF9EFF]/5 backdrop-blur-md border border-white/5 flex items-center justify-center animate-pulse">
              <span className="text-white text-4xl font-bold">{activeTab[0].toUpperCase() + activeTab.slice(1)}</span>
            </div>
            
            {/* Orbiting skill categories */}
            {categories.map((category, index) => {
              const angle = (index * (2 * Math.PI)) / categories.length;
              const x = Math.cos(angle) * 130;
              const y = Math.sin(angle) * 130;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`absolute translate-x-[-50%] translate-y-[-50%] p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
                    activeTab === category.id
                      ? 'bg-[#FF9EFF] text-[#0A1235] scale-110 shadow-[0_0_15px_rgba(255,158,255,0.5)]'
                      : 'bg-black/30 text-white hover:bg-black/50 border-white/10'
                  }`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  whileHover={{ scale: activeTab === category.id ? 1.15 : 1.1 }}
                >
                  {category.icon}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
        
        {/* Skills Grid with modern card design */}
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {skillsByCategory[activeTab].map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#D87EE8]/20 backdrop-blur-sm border border-[#D87EE8]/30">
                  <div className="text-[#FF9EFF]">
                    {/* Placeholder for icon - replace with actual icon */}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-6 h-6"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 8v8"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{skill.name}</h3>
                </div>
              </div>
              
              {/* Custom stylized progress bar */}
              <div className="mt-4">
                <div className="h-1 w-full bg-white/10 rounded-full mb-1 overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-[#D87EE8] to-[#FF9EFF]"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                  ></motion.div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Proficiency</span>
                  <span className="text-[#FF9EFF] font-medium">{skill.level}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional Skills Section with modern design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative mb-20 py-16 px-6 rounded-2xl overflow-hidden"
        >
          {/* Background with glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#D87EE8]/10 to-[#7A93D8]/10 backdrop-blur-sm border border-white/10 rounded-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 text-white text-center">Additional <span className="text-[#FF9EFF]">Expertise</span></h3>
            
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Responsive Design", "Cross-Browser Compatibility", "Performance Optimization",
                "SEO Basics", "Web Accessibility", "Version Control", "Agile Methodology",
                "Problem Solving", "CI/CD Basics", "Unit Testing", "API Integration", "SDLC",
                "Data Analytics", "Process Evaluation", "Requirement Analysis", "Team Collaboration"
              ].map((skill, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="px-4 py-2 bg-black/30 text-white rounded-full text-sm font-medium border border-white/10 backdrop-blur-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Learning Next Section with card design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-10 text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Currently <span className="text-[#FF9EFF]">Learning</span></h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              I believe in continuous growth. Here are some technologies I'm currently exploring to expand my skill set and stay ahead of industry trends:
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "TypeScript", "GraphQL", "WebSocket", "Docker", "Kubernetes", "Redux"
              ].map((skill, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="px-6 py-3 bg-[#D87EE8]/20 text-[#FF9EFF] rounded-lg text-sm font-medium border border-[#D87EE8]/30 flex items-center shadow-lg shadow-[#D87EE8]/5"
                >
                  <span className="mr-2">•</span>
                  {skill}
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-10 px-6 py-3 bg-[#FF9EFF]/10 hover:bg-[#FF9EFF]/20 border border-[#FF9EFF]/30 rounded-full text-[#FF9EFF] font-medium inline-flex items-center transition-all duration-300"
            >
              Learning Roadmap <ChevronRight size={16} className="ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;