"use client";

import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import Link from "next/link";
import { Sparkles, MousePointerClick, Share2, MessageSquare, Layout } from "lucide-react";

export function LandingPage() {
  const features = [
    {
      title: "AI-Powered Building",
      description:
        "Chat with AI to add sections, modify content, and style your portfolio. Just describe what you want.",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      title: "Drag & Drop Editor",
      description:
        "Intuitive visual editor powered by Puck. Move, resize, and customize components with ease.",
      icon: <MousePointerClick className="w-6 h-6" />,
    },
    {
      title: "Instant Publishing",
      description:
        "Publish your portfolio with one click and share it with the world via your unique URL.",
      icon: <Share2 className="w-6 h-6" />,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Portfolio",
      description: "Sign up and create a new portfolio project in seconds.",
    },
    {
      number: "02",
      title: "Build with AI",
      description: "Use the chat assistant or drag-and-drop editor to design your portfolio.",
    },
    {
      number: "03",
      title: "Publish & Share",
      description: "Hit publish and share your portfolio URL with recruiters and clients.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">AI-Powered Portfolio Builder</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Build Your Portfolio
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                with AI Assistance
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Create a stunning developer portfolio in minutes. Chat with AI to add content,
              drag-and-drop components, and publish instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 h-12 text-base"
              >
                <Link href="/auth">Get Started Free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-800 hover:bg-slate-800 hover:text-white px-8 h-12 text-base"
              >
                <Link href="/auth">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful tools to create, customize, and share your professional portfolio.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get your portfolio live in three simple steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-blue-200 to-transparent"></div>
                )}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Preview Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-4">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300">AI Assistant</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Just Tell AI What You Want
                </h2>
                <p className="text-lg text-slate-300 mb-6">
                  No design skills needed. Simply describe what you want in plain English,
                  and watch your portfolio come to life.
                </p>
                <ul className="space-y-3">
                  {[
                    "Add a hero section with my name and title",
                    "Change the background color to dark blue",
                    "Add my GitHub and LinkedIn links to the footer",
                  ].map((example) => (
                    <li key={example} className="flex items-start gap-3 text-slate-300">
                      <Sparkles className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                      <span>&ldquo;{example}&rdquo;</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 shadow-2xl">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-slate-400 ml-2">AI Chat</span>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-600 shrink-0"></div>
                    <div className="bg-slate-700 rounded-lg rounded-tl-none px-4 py-2 text-sm text-slate-200">
                      Add a projects section with 3 project cards
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-blue-500 rounded-lg rounded-tr-none px-4 py-2 text-sm text-white max-w-[80%]">
                      Done! I&apos;ve added a Projects section with 3 cards. Each card has a title,
                      description, and tech stack. You can edit the content in the editor.
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 shrink-0 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Join developers who are showcasing their work with Profolio.
              It&apos;s free to get started.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 h-12 text-base"
            >
              <Link href="/auth">Create Your Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-5 h-5">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-semibold">Profolio</span>
            </div>
            <p className="text-sm text-slate-500">
              Built for developers, by developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
