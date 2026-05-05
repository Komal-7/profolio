"use client";

import React from "react";
import { ComponentConfig, FieldLabel, DropZone } from "@measured/puck";

// ─── CUSTOM COLOR PICKER FIELD ────────────────────────────────────────────────
const ColorField = (label: string) => ({
  type: "custom" as const,
  label,
  render: ({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
    <FieldLabel label={label}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg cursor-pointer border border-white/20 bg-transparent p-0"
          style={{ WebkitAppearance: "none" }}
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-slate-200 font-mono"
        />
      </div>
    </FieldLabel>
  ),
});

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
export type NavbarProps = {
  name: string;
  links: { label: string; href: string }[];
  bgColor: string;
  textColor: string;
};

export const NavbarComponent: ComponentConfig<NavbarProps> = {
  label: "Navbar",
  fields: {
    name: { type: "text", label: "Your Name" },
    links: {
      type: "array",
      label: "Nav Links",
      arrayFields: {
        label: { type: "text", label: "Link Text" },
        href: { type: "text", label: "Link URL (e.g. #about)" },
      },
      defaultItemProps: { label: "Link", href: "#" },
      getItemSummary: (item) => item.label || "Link",
    },
    bgColor: ColorField("Background Color"),
    textColor: ColorField("Text Color"),
  },
  defaultProps: {
    name: "Your Name",
    links: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" },
    ],
    bgColor: "#0f172a",
    textColor: "#f8fafc",
  },
  render: ({ name, links, bgColor, textColor }) => (
    <nav
      className="w-full px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50"
      style={{
        backgroundColor: bgColor + "cc",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
      }}
    >
      <a
        href="#"
        className="text-xl font-bold tracking-tight no-underline transition-all duration-300 hover:scale-105"
        style={{
          color: textColor,
          background: `linear-gradient(135deg, ${textColor}, ${textColor}99)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {name}
      </a>
      <ul className="flex gap-1 md:gap-2 list-none m-0 p-0">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith("#")) {
                  e.preventDefault();
                  const targetId = link.href.substring(1);
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                    // Update URL hash
                    window.history.pushState(null, "", link.href);
                  }
                }
              }}
              className="relative px-3 md:px-4 py-2 text-sm font-medium no-underline rounded-lg transition-all duration-300 hover:bg-white/5 group"
              style={{ color: textColor + "cc" }}
            >
              {link.label}
              <span
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-4/5"
                style={{ backgroundColor: textColor }}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  ),
};

// ─── HERO SECTION ──────────────────────────────────────────────────────────────
export type HeroProps = {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  bgColor: string;
  textColor: string;
};

export const HeroComponent: ComponentConfig<HeroProps> = {
  label: "Hero Section",
  fields: {
    headline: { type: "text", label: "Headline" },
    subheadline: { type: "textarea", label: "Subheadline" },
    ctaText: { type: "text", label: "Button Text" },
    ctaHref: { type: "text", label: "Button Link (e.g. #projects)" },
    bgColor: ColorField("Background Color"),
    textColor: ColorField("Text Color"),
  },
  defaultProps: {
    headline: "Crafting Digital Experiences",
    subheadline:
      "Full-stack developer specializing in building exceptional web applications. I transform ideas into elegant, performant solutions that users love.",
    ctaText: "View My Work",
    ctaHref: "#projects",
    bgColor: "#0f172a",
    textColor: "#f8fafc",
  },
  render: ({ headline, subheadline, ctaText, ctaHref, bgColor, textColor }) => (
    <section
      className="relative w-full flex flex-col items-center justify-center text-center px-6 md:px-8 py-24 overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120,119,198,0.3), transparent),
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(59,130,246,0.2), transparent),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(147,51,234,0.2), transparent)
          `,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(${textColor} 1px, transparent 1px), linear-gradient(90deg, ${textColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Headline with gradient */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight"
          style={{
            background: `linear-gradient(180deg, ${textColor} 0%, ${textColor}70 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {headline}
        </h1>

        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: textColor + "99" }}
        >
          {subheadline}
        </p>

        {/* CTA Button with gradient */}
        <a
          href={ctaHref}
          className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold no-underline transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{
            background: `linear-gradient(135deg, #3b82f6, #8b5cf6)`,
            color: "#ffffff",
            boxShadow: "0 0 40px rgba(59,130,246,0.3)",
          }}
        >
          {ctaText}
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  ),
};

// ─── ABOUT SECTION ─────────────────────────────────────────────────────────────
export type AboutProps = {
  sectionId: string;
  title: string;
  bio: string;
  imageUrl: string;
  bgColor: string;
  textColor: string;
};

export const AboutComponent: ComponentConfig<AboutProps> = {
  label: "About Section",
  fields: {
    sectionId: { type: "text", label: "Section ID (without #, e.g. about)" },
    title: { type: "text", label: "Section Title" },
    bio: { type: "textarea", label: "Bio / About Me" },
    imageUrl: { type: "text", label: "Profile Photo URL" },
    bgColor: ColorField("Background Color"),
    textColor: ColorField("Text Color"),
  },
  defaultProps: {
    sectionId: "about",
    title: "About Me",
    bio: "I'm a passionate full-stack developer with 5+ years of experience building web applications that make a difference. I specialize in React, Node.js, and cloud technologies.\n\nWhen I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers. I believe in writing clean, maintainable code and creating intuitive user experiences.",
    imageUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=1e293b",
    bgColor: "#1e293b",
    textColor: "#f8fafc",
  },
  render: ({ sectionId, title, bio, imageUrl, bgColor, textColor }) => (
    <section
      id={sectionId}
      className="relative w-full px-6 md:px-8 py-24 overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span
            className="text-sm font-medium uppercase tracking-widest"
            style={{ color: "#3b82f6" }}
          >
            About
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: textColor + "20" }} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image with decorative elements */}
          <div className="relative flex justify-center items-center">
            {/* Decorative gradient blob */}
            <div
              className="absolute -inset-4 blur-3xl opacity-30 rounded-full"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              }}
            />

            {/* Image container with gradient ring */}
            <div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl p-1"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
              }}
            >
              <div
                className="w-full h-full rounded-xl overflow-hidden"
                style={{ backgroundColor: bgColor }}
              >
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating accent shapes */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-xl rotate-12 opacity-20"
              style={{ backgroundColor: "#3b82f6" }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-20"
              style={{ backgroundColor: "#8b5cf6" }}
            />
          </div>

          {/* Text content */}
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                background: `linear-gradient(135deg, ${textColor}, ${textColor}99)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title}
            </h2>
            <div
              className="text-base md:text-lg leading-relaxed whitespace-pre-line"
              style={{ color: textColor + "bb" }}
            >
              {bio}
            </div>
          </div>
        </div>
      </div>
    </section>
  ),
};

// ─── PROJECTS SECTION ──────────────────────────────────────────────────────────
export type ProjectsProps = {
  sectionId: string;
  title: string;
  projects: {
    name: string;
    description: string;
    techStack: string;
    link: string;
  }[];
  bgColor: string;
  textColor: string;
  cardBgColor: string;
};

export const ProjectsComponent: ComponentConfig<ProjectsProps> = {
  label: "Projects Section",
  fields: {
    sectionId: { type: "text", label: "Section ID (without #, e.g. projects)" },
    title: { type: "text", label: "Section Title" },
    projects: {
      type: "array",
      label: "Projects",
      arrayFields: {
        name: { type: "text", label: "Project Name" },
        description: { type: "textarea", label: "Description" },
        techStack: { type: "text", label: "Tech Stack (comma separated)" },
        link: { type: "text", label: "Project URL" },
      },
      defaultItemProps: {
        name: "New Project",
        description: "A cool project I built.",
        techStack: "React, Node.js",
        link: "#",
      },
      getItemSummary: (item) => item.name || "Project",
    },
    bgColor: ColorField("Background Color"),
    textColor: ColorField("Text Color"),
    cardBgColor: ColorField("Card Background"),
  },
  defaultProps: {
    sectionId: "projects",
    title: "Featured Projects",
    projects: [
      {
        name: "CloudSync Platform",
        description:
          "A real-time collaboration platform with end-to-end encryption, supporting 10k+ concurrent users with sub-100ms latency.",
        techStack: "Next.js, WebSockets, Redis, PostgreSQL",
        link: "https://example.com",
      },
      {
        name: "AI Content Studio",
        description:
          "AI-powered content generation tool that helps creators produce high-quality articles, social posts, and marketing copy.",
        techStack: "React, Python, OpenAI, FastAPI",
        link: "https://example.com",
      },
      {
        name: "FinTrack Mobile",
        description:
          "Personal finance app with smart budgeting, investment tracking, and AI-driven insights for better financial decisions.",
        techStack: "React Native, Node.js, MongoDB",
        link: "https://example.com",
      },
    ],
    bgColor: "#0f172a",
    textColor: "#f8fafc",
    cardBgColor: "#1e293b",
  },
  render: ({ sectionId, title, projects, bgColor, textColor, cardBgColor }) => (
    <section
      id={sectionId}
      className="relative w-full px-6 md:px-8 py-24"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span
            className="text-sm font-medium uppercase tracking-widest"
            style={{ color: "#8b5cf6" }}
          >
            Portfolio
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: textColor + "20" }} />
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{
            background: `linear-gradient(135deg, ${textColor}, ${textColor}80)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h2>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-2"
              style={{
                backgroundColor: cardBgColor + "80",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Gradient border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  padding: "1px",
                }}
              />

              {/* Project number */}
              <span
                className="text-5xl font-bold opacity-10"
                style={{ color: textColor }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                className="text-xl font-bold -mt-4"
                style={{ color: textColor }}
              >
                {project.name}
              </h3>

              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: textColor + "99" }}
              >
                {project.description}
              </p>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.split(",").map((tech, j) => (
                  <span
                    key={j}
                    className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{
                      backgroundColor: "rgba(139,92,246,0.15)",
                      color: "#a78bfa",
                      border: "1px solid rgba(139,92,246,0.2)",
                    }}
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              {/* View project link */}
              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium mt-2 no-underline group/link"
                  style={{ color: "#3b82f6" }}
                >
                  View Project
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
};

// ─── SKILLS SECTION ────────────────────────────────────────────────────────────
export type SkillsProps = {
  sectionId: string;
  title: string;
  skills: { name: string; level: string }[];
  bgColor: string;
  textColor: string;
  accentColor: string;
};

export const SkillsComponent: ComponentConfig<SkillsProps> = {
  label: "Skills Section",
  fields: {
    sectionId: { type: "text", label: "Section ID (without #, e.g. skills)" },
    title: { type: "text", label: "Section Title" },
    skills: {
      type: "array",
      label: "Skills",
      arrayFields: {
        name: { type: "text", label: "Skill Name" },
        level: {
          type: "select",
          label: "Proficiency Level",
          options: [
            { label: "Beginner (20%)", value: "20" },
            { label: "Elementary (35%)", value: "35" },
            { label: "Intermediate (50%)", value: "50" },
            { label: "Upper Intermediate (65%)", value: "65" },
            { label: "Advanced (80%)", value: "80" },
            { label: "Expert (90%)", value: "90" },
            { label: "Master (100%)", value: "100" },
          ],
        },
      },
      defaultItemProps: { name: "New Skill", level: "50" },
      getItemSummary: (item) => item.name || "Skill",
    },
    bgColor: ColorField("Background Color"),
    textColor: ColorField("Text Color"),
    accentColor: ColorField("Progress Bar Color"),
  },
  defaultProps: {
    sectionId: "skills",
    title: "Skills & Expertise",
    skills: [
      { name: "React / Next.js", level: "90" },
      { name: "TypeScript", level: "90" },
      { name: "Node.js", level: "80" },
      { name: "Python", level: "80" },
      { name: "PostgreSQL", level: "80" },
      { name: "AWS / Cloud", level: "50" },
    ],
    bgColor: "#1e293b",
    textColor: "#f8fafc",
    accentColor: "#3b82f6",
  },
  render: ({ sectionId, title, skills, bgColor, textColor, accentColor }) => (
    <section
      id={sectionId}
      className="relative w-full px-6 md:px-8 py-24 overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 blur-3xl opacity-10 rounded-full"
        style={{ backgroundColor: accentColor }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span
            className="text-sm font-medium uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            Expertise
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: textColor + "20" }} />
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{
            background: `linear-gradient(135deg, ${textColor}, ${textColor}80)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h2>

        {/* Skills grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((skill, i) => (
            <div key={i} className="group">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium" style={{ color: textColor }}>
                  {skill.name}
                </span>
                <span
                  className="text-sm font-mono"
                  style={{ color: accentColor }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar container */}
              <div
                className="relative w-full h-3 rounded-full overflow-hidden"
                style={{ backgroundColor: textColor + "15" }}
              >
                {/* Gradient progress fill */}
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc, #8b5cf6)`,
                  }}
                >
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                      animation: "shimmer 2s infinite",
                    }}
                  />
                </div>

                {/* Glow effect */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full blur-sm opacity-50"
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${accentColor}, #8b5cf6)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  ),
};

// ─── FOOTER ────────────────────────────────────────────────────────────────────
export type FooterProps = {
  sectionId: string;
  heading: string;
  subheading: string;
  name: string;
  email: string;
  github: string;
  linkedin: string;
  bgColor: string;
  textColor: string;
};

export const FooterComponent: ComponentConfig<FooterProps> = {
  label: "Footer",
  fields: {
    sectionId: { type: "text", label: "Section ID (without #, e.g. contact)" },
    heading: { type: "text", label: "Footer Heading" },
    subheading: { type: "textarea", label: "Footer Subheading" },
    name: { type: "text", label: "Your Name" },
    email: { type: "text", label: "Email Address" },
    github: { type: "text", label: "GitHub Profile URL" },
    linkedin: { type: "text", label: "LinkedIn Profile URL" },
    bgColor: ColorField("Background Color"),
    textColor: ColorField("Text Color"),
  },
  defaultProps: {
    sectionId: "contact",
    heading: "Let's Work Together",
    subheading: "Have a project in mind? I'd love to hear about it. Let's create something amazing.",
    name: "Your Name",
    email: "hello@example.com",
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    bgColor: "#020617",
    textColor: "#94a3b8",
  },
  render: ({ sectionId, heading, subheading, name, email, github, linkedin, bgColor, textColor }) => (
    <footer
      id={sectionId}
      className="relative w-full px-6 md:px-8 py-16"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${textColor}30, transparent)`,
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="text-center mb-12">
          <h3
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: "#f8fafc" }}
          >
            {heading}
          </h3>
          <p
            className="text-base mb-8 max-w-md mx-auto"
            style={{ color: textColor }}
          >
            {subheading}
          </p>

          {/* Email button */}
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold no-underline transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "#ffffff",
              boxShadow: "0 0 30px rgba(59,130,246,0.3)",
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {email}
          </a>
        </div>

        {/* Social links */}
        <div className="flex justify-center items-center gap-6 mb-12">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-full transition-all duration-300 hover:scale-110 no-underline"
            style={{
              backgroundColor: textColor + "15",
              color: textColor,
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-full transition-all duration-300 hover:scale-110 no-underline"
            style={{
              backgroundColor: textColor + "15",
              color: textColor,
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        {/* Bottom section */}
        <div className="text-center">
          <p className="text-lg font-semibold mb-2" style={{ color: "#f8fafc" }}>
            {name}
          </p>

          {/* Built with badge */}
          <div className="inline-flex items-center gap-2 mt-6">
            <span className="text-xs" style={{ color: textColor + "60" }}>
              Built with
            </span>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))",
                border: "1px solid rgba(139,92,246,0.3)",
                color: "#a78bfa",
              }}
            >
              Profolio
            </span>
          </div>

          <p className="text-xs mt-4" style={{ color: textColor + "40" }}>
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// BUILDING BLOCKS - Flexible components for custom layouts
// ═══════════════════════════════════════════════════════════════════════════════

// ─── SECTION CONTAINER ─────────────────────────────────────────────────────────
export type SectionProps = {
  bgColor: string;
  paddingY: string;
  paddingX: string;
  maxWidth: string;
};

export const SectionComponent: ComponentConfig<SectionProps> = {
  label: "Section",
  fields: {
    bgColor: ColorField("Background Color"),
    paddingY: {
      type: "select",
      label: "Vertical Padding",
      options: [
        { label: "None", value: "py-0" },
        { label: "Small", value: "py-8" },
        { label: "Medium", value: "py-16" },
        { label: "Large", value: "py-24" },
        { label: "Extra Large", value: "py-32" },
      ],
    },
    paddingX: {
      type: "select",
      label: "Horizontal Padding",
      options: [
        { label: "None", value: "px-0" },
        { label: "Small", value: "px-4" },
        { label: "Medium", value: "px-8" },
        { label: "Large", value: "px-12" },
      ],
    },
    maxWidth: {
      type: "select",
      label: "Max Width",
      options: [
        { label: "Full", value: "max-w-full" },
        { label: "7xl (1280px)", value: "max-w-7xl" },
        { label: "6xl (1152px)", value: "max-w-6xl" },
        { label: "5xl (1024px)", value: "max-w-5xl" },
        { label: "4xl (896px)", value: "max-w-4xl" },
        { label: "3xl (768px)", value: "max-w-3xl" },
      ],
    },
  },
  defaultProps: {
    bgColor: "#0f172a",
    paddingY: "py-16",
    paddingX: "px-8",
    maxWidth: "max-w-6xl",
  },
  render: ({ bgColor, paddingY, paddingX, maxWidth }) => (
    <section
      className={`w-full ${paddingY} ${paddingX}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className={`${maxWidth} mx-auto`}>
        <DropZone zone="content" />
      </div>
    </section>
  ),
};

// ─── COLUMNS LAYOUT ────────────────────────────────────────────────────────────
export type ColumnsProps = {
  columns: string;
  gap: string;
  alignItems: string;
};

export const ColumnsComponent: ComponentConfig<ColumnsProps> = {
  label: "Columns",
  fields: {
    columns: {
      type: "select",
      label: "Number of Columns",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
        { label: "1/3 + 2/3", value: "1-2" },
        { label: "2/3 + 1/3", value: "2-1" },
      ],
    },
    gap: {
      type: "select",
      label: "Gap Between",
      options: [
        { label: "None", value: "gap-0" },
        { label: "Small", value: "gap-4" },
        { label: "Medium", value: "gap-8" },
        { label: "Large", value: "gap-12" },
        { label: "Extra Large", value: "gap-16" },
      ],
    },
    alignItems: {
      type: "select",
      label: "Vertical Alignment",
      options: [
        { label: "Top", value: "items-start" },
        { label: "Center", value: "items-center" },
        { label: "Bottom", value: "items-end" },
        { label: "Stretch", value: "items-stretch" },
      ],
    },
  },
  defaultProps: {
    columns: "2",
    gap: "gap-8",
    alignItems: "items-start",
  },
  render: ({ columns, gap, alignItems }) => {
    const gridClass = {
      "2": "grid-cols-1 md:grid-cols-2",
      "3": "grid-cols-1 md:grid-cols-3",
      "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      "1-2": "grid-cols-1 md:grid-cols-3",
      "2-1": "grid-cols-1 md:grid-cols-3",
    }[columns] || "grid-cols-2";

    if (columns === "1-2") {
      return (
        <div className={`grid ${gridClass} ${gap} ${alignItems}`}>
          <div className="md:col-span-1">
            <DropZone zone="left" />
          </div>
          <div className="md:col-span-2">
            <DropZone zone="right" />
          </div>
        </div>
      );
    }

    if (columns === "2-1") {
      return (
        <div className={`grid ${gridClass} ${gap} ${alignItems}`}>
          <div className="md:col-span-2">
            <DropZone zone="left" />
          </div>
          <div className="md:col-span-1">
            <DropZone zone="right" />
          </div>
        </div>
      );
    }

    const cols = parseInt(columns);
    return (
      <div className={`grid ${gridClass} ${gap} ${alignItems}`}>
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i}>
            <DropZone zone={`column-${i}`} />
          </div>
        ))}
      </div>
    );
  },
};

// ─── HEADING ───────────────────────────────────────────────────────────────────
export type HeadingProps = {
  text: string;
  level: string;
  color: string;
  align: string;
};

export const HeadingComponent: ComponentConfig<HeadingProps> = {
  label: "Heading",
  fields: {
    text: { type: "text", label: "Heading Text" },
    level: {
      type: "select",
      label: "Heading Level",
      options: [
        { label: "H1 - Extra Large", value: "h1" },
        { label: "H2 - Large", value: "h2" },
        { label: "H3 - Medium", value: "h3" },
        { label: "H4 - Small", value: "h4" },
      ],
    },
    color: ColorField("Text Color"),
    align: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "text-left" },
        { label: "Center", value: "text-center" },
        { label: "Right", value: "text-right" },
      ],
    },
  },
  defaultProps: {
    text: "Your Heading",
    level: "h2",
    color: "#f8fafc",
    align: "text-left",
  },
  render: ({ text, level, color, align }) => {
    const sizeClass = {
      h1: "text-4xl md:text-5xl lg:text-6xl font-extrabold",
      h2: "text-3xl md:text-4xl font-bold",
      h3: "text-2xl md:text-3xl font-bold",
      h4: "text-xl md:text-2xl font-semibold",
    }[level] || "text-3xl font-bold";

    const className = `${sizeClass} ${align} leading-tight`;
    const style = { color };

    if (level === "h1") return <h1 className={className} style={style}>{text}</h1>;
    if (level === "h3") return <h3 className={className} style={style}>{text}</h3>;
    if (level === "h4") return <h4 className={className} style={style}>{text}</h4>;
    return <h2 className={className} style={style}>{text}</h2>;
  },
};

// ─── TEXT / PARAGRAPH ──────────────────────────────────────────────────────────
export type TextProps = {
  content: string;
  color: string;
  size: string;
  align: string;
};

export const TextComponent: ComponentConfig<TextProps> = {
  label: "Text",
  fields: {
    content: { type: "textarea", label: "Text Content" },
    color: ColorField("Text Color"),
    size: {
      type: "select",
      label: "Text Size",
      options: [
        { label: "Small", value: "text-sm" },
        { label: "Base", value: "text-base" },
        { label: "Large", value: "text-lg" },
        { label: "Extra Large", value: "text-xl" },
      ],
    },
    align: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "text-left" },
        { label: "Center", value: "text-center" },
        { label: "Right", value: "text-right" },
      ],
    },
  },
  defaultProps: {
    content: "Your text goes here. You can write multiple paragraphs by pressing Enter.",
    color: "#cbd5e1",
    size: "text-base",
    align: "text-left",
  },
  render: ({ content, color, size, align }) => (
    <p
      className={`${size} ${align} leading-relaxed whitespace-pre-line`}
      style={{ color }}
    >
      {content}
    </p>
  ),
};

// ─── BUTTON ────────────────────────────────────────────────────────────────────
export type ButtonProps = {
  text: string;
  href: string;
  variant: string;
  size: string;
  align: string;
};

export const ButtonComponent: ComponentConfig<ButtonProps> = {
  label: "Button",
  fields: {
    text: { type: "text", label: "Button Text" },
    href: { type: "text", label: "Link URL" },
    variant: {
      type: "select",
      label: "Style",
      options: [
        { label: "Primary (Gradient)", value: "primary" },
        { label: "Secondary (Outline)", value: "secondary" },
        { label: "Ghost (Text Only)", value: "ghost" },
      ],
    },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    align: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "justify-start" },
        { label: "Center", value: "justify-center" },
        { label: "Right", value: "justify-end" },
      ],
    },
  },
  defaultProps: {
    text: "Click Me",
    href: "#",
    variant: "primary",
    size: "medium",
    align: "justify-start",
  },
  render: ({ text, href, variant, size, align }) => {
    const sizeClass = {
      small: "px-4 py-2 text-sm",
      medium: "px-6 py-3 text-base",
      large: "px-8 py-4 text-lg",
    }[size] || "px-6 py-3";

    const variantStyles = {
      primary: {
        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
        color: "#ffffff",
        border: "none",
        boxShadow: "0 0 30px rgba(59,130,246,0.3)",
      },
      secondary: {
        background: "transparent",
        color: "#3b82f6",
        border: "2px solid #3b82f6",
      },
      ghost: {
        background: "transparent",
        color: "#3b82f6",
        border: "none",
      },
    }[variant] || {};

    return (
      <div className={`flex ${align}`}>
        <a
          href={href}
          className={`inline-flex items-center gap-2 ${sizeClass} rounded-full font-semibold no-underline transition-all duration-300 hover:scale-105`}
          style={variantStyles}
        >
          {text}
        </a>
      </div>
    );
  },
};

// ─── LINK ──────────────────────────────────────────────────────────────────────
export type LinkProps = {
  text: string;
  href: string;
  color: string;
  underline: string;
  openInNewTab: boolean;
};

export const LinkComponent: ComponentConfig<LinkProps> = {
  label: "Link",
  fields: {
    text: { type: "text", label: "Link Text" },
    href: { type: "text", label: "URL" },
    color: ColorField("Link Color"),
    underline: {
      type: "select",
      label: "Underline",
      options: [
        { label: "Always", value: "underline" },
        { label: "On Hover", value: "hover:underline" },
        { label: "Never", value: "no-underline" },
      ],
    },
    openInNewTab: {
      type: "radio",
      label: "Open in New Tab?",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },
  defaultProps: {
    text: "Click here",
    href: "https://example.com",
    color: "#3b82f6",
    underline: "hover:underline",
    openInNewTab: true,
  },
  render: ({ text, href, color, underline, openInNewTab }) => (
    <a
      href={href}
      target={openInNewTab ? "_blank" : "_self"}
      rel={openInNewTab ? "noreferrer" : undefined}
      className={`inline-flex items-center gap-1 font-medium ${underline} transition-colors`}
      style={{ color }}
    >
      {text}
      {openInNewTab && (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </a>
  ),
};

// ─── IMAGE ─────────────────────────────────────────────────────────────────────
export type ImageProps = {
  src: string;
  alt: string;
  rounded: string;
  maxWidth: string;
  align: string;
};

export const ImageComponent: ComponentConfig<ImageProps> = {
  label: "Image",
  fields: {
    src: { type: "text", label: "Image URL" },
    alt: { type: "text", label: "Alt Text (for accessibility)" },
    rounded: {
      type: "select",
      label: "Corner Rounding",
      options: [
        { label: "None", value: "rounded-none" },
        { label: "Small", value: "rounded-lg" },
        { label: "Medium", value: "rounded-xl" },
        { label: "Large", value: "rounded-2xl" },
        { label: "Full (Circle)", value: "rounded-full" },
      ],
    },
    maxWidth: {
      type: "select",
      label: "Max Width",
      options: [
        { label: "Full", value: "max-w-full" },
        { label: "Large (512px)", value: "max-w-lg" },
        { label: "Medium (384px)", value: "max-w-md" },
        { label: "Small (256px)", value: "max-w-sm" },
        { label: "Extra Small (160px)", value: "max-w-[160px]" },
      ],
    },
    align: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "mr-auto" },
        { label: "Center", value: "mx-auto" },
        { label: "Right", value: "ml-auto" },
      ],
    },
  },
  defaultProps: {
    src: "https://api.dicebear.com/7.x/shapes/svg?seed=demo",
    alt: "Image",
    rounded: "rounded-xl",
    maxWidth: "max-w-full",
    align: "mx-auto",
  },
  render: ({ src, alt, rounded, maxWidth, align }) => (
    <img
      src={src}
      alt={alt}
      className={`${rounded} ${maxWidth} ${align} block`}
    />
  ),
};

// ─── SPACER ────────────────────────────────────────────────────────────────────
export type SpacerProps = {
  height: string;
};

export const SpacerComponent: ComponentConfig<SpacerProps> = {
  label: "Spacer",
  fields: {
    height: {
      type: "select",
      label: "Height",
      options: [
        { label: "Extra Small (8px)", value: "h-2" },
        { label: "Small (16px)", value: "h-4" },
        { label: "Medium (32px)", value: "h-8" },
        { label: "Large (64px)", value: "h-16" },
        { label: "Extra Large (96px)", value: "h-24" },
        { label: "Huge (128px)", value: "h-32" },
      ],
    },
  },
  defaultProps: {
    height: "h-8",
  },
  render: ({ height }) => <div className={`${height} w-full`} />,
};

// ─── DIVIDER ───────────────────────────────────────────────────────────────────
export type DividerProps = {
  color: string;
  style: string;
  marginY: string;
};

export const DividerComponent: ComponentConfig<DividerProps> = {
  label: "Divider",
  fields: {
    color: ColorField("Line Color"),
    style: {
      type: "select",
      label: "Style",
      options: [
        { label: "Solid", value: "solid" },
        { label: "Dashed", value: "dashed" },
        { label: "Gradient", value: "gradient" },
      ],
    },
    marginY: {
      type: "select",
      label: "Vertical Margin",
      options: [
        { label: "None", value: "my-0" },
        { label: "Small", value: "my-4" },
        { label: "Medium", value: "my-8" },
        { label: "Large", value: "my-12" },
      ],
    },
  },
  defaultProps: {
    color: "#334155",
    style: "solid",
    marginY: "my-8",
  },
  render: ({ color, style, marginY }) => {
    if (style === "gradient") {
      return (
        <div
          className={`w-full h-px ${marginY}`}
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />
      );
    }
    return (
      <hr
        className={`w-full border-0 h-px ${marginY}`}
        style={{
          backgroundColor: color,
          borderStyle: style === "dashed" ? "dashed" : "solid",
          borderWidth: style === "dashed" ? "1px" : "0",
          borderColor: color,
          height: style === "dashed" ? "0" : "1px",
        }}
      />
    );
  },
};

// ─── CARD ──────────────────────────────────────────────────────────────────────
export type CardProps = {
  bgColor: string;
  borderColor: string;
  padding: string;
  rounded: string;
};

export const CardComponent: ComponentConfig<CardProps> = {
  label: "Card",
  fields: {
    bgColor: ColorField("Background Color"),
    borderColor: ColorField("Border Color"),
    padding: {
      type: "select",
      label: "Padding",
      options: [
        { label: "Small", value: "p-4" },
        { label: "Medium", value: "p-6" },
        { label: "Large", value: "p-8" },
        { label: "Extra Large", value: "p-10" },
      ],
    },
    rounded: {
      type: "select",
      label: "Corner Rounding",
      options: [
        { label: "None", value: "rounded-none" },
        { label: "Small", value: "rounded-lg" },
        { label: "Medium", value: "rounded-xl" },
        { label: "Large", value: "rounded-2xl" },
      ],
    },
  },
  defaultProps: {
    bgColor: "#1e293b",
    borderColor: "#334155",
    padding: "p-6",
    rounded: "rounded-xl",
  },
  render: ({ bgColor, borderColor, padding, rounded }) => (
    <div
      className={`${padding} ${rounded}`}
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      <DropZone zone="card-content" />
    </div>
  ),
};

// ─── FLEX CONTAINER ────────────────────────────────────────────────────────────
export type FlexProps = {
  direction: string;
  justify: string;
  align: string;
  gap: string;
  wrap: string;
};

export const FlexComponent: ComponentConfig<FlexProps> = {
  label: "Flex Container",
  fields: {
    direction: {
      type: "select",
      label: "Direction",
      options: [
        { label: "Row (Horizontal)", value: "flex-row" },
        { label: "Column (Vertical)", value: "flex-col" },
        { label: "Row Reverse", value: "flex-row-reverse" },
        { label: "Column Reverse", value: "flex-col-reverse" },
      ],
    },
    justify: {
      type: "select",
      label: "Justify Content",
      options: [
        { label: "Start", value: "justify-start" },
        { label: "Center", value: "justify-center" },
        { label: "End", value: "justify-end" },
        { label: "Space Between", value: "justify-between" },
        { label: "Space Around", value: "justify-around" },
        { label: "Space Evenly", value: "justify-evenly" },
      ],
    },
    align: {
      type: "select",
      label: "Align Items",
      options: [
        { label: "Start", value: "items-start" },
        { label: "Center", value: "items-center" },
        { label: "End", value: "items-end" },
        { label: "Stretch", value: "items-stretch" },
        { label: "Baseline", value: "items-baseline" },
      ],
    },
    gap: {
      type: "select",
      label: "Gap",
      options: [
        { label: "None", value: "gap-0" },
        { label: "Extra Small", value: "gap-1" },
        { label: "Small", value: "gap-2" },
        { label: "Medium", value: "gap-4" },
        { label: "Large", value: "gap-6" },
        { label: "Extra Large", value: "gap-8" },
      ],
    },
    wrap: {
      type: "select",
      label: "Wrap",
      options: [
        { label: "No Wrap", value: "flex-nowrap" },
        { label: "Wrap", value: "flex-wrap" },
        { label: "Wrap Reverse", value: "flex-wrap-reverse" },
      ],
    },
  },
  defaultProps: {
    direction: "flex-row",
    justify: "justify-start",
    align: "items-center",
    gap: "gap-4",
    wrap: "flex-wrap",
  },
  render: ({ direction, justify, align, gap, wrap }) => (
    <div className={`flex ${direction} ${justify} ${align} ${gap} ${wrap}`}>
      <DropZone zone="flex-content" />
    </div>
  ),
};

// ─── GRID CONTAINER ────────────────────────────────────────────────────────────
export type GridProps = {
  columns: string;
  gap: string;
  rowGap: string;
};

export const GridComponent: ComponentConfig<GridProps> = {
  label: "Grid",
  fields: {
    columns: {
      type: "select",
      label: "Columns",
      options: [
        { label: "1 Column", value: "grid-cols-1" },
        { label: "2 Columns", value: "grid-cols-1 md:grid-cols-2" },
        { label: "3 Columns", value: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" },
        { label: "4 Columns", value: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" },
        { label: "5 Columns", value: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5" },
        { label: "6 Columns", value: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6" },
      ],
    },
    gap: {
      type: "select",
      label: "Column Gap",
      options: [
        { label: "None", value: "gap-x-0" },
        { label: "Small", value: "gap-x-4" },
        { label: "Medium", value: "gap-x-6" },
        { label: "Large", value: "gap-x-8" },
        { label: "Extra Large", value: "gap-x-12" },
      ],
    },
    rowGap: {
      type: "select",
      label: "Row Gap",
      options: [
        { label: "None", value: "gap-y-0" },
        { label: "Small", value: "gap-y-4" },
        { label: "Medium", value: "gap-y-6" },
        { label: "Large", value: "gap-y-8" },
        { label: "Extra Large", value: "gap-y-12" },
      ],
    },
  },
  defaultProps: {
    columns: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    gap: "gap-x-6",
    rowGap: "gap-y-6",
  },
  render: ({ columns, gap, rowGap }) => (
    <div className={`grid ${columns} ${gap} ${rowGap}`}>
      <DropZone zone="grid-content" />
    </div>
  ),
};

// ─── BOX / CONTAINER ───────────────────────────────────────────────────────────
export type BoxProps = {
  bgColor: string;
  padding: string;
  margin: string;
  rounded: string;
  shadow: string;
  border: string;
  borderColor: string;
};

export const BoxComponent: ComponentConfig<BoxProps> = {
  label: "Box",
  fields: {
    bgColor: ColorField("Background Color"),
    padding: {
      type: "select",
      label: "Padding",
      options: [
        { label: "None", value: "p-0" },
        { label: "Extra Small", value: "p-2" },
        { label: "Small", value: "p-4" },
        { label: "Medium", value: "p-6" },
        { label: "Large", value: "p-8" },
        { label: "Extra Large", value: "p-12" },
      ],
    },
    margin: {
      type: "select",
      label: "Margin",
      options: [
        { label: "None", value: "m-0" },
        { label: "Small", value: "my-4" },
        { label: "Medium", value: "my-6" },
        { label: "Large", value: "my-8" },
      ],
    },
    rounded: {
      type: "select",
      label: "Corners",
      options: [
        { label: "None", value: "rounded-none" },
        { label: "Small", value: "rounded-md" },
        { label: "Medium", value: "rounded-lg" },
        { label: "Large", value: "rounded-xl" },
        { label: "Extra Large", value: "rounded-2xl" },
        { label: "Full", value: "rounded-3xl" },
      ],
    },
    shadow: {
      type: "select",
      label: "Shadow",
      options: [
        { label: "None", value: "shadow-none" },
        { label: "Small", value: "shadow-sm" },
        { label: "Medium", value: "shadow-md" },
        { label: "Large", value: "shadow-lg" },
        { label: "Extra Large", value: "shadow-xl" },
      ],
    },
    border: {
      type: "select",
      label: "Border Width",
      options: [
        { label: "None", value: "border-0" },
        { label: "Thin", value: "border" },
        { label: "Medium", value: "border-2" },
        { label: "Thick", value: "border-4" },
      ],
    },
    borderColor: ColorField("Border Color"),
  },
  defaultProps: {
    bgColor: "transparent",
    padding: "p-0",
    margin: "m-0",
    rounded: "rounded-none",
    shadow: "shadow-none",
    border: "border-0",
    borderColor: "#334155",
  },
  render: ({ bgColor, padding, margin, rounded, shadow, border, borderColor }) => (
    <div
      className={`${padding} ${margin} ${rounded} ${shadow} ${border}`}
      style={{
        backgroundColor: bgColor === "transparent" ? undefined : bgColor,
        borderColor: border !== "border-0" ? borderColor : undefined,
      }}
    >
      <DropZone zone="box-content" />
    </div>
  ),
};

// ─── LIST ──────────────────────────────────────────────────────────────────────
export type ListProps = {
  items: { text: string }[];
  style: string;
  color: string;
  spacing: string;
};

export const ListComponent: ComponentConfig<ListProps> = {
  label: "List",
  fields: {
    items: {
      type: "array",
      label: "List Items",
      arrayFields: {
        text: { type: "text", label: "Item Text" },
      },
      defaultItemProps: { text: "List item" },
      getItemSummary: (item) => item.text || "Item",
    },
    style: {
      type: "select",
      label: "List Style",
      options: [
        { label: "Bullet", value: "disc" },
        { label: "Number", value: "decimal" },
        { label: "Check Mark", value: "check" },
        { label: "Arrow", value: "arrow" },
        { label: "None", value: "none" },
      ],
    },
    color: ColorField("Text Color"),
    spacing: {
      type: "select",
      label: "Item Spacing",
      options: [
        { label: "Tight", value: "space-y-1" },
        { label: "Normal", value: "space-y-2" },
        { label: "Relaxed", value: "space-y-3" },
        { label: "Loose", value: "space-y-4" },
      ],
    },
  },
  defaultProps: {
    items: [
      { text: "First item" },
      { text: "Second item" },
      { text: "Third item" },
    ],
    style: "disc",
    color: "#cbd5e1",
    spacing: "space-y-2",
  },
  render: ({ items, style, color, spacing }) => {
    const getIcon = () => {
      switch (style) {
        case "check":
          return (
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          );
        case "arrow":
          return (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          );
        default:
          return null;
      }
    };

    if (style === "decimal") {
      return (
        <ol className={`${spacing} list-decimal list-inside`} style={{ color }}>
          {items.map((item, i) => (
            <li key={i} className="text-base">{item.text}</li>
          ))}
        </ol>
      );
    }

    if (style === "disc") {
      return (
        <ul className={`${spacing} list-disc list-inside`} style={{ color }}>
          {items.map((item, i) => (
            <li key={i} className="text-base">{item.text}</li>
          ))}
        </ul>
      );
    }

    return (
      <ul className={`${spacing}`} style={{ color }}>
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-base">
            {getIcon()}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    );
  },
};

// ─── BLOCKQUOTE ────────────────────────────────────────────────────────────────
export type BlockquoteProps = {
  quote: string;
  author: string;
  borderColor: string;
  textColor: string;
};

export const BlockquoteComponent: ComponentConfig<BlockquoteProps> = {
  label: "Blockquote",
  fields: {
    quote: { type: "textarea", label: "Quote Text" },
    author: { type: "text", label: "Author (optional)" },
    borderColor: ColorField("Border Color"),
    textColor: ColorField("Text Color"),
  },
  defaultProps: {
    quote: "This is an inspiring quote that captures attention and adds credibility to your portfolio.",
    author: "",
    borderColor: "#3b82f6",
    textColor: "#cbd5e1",
  },
  render: ({ quote, author, borderColor, textColor }) => (
    <blockquote
      className="pl-6 py-2 border-l-4 italic"
      style={{ borderColor, color: textColor }}
    >
      <p className="text-lg leading-relaxed">&ldquo;{quote}&rdquo;</p>
      {author && (
        <footer className="mt-2 text-sm not-italic opacity-70">— {author}</footer>
      )}
    </blockquote>
  ),
};

// ─── CODE BLOCK ────────────────────────────────────────────────────────────────
export type CodeBlockProps = {
  code: string;
  language: string;
  showLineNumbers: boolean;
};

export const CodeBlockComponent: ComponentConfig<CodeBlockProps> = {
  label: "Code Block",
  fields: {
    code: { type: "textarea", label: "Code" },
    language: {
      type: "select",
      label: "Language",
      options: [
        { label: "JavaScript", value: "javascript" },
        { label: "TypeScript", value: "typescript" },
        { label: "Python", value: "python" },
        { label: "HTML", value: "html" },
        { label: "CSS", value: "css" },
        { label: "JSON", value: "json" },
        { label: "Bash", value: "bash" },
        { label: "Other", value: "plaintext" },
      ],
    },
    showLineNumbers: {
      type: "radio",
      label: "Show Line Numbers",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },
  defaultProps: {
    code: "const greeting = 'Hello, World!';\nconsole.log(greeting);",
    language: "javascript",
    showLineNumbers: true,
  },
  render: ({ code, language, showLineNumbers }) => (
    <div className="rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-700">
        <span className="text-xs text-slate-400 font-mono">{language}</span>
      </div>
      <pre className="p-4 bg-slate-950 overflow-x-auto">
        <code className="text-sm font-mono text-slate-300 whitespace-pre">
          {showLineNumbers
            ? code.split("\n").map((line, i) => (
                <div key={i} className="flex">
                  <span className="select-none text-slate-600 w-8 text-right pr-4">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))
            : code}
        </code>
      </pre>
    </div>
  ),
};

// ─── BADGE / TAG ───────────────────────────────────────────────────────────────
export type BadgeProps = {
  text: string;
  variant: string;
  size: string;
};

export const BadgeComponent: ComponentConfig<BadgeProps> = {
  label: "Badge",
  fields: {
    text: { type: "text", label: "Badge Text" },
    variant: {
      type: "select",
      label: "Style",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
        { label: "Danger", value: "danger" },
        { label: "Info", value: "info" },
      ],
    },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
  },
  defaultProps: {
    text: "Badge",
    variant: "primary",
    size: "medium",
  },
  render: ({ text, variant, size }) => {
    const variantStyles = {
      primary: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "rgba(59,130,246,0.3)" },
      secondary: { bg: "rgba(100,116,139,0.15)", color: "#94a3b8", border: "rgba(100,116,139,0.3)" },
      success: { bg: "rgba(34,197,94,0.15)", color: "#4ade80", border: "rgba(34,197,94,0.3)" },
      warning: { bg: "rgba(234,179,8,0.15)", color: "#facc15", border: "rgba(234,179,8,0.3)" },
      danger: { bg: "rgba(239,68,68,0.15)", color: "#f87171", border: "rgba(239,68,68,0.3)" },
      info: { bg: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "rgba(139,92,246,0.3)" },
    }[variant] || { bg: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "rgba(59,130,246,0.3)" };

    const sizeClass = {
      small: "text-xs px-2 py-0.5",
      medium: "text-sm px-3 py-1",
      large: "text-base px-4 py-1.5",
    }[size] || "text-sm px-3 py-1";

    return (
      <span
        className={`inline-flex items-center ${sizeClass} rounded-full font-medium`}
        style={{
          backgroundColor: variantStyles.bg,
          color: variantStyles.color,
          border: `1px solid ${variantStyles.border}`,
        }}
      >
        {text}
      </span>
    );
  },
};

// ─── AVATAR ────────────────────────────────────────────────────────────────────
export type AvatarProps = {
  src: string;
  alt: string;
  size: string;
  border: boolean;
  borderColor: string;
};

export const AvatarComponent: ComponentConfig<AvatarProps> = {
  label: "Avatar",
  fields: {
    src: { type: "text", label: "Image URL" },
    alt: { type: "text", label: "Alt Text" },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small (40px)", value: "w-10 h-10" },
        { label: "Medium (64px)", value: "w-16 h-16" },
        { label: "Large (96px)", value: "w-24 h-24" },
        { label: "Extra Large (128px)", value: "w-32 h-32" },
        { label: "Huge (192px)", value: "w-48 h-48" },
      ],
    },
    border: {
      type: "radio",
      label: "Show Border",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    borderColor: ColorField("Border Color"),
  },
  defaultProps: {
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio",
    alt: "Avatar",
    size: "w-24 h-24",
    border: true,
    borderColor: "#3b82f6",
  },
  render: ({ src, alt, size, border, borderColor }) => (
    <img
      src={src}
      alt={alt}
      className={`${size} rounded-full object-cover ${border ? "ring-4" : ""}`}
      style={{ ["--tw-ring-color" as string]: border ? borderColor : undefined }}
    />
  ),
};

// ─── VIDEO EMBED ───────────────────────────────────────────────────────────────
export type VideoEmbedProps = {
  url: string;
  aspectRatio: string;
  rounded: string;
};

export const VideoEmbedComponent: ComponentConfig<VideoEmbedProps> = {
  label: "Video Embed",
  fields: {
    url: { type: "text", label: "YouTube or Vimeo URL" },
    aspectRatio: {
      type: "select",
      label: "Aspect Ratio",
      options: [
        { label: "16:9 (Widescreen)", value: "aspect-video" },
        { label: "4:3 (Standard)", value: "aspect-[4/3]" },
        { label: "1:1 (Square)", value: "aspect-square" },
        { label: "9:16 (Vertical)", value: "aspect-[9/16]" },
      ],
    },
    rounded: {
      type: "select",
      label: "Corners",
      options: [
        { label: "None", value: "rounded-none" },
        { label: "Small", value: "rounded-lg" },
        { label: "Medium", value: "rounded-xl" },
        { label: "Large", value: "rounded-2xl" },
      ],
    },
  },
  defaultProps: {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    aspectRatio: "aspect-video",
    rounded: "rounded-xl",
  },
  render: ({ url, aspectRatio, rounded }) => {
    // Convert YouTube/Vimeo URLs to embed URLs
    let embedUrl = url;
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }

    return (
      <div className={`${aspectRatio} ${rounded} overflow-hidden bg-slate-900`}>
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  },
};

// ─── SOCIAL LINKS ──────────────────────────────────────────────────────────────
export type SocialLinksProps = {
  links: { platform: string; url: string }[];
  size: string;
  style: string;
  color: string;
};

export const SocialLinksComponent: ComponentConfig<SocialLinksProps> = {
  label: "Social Links",
  fields: {
    links: {
      type: "array",
      label: "Social Links",
      arrayFields: {
        platform: {
          type: "select",
          label: "Platform",
          options: [
            { label: "GitHub", value: "github" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Twitter/X", value: "twitter" },
            { label: "Instagram", value: "instagram" },
            { label: "YouTube", value: "youtube" },
            { label: "Dribbble", value: "dribbble" },
            { label: "Behance", value: "behance" },
            { label: "Email", value: "email" },
            { label: "Website", value: "website" },
          ],
        },
        url: { type: "text", label: "URL" },
      },
      defaultItemProps: { platform: "github", url: "https://github.com" },
      getItemSummary: (item) => item.platform || "Link",
    },
    size: {
      type: "select",
      label: "Icon Size",
      options: [
        { label: "Small", value: "w-5 h-5" },
        { label: "Medium", value: "w-6 h-6" },
        { label: "Large", value: "w-8 h-8" },
      ],
    },
    style: {
      type: "select",
      label: "Style",
      options: [
        { label: "Icons Only", value: "icons" },
        { label: "Filled Circles", value: "filled" },
        { label: "Outlined Circles", value: "outlined" },
      ],
    },
    color: ColorField("Icon Color"),
  },
  defaultProps: {
    links: [
      { platform: "github", url: "https://github.com" },
      { platform: "linkedin", url: "https://linkedin.com" },
      { platform: "twitter", url: "https://twitter.com" },
    ],
    size: "w-6 h-6",
    style: "filled",
    color: "#94a3b8",
  },
  render: ({ links, size, style, color }) => {
    const getIcon = (platform: string) => {
      const icons: Record<string, React.ReactNode> = {
        github: (
          <svg className={size} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        ),
        linkedin: (
          <svg className={size} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        ),
        twitter: (
          <svg className={size} fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        ),
        instagram: (
          <svg className={size} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        ),
        youtube: (
          <svg className={size} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        ),
        dribbble: (
          <svg className={size} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
          </svg>
        ),
        behance: (
          <svg className={size} fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.66c.577 0 1.05-.15 1.423-.45.378-.3.565-.74.565-1.32 0-.325-.05-.6-.166-.826-.11-.223-.274-.4-.493-.528-.22-.127-.48-.217-.778-.27-.297-.05-.63-.08-.988-.08H3.28v3.47h3.265zm.216 5.64c.387 0 .747-.04 1.08-.13.333-.085.622-.22.865-.4.246-.18.442-.418.595-.713.152-.297.227-.67.227-1.11 0-.858-.25-1.49-.742-1.87-.496-.382-1.15-.574-1.97-.574H3.28v4.79h3.483l-.002.007zM17.1 14.076c.29.492.753.738 1.39.738.44 0 .82-.113 1.12-.337.303-.224.48-.42.532-.59h1.757c-.28.913-.738 1.58-1.37 1.99-.63.416-1.395.62-2.29.62-.61 0-1.16-.1-1.65-.3-.497-.198-.923-.49-1.28-.87-.36-.377-.64-.837-.84-1.377-.2-.54-.3-1.14-.3-1.802 0-.64.1-1.23.31-1.773.21-.544.5-1.013.867-1.403.37-.39.81-.696 1.327-.913.52-.22 1.087-.33 1.71-.33.68 0 1.273.13 1.78.393.51.263.927.617 1.25 1.06.33.447.568.96.718 1.533.15.572.21 1.173.18 1.802h-5.25c-.002.68.195 1.3.49 1.793l-.004.017zm2.406-4.166c-.22-.39-.63-.588-1.237-.588-.39 0-.71.08-.96.24-.25.16-.45.36-.58.59-.13.234-.21.476-.247.73-.04.25-.06.47-.06.66h3.536c-.06-.635-.23-1.24-.45-1.632h-.002zM14.69 6.21h5.13v1.195h-5.13V6.21z"/>
          </svg>
        ),
        email: (
          <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        website: (
          <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        ),
      };
      return icons[platform] || icons.website;
    };

    return (
      <div className="flex items-center gap-3">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.platform === "email" ? `mailto:${link.url}` : link.url}
            target="_blank"
            rel="noreferrer"
            className={`transition-all duration-300 hover:scale-110 ${
              style === "filled" ? "p-3 rounded-full" : style === "outlined" ? "p-3 rounded-full border-2" : ""
            }`}
            style={{
              color,
              backgroundColor: style === "filled" ? `${color}15` : undefined,
              borderColor: style === "outlined" ? `${color}40` : undefined,
            }}
          >
            {getIcon(link.platform)}
          </a>
        ))}
      </div>
    );
  },
};

// ─── ICON ──────────────────────────────────────────────────────────────────────
export type IconProps = {
  icon: string;
  size: string;
  color: string;
};

export const IconComponent: ComponentConfig<IconProps> = {
  label: "Icon",
  fields: {
    icon: {
      type: "select",
      label: "Icon",
      options: [
        { label: "Star", value: "star" },
        { label: "Heart", value: "heart" },
        { label: "Check", value: "check" },
        { label: "Arrow Right", value: "arrow-right" },
        { label: "Arrow Down", value: "arrow-down" },
        { label: "Mail", value: "mail" },
        { label: "Phone", value: "phone" },
        { label: "Location", value: "location" },
        { label: "Calendar", value: "calendar" },
        { label: "Clock", value: "clock" },
        { label: "User", value: "user" },
        { label: "Code", value: "code" },
        { label: "Lightning", value: "lightning" },
        { label: "Globe", value: "globe" },
        { label: "Lock", value: "lock" },
        { label: "Sparkles", value: "sparkles" },
      ],
    },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small", value: "w-4 h-4" },
        { label: "Medium", value: "w-6 h-6" },
        { label: "Large", value: "w-8 h-8" },
        { label: "Extra Large", value: "w-12 h-12" },
        { label: "Huge", value: "w-16 h-16" },
      ],
    },
    color: ColorField("Icon Color"),
  },
  defaultProps: {
    icon: "star",
    size: "w-6 h-6",
    color: "#3b82f6",
  },
  render: ({ icon, size, color }) => {
    const icons: Record<string, React.ReactNode> = {
      star: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
      heart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
      check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
      "arrow-right": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />,
      "arrow-down": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />,
      mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      phone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
      location: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
      calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
      code: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
      lightning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
      globe: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
      lock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
      sparkles: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
    };

    return (
      <svg
        className={size}
        fill="none"
        stroke={color}
        viewBox="0 0 24 24"
      >
        {icons[icon]}
      </svg>
    );
  },
};

// ─── TESTIMONIAL ───────────────────────────────────────────────────────────────
export type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  bgColor: string;
  textColor: string;
};

export const TestimonialComponent: ComponentConfig<TestimonialProps> = {
  label: "Testimonial",
  fields: {
    quote: { type: "textarea", label: "Quote" },
    author: { type: "text", label: "Author Name" },
    role: { type: "text", label: "Role / Company" },
    avatar: { type: "text", label: "Avatar URL (optional)" },
    bgColor: ColorField("Background Color"),
    textColor: ColorField("Text Color"),
  },
  defaultProps: {
    quote: "Working with this developer was an absolute pleasure. They delivered high-quality work on time and exceeded our expectations.",
    author: "Jane Doe",
    role: "CEO at TechCorp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    bgColor: "#1e293b",
    textColor: "#f8fafc",
  },
  render: ({ quote, author, role, avatar, bgColor, textColor }) => (
    <div
      className="p-6 rounded-2xl"
      style={{ backgroundColor: bgColor }}
    >
      <svg className="w-8 h-8 mb-4 opacity-30" fill={textColor} viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-lg leading-relaxed mb-6" style={{ color: textColor + "dd" }}>
        {quote}
      </p>
      <div className="flex items-center gap-4">
        {avatar && (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold" style={{ color: textColor }}>{author}</p>
          <p className="text-sm opacity-70" style={{ color: textColor }}>{role}</p>
        </div>
      </div>
    </div>
  ),
};

// ─── STATS / COUNTER ───────────────────────────────────────────────────────────
export type StatsProps = {
  stats: { value: string; label: string }[];
  layout: string;
  valueColor: string;
  labelColor: string;
};

export const StatsComponent: ComponentConfig<StatsProps> = {
  label: "Stats",
  fields: {
    stats: {
      type: "array",
      label: "Stats",
      arrayFields: {
        value: { type: "text", label: "Value (e.g. 50+, 99%, $1M)" },
        label: { type: "text", label: "Label" },
      },
      defaultItemProps: { value: "100+", label: "Stat" },
      getItemSummary: (item) => `${item.value} - ${item.label}`,
    },
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Row", value: "row" },
        { label: "Grid (2 cols)", value: "grid-2" },
        { label: "Grid (3 cols)", value: "grid-3" },
        { label: "Grid (4 cols)", value: "grid-4" },
      ],
    },
    valueColor: ColorField("Value Color"),
    labelColor: ColorField("Label Color"),
  },
  defaultProps: {
    stats: [
      { value: "5+", label: "Years Experience" },
      { value: "50+", label: "Projects Completed" },
      { value: "30+", label: "Happy Clients" },
    ],
    layout: "row",
    valueColor: "#3b82f6",
    labelColor: "#94a3b8",
  },
  render: ({ stats, layout, valueColor, labelColor }) => {
    const layoutClass = {
      row: "flex flex-wrap justify-center gap-8 md:gap-16",
      "grid-2": "grid grid-cols-2 gap-6",
      "grid-3": "grid grid-cols-2 md:grid-cols-3 gap-6",
      "grid-4": "grid grid-cols-2 md:grid-cols-4 gap-6",
    }[layout] || "flex flex-wrap gap-8";

    return (
      <div className={layoutClass}>
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-bold" style={{ color: valueColor }}>
              {stat.value}
            </div>
            <div className="text-sm mt-1" style={{ color: labelColor }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ─── FEATURE CARD ──────────────────────────────────────────────────────────────
export type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  iconColor: string;
  bgColor: string;
  textColor: string;
};

export const FeatureCardComponent: ComponentConfig<FeatureCardProps> = {
  label: "Feature Card",
  fields: {
    icon: {
      type: "select",
      label: "Icon",
      options: [
        { label: "Lightning", value: "lightning" },
        { label: "Code", value: "code" },
        { label: "Globe", value: "globe" },
        { label: "Lock", value: "lock" },
        { label: "Sparkles", value: "sparkles" },
        { label: "Star", value: "star" },
        { label: "Heart", value: "heart" },
        { label: "Check", value: "check" },
      ],
    },
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description" },
    iconColor: ColorField("Icon Color"),
    bgColor: ColorField("Card Background"),
    textColor: ColorField("Text Color"),
  },
  defaultProps: {
    icon: "lightning",
    title: "Fast Performance",
    description: "Built with modern technologies for blazing fast load times and smooth interactions.",
    iconColor: "#3b82f6",
    bgColor: "#1e293b",
    textColor: "#f8fafc",
  },
  render: ({ icon, title, description, iconColor, bgColor, textColor }) => {
    const icons: Record<string, React.ReactNode> = {
      lightning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
      code: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
      globe: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
      lock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
      sparkles: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
      star: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
      heart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
      check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
    };

    return (
      <div
        className="p-6 rounded-xl border border-white/10"
        style={{ backgroundColor: bgColor }}
      >
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
          style={{ backgroundColor: iconColor + "20" }}
        >
          <svg className="w-6 h-6" fill="none" stroke={iconColor} viewBox="0 0 24 24">
            {icons[icon]}
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: textColor }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: textColor + "99" }}>
          {description}
        </p>
      </div>
    );
  },
};

// ─── EXPERIENCE / JOURNEY TIMELINE ─────────────────────────────────────────────
export type ExperienceProps = {
  sectionId: string;
  title: string;
  experiences: {
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }[];
  bgColor: string;
  textColor: string;
  accentColor: string;
};

export const ExperienceComponent: ComponentConfig<ExperienceProps> = {
  label: "Experience",
  fields: {
    sectionId: { type: "text", label: "Section ID (without #, e.g. experience)" },
    title: { type: "text", label: "Section Title" },
    experiences: {
      type: "array",
      label: "Experiences",
      arrayFields: {
        role: { type: "text", label: "Job Title / Role" },
        company: { type: "text", label: "Company Name" },
        location: { type: "text", label: "Location (optional)" },
        startDate: { type: "text", label: "Start Date (e.g. Jan 2022)" },
        endDate: { type: "text", label: "End Date (e.g. Dec 2023 or Present)" },
        description: { type: "textarea", label: "Description / Responsibilities" },
        current: {
          type: "radio",
          label: "Current Position?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
      },
      defaultItemProps: {
        role: "Software Engineer",
        company: "Company Name",
        location: "San Francisco, CA",
        startDate: "Jan 2023",
        endDate: "Present",
        description: "Describe your responsibilities and achievements...",
        current: true,
      },
      getItemSummary: (item) => `${item.role} at ${item.company}`,
    },
    bgColor: ColorField("Background Color"),
    textColor: ColorField("Text Color"),
    accentColor: ColorField("Accent Color (Timeline)"),
  },
  defaultProps: {
    sectionId: "experience",
    title: "Work Experience",
    experiences: [
      {
        role: "Senior Software Engineer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: "Jan 2022",
        endDate: "Present",
        description: "Leading development of core platform features. Mentoring junior developers and conducting code reviews. Implementing CI/CD pipelines and improving deployment processes.",
        current: true,
      },
      {
        role: "Software Engineer",
        company: "StartupXYZ",
        location: "Remote",
        startDate: "Jun 2020",
        endDate: "Dec 2021",
        description: "Built and maintained multiple React applications. Collaborated with design team to implement responsive UI components. Optimized application performance by 40%.",
        current: false,
      },
      {
        role: "Junior Developer",
        company: "WebAgency",
        location: "New York, NY",
        startDate: "Jan 2019",
        endDate: "May 2020",
        description: "Developed client websites using modern web technologies. Worked closely with clients to gather requirements and deliver solutions.",
        current: false,
      },
    ],
    bgColor: "#0f172a",
    textColor: "#f8fafc",
    accentColor: "#3b82f6",
  },
  render: ({ sectionId, title, experiences, bgColor, textColor, accentColor }) => (
    <section
      id={sectionId}
      className="relative w-full px-6 md:px-8 py-24 overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span
            className="text-sm font-medium uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            Experience
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: textColor + "20" }} />
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{
            background: `linear-gradient(135deg, ${textColor}, ${textColor}80)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            style={{ backgroundColor: accentColor + "30" }}
          />

          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full md:-translate-x-1/2 border-4 z-10"
                style={{
                  backgroundColor: exp.current ? accentColor : bgColor,
                  borderColor: accentColor,
                  boxShadow: exp.current ? `0 0 20px ${accentColor}50` : "none",
                }}
              />

              {/* Date - shown on opposite side on desktop */}
              <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? "text-left pl-12" : "text-right pr-12"}`}>
                <span
                  className="text-sm font-medium"
                  style={{ color: accentColor }}
                >
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>

              {/* Content card */}
              <div
                className={`ml-8 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
              >
                <div
                  className="p-6 rounded-xl border transition-all duration-300 hover:border-opacity-50"
                  style={{
                    backgroundColor: textColor + "08",
                    borderColor: textColor + "15",
                  }}
                >
                  {/* Mobile date */}
                  <span
                    className="md:hidden text-sm font-medium mb-2 block"
                    style={{ color: accentColor }}
                  >
                    {exp.startDate} — {exp.endDate}
                  </span>

                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: textColor }}>
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium flex-shrink-0"
                        style={{
                          backgroundColor: accentColor + "20",
                          color: accentColor,
                        }}
                      >
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-medium" style={{ color: textColor + "cc" }}>
                      {exp.company}
                    </span>
                    {exp.location && (
                      <>
                        <span style={{ color: textColor + "40" }}>•</span>
                        <span className="text-sm" style={{ color: textColor + "80" }}>
                          {exp.location}
                        </span>
                      </>
                    )}
                  </div>

                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: textColor + "99" }}
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
};

// ─── EDUCATION SECTION ─────────────────────────────────────────────────────────
export type EducationProps = {
  sectionId: string;
  title: string;
  education: {
    degree: string;
    field: string;
    school: string;
    location: string;
    startYear: string;
    endYear: string;
    description: string;
    gpa: string;
  }[];
  bgColor: string;
  textColor: string;
  accentColor: string;
};

export const EducationComponent: ComponentConfig<EducationProps> = {
  label: "Education",
  fields: {
    sectionId: { type: "text", label: "Section ID (without #, e.g. education)" },
    title: { type: "text", label: "Section Title" },
    education: {
      type: "array",
      label: "Education",
      arrayFields: {
        degree: { type: "text", label: "Degree (e.g. Bachelor's, Master's)" },
        field: { type: "text", label: "Field of Study" },
        school: { type: "text", label: "School / University" },
        location: { type: "text", label: "Location (optional)" },
        startYear: { type: "text", label: "Start Year" },
        endYear: { type: "text", label: "End Year (or Expected)" },
        gpa: { type: "text", label: "GPA (optional)" },
        description: { type: "textarea", label: "Description / Achievements (optional)" },
      },
      defaultItemProps: {
        degree: "Bachelor of Science",
        field: "Computer Science",
        school: "University Name",
        location: "City, State",
        startYear: "2016",
        endYear: "2020",
        gpa: "",
        description: "",
      },
      getItemSummary: (item) => `${item.degree} in ${item.field}`,
    },
    bgColor: ColorField("Background Color"),
    textColor: ColorField("Text Color"),
    accentColor: ColorField("Accent Color"),
  },
  defaultProps: {
    sectionId: "education",
    title: "Education",
    education: [
      {
        degree: "Master of Science",
        field: "Computer Science",
        school: "Stanford University",
        location: "Stanford, CA",
        startYear: "2018",
        endYear: "2020",
        gpa: "3.9",
        description: "Specialized in Machine Learning and Distributed Systems. Published research on neural network optimization.",
      },
      {
        degree: "Bachelor of Science",
        field: "Computer Engineering",
        school: "UC Berkeley",
        location: "Berkeley, CA",
        startYear: "2014",
        endYear: "2018",
        gpa: "3.7",
        description: "Dean's List. Member of ACM and IEEE student chapters. Led senior capstone project on IoT systems.",
      },
    ],
    bgColor: "#1e293b",
    textColor: "#f8fafc",
    accentColor: "#8b5cf6",
  },
  render: ({ sectionId, title, education, bgColor, textColor, accentColor }) => (
    <section
      id={sectionId}
      className="relative w-full px-6 md:px-8 py-24 overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span
            className="text-sm font-medium uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            Education
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: textColor + "20" }} />
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{
            background: `linear-gradient(135deg, ${textColor}, ${textColor}80)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h2>

        {/* Education cards */}
        <div className="grid gap-6">
          {education.map((edu, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl border transition-all duration-300 hover:border-opacity-50"
              style={{
                backgroundColor: textColor + "05",
                borderColor: textColor + "15",
              }}
            >
              {/* Accent line */}
              <div
                className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              />

              <div className="pl-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1" style={{ color: textColor }}>
                      {edu.degree} in {edu.field}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium" style={{ color: accentColor }}>
                        {edu.school}
                      </span>
                      {edu.location && (
                        <>
                          <span style={{ color: textColor + "40" }}>•</span>
                          <span className="text-sm" style={{ color: textColor + "80" }}>
                            {edu.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {edu.gpa && (
                      <span
                        className="text-sm px-3 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: accentColor + "20",
                          color: accentColor,
                        }}
                      >
                        GPA: {edu.gpa}
                      </span>
                    )}
                    <span
                      className="text-sm font-medium whitespace-nowrap"
                      style={{ color: textColor + "80" }}
                    >
                      {edu.startYear} — {edu.endYear}
                    </span>
                  </div>
                </div>

                {edu.description && (
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: textColor + "99" }}
                  >
                    {edu.description}
                  </p>
                )}
              </div>

              {/* Graduation cap icon */}
              <div
                className="absolute right-6 top-6 opacity-10 group-hover:opacity-20 transition-opacity"
              >
                <svg
                  className="w-16 h-16"
                  fill={accentColor}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
};
