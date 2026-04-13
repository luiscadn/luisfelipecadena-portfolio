'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Download, Code2, ExternalLink, Rocket, Users, Server, ArrowUpRight, Terminal } from "lucide-react";
import ExperienceShader from "../components/ui/experience-shader";
import PortfolioHero from "../components/ui/portfolio-hero";
import { useLanguage } from "../components/language-provider";
import ContactSection from "../components/ui/contact-section";

export default function Home() {
  const { language } = useLanguage();

  const content = useMemo(() => ({
    en: {
      keyInitiatives: {
        title: "Key Initiatives",
        highlight: "Experience",
        description: "Engineering leadership and execution at scale.",
        execPrompt: "Execute: ~/leadership_log()",
        roleLabel: "| ROLE",
        companyLabel: "| COMPANY",
        periodLabel: "| PERIOD",
        entries: [
          {
            id: "icesi",
            title: "Marketing & Identity Delegate",
            company: "Student Council - ICESI University",
            period: "2025 → Present",
            bullets: "Leader in charge of projecting the Student Council's identity and strengthening its link with the student body. Responsible for narrative management and positioning of institutional initiatives to ensure strategic visibility and reach."
          },
          {
            id: "ieee",
            title: "IEEE Marketing & Identity Lead",
            company: "IEEE Student Branch",
            period: "2026 → Present",
            bullets: "Communication strategist in charge of projecting technical excellence through visual identity and digital content. Responsible for brand consistency and community growth on social media."
          }
        ]
      },
      projects: {
        title: "Featured",
        highlight: "Projects",
        description: "An intersection of robust engineering and strategic leadership.",
        list: [
          {
            id: "marte",
            title: "Escape from Marte",
            tag: "[WEB_APP] // REACT & VERCEL",
            description: "Orchestrated the end-to-end development of an interactive platform. Architected scalable frontend components using React, ensuring zero-downtime continuous deployment pipelines via Vercel. Bridged technical execution with product vision."
          },
          {
            id: "ieee-lead",
            title: "IEEE Leadership Strategy",
            tag: "[MANAGEMENT] // ENG. MANAGEMENT",
            description: "Directed cross-functional teams to execute high-impact technical events. Mentored engineering students and aligned operational strategies with academic goals, fostering an environment of technical excellence."
          },
          {
            id: "backend",
            title: "Enterprise Backend Architectures",
            tag: "[ARCHITECTURE] // DJANGO + SPRING BOOT",
            description: "Engineered highly resilient microservices and monolithic platforms. Designed robust RESTful APIs focusing on scalability, security, and maintainable data pipelines."
          }
        ]
      }
    },
    es: {
      keyInitiatives: {
        title: "Experiencia en",
        highlight: "Iniciativas Clave",
        description: "Liderazgo en ingeniería y ejecución a escala.",
        execPrompt: "Ejecutar: ~/bitacora_liderazgo()",
        roleLabel: "| ROL",
        companyLabel: "| EMPRESA",
        periodLabel: "| PERIODO",
        entries: [
          {
            id: "icesi",
            title: "Delegado de Marketing e Identidad",
            company: "Consejo Estudiantil - Universidad ICESI",
            period: "2025 → Presente",
            bullets: "Líder encargado de proyectar la identidad del Consejo Estudiantil y fortalecer su vínculo con el estudiantado. Responsable de la gestión narrativa y el posicionamiento de iniciativas institucionales para garantizar su visibilidad y alcance estratégico."
          },
          {
            id: "ieee",
            title: "Líder de Marketing e Identidad IEEE",
            company: "Rama Estudiantil IEEE",
            period: "2026 → Presente",
            bullets: "Estratega de comunicación encargado de proyectar la excelencia técnica a través de la identidad visual y el contenido digital. Responsable de la coherencia de marca y el crecimiento de la comunidad en redes sociales."
          }
        ]
      },
      projects: {
        title: "Proyectos",
        highlight: "Destacados",
        description: "Una intersección entre ingeniería robusta y liderazgo estratégico.",
        list: [
          {
            id: "marte",
            title: "Escape from Marte",
            tag: "[WEB_APP] // REACT & VERCEL",
            description: "Orquesté el desarrollo de extremo a extremo de una plataforma interactiva. Arquitecté componentes frontend escalables utilizando React, asegurando tuberías de despliegue continuo sin tiempo de inactividad a través de Vercel."
          },
          {
            id: "ieee-lead",
            title: "Estrategia de Liderazgo IEEE",
            tag: "[GESTIÓN] // GESTIÓN DE ING.",
            description: "Dirigí equipos multifuncionales para ejecutar eventos técnicos de alto impacto. Mentor de estudiantes de ingeniería y alineación de estrategias operativas con objetivos académicos."
          },
          {
            id: "backend",
            title: "Arquitecturas Backend Empresariales",
            tag: "[ARQUITECTURA] // DJANGO + SPRING BOOT",
            description: "Ingeniería de microservicios y plataformas monolíticas altamente resilientes. Diseño de APIs RESTful robustas enfocadas en escalabilidad, seguridad y flujo de datos mantenible."
          }
        ]
      }
    }
  }), []);

  const t = content[language];
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const activeExp = t.keyInitiatives.entries[activeExpIndex];

  return (
    <main className="min-h-screen bg-background text-slate-200 selection:bg-primary/30 relative overflow-hidden">
      <PortfolioHero />

      {/* Experience Shader Section */}
      <section id="skills" className="w-full mx-auto relative z-10 font-sans mt-24 mb-12">
        <ExperienceShader />
      </section>

      {/* Professional Experience - Terminal Style */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-24 relative z-10 font-mono">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-sans">
            {t.keyInitiatives.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">{t.keyInitiatives.highlight}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg relative font-light font-sans">
            {t.keyInitiatives.description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Top Slider */}
          <div className="md:w-1/3 flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {t.keyInitiatives.entries.map((exp, index) => (
              <button
                key={exp.id}
                onClick={() => setActiveExpIndex(index)}
                className={`text-left px-6 py-4 rounded-xl border transition-all duration-300 min-w-[260px] md:min-w-0 ${ 
                  activeExpIndex === index 
                    ? "bg-[#020617] border-sky-400/50 text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.15)]" 
                    : "bg-[#0a0f25]/40 border-white/5 text-slate-400 hover:bg-[#020617]/60 hover:border-white/10"
                }`}
              >
                <div className="text-xs tracking-wider mb-2 opacity-70">{exp.company}</div>
                <div className="font-semibold text-sm">{exp.title}</div>
              </button>
            ))}
          </div>

          {/* Main Console */}
          <div className="md:w-2/3 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative bg-[#020617] rounded-2xl border border-white/10 overflow-hidden shadow-2xl h-[400px] flex flex-col">
              {/* Chrome Controls */}
              <div className="bg-[#0a0f25] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <Terminal size={12} />
                  <span>root@portfolio:~/icesi-university</span>
                </div>
                <div className="w-12"></div> {/* Spacer for symmetry */}
              </div>

              {/* Terminal Content */}
              <div className="p-6 flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeExp.id + language} // Add language to key to force re-animation on toggle
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Header */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs md:text-sm text-sky-400/80 border-b border-white/5 pb-4">
                      <div><span className="text-slate-500">{t.keyInitiatives.roleLabel}</span><br className="hidden sm:block"/> <span className="text-white mt-1 block">{activeExp.title}</span></div>
                      <div><span className="text-slate-500">{t.keyInitiatives.companyLabel}</span><br className="hidden sm:block"/> <span className="text-white mt-1 block">{activeExp.company}</span></div>
                      <div><span className="text-slate-500">{t.keyInitiatives.periodLabel}</span><br className="hidden sm:block"/> <span className="text-white mt-1 block">{activeExp.period}</span></div>
                    </div>

                    {/* Execution Prompt */}
                    <div className="text-sm md:text-base text-slate-300 leading-relaxed">
                      <div className="text-sky-400 mb-4 flex items-center gap-2">
                        <span className="text-cyan-400">{'->'}</span> {t.keyInitiatives.execPrompt.split(':')[0]}: <span className="text-white">{t.keyInitiatives.execPrompt.split(':')[1].trim()}</span>
                      </div>
                      <p className="border-l-2 border-sky-500/30 pl-4 py-1 text-slate-400">
                        {activeExp.bullets}
                      </p>
                    </div>

                    {/* Blinking Cursor */}
                    <div className="flex items-center gap-2 mt-8 text-sky-400/50 text-sm">
                      <span>root@portfolio:~/$</span>
                      <span className="w-2 h-4 bg-sky-400 animate-pulse"></span>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Bento Grid */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t.projects.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">{t.projects.highlight}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg relative font-light">
            {t.projects.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(300px,_auto)] gap-6">
          
          {/* Escape from Marte (Main) */}
          <div className="group relative md:col-span-2 md:row-span-2 rounded-3xl bg-[#0a0f25]/40 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-sky-400/30 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)] hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-2 group-hover:translate-x-2">
              <ArrowUpRight size={48} className="text-sky-400" />
            </div>
            {/* Background glowing orb */}
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-sky-500/20 blur-[100px] rounded-full group-hover:bg-sky-400/30 transition-colors duration-700"></div>
            
            <div className="z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-sky-400/10 text-sky-400">
                  < Rocket size={24} />
                </div>
                <span className="font-mono text-xs tracking-wider text-sky-400">
                  {t.projects.list[0].tag}
                </span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t.projects.list[0].title}</h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                {t.projects.list[0].description}
              </p>
            </div>
            
            <div className="z-10 mt-12">
              <div className="w-full h-56 bg-[#020617] border border-white/5 rounded-2xl overflow-hidden relative group-hover:border-sky-500/20 transition-colors duration-500">
                {/* Simulated UI or Project Graphic */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#020617] to-slate-900 p-6 flex flex-col">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="flex-1 w-full border border-sky-500/10 rounded-xl flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-sky-500/5 group-hover:bg-sky-500/10 transition-colors"></div>
                    <span className="font-mono text-sky-400/50 text-sm tracking-widest relative z-10 backdrop-blur-sm px-4 py-2 rounded-full border border-sky-400/10">SYSTEM_ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* IEEE Leadership */}
          <div className="group relative rounded-3xl bg-[#0a0f25]/40 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 text-cyan-400">
              <ArrowUpRight size={24} />
            </div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-700"></div>
            
            <div className="z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Users size={20} />
                </div>
                <span className="font-mono text-xs tracking-wider text-cyan-400">
                  {t.projects.list[1].tag}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{t.projects.list[1].title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.projects.list[1].description}
              </p>
            </div>
          </div>

          {/* Backend Lab */}
          <div className="group relative rounded-3xl bg-[#0a0f25]/40 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-sky-400/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] hover:-translate-y-1">
             <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 text-sky-400">
              <ArrowUpRight size={24} />
            </div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-sky-500/10 blur-[80px] rounded-full group-hover:bg-sky-400/20 transition-colors duration-700"></div>
            
            <div className="z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-sky-400/10 text-sky-400">
                  <Server size={20} />
                </div>
                <span className="font-mono text-xs tracking-wider text-sky-400 truncate break-all">
                  {t.projects.list[2].tag}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{t.projects.list[2].title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.projects.list[2].description}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
