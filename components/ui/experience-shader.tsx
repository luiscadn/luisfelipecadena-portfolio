"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"

export default function ResumePage() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  const t = {
    es: {
      subtitle: "INGENIERO DE SOFTWARE &\nENTUSIASTA DEL MANAGEMENT",
      skills: {
        mgmt: { title: "Gestión", text: "Metodologías Ágiles, Patrones de diseño, UML, Liderazgo." },
        lang: { title: "Lenguajes", text: "Java, Python, SQL, JavaScript." },
        fw: { title: "Frameworks", text: "Spring Boot, Django, Node.js." },
        db: { title: "Bases de Datos", text: "PostgreSQL, MongoDB, MySQL." }
      }
    },
    en: {
      subtitle: "SOFTWARE ENGINEER &\nMANAGEMENT ENTHUSIAST",
      skills: {
        mgmt: { title: "Management", text: "Agile Methodologies, Design patterns, UML, Leadership." },
        lang: { title: "Languages", text: "Java, Python, SQL, JavaScript." },
        fw: { title: "Frameworks", text: "Spring Boot, Django, Node.js." },
        db: { title: "Databases", text: "PostgreSQL, MongoDB, MySQL." }
      }
    }
  }[language];

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted ? resolvedTheme === "dark" : true

  return (
    <div className={`relative w-[90vw] max-w-[1400px] mx-auto min-h-[700px] overflow-hidden grid grid-cols-1 md:grid-cols-12 border rounded-[40px] transition-colors duration-500 shadow-2xl ${isDarkMode ? "bg-[#020617] text-white border-white/5" : "bg-[#f8fafc] text-[#020617] border-slate-200"}`}>
      <div
        className={`md:col-span-5 p-12 md:p-16 font-mono relative z-10 flex flex-col justify-center ${
          isDarkMode ? "bg-[#020617] text-white" : "bg-[#f8fafc] text-[#020617]"
        }`}
      >
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-lg md:text-xl font-bold mb-8 text-[#38bdf8]">lfcadenac@outlook.com</h1>
          <div className="mb-6">
            <h2 className="text-6xl font-bold tracking-tighter leading-[0.9] uppercase">luiscadn <br/> </h2>
            <h3 className="text-lg tracking-wide font-semibold text-[#38bdf8] mt-6 uppercase leading-tight whitespace-pre-line">{t.subtitle}</h3>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-8 text-base md:text-lg">
          <div className="flex flex-col border-l-4 border-[#0ea5e9]/30 pl-6">
            <span className="font-semibold text-[#0ea5e9] uppercase tracking-widest text-xs md:text-sm mb-2">{t.skills.mgmt.title}</span>
            <span className="opacity-90 font-medium leading-relaxed">{t.skills.mgmt.text}</span>
          </div>
          <div className="flex flex-col border-l-4 border-[#38bdf8]/30 pl-6">
            <span className="font-semibold text-[#38bdf8] uppercase tracking-widest text-xs md:text-sm mb-2">{t.skills.lang.title}</span>
            <span className="opacity-90 font-medium whitespace-nowrap">{t.skills.lang.text}</span>
          </div>
          <div className="flex flex-col border-l-4 border-[#0ea5e9]/30 pl-6">
            <span className="font-semibold text-[#0ea5e9] uppercase tracking-widest text-xs md:text-sm mb-2">{t.skills.fw.title}</span>
            <span className="opacity-90 font-medium whitespace-nowrap">{t.skills.fw.text}</span>
          </div>
          <div className="flex flex-col border-l-4 border-[#38bdf8]/30 pl-6">
            <span className="font-semibold text-[#38bdf8] uppercase tracking-widest text-xs md:text-sm mb-2">{t.skills.db.title}</span>
            <span className="opacity-90 font-medium whitespace-nowrap">{t.skills.db.text}</span>
          </div>
        </div>
      </div>

      <div className="md:col-span-7 relative min-h-[400px] overflow-hidden">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isDarkMode ? "#020617" : "#f8fafc"}
          colorFront={isDarkMode ? "#38bdf8" : "#0ea5e9"}
          // @ts-expect-error Easter egg as explicitly requested
          shape="cat"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={1.3}
          rotation={0}
          speed={0.1}
        />
      </div>
    </div>
  )
}
