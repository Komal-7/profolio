import { Config } from "@measured/puck";
import {
  NavbarComponent,
  HeroComponent,
  AboutComponent,
  ProjectsComponent,
  SkillsComponent,
  FooterComponent,
  NavbarProps,
  HeroProps,
  AboutProps,
  ProjectsProps,
  SkillsProps,
  FooterProps,
} from "./components/portfolio-components";

export type AppComponents = {
  Navbar: NavbarProps;
  Hero: HeroProps;
  About: AboutProps;
  Projects: ProjectsProps;
  Skills: SkillsProps;
  Footer: FooterProps;
};

export const puckConfig: Config<AppComponents> = {
  components: {
    Navbar: NavbarComponent,
    Hero: HeroComponent,
    About: AboutComponent,
    Projects: ProjectsComponent,
    Skills: SkillsComponent,
    Footer: FooterComponent,
  },
};

// This is the default empty page data
export const defaultPageData = {
  content: [],
  root: { props: {} },
};

// This is a starter template users can load
export const starterPageData = {
  content: [
    {
      type: "Navbar",
      props: {
        id: "navbar-1",
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
    },
    {
      type: "Hero",
      props: {
        id: "hero-1",
        headline: "Hi, I'm a Developer 👋",
        subheadline:
          "I build clean, fast, and user-friendly web applications. Open to full-time roles.",
        ctaText: "View My Work",
        ctaHref: "#projects",
        bgColor: "#0f172a",
        textColor: "#f8fafc",
      },
    },
    {
      type: "About",
      props: {
        id: "about-1",
        title: "About Me",
        bio: "I'm a passionate software developer with experience in building modern web applications.",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio",
        bgColor: "#1e293b",
        textColor: "#f8fafc",
      },
    },
    {
      type: "Projects",
      props: {
        id: "projects-1",
        title: "Projects",
        projects: [
          {
            name: "My Project",
            description: "A full-stack project I built.",
            techStack: "React, Node.js",
            link: "#",
          },
        ],
        bgColor: "#0f172a",
        textColor: "#f8fafc",
        cardBgColor: "#1e293b",
      },
    },
    {
      type: "Skills",
      props: {
        id: "skills-1",
        title: "Skills",
        skills: [
          { name: "React / Next.js", level: "80" },
          { name: "TypeScript", level: "80" },
          { name: "Python", level: "55" },
        ],
        bgColor: "#1e293b",
        textColor: "#f8fafc",
        accentColor: "#38bdf8",
      },
    },
    {
      type: "Footer",
      props: {
        id: "footer-1",
        name: "Your Name",
        email: "you@email.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        bgColor: "#020617",
        textColor: "#94a3b8",
      },
    },
  ],
  root: { props: {} },
};