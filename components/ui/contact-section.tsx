"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Send, MapPin, Mail, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

// Scoped Fonts to respect the global reversion while delivering "Boutique Studio" here
const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactSection() {
  const { language } = useLanguage();

  const content = {
    en: {
      leftTitle: "Send a Message",
      leftDesc: "Fill out the form below and I'll get back to you soon.",
      form: {
        name: "Name *",
        namePlaceholder: "Your full name",
        email: "Email *",
        emailPlaceholder: "your.email@example.com",
        subject: "Subject *",
        subjectPlaceholder: "What's this about?",
        message: "Message *",
        messagePlaceholder: "Tell me about your project, question, or opportunity...",
        sendBtn: "Send Message",
        sendingBtn: "Sending...",
      },
      rightInfoTitle: "Contact Information",
      rightInfoDesc: "Prefer to reach out directly? Here are my contact details.",
      rightSocialTitle: "Connect With Me",
      rightSocialDesc: "Follow me on social media and professional networks.",
      labels: {
        email: "Email",
        location: "Location",
      },
      locationVal: "Cali, Colombia",
      validation: {
        required: "This field is required",
        invalidEmail: "Please enter a valid email address",
      },
      toastSuccess: "Message sent successfully! I will contact you soon.",
      toastError: "There was a problem sending. Please try again.",
    },
    es: {
      leftTitle: "Envía un Mensaje",
      leftDesc: "Completa el siguiente formulario y te responderé a la brevedad.",
      form: {
        name: "Nombre *",
        namePlaceholder: "Tu nombre completo",
        email: "Correo *",
        emailPlaceholder: "tu.correo@ejemplo.com",
        subject: "Asunto *",
        subjectPlaceholder: "¿De qué se trata?",
        message: "Mensaje *",
        messagePlaceholder: "Cuéntame sobre tu proyecto, pregunta u oportunidad...",
        sendBtn: "Enviar Mensaje",
        sendingBtn: "Enviando...",
      },
      rightInfoTitle: "Información de Contacto",
      rightInfoDesc: "¿Prefieres contactarme directamente? Aquí están mis detalles.",
      rightSocialTitle: "Conecta Conmigo",
      rightSocialDesc: "Sígueme en redes sociales y redes profesionales.",
      labels: {
        email: "Correo",
        location: "Ubicación",
      },
      locationVal: "Cali, Colombia",
      validation: {
        required: "Este campo es obligatorio",
        invalidEmail: "Por favor ingresa un correo válido",
      },
      toastSuccess: "¡Mensaje enviado con éxito! Me pondré en contacto pronto.",
      toastError: "Hubo un problema al enviar. Por favor, inténtalo de nuevo.",
    }
  };

  const t = content[language];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const accessKey = "b8a395a0-0f3e-4c12-8ca8-e686a28a0e15";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...data,
          from_name: data.name,
          subject: data.subject || "Nuevo mensaje desde el Portafolio",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(t.toastSuccess, {
          style: {
            background: "#020617",
            color: "#f8fafc",
            border: "1px solid rgba(56,189,248,0.3)"
          }
        });
        reset();
      } else {
        throw new Error(result.message || "Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t.toastError, {
        style: {
          background: "#020617",
          color: "#f8fafc",
          border: "1px solid rgba(220,38,38,0.3)"
        }
      });
    }
  };

  return (
    <section id="contact" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Side: Form */}
        <div className="lg:col-span-7 bg-[#0a0f25]/40 backdrop-blur-md border border-white/5 shadow-2xl rounded-3xl p-8 md:p-10 transition-colors duration-500 hover:border-sky-400/20">
          <div className="mb-8">
            <h2 className={`${headingFont.className} text-3xl font-extrabold text-white mb-2 tracking-tighter leading-tight`}>
              {t.leftTitle}
            </h2>
            <p className="text-slate-400 font-medium">
              {t.leftDesc}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2 ml-1">{t.form.name}</label>
              <input
                {...register("name", { required: t.validation.required })}
                className="w-full bg-[#020617]/60 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/50 transition-all duration-300"
                placeholder={t.form.namePlaceholder}
              />
              {errors.name && <span className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2 ml-1">{t.form.email}</label>
              <input
                {...register("email", {
                  required: t.validation.required,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t.validation.invalidEmail
                  }
                })}
                className={`w-full bg-[#020617]/60 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/50 transition-all duration-300 ${monoFont.className}`}
                placeholder={t.form.emailPlaceholder}
              />
              {errors.email && <span className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2 ml-1">{t.form.subject}</label>
              <input
                {...register("subject", { required: t.validation.required })}
                className="w-full bg-[#020617]/60 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/50 transition-all duration-300"
                placeholder={t.form.subjectPlaceholder}
              />
              {errors.subject && <span className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.subject.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2 ml-1">{t.form.message}</label>
              <textarea
                {...register("message", { required: t.validation.required })}
                rows={5}
                className="w-full bg-[#020617]/60 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/50 transition-all duration-300 resize-none"
                placeholder={t.form.messagePlaceholder}
              />
              {errors.message && <span className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#020617] font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.form.sendingBtn}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t.form.sendBtn}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Information & Social */}
        <div className="lg:col-span-5 flex flex-col gap-8">

          {/* Contact Details Card */}
          <div className="bg-[#0a0f25]/40 backdrop-blur-md border border-white/5 shadow-2xl rounded-3xl p-8 hover:border-sky-400/20 transition-colors duration-500">
            <h3 className={`${headingFont.className} text-xl font-bold text-white mb-2 tracking-tight`}>
              {t.rightInfoTitle}
            </h3>
            <p className="text-slate-400 font-medium mb-6 text-sm">
              {t.rightInfoDesc}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#020617]/50 border border-white/5 group hover:border-sky-500/20 transition-colors">
                <div className="bg-[#38bdf8]/10 p-3 rounded-xl text-[#38bdf8] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{t.labels.email}</div>
                  <div className={`${monoFont.className} text-slate-400 text-sm break-all`}>lfcadenac@outlook.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#020617]/50 border border-white/5 group hover:border-sky-500/20 transition-colors">
                <div className="bg-[#38bdf8]/10 p-3 rounded-xl text-[#38bdf8] group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{t.labels.location}</div>
                  <div className={`${monoFont.className} text-slate-400 text-sm`}>{t.locationVal}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="bg-[#0a0f25]/40 backdrop-blur-md border border-white/5 shadow-2xl rounded-3xl p-8 hover:border-sky-400/20 transition-colors duration-500">
            <h3 className={`${headingFont.className} text-xl font-bold text-white mb-2 tracking-tight`}>
              {t.rightSocialTitle}
            </h3>
            <p className="text-slate-400 font-medium mb-6 text-sm">
              {t.rightSocialDesc}
            </p>

            <div className="space-y-4">
              <a href="https://github.com/luiscadn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#020617]/50 border border-white/5 group hover:border-sky-500/20 transition-colors">
                <div className="bg-[#38bdf8]/10 p-3 rounded-xl text-[#38bdf8] group-hover:scale-110 transition-transform">
                  <GitHubIcon />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">GitHub</div>
                  <div className={`${monoFont.className} text-slate-400 text-sm`}>@luiscadn</div>
                </div>
              </a>

              <a href="https://linkedin.com/in/luis-felipe-cadena-cortes/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#020617]/50 border border-white/5 group hover:border-sky-500/20 transition-colors">
                <div className="bg-[#38bdf8]/10 p-3 rounded-xl text-[#38bdf8] group-hover:scale-110 transition-transform">
                  <LinkedInIcon />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">LinkedIn</div>
                  <div className={`${monoFont.className} text-slate-400 text-sm truncate`}>Luis Felipe Cadena Cortés</div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
