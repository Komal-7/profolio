import { NextRequest, NextResponse } from "next/server";

// ─── COMPONENT SCHEMAS (sent to AI so it knows what it can build) ──────────────
const COMPONENT_SCHEMAS = `
You are an AI assistant helping users build their portfolio website.
The portfolio is built using a component system. Each component has a type and props.

AVAILABLE COMPONENTS AND THEIR PROPS:

1. Navbar
{
  type: "Navbar",
  props: {
    id: string (unique, e.g. "navbar-1"),
    name: string,           // Person's name shown on the left
    links: Array<{ label: string, href: string }>,  // nav links e.g. [{label:"About", href:"#about"}]
    bgColor: string,        // CSS color e.g. "#0f172a"
    textColor: string       // CSS color e.g. "#f8fafc"
  }
}

2. Hero (full-width hero section)
{
  type: "Hero",
  props: {
    id: string (unique, e.g. "hero-1"),
    headline: string,
    subheadline: string,
    ctaText: string,        // Button text
    ctaHref: string,        // Button link e.g. "#projects"
    bgColor: string,
    textColor: string
  }
}

3. About
{
  type: "About",
  props: {
    id: string (unique, e.g. "about-1"),
    title: string,
    bio: string,
    imageUrl: string,       // URL to profile photo, use "https://api.dicebear.com/7.x/avataaars/svg?seed=NAME" if none
    bgColor: string,
    textColor: string
  }
}

4. Projects
{
  type: "Projects",
  props: {
    id: string (unique, e.g. "projects-1"),
    title: string,
    projects: Array<{
      name: string,
      description: string,
      techStack: string,    // comma-separated e.g. "React, Node.js, PostgreSQL"
      link: string          // project URL or "#"
    }>,
    bgColor: string,
    textColor: string,
    cardBgColor: string
  }
}

5. Skills
{
  type: "Skills",
  props: {
    id: string (unique, e.g. "skills-1"),
    title: string,
    skills: Array<{
      name: string,
      level: string         // "25" = Beginner, "55" = Intermediate, "80" = Advanced, "95" = Expert
    }>,
    bgColor: string,
    textColor: string,
    accentColor: string     // color for skill bars e.g. "#38bdf8"
  }
}

6. Footer
{
  type: "Footer",
  props: {
    id: string (unique, e.g. "footer-1"),
    name: string,
    email: string,
    github: string,         // full URL e.g. "https://github.com/username"
    linkedin: string,       // full URL e.g. "https://linkedin.com/in/username"
    bgColor: string,
    textColor: string
  }
}

CURRENT PAGE DATA will be provided as JSON.

YOUR JOB:
- Understand the user's natural language request
- Return an updated version of the full page data JSON
- When adding a new component, append it to the content array in the right position (navbar first, footer last)
- When modifying an existing component, update only the relevant props
- Always ensure IDs are unique
- Use dark, professional color schemes by default: bg #0f172a or #1e293b, text #f8fafc
- Respond ONLY with valid JSON in this exact format:

{
  "message": "A friendly short message describing what you did",
  "updatedPageData": {
    "content": [...],
    "root": { "props": {} }
  }
}

Do not include any text outside the JSON. No markdown, no backticks, no explanations outside the JSON.
`;

export async function POST(req: NextRequest) {

  const { message, pageData } = await req.json();

  const prompt = `
    ${COMPONENT_SCHEMAS}

    CURRENT PAGE DATA:
    ${JSON.stringify(pageData, null, 2)}

    USER REQUEST:
    ${message}
  `;

  // ── Try Groq first (free tier), fallback message if no key ──────────────────
  const GROQ_API_KEY = process.env.GROQ_API_KEY;


  let aiResponse: string | null = null;

  // ── Groq (free, fast) ───────────────────────────────────────────────────────
  if (GROQ_API_KEY) {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });
    
    const data = await res.json();

    aiResponse = data.choices?.[0]?.message?.content || null;
  }

  // ── No API key configured ───────────────────────────────────────────────────
  if (!aiResponse) {
    return NextResponse.json({
      message:
        "No AI API key configured.",
      updatedPageData: null,
    });
  }

  // ── Parse AI response ───────────────────────────────────────────────────────
  try {
    // Strip markdown code fences if model added them
    const cleaned = aiResponse
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json({
      message: parsed.message,
      updatedPageData: parsed.updatedPageData,
    });
  } catch (e) {
    console.error("Failed to parse AI response:", aiResponse);
    return NextResponse.json({
      message:
        "The AI returned an unexpected response. Please try rephrasing your request.",
      updatedPageData: null,
    });
  }
}