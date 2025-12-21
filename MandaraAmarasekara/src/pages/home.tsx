import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Award, Code, Palette, Database, Cpu, Trophy, Star, ChevronDown, Users, Briefcase, MapPin, Calendar, Zap } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Navbar from '../components/Navbar';
import React from "react"; // Ensure this matches your file path

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
  featured?: boolean;
  tech: string[];
};

const STORAGE_KEY = "portfolio_projects";

const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  console.log("HOME READ:", saved);

  if (!saved) return;

  const parsed = JSON.parse(saved);
  console.log("PARSED:", parsed);

  setProjects(
    parsed.map((p: any) => ({
      ...p,
      tech: Array.isArray(p.tech)
        ? p.tech
        : p.tech.split(",").map((t: string) => t.trim())
    }))
  );
}, []);


  type AdminSkill = {
  id: string;
  name: string;
  level: string; // "90" or "90%"
};

const [skills, setSkills] = useState<
  {
    name: string;
    level: number;
    icon: any;
    color: string;
  }[]
>([]);

useEffect(() => {
  const saved = localStorage.getItem("portfolio_skills");
  if (!saved) return;

  const parsed: AdminSkill[] = JSON.parse(saved);

  const mappedSkills = parsed.map((s) => {
    const key = s.name.toLowerCase();
    const matchedKey = Object.keys(SKILL_STYLES).find(k =>
      key.includes(k)
    );

    return {
      name: s.name,
      level: parseInt(s.level), // "90%" → 90
      icon: matchedKey ? SKILL_STYLES[matchedKey].icon : Code,
      color: matchedKey
        ? SKILL_STYLES[matchedKey].color
        : "from-slate-500 to-slate-600",
    };
  });

  setSkills(mappedSkills);
}, []);


const SKILL_STYLES: Record<string, { icon: any; color: string }> = {
  react: { icon: Code, color: "from-blue-500 to-cyan-500" },
  next: { icon: Code, color: "from-blue-500 to-cyan-500" },
  javascript: { icon: Cpu, color: "from-cyan-500 to-teal-500" },
  typescript: { icon: Cpu, color: "from-cyan-500 to-teal-500" },
  ui: { icon: Palette, color: "from-teal-500 to-emerald-500" },
  ux: { icon: Palette, color: "from-teal-500 to-emerald-500" },
  node: { icon: Database, color: "from-blue-600 to-indigo-600" },
  express: { icon: Database, color: "from-blue-600 to-indigo-600" },
  mongo: { icon: Database, color: "from-sky-500 to-blue-500" },
  sql: { icon: Database, color: "from-sky-500 to-blue-500" },
  tailwind: { icon: Palette, color: "from-cyan-400 to-blue-400" },
};


  type AdminAchievement = {
  id: string;
  title: string;
  date: string;
  description: string;
};

const [achievements, setAchievements] = useState<
  {
    title: string;
    date: string;
    description: string;
    icon: any;
    color: string;
  }[]
>([]);


const ACHIEVEMENT_STYLES: Record<
  string,
  { icon: any; color: string }
> = {
  dean: { icon: Trophy, color: "text-yellow-400" },
  hackathon: { icon: Zap, color: "text-cyan-400" },
  open: { icon: Users, color: "text-emerald-400" },
  github: { icon: Users, color: "text-emerald-400" },
  certificate: { icon: Award, color: "text-blue-400" },
  award: { icon: Award, color: "text-blue-400" },
};


useEffect(() => {
  const saved = localStorage.getItem("portfolio_achievements");
  if (!saved) return;

  const parsed: AdminAchievement[] = JSON.parse(saved);

  const mapped = parsed.map((a) => {
    const key = a.title.toLowerCase();
    const matchedKey = Object.keys(ACHIEVEMENT_STYLES).find(k =>
      key.includes(k)
    );

    return {
      title: a.title,
      date: a.date,
      description: a.description,
      icon: matchedKey ? ACHIEVEMENT_STYLES[matchedKey].icon : Trophy,
      color: matchedKey
        ? ACHIEVEMENT_STYLES[matchedKey].color
        : "text-slate-400",
    };
  });

  setAchievements(mapped);
}, []);


  

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const { clientX, clientY } = e;
  mouseX.set(clientX);
  mouseY.set(clientY);
};

type AdminEducation = {
  id: string;
  degree: string;
  school: string;
  year: string;
  description?: string;
};

const [education, setEducation] = useState<AdminEducation[]>([]);


useEffect(() => {
  const saved = localStorage.getItem("portfolio_education");
  if (!saved) return;

  const parsed: AdminEducation[] = JSON.parse(saved);
  setEducation(parsed);
}, []);





  const springConfig = { damping: 25, stiffness: 300 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [0, window.innerHeight], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [0, window.innerWidth], [-5, 5]);

  return (
    <div 
      className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200"
      onMouseMove={handleMouseMove}
    >
      <Navbar />

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900/20 blur-[120px] animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-900/10 blur-[120px] animate-pulse"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      {/* HERO SECTION - ADDED ID="HOME" */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
        
        {/* Floating Particles */}
        <div className="absolute inset-0 -z-10 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 0 }}
              animate={{ 
                y: window.innerHeight + 100,
                x: Math.random() * window.innerWidth,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 relative z-10 order-2 lg:order-1 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-4 py-2 backdrop-blur-md bg-slate-800/50 border border-slate-700/50 rounded-full text-xs sm:text-sm font-medium text-cyan-400 mx-auto lg:mx-0"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span>Available for opportunities</span>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
                  <span className="block text-slate-100">
                    KAVINDU
                  </span>
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                    MANDARA
                  </span>
                </h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-6 flex-wrap text-slate-400 font-light text-lg sm:text-xl">
                    <span>Full-Stack Developer</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <span>UI/UX Designer</span>
                  </div>

                  <p className="text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Designing robust architectures and intuitive interfaces. 
                    I bridge the gap between complex backend logic and seamless user experiences.
                  </p>
                </motion.div>
              </div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              >
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Contact Me</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://github.com/mandaraAmarasekara"
                  target="_blank"
                  className="px-8 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </motion.a>
              </motion.div>

              {/* Socials */}
              <div className="flex gap-6 justify-center lg:justify-start pt-6 border-t border-slate-800/50">
                 {[
                  { icon: Linkedin, label: "LinkedIn", href: "#" },
                  { icon: Github, label: "GitHub", href: "https://github.com/mandaraAmarasekara" },
                  { icon: Briefcase, label: "Portfolio", href: "#" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT IMAGE - 3D Card Effect */}
            <motion.div
              style={{ rotateX, rotateY }}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10 perspective-1000 order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-square">
                {/* Decorative border */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-emerald-500 opacity-30 blur-sm" />
                
                <div className="relative h-full w-full rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900 shadow-2xl">
                  <img
                    src="https://i.ibb.co/d0k9XvBN/myphoto.jpg"
                    alt="Kavindu Mandara"
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>

                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 top-10 backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 p-3 rounded-xl shadow-xl hidden sm:block"
                >
                  <Code className="w-6 h-6 text-cyan-400" />
                </motion.div>

                 <motion.div 
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-4 bottom-20 backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 p-3 rounded-xl shadow-xl hidden sm:block"
                >
                  <Database className="w-6 h-6 text-emerald-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* SKILLS SECTION - ADDED ID="SKILLS" */}
      <section id="skills" className="py-24 sm:py-32 relative bg-slate-950/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Expertise</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-200">{skill.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION - ADDED ID="PROJECTS" */}
      <section id="projects" className="py-24 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A selection of projects demonstrating full-stack capabilities and modern UI design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative ${project.featured ? 'lg:col-span-2' : ''}`}
              >
                <div className={`bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-300 h-full flex flex-col ${project.featured ? 'lg:flex-row' : ''}`}>
                  
                  {/* Image Area */}
                  <div className={`relative overflow-hidden ${project.featured ? 'lg:w-1/2 h-64 lg:h-auto' : 'h-64'}`}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/0 transition-colors duration-300" />
                  </div>
                  
                  {/* Content Area */}
                  <div className={`p-8 flex flex-col justify-between ${project.featured ? 'lg:w-1/2' : ''}`}>
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <a href={project.link} className="p-2 rounded-full bg-slate-800 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-all">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                      
                      <p className="text-slate-400 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS - ADDED ID="ACHIEVEMENTS" */}
<section id="achievements" className="py-24 relative bg-slate-900/30">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Achievements</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {achievements.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <div
              className={`shrink-0 w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center ${item.color}`}
            >
              <Icon className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-200">
                {item.title}
              </h3>
              <p className="text-cyan-500 text-sm mb-1">
                {item.date}
              </p>
              <p className="text-slate-400 text-sm">
                {item.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

     {/* EDUCATION - ADDED ID="EDUCATION" */}
<section id="education" className="py-24 relative">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      
      {/* LEFT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Education</h2>
        </div>

        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.id} className="space-y-1">
              <h3 className="text-xl font-bold text-slate-100">
                {edu.degree}
              </h3>

              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{edu.school}</span>
              </div>

              <div className="flex items-center gap-2 text-cyan-500 text-sm pt-1">
                <Calendar className="w-4 h-4" />
                <span>{edu.year}</span>
              </div>

              {edu.description && (
                <div className="mt-4 pt-4 border-t border-slate-800 text-slate-400 leading-relaxed">
                  {edu.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT CARD (STATIC – KEEP AS IS) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Star className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Key Focus Areas</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Full-Stack Engineering",
            "Cloud Architecture",
            "Responsive UI/UX",
            "API Development",
            "Database Management",
            "Agile Methodologies",
          ].map((area, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-800/50"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-sm font-medium text-slate-300">
                {area}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
</section>


      {/* CTA SECTION - ADDED ID="CONTACT" */}
      <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Let's Build Something <span className="text-cyan-400">Exceptional</span>
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              I'm currently available for freelance work and full-time opportunities. 
              Let's discuss how I can contribute to your team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:kmandaraaa@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700"
              >
                <Mail className="w-5 h-5" />
                Say Hello
              </a>
              <a
                href="https://github.com/mandaraAmarasekara"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-300 transition-all duration-200 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700"
              >
                <Github className="w-5 h-5" />
                View Code
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-12 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-slate-100">Kavindu Mandara</h3>
              <p className="text-slate-500 text-sm mt-1">Building the web of tomorrow.</p>
            </div>
            
            <div className="flex gap-6">
               <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5"/></a>
               <a href="https://github.com/mandaraAmarasekara" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5"/></a>
               <a href="mailto:kmandaraaa@gmail.com" className="text-slate-400 hover:text-white transition-colors"><Mail className="w-5 h-5"/></a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-900 text-center text-slate-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Kavindu Mandara. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}