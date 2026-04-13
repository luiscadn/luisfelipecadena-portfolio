"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown, Mail, Download, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/language-provider";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function PortfolioHero() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const content = {
    es: {
      greeting: "¿Qué tal?, soy",
      mission: "Estudiante de Ingeniería de Sistemas en ICESI. Mi misión es orquestar soluciones tecnológicas escalables y de alto impacto que transformen objetivos de negocio en valor real para el usuario, soy creyente de que la calidad del producto nace del liderazgo y la cohesión del equipo.",
      roles: ["Software Engineer", "IEEE", "Amante del Management", "Algoritmos y estructuras de datos", "Business Case y Viabilidad", "Gestión de Stakeholders"],
      btnProjects: "Ver Proyectos",
      btnCv: "Descargar CV",
      cvPath: "/CV_Luis_Felipe_Cadena_Cortes_ES.pdf",
      available: "Disponible para nuevos retos",
      nav: [
        { label: "Inicio", href: "#" },
        { label: "Proyectos", href: "#projects" },
        { label: "Habilidades", href: "#skills" },
        { label: "Experiencia", href: "#experience" },
        //{ label: "Sobre mí", href: "#about" },
        { label: "Contacto", href: "#contact" }
      ]
    },
    en: {
      greeting: "Hi there, I'm",
      mission: "Systems Engineering Student at ICESI. My mission is to orchestrate scalable, high-impact technology solutions that transform business goals into real user value. I believe product quality stems from leadership and team cohesion.",
      roles: ["Software Engineer", "IEEE", "Management Enthusiast", "Algorithms and Data Structures", "Business Case and Viability", "Stakeholders"],
      btnProjects: "View Projects",
      btnCv: "Download CV",
      cvPath: "/CV_Luis_Felipe_Cadena_Cortes_EN.pdf",
      available: "Available for new challenges",
      nav: [
        { label: "Home", href: "#" },
        { label: "Projects", href: "#projects" },
        { label: "Skills", href: "#skills" },
        { label: "Experience", href: "#experience" },
        //{ label: "About me", href: "#about" },
        { label: "Contact", href: "#contact" }
      ]
    }
  };

  const t = content[language];

  // Typing effect state
  const roles = t.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeRole, setFadeRole] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeRole(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setFadeRole(true);
      }, 500); // Wait half a second before fading in the new word
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const menuItems = [
    { label: "HOME", href: "#", highlight: true },
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CONTACT", href: "#" },
  ];

  return (
    <div
      className={`w-full min-h-screen transition-colors overflow-x-hidden ${isDark ? "bg-gradient-to-br from-[#020617] via-[#010101] to-[#0f172a] text-white" : "bg-gradient-to-br from-slate-50 via-white to-slate-100 text-[#020617]"}`}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&display=swap"
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto flex-wrap">
          {/* Signature (Left) */}
          <div className="text-3xl md:text-4xl shrink-0" style={{ color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)", fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
            In Software We Trust
          </div>

          {/* Desktop Navigation (Center/Fluid) */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {t.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-medium text-[15px] transition-colors focus:outline-none hover:text-[#38bdf8] hover:underline underline-offset-8 decoration-2 decoration-[#38bdf8]"
                style={{ color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Controls: Menu (Mobile), Language & Theme */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="p-2 transition-colors duration-300 text-neutral-500 hover:text-[#38bdf8] flex items-center gap-1 font-semibold"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm uppercase">{language}</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full hover:opacity-80 transition-opacity"
              style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
              aria-label="Toggle theme"
            >
              <div
                className="absolute top-1 left-1 w-5 h-5 rounded-full transition-transform duration-300"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                  transform: isDark ? "translateX(1.75rem)" : "translateX(0)",
                }}
              />
            </button>

            {/* Menu Button Mobile */}
            <div className="relative md:hidden">
              <button
                ref={buttonRef}
                type="button"
                className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-sky-400"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-7 h-7 transition-colors duration-300" strokeWidth={2} />
                ) : (
                  <Menu className="w-7 h-7 transition-colors duration-300" strokeWidth={2} />
                )}
              </button>

              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute top-full right-0 w-[200px] border-none shadow-2xl mt-2 p-4 rounded-lg z-[100]"
                  style={{
                    backgroundColor: isDark ? "#020617" : "hsl(0 0% 98%)",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "none"
                  }}
                >
                  {t.nav.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block text-lg font-bold tracking-tight py-2 px-2 cursor-pointer transition-colors duration-300"
                      style={{
                        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#38bdf8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)";
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
        
        {/* Status Badge (Top Left of Content) - Moved slightly structurally */}
        <div className="absolute top-28 md:top-32 left-6 md:left-12 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-medium z-20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38bdf8]"></span>
          </span>
          {t.available}
        </div>

        {/* 2-Column Layout Container */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 py-20 z-10 mt-8 md:mt-0">
          
          {/* Left Column (Narrative) */}
          <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left gap-6 md:gap-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold leading-tight tracking-tight">
              {t.greeting} <br className="hidden lg:block"/>
              <span className="text-[#38bdf8]">Luis Cadena</span>
            </h1>

            <div className="h-8 md:h-10 text-xl md:text-2xl font-semibold font-sans">
              <span 
                className={`text-[#38bdf8] transition-opacity duration-500 ease-in-out ${fadeRole ? 'opacity-100' : 'opacity-0'}`}
              >
                {roles[roleIndex]}
              </span>
            </div>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl text-neutral-400 font-sans">
              {t.mission.split("ICESI")[0]}
              <span className={isDark ? "text-white" : "text-black"}>ICESI</span>
              {t.mission.split("ICESI")[1]}
            </p>

            {/* Action Buttons & Social Icons */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
              
              <div className="flex gap-4">
                <a href="#projects" className="px-6 py-3 rounded-md bg-[#38bdf8] text-[#020617] font-semibold hover:bg-[#0ea5e9] transition-colors duration-300">
                  {t.btnProjects}
                </a>
                <a 
                  href={t.cvPath} 
                  download={t.cvPath.split('/').pop()}
                  className="px-6 py-3 rounded-md border-2 border-[#38bdf8] text-[#38bdf8] font-semibold hover:bg-[#38bdf8] hover:text-[#020617] transition-all duration-300 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t.btnCv}
                </a>
              </div>

              <div className="flex gap-4 sm:ml-4 border-t sm:border-t-0 sm:border-l border-slate-700/50 pt-6 sm:pt-0 sm:pl-6">
                <a href="https://github.com/luiscadn" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#38bdf8] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.38 5.4 5.4 0 0 0 18.1 1.5s-1.25-.4-4 1.45a13.9 13.9 0 0 0-7 0c-2.75-1.85-4-1.45-4-1.45a5.4 5.4 0 0 0-.9 2.88 5.44 5.44 0 0 0 1.5 3.78c-0.1 0.44-0.1 1.14 0 1.62-2.14 0.65-3 1.84-3 1.84s1.25 1.15 3.5 1.44a4.8 4.8 0 0 0-1 3.02v4" />
                    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/luis-felipe-cadena-cortes/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#38bdf8] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="mailto:lfcadenac@outlook.com" className="text-slate-400 hover:text-[#38bdf8] transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (Visual Core) */}
          <div className="flex-1 flex justify-center lg:justify-end items-center relative min-h-[300px] sm:min-h-[400px]">
             {/* Organic Blob Base Layer for Glow effect */}
             <div className="absolute inset-0 bg-[#38bdf8] opacity-20 blur-[60px] md:blur-[100px] rounded-full w-full h-full transform scale-75 animate-pulse"></div>

             {/* Blob Clipping Mask */}
             <div 
               className="relative border-2 border-[#38bdf8]/30 shadow-[0_0_40px_rgba(56,189,248,0.2)] transition-transform duration-700 hover:scale-105 overflow-hidden"
               style={{ 
                 // Create an organic blob shape 
                 borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                 width: "min(400px, 80vw)",
                 height: "min(420px, 85vw)"
               }}
             >
                <img
                  src="/BannerLinkedin.png"
                  alt="Luis Felipe Cadena"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-sky-400 dark:hover:text-white transition-colors duration-300" />
        </button>
      </main>
    </div>
  );
}
