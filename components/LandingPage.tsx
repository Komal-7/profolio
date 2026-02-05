"use client";

import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import Link from "next/link";

export function LandingPage() {
  const templates = [
    {
      title: "Modern Portfolio",
      description: "A sleek and contemporary design for showcasing your work.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAvjmR0ad69jlYbqks9UZSek6nSzf-bzAsUbnZ2prR-HO3qGR-9PAI8YGLNfIt7hpSAqwqatCsvBuLi71eaW8BV0SWSQHoF_weoBjktOiaYxRwRpduDqiTRdjRiIfudYJ_AujAKkfajbuGNg-zgvu7JIDDcNsMVXHIer1JUE01NbPOSarg2sKzYjIz4w1gB0kpOEDMLNlR6ca4nsxdUS0ZdRHpS0KNigoClxBhpF_ltunaEgoIS5lXz9USBSjrw7iZGBwLG3LHRsyU",
    },
    {
      title: "Minimalist Portfolio",
      description: "A clean and simple layout that puts your content first.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCG1bQ1NGJAHmE3nm901tP7LQ8hUr1geygeH6oZTfYcT7Mhfmz_G2RJm8hZE8xqzkRuTUUkniSZYGZX-GYjhW_3oNeuori6AtmyqdyvABL4TcjgmC0BdqToiPiG1kUu88bbCX-6ETynrTvE6YnQqkCP7GdMEPwnjdratqqr8pcCUSzrbvldgVemq83zuSX3HJFRc97005ocKtY1vMtj2Z1bQFelXqizUVTnoFSeFjnh5VWDkElugYqBjLkXlRZq-qkIRtL-VaiJFPI",
    },
    {
      title: "Creative Portfolio",
      description: "A unique and artistic design to express your creativity.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAkXReXJUMG3mIn6gKbgqlYTgzk9k01NqZdd7mTGwf9TROq0YuWoMDMge2Bxf0UytJPgsykI73il3n2A91TEYTDc5wRh6ZVccFhEetJUPPIQ0a5O84xtXUpRJoktT7XNvLH5M5AUHdRwmEWr9dxUizFpoQoWibIt0Uqw2hT8CzGM1JCE_yefe7TklOXEuFV4n7A15L_mnxlNXGr_lGoZ30IGBT_kg6OjLbYFzxH8B7ZSzPhdgibkhE--NEcbgqjoabvGVy10_LKcaI",
    },
  ];

  const steps = [
    {
      title: "Choose a Template",
      description:
        "Select from a range of professionally designed templates to match your style and industry.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z"></path>
        </svg>
      ),
    },
    {
      title: "Customize Your Content",
      description:
        "Easily add your projects, skills, and experience using our user-friendly editor.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
        </svg>
      ),
    },
    {
      title: "Publish Your Site",
      description:
        "Publish your portfolio website with a custom domain or use our free subdomain option.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section>
        <div
          className="flex w-full max-w-6xl min-h-[480px] flex-col items-center justify-center gap-6 rounded-lg bg-cover bg-[center_40%] sm:gap-8 mx-auto"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBcjsuyk6G3K2mcSKM8GjI19LfNDPTWODcVCSeaT7QxfhAHxcpkGiBd4REqgFJ_jlxGHJjr_nU62e21AMiPqAM41szctGJIY6fjysbwVAPhVlrMMe9npUQTl2hWqFaOS-FTbyoHip7KbUW51eev9NROO4DgPuSWmzzfQoo_pCDPpDJTqpKt6RTI-BMSqVXt2HC1p_T2uV7sm4GC5SFaAJkKEgNdz_wRF7KeEuNlzKJxrOtiSMMh36ghB1ZS4chXMSD6ZEIgASQc9gY")',
          }}
        >
          <div className="flex flex-col items-center text-center gap-2 px-4">
            <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Create a stunning portfolio website in minutes
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal sm:text-base max-w-2xl">
              Showcase your work and skills with a professional online portfolio. Choose from a variety of templates and customize to your liking.
            </h2>
          </div>

          <Button
            asChild
            className="mt-6 bg-[#0c7ff2] text-slate-50 min-w-[84px] max-w-[480px] h-10 px-4 sm:h-12 sm:px-5"
        >
            <Link href="/auth">Get Started</Link>
        </Button>
        </div>
      </section>

      {/* Featured Templates & How it Works Sections */}
      <section className="mt-12 mx-auto w-full max-w-6xl">
        {/* Featured Templates */}
        <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Featured Templates
        </h2>
        <div className="overflow-x-auto scrollbar-none px-4">
          <div className="flex gap-3">
            {templates.map((template) => (
              <Card key={template.title} className="border-none shadow-none flex flex-col min-w-[15rem] gap-4">
                <div
                  className="w-full h-48 aspect-video rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${template.imageUrl})` }}
                />
                <div>
                  <p className="text-[#0d141c] text-base font-medium">{template.title}</p>
                  <p className="text-[#49739c] text-sm">{template.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          How it Works
        </h2>
        <div className="flex flex-col gap-10 px-4 py-10">
          <div className="flex flex-col gap-4 max-w-[920px]">
            <h1 className="text-[#0d141c] text-[32px] font-bold leading-tight sm:text-4xl">
              Build your portfolio in 3 easy steps
            </h1>
            <p className="text-[#0d141c] text-base">
              Our intuitive platform makes it simple to create a professional portfolio website, even if you have no coding experience.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
            {steps.map((step) => (
              <Card key={step.title} className="flex flex-col gap-3 p-4 border border-[#cedbe8] bg-slate-50">
                <div className="text-[#0d141c]">{step.icon}</div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#0d141c] text-base font-bold">{step.title}</h2>
                  <p className="text-[#49739c] text-sm">{step.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
