"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Reveal from "@/components/hud/Reveal";
import DecodeText from "@/components/hud/DecodeText";
import { personalInfo, socialLinks } from "@/lib/data";

// EmailJS — template variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
const EMAILJS_SERVICE_ID = "service_7m9kqsk";
const EMAILJS_TEMPLATE_ID = "template_5n1egvi";
const EMAILJS_PUBLIC_KEY = "BAik8CLqyhmKneam7";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});
type FormData = z.infer<typeof formSchema>;
type Status = "idle" | "sending" | "sent" | "error";

const socialIcons = { github: FaGithub, linkedin: FaLinkedin, mail: Mail } as const;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block mb-3">
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="block mt-1 font-mono text-[11px] text-red-400">! {error}</span>}
    </label>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }, []);

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      });
      setStatus("sent");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact" className="pt-[110px] pb-10">
      <Reveal className="hud !p-[clamp(22px,4vw,40px)] grid grid-cols-1 min-[900px]:grid-cols-2 gap-8 items-center">
        <div>
          <div className="tag"><span className="status-on">CHANNEL OPEN</span></div>
          <h2 className="font-display text-[clamp(30px,5vw,54px)] leading-[1.05] my-4">
            <DecodeText text="ESTABLISH" />
            <br />
            <span className="outline-text">UPLINK</span>
          </h2>
          <p className="text-muted-hud leading-[1.75]">
            Internships, collaborations or a project you need built — transmit a message and I&apos;ll get back to you.
          </p>
          <ul className="mt-6 space-y-2 font-mono text-[13px]">
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-cyan-hud" />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-cyan-hud">{personalInfo.email}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-cyan-hud" />
              <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} className="hover:text-cyan-hud">{personalInfo.phone}</a>
            </li>
            <li className="flex items-center gap-2.5 text-muted-hud">
              <MapPin size={14} className="text-cyan-hud" />
              {personalInfo.location}
            </li>
          </ul>
          <div className="flex gap-2.5 mt-6">
            {socialLinks.map((s) => {
              const Icon = socialIcons[s.icon as keyof typeof socialIcons] ?? Mail;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 grid place-items-center border border-[var(--line)] text-cyan-hud transition-all hover:border-cyan-hud hover:shadow-[0_0_16px_rgba(34,211,238,.4)]"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field label="IDENT // NAME" error={errors.name?.message}>
            <input {...register("name")} className="field-input" placeholder="Jane Perera" aria-invalid={!!errors.name} />
          </Field>
          <Field label="RETURN ADDRESS // EMAIL" error={errors.email?.message}>
            <input {...register("email")} type="email" className="field-input" placeholder="jane@company.com" aria-invalid={!!errors.email} />
          </Field>
          <Field label="SUBJECT" error={errors.subject?.message}>
            <input {...register("subject")} className="field-input" placeholder="Internship opportunity" aria-invalid={!!errors.subject} />
          </Field>
          <Field label="PAYLOAD // MESSAGE" error={errors.message?.message}>
            <textarea {...register("message")} rows={4} className="field-input resize-y" placeholder="We'd like to talk about…" aria-invalid={!!errors.message} />
          </Field>
          <div className="flex items-center gap-4 flex-wrap mt-2">
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Transmitting…" : "Transmit ▶"}
            </button>
            <span className="font-mono text-xs" role="status">
              {status === "sent" && <span className="text-green-hud">✓ Message received — I&apos;ll reply soon.</span>}
              {status === "error" && (
                <span className="text-red-400">
                  ✕ Transmission failed. Email me at {personalInfo.email}.
                </span>
              )}
            </span>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
