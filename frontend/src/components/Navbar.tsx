import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Code, FolderGit2, Trophy, GraduationCap, Mail } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: FolderGit2 },
  { name: "Achievements", href: "#achievements", icon: Trophy },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer">
              <a href="#home" className="text-xl sm:text-2xl font-bold tracking-tighter text-slate-100">
                Kavindu<span className="text-cyan-400">.</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </span>
                    {/* Hover Underline Effect */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                  </a>
                );
              })}
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[64px] z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 md:hidden shadow-2xl"
          >
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-all"
                  >
                    <div className="p-2 rounded-lg bg-slate-800 text-cyan-400">
                        <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-lg">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}