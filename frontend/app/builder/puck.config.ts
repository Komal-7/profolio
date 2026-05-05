import { Config } from "@measured/puck";
import {
  // Pre-built sections
  NavbarComponent,
  HeroComponent,
  AboutComponent,
  ExperienceComponent,
  EducationComponent,
  ProjectsComponent,
  SkillsComponent,
  FooterComponent,
  NavbarProps,
  HeroProps,
  AboutProps,
  ExperienceProps,
  EducationProps,
  ProjectsProps,
  SkillsProps,
  FooterProps,
  // Layout
  SectionComponent,
  ColumnsComponent,
  FlexComponent,
  GridComponent,
  BoxComponent,
  CardComponent,
  SectionProps,
  ColumnsProps,
  FlexProps,
  GridProps,
  BoxProps,
  CardProps,
  // Typography
  HeadingComponent,
  TextComponent,
  HeadingProps,
  TextProps,
  // Media
  ImageComponent,
  AvatarComponent,
  VideoEmbedComponent,
  IconComponent,
  ImageProps,
  AvatarProps,
  VideoEmbedProps,
  IconProps,
  // Interactive
  ButtonComponent,
  LinkComponent,
  SocialLinksComponent,
  ButtonProps,
  LinkProps,
  SocialLinksProps,
  // Content Blocks
  ListComponent,
  BlockquoteComponent,
  CodeBlockComponent,
  BadgeComponent,
  TestimonialComponent,
  StatsComponent,
  FeatureCardComponent,
  ListProps,
  BlockquoteProps,
  CodeBlockProps,
  BadgeProps,
  TestimonialProps,
  StatsProps,
  FeatureCardProps,
  // Utilities
  SpacerComponent,
  DividerComponent,
  SpacerProps,
  DividerProps,
} from "./components/portfolio-components";

export type AppComponents = {
  // Pre-built sections
  Navbar: NavbarProps;
  Hero: HeroProps;
  About: AboutProps;
  Experience: ExperienceProps;
  Education: EducationProps;
  Projects: ProjectsProps;
  Skills: SkillsProps;
  Footer: FooterProps;
  // Layout
  Section: SectionProps;
  Columns: ColumnsProps;
  Flex: FlexProps;
  Grid: GridProps;
  Box: BoxProps;
  Card: CardProps;
  // Typography
  Heading: HeadingProps;
  Text: TextProps;
  // Media
  Image: ImageProps;
  Avatar: AvatarProps;
  VideoEmbed: VideoEmbedProps;
  Icon: IconProps;
  // Interactive
  Button: ButtonProps;
  Link: LinkProps;
  SocialLinks: SocialLinksProps;
  // Content Blocks
  List: ListProps;
  Blockquote: BlockquoteProps;
  CodeBlock: CodeBlockProps;
  Badge: BadgeProps;
  Testimonial: TestimonialProps;
  Stats: StatsProps;
  FeatureCard: FeatureCardProps;
  // Utilities
  Spacer: SpacerProps;
  Divider: DividerProps;
};

export const puckConfig: Config<AppComponents> = {
  categories: {
    "Portfolio Sections": {
      components: ["Navbar", "Hero", "About", "Experience", "Education", "Projects", "Skills", "Footer"],
      defaultExpanded: false,
    },
    "Layout": {
      components: ["Section", "Columns", "Flex", "Grid", "Box", "Card"],
    },
    "Typography": {
      components: ["Heading", "Text"],
    },
    "Media": {
      components: ["Image", "Avatar", "VideoEmbed", "Icon"],
    },
    "Interactive": {
      components: ["Button", "Link", "SocialLinks"],
    },
    "Content Blocks": {
      components: ["List", "Blockquote", "CodeBlock", "Badge", "Testimonial", "Stats", "FeatureCard"],
    },
    "Utilities": {
      components: ["Spacer", "Divider"],
    },
  },
  components: {
    // Pre-built sections
    Navbar: NavbarComponent,
    Hero: HeroComponent,
    About: AboutComponent,
    Experience: ExperienceComponent,
    Education: EducationComponent,
    Projects: ProjectsComponent,
    Skills: SkillsComponent,
    Footer: FooterComponent,
    // Layout
    Section: SectionComponent,
    Columns: ColumnsComponent,
    Flex: FlexComponent,
    Grid: GridComponent,
    Box: BoxComponent,
    Card: CardComponent,
    // Typography
    Heading: HeadingComponent,
    Text: TextComponent,
    // Media
    Image: ImageComponent,
    Avatar: AvatarComponent,
    VideoEmbed: VideoEmbedComponent,
    Icon: IconComponent,
    // Interactive
    Button: ButtonComponent,
    Link: LinkComponent,
    SocialLinks: SocialLinksComponent,
    // Content Blocks
    List: ListComponent,
    Blockquote: BlockquoteComponent,
    CodeBlock: CodeBlockComponent,
    Badge: BadgeComponent,
    Testimonial: TestimonialComponent,
    Stats: StatsComponent,
    FeatureCard: FeatureCardComponent,
    // Utilities
    Spacer: SpacerComponent,
    Divider: DividerComponent,
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
          { name: "Python", level: "50" },
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
        heading: "Let's Work Together",
        subheading: "Have a project in mind? I'd love to hear about it. Let's create something amazing.",
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