import { NextRequest, NextResponse } from "next/server";

// ─── SYSTEM PROMPT (sent to AI so it knows what it can build) ──────────────
const SYSTEM_PROMPT = `
You are an AI assistant helping users build their portfolio website. You have TWO modes of operation:

MODE 1: CANVAS UPDATE (action: "update")
Use this when the user wants to ADD, MODIFY, or DELETE something on their portfolio canvas.
Examples: "add a projects section", "change the navbar color to blue", "update my bio", "remove the footer"

MODE 2: CONVERSATION (action: "chat")
Use this when the user is asking for ADVICE, IDEAS, FEEDBACK, or having a general conversation.
Examples: "what should I write in my bio?", "give me headline ideas", "what colors look professional?", "how can I make my portfolio stand out?"

AVAILABLE COMPONENTS AND THEIR PROPS (for canvas updates):

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

YOUR RESPONSE FORMAT:
Always respond with valid JSON in ONE of these two formats:

FOR CANVAS UPDATES (when user wants to modify the portfolio):
{
  "action": "update",
  "message": "A friendly short message describing what you did",
  "updatedPageData": {
    "content": [...],
    "root": { "props": {} }
  }
}

FOR CONVERSATION (when user wants advice, ideas, or is chatting):
{
  "action": "chat",
  "message": "Your helpful conversational response here. Be friendly, specific, and helpful. You can use multiple paragraphs if needed."
}

GUIDELINES FOR CANVAS UPDATES:
- When adding a new component, append it to the content array in the right position (navbar first, footer last)
- When modifying an existing component, update only the relevant props
- Always ensure IDs are unique
- Use dark, professional color schemes by default: bg #0f172a or #1e293b, text #f8fafc

GUIDELINES FOR CONVERSATION:
- Be helpful, friendly, and specific
- Give concrete examples and suggestions
- If the user asks for ideas, provide 3-5 options they can choose from
- You can reference their current portfolio content to give personalized advice

Do not include any text outside the JSON. No markdown code fences, no backticks, no explanations outside the JSON.
`;

export async function POST(req: NextRequest) {

  const { message, pageData } = await req.json();

  const prompt = `
${SYSTEM_PROMPT}

CURRENT PAGE DATA:
${JSON.stringify(pageData, null, 2)}

USER MESSAGE:
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
      action: "chat",
      message: "No AI API key configured.",
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
      action: parsed.action || "update",
      message: parsed.message,
      updatedPageData: parsed.action === "chat" ? null : parsed.updatedPageData,
    });
  } catch (e) {
    console.error("Failed to parse AI response:", aiResponse);
    return NextResponse.json({
      action: "chat",
      message: "The AI returned an unexpected response. Please try rephrasing your request.",
      updatedPageData: null,
    });
  }
}