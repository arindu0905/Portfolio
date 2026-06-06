"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import {
  Mail, Phone, MapPin,
  Send, CheckCircle, AlertCircle, Loader2
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import SectionHeader from "@/components/common/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { personalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

// ── EmailJS config ──────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free)
// 2. Create a Service (Gmail) → copy Service ID below
// 3. Create a Template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//    Set "To Email" in the template to arindumandinu2004@gmail.com
// 4. Copy Template ID & Public Key below
const EMAILJS_SERVICE_ID  = "service_7m9kqsk";
const EMAILJS_TEMPLATE_ID = "template_5n1egvi";
const EMAILJS_PUBLIC_KEY  = "BAik8CLqyhmKneam7";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof formSchema>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

const contactInfo = [
  { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  { icon: MapPin, label: "Location", value: personalInfo.location, href: undefined },
];

const socialLinks = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/" },
  { icon: Mail, label: "Email", href: `mailto:${personalInfo.email}` },
];

/* Shared input styles */
const inputBase =
  "w-full px-4 py-3 rounded-xl text-sm text-theme-primary placeholder-[var(--text-muted)] focus:outline-none transition-all duration-200";

export default function Contact() {
  const { ref, isInView } = useInView();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Initialise EmailJS once on mount
  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  data.name,
          from_email: data.email,
          subject:    data.subject,
          message:    data.message,
        }
      );
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error
        ? err.message
        : (typeof err === "object" && err !== null && "text" in err)
          ? String((err as { text: unknown }).text)
          : JSON.stringify(err);
      console.error("EmailJS error:", err);
      setErrorMsg(msg);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 section-bg-alt relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
        />

        <div ref={ref} className="grid lg:grid-cols-5 gap-10">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Contact details */}
            <div className="p-6 rounded-2xl theme-card">
              <h3 className="text-base font-black text-theme-primary mb-5 tracking-tight">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "var(--accent-subtle)", border: "1px solid var(--border-color)" }}
                    >
                      <Icon size={13} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <p className="text-[10px] text-theme-muted font-bold uppercase tracking-[0.12em] mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-theme-secondary hover:text-theme-primary transition-colors text-sm font-medium break-all">
                          {value}
                        </a>
                      ) : (
                        <p className="text-theme-secondary text-sm font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="p-6 rounded-2xl theme-card">
              <h3 className="text-[10px] font-bold text-theme-muted uppercase tracking-[0.15em] mb-4">
                Connect With Me
              </h3>
              <div className="flex gap-2.5">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="btn-icon w-10 h-10 rounded-xl flex items-center justify-center"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-5 rounded-2xl theme-card">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-theme-primary font-bold text-sm">Available for Work</span>
              </div>
              <p className="text-theme-secondary text-sm leading-relaxed">
                Currently open to internship positions, graduate roles, and exciting freelance projects.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 md:p-8 rounded-2xl theme-card space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-theme-muted uppercase tracking-[0.12em] mb-2">
                    Your Name
                  </label>
                  <input
                    {...register("name")}
                    className={cn(
                      inputBase,
                      "theme-card",
                      errors.name
                        ? "border-red-500/60 focus:ring-2 focus:ring-red-500/30"
                        : "focus:ring-2 focus:ring-[var(--border-hover)]"
                    )}
                    style={{ background: "var(--bg-primary)" }}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-theme-muted uppercase tracking-[0.12em] mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className={cn(
                      inputBase,
                      "theme-card",
                      errors.email
                        ? "border-red-500/60 focus:ring-2 focus:ring-red-500/30"
                        : "focus:ring-2 focus:ring-[var(--border-hover)]"
                    )}
                    style={{ background: "var(--bg-primary)" }}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-theme-muted uppercase tracking-[0.12em] mb-2">
                  Subject
                </label>
                <input
                  {...register("subject")}
                  className={cn(
                    inputBase,
                    "theme-card",
                    errors.subject
                      ? "border-red-500/60 focus:ring-2 focus:ring-red-500/30"
                      : "focus:ring-2 focus:ring-[var(--border-hover)]"
                  )}
                  style={{ background: "var(--bg-primary)" }}
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-theme-muted uppercase tracking-[0.12em] mb-2">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className={cn(
                    inputBase,
                    "theme-card resize-none",
                    errors.message
                      ? "border-red-500/60 focus:ring-2 focus:ring-red-500/30"
                      : "focus:ring-2 focus:ring-[var(--border-hover)]"
                  )}
                  style={{ background: "var(--bg-primary)" }}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2",
                  status === "success"
                    ? "bg-green-600 text-white"
                    : status === "error"
                    ? "bg-red-600 text-white"
                    : "btn-accent"
                )}
              >
                {status === "loading" && <Loader2 size={15} className="animate-spin" />}
                {status === "success" && <CheckCircle size={15} />}
                {status === "error" && <AlertCircle size={15} />}
                {status === "loading"
                  ? "Sending..."
                  : status === "success"
                  ? "Message Sent!"
                  : status === "error"
                  ? "Failed to Send"
                  : (<><Send size={14} />Send Message</>)}
              </motion.button>

              {/* Show exact error for debugging */}
              {status === "error" && errorMsg && (
                <p className="text-xs text-red-400 text-center mt-2 break-all">
                  ⚠️ {errorMsg}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
