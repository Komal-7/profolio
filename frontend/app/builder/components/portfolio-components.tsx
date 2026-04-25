"use client";

import React from "react";
import { ComponentConfig } from "@measured/puck";

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
        label: { type: "text", label: "Label" },
        href: { type: "text", label: "Link (e.g. #about)" },
      },
      defaultItemProps: { label: "Link", href: "#" },
    },
    bgColor: { type: "text", label: "Background Color" },
    textColor: { type: "text", label: "Text Color" },
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
      style={{ backgroundColor: bgColor, color: textColor }}
      className="w-full px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md"
    >
      <span className="text-xl font-bold tracking-tight">{name}</span>
      <ul className="flex gap-6 list-none m-0 p-0">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.href}
              style={{ color: textColor }}
              className="text-sm font-medium hover:opacity-70 transition-opacity no-underline"
            >
              {link.label}
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
    ctaHref: { type: "text", label: "Button Link" },
    bgColor: { type: "text", label: "Background Color" },
    textColor: { type: "text", label: "Text Color" },
  },
  defaultProps: {
    headline: "Hi, I'm a Developer 👋",
    subheadline:
      "I build clean, fast, and user-friendly web applications. Open to full-time roles.",
    ctaText: "View My Work",
    ctaHref: "#projects",
    bgColor: "#0f172a",
    textColor: "#f8fafc",
  },
  render: ({ headline, subheadline, ctaText, ctaHref, bgColor, textColor }) => (
    <section
      style={{ backgroundColor: bgColor, color: textColor }}
      className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-8 py-24"
    >
      <h1 className="text-5xl font-extrabold mb-6 leading-tight">{headline}</h1>
      <p className="text-xl max-w-2xl mb-10 opacity-80 leading-relaxed">
        {subheadline}
      </p>
      <a
        href={ctaHref}
        className="px-8 py-3 rounded-full text-sm font-semibold transition-all no-underline"
        style={{
          backgroundColor: textColor,
          color: bgColor,
        }}
      >
        {ctaText}
      </a>
    </section>
  ),
};

// ─── ABOUT SECTION ─────────────────────────────────────────────────────────────
export type AboutProps = {
  title: string;
  bio: string;
  imageUrl: string;
  bgColor: string;
  textColor: string;
};

export const AboutComponent: ComponentConfig<AboutProps> = {
  label: "About Section",
  fields: {
    title: { type: "text", label: "Section Title" },
    bio: { type: "textarea", label: "Bio" },
    imageUrl: { type: "text", label: "Photo URL" },
    bgColor: { type: "text", label: "Background Color" },
    textColor: { type: "text", label: "Text Color" },
  },
  defaultProps: {
    title: "About Me",
    bio: "I'm a passionate software developer with experience in building modern web applications. I love solving problems and learning new technologies. When I'm not coding, you'll find me hiking or reading tech blogs.",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio",
    bgColor: "#1e293b",
    textColor: "#f8fafc",
  },
  render: ({ title, bio, imageUrl, bgColor, textColor }) => (
    <section
      id="about"
      style={{ backgroundColor: bgColor, color: textColor }}
      className="w-full px-8 py-20"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-48 h-48 rounded-full object-cover flex-shrink-0 border-4"
          style={{ borderColor: textColor + "33" }}
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg opacity-80 leading-relaxed">{bio}</p>
        </div>
      </div>
    </section>
  ),
};

// ─── PROJECTS SECTION ──────────────────────────────────────────────────────────
export type ProjectsProps = {
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
    title: { type: "text", label: "Section Title" },
    projects: {
      type: "array",
      label: "Projects",
      arrayFields: {
        name: { type: "text", label: "Project Name" },
        description: { type: "textarea", label: "Description" },
        techStack: { type: "text", label: "Tech Stack (comma separated)" },
        link: { type: "text", label: "Project Link" },
      },
      defaultItemProps: {
        name: "New Project",
        description: "A cool project I built.",
        techStack: "React, Node.js",
        link: "#",
      },
    },
    bgColor: { type: "text", label: "Background Color" },
    textColor: { type: "text", label: "Text Color" },
    cardBgColor: { type: "text", label: "Card Background Color" },
  },
  defaultProps: {
    title: "Projects",
    projects: [
      {
        name: "E-Commerce App",
        description:
          "A full-stack e-commerce platform with authentication, cart, and payments.",
        techStack: "Next.js, Stripe, PostgreSQL",
        link: "#",
      },
      {
        name: "Weather Dashboard",
        description:
          "Real-time weather app using OpenWeather API with beautiful visualizations.",
        techStack: "React, Chart.js, API",
        link: "#",
      },
    ],
    bgColor: "#0f172a",
    textColor: "#f8fafc",
    cardBgColor: "#1e293b",
  },
  render: ({ title, projects, bgColor, textColor, cardBgColor }) => (
    <section
      id="projects"
      style={{ backgroundColor: bgColor, color: textColor }}
      className="w-full px-8 py-20"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              style={{ backgroundColor: cardBgColor }}
              className="rounded-xl p-6 flex flex-col gap-3 border border-white/10"
            >
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="opacity-70 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-3">
                {project.techStack.split(",").map((tech, j) => (
                  <span
                    key={j}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: textColor + "15",
                      color: textColor,
                    }}
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs mt-2 opacity-60 hover:opacity-100 transition-opacity no-underline"
                  style={{ color: textColor }}
                >
                  View Project →
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
  title: string;
  skills: { name: string; level: string }[];
  bgColor: string;
  textColor: string;
  accentColor: string;
};

export const SkillsComponent: ComponentConfig<SkillsProps> = {
  label: "Skills Section",
  fields: {
    title: { type: "text", label: "Section Title" },
    skills: {
      type: "array",
      label: "Skills",
      arrayFields: {
        name: { type: "text", label: "Skill Name" },
        level: {
          type: "select",
          label: "Level",
          options: [
            { label: "Beginner", value: "25" },
            { label: "Intermediate", value: "55" },
            { label: "Advanced", value: "80" },
            { label: "Expert", value: "95" },
          ],
        },
      },
      defaultItemProps: { name: "New Skill", level: "55" },
    },
    bgColor: { type: "text", label: "Background Color" },
    textColor: { type: "text", label: "Text Color" },
    accentColor: { type: "text", label: "Bar Accent Color" },
  },
  defaultProps: {
    title: "Skills",
    skills: [
      { name: "React / Next.js", level: "80" },
      { name: "TypeScript", level: "80" },
      { name: "Python", level: "55" },
      { name: "PostgreSQL", level: "55" },
      { name: "Docker", level: "25" },
    ],
    bgColor: "#1e293b",
    textColor: "#f8fafc",
    accentColor: "#38bdf8",
  },
  render: ({ title, skills, bgColor, textColor, accentColor }) => (
    <section
      id="skills"
      style={{ backgroundColor: bgColor, color: textColor }}
      className="w-full px-8 py-20"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>
        <div className="flex flex-col gap-6">
          {skills.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>{skill.name}</span>
                <span className="opacity-50">
                  {parseInt(skill.level) >= 80
                    ? "Advanced"
                    : parseInt(skill.level) >= 50
                    ? "Intermediate"
                    : "Beginner"}
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full"
                style={{ backgroundColor: textColor + "20" }}
              >
                <div
                  className="h-2 rounded-full transition-all duration-700"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: accentColor,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
};

// ─── FOOTER ────────────────────────────────────────────────────────────────────
export type FooterProps = {
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
    name: { type: "text", label: "Your Name" },
    email: { type: "text", label: "Email" },
    github: { type: "text", label: "GitHub URL" },
    linkedin: { type: "text", label: "LinkedIn URL" },
    bgColor: { type: "text", label: "Background Color" },
    textColor: { type: "text", label: "Text Color" },
  },
  defaultProps: {
    name: "Your Name",
    email: "you@email.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    bgColor: "#020617",
    textColor: "#94a3b8",
  },
  render: ({ name, email, github, linkedin, bgColor, textColor }) => (
    <footer
      id="contact"
      style={{ backgroundColor: bgColor, color: textColor }}
      className="w-full px-8 py-12 text-center"
    >
      <p className="text-lg font-semibold mb-4" style={{ color: "#f8fafc" }}>
        {name}
      </p>
      <div className="flex justify-center gap-6 flex-wrap">
        <a
          href={`mailto:${email}`}
          style={{ color: textColor }}
          className="text-sm hover:opacity-100 opacity-70 transition-opacity no-underline"
        >
          {email}
        </a>
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          style={{ color: textColor }}
          className="text-sm hover:opacity-100 opacity-70 transition-opacity no-underline"
        >
          GitHub
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          style={{ color: textColor }}
          className="text-sm hover:opacity-100 opacity-70 transition-opacity no-underline"
        >
          LinkedIn
        </a>
      </div>
      <p className="text-xs mt-8 opacity-40">
        Built with Profolio · {new Date().getFullYear()}
      </p>
    </footer>
  ),
};