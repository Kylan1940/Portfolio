import type { Certificate, Project } from "./database.types";

export const siteConfig = {
  name: "Valerian Kevin Casendra",
  username: "Kylan1940"
};

export const about = {
  intro: [
    { label: "Name", value: "Valerian Kevin Casendra" },
    { label: "Education", value: "Bachelor of Computer Science, Universitas Dian Nuswantoro" },
    { label: "Location", value: "Semarang City, Indonesia" }
  ],
  paragraphs: [
    "I'm an Informatics Engineering student with hands-on experience in web development and software development. I primarily work with React, Next.js, TypeScript, Java, and JavaScript, while also having experience with backend development, server administration, and Minecraft server technologies. I enjoy working on projects where I can build something from the ground up, solve practical problems, and learn from the process rather than simply following an existing solution.",
    "Outside of development, I've spent several years running an online community and managing technical projects from planning and development to maintenance. This experience gave me a better understanding of what it means to work on a project beyond just writing code. I've had to deal with real users, technical issues, system maintenance, and decisions that affect how a project is used in practice. It has also shaped the way I communicate, approach problems, and take responsibility for the things I work on.",
    "I'm currently based in Indonesia and open to working on projects remotely. I'm comfortable taking on smaller projects where I can focus on a specific problem or feature, as well as larger projects that require more planning and long-term development. I'm also interested in working as part of a team, whether that means contributing to an existing project, working with other developers, or collaborating with people from different areas of a project.",
    "I don't limit myself to a particular type of project. Whether it's a website, a web application, a backend system, a software project, or something more technical, I'm interested in opportunities where I can contribute, improve my skills, and produce something that is actually useful."
  ],
  currentFocus: [
    {
      language: "JavaScript",
      description: "Building interactive web applications and improving my understanding of modern JavaScript development."
    },
    {
      language: "TypeScript",
      description: "Writing more structured, type-safe code and using TypeScript accross web applications and backend projects."
    },
    {
      language: "Java",
      description: "Building Minecraft Java plugins, particularly within the Bukkit fork."
    },
    {
      language: "Discord Bot Development",
      description: "Developing feature-rich Discord bots with moderation, database integration, APIs, and community-focused functionality."
    }
  ]
}

export const skills = [
  {
    title: "Development",
    items: ["HTML/CSS", "JavaScript", "TypeScript", "Next.js & React", "Tailwind CSS", "Java"]
  },
  {
    title: "Tools & Workflow",
    items: ["Git", "Github", "VS Code", "IntelliJ IDEA", "Langflow", "Supabase"]
  },
  {
    title: "Other Skills",
    items: ["Discord Bot Development", "Community Management", "Team Coordination", "Problem Solving"]
  },
]

export const experience = [
  {
    role: "Founder & Owner",
    company: "Minesyalt Network",
    period: "2020-2024",
    duration: "4 years",
    summary: [
      "Founded and operated Minesyalt Network from the ground up. Minesyalt Network is a Minecraft multi-year project that required full ownership of both the technical infrastructure and the people running it.",
      "For four years, I was responsible for keeping the infrastructure running, managing a team of staff, organizing events, and maintaining a community of active users."
    ],
    highlights: [
      "Administered and maintained server infrastructure using PocketMine-MP",
      "Configured and optimized plugins for stability and performance",
      "Led and coordinated a team of staff members",
      "Planned and executed community events over multiple years",
      "Diagnosed and resolved technical issues under real-time pressure",
      "Designed and iterated on systems based on community feedback",
      "Monitored server performance and implemented optimizations",
      "Managed long-term project operations and sustainability"
    ],
    tags: [
      "PHP",
      "PocketMine-MP",
      "Server Administration",
      "Team Leadership",
      "Community Management",
      "Event Planning",
      "Technical Ops",
    ]
  }
]

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Intro to Software Engineering",
    provider: "RevoU",
    category: "Mini Course",
    issue_date: "2025-10-17",
    created_at: "2025-10-17"
  },
  {
    id: "cert-2",
    title: "User, Integrator, or Creator: Your Place in the AI Ecosystem",
    provider: "Dicoding",
    category: "Webinar",
    issue_date: "2025-10-02",
    created_at: "2025-10-02"
  },
  {
    id: "cert-3",
    title: "Understanding Redux Fundamentals before Using RTK",
    provider: "Dicoding",
    category: "Webinar",
    issue_date: "2025-10-03",
    created_at: "2025-10-03"
  },
  {
    id: "cert-4",
    title: "Understanding Data through Probability and Statistics",
    provider: "Dicoding",
    category: "Webinar",
    issue_date: "2025-10-10",
    created_at: "2025-10-10"
  },
  {
    id: "cert-5",
    title: "Workshop React JS Creating My Own Digital Invitations",
    provider: "Dunia Coding",
    category: "Workshop",
    issue_date: "2025-10-11",
    created_at: "2025-10-11"
  },
  {
    id: "cert-6",
    title: "Linux for Cyber Security",
    provider: "Dunia Coding",
    category: "Webinar",
    issue_date: "2026-06-03",
    created_at: "2026-06-03"
  },
  {
    id: "cert-7",
    title: "IT - AI Agent for Programming",
    provider: "Hacktiv8",
    category: "Workshop",
    issue_date: "2026-07-22",
    created_at: "2026-07-22"
  },
]

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Kylan1940 Official Website",
    description: "This website. Designed and built from scratch with Next.js, TypeScript, and Tailwind CSS. Focused on clarity, honest content, and a layout that doesn't feel generated.",
    stack: ["HTML", "CSS", "JavaScript", "Next.js", "React", "TypeScript", "TailwindCSS", "Supabase"],
    github: null,
    demo: "https://kylan1940.web.id",
    status: "Live",
    featured: true,
  },
  {
    id: "proj-2",
    name: "GoogleMapsAI",
    description: "An AI-powered place discovery platform that helps users find and explore any locations using natural language.",
    stack: ["React", "TypeScript", "GoogleMaps AI"],
    github: "https://github.com/Kylan1940/GoogleMapsAI",
    demo: "https://google-maps-ai.vercel.app",
    status: "Live",
    featured: false,
  },
  {
    id: "proj-3",
    name: "BMKG Discord Bot",
    description: "A Discord bot that fetches and delivers earthquake alerts from Indonesia's national meteorology agency (BMKG). Built to give communities quick access to critical local information without leaving Discord.",
    stack: ["JavaScript", "Discord.js"],
    github: "https://github.com/Kylan1940/BMKG-Discord-Bot",
    demo: null,
    status: "Live",
    featured: false,
  },
  {
    id: "proj-4",
    name: "HealAndFeed",
    description: "Heal and Feed Commands for Minecraft Java Server",
    stack: ["Java"],
    github: "https://github.com/Kylan1940/HealAndFeed",
    demo: null,
    status: "Live",
    featured: false,
  },
  {
    id: "proj-5",
    name: "ServerTimeline",
    description: "Records, stores, and displays Minecraft Java Server events such as player activity, block changes, and entity kills.",
    stack: ["Java"],
    github: "https://github.com/Kylan1940/ServerTimeline",
    demo: null,
    status: "Live",
    featured: false,
  },
  {
    id: "proj-6",
    name: "Linock Bot",
    description: "A utility Discord bot built for server management and automation. Handles moderation workflows, custom commands, and routine tasks to reduce manual work for server administrators.",
    stack: ["JavaScript", "Discord.js"],
    github: "https://github.com/Kylan1940/LinockBot-Discord",
    demo: null,
    status: "In Progress",
    featured: false,
  },
  {
    id: "proj-7",
    name: "PMMP-HealAndFeed",
    description: "Heal and Feed Command for PocketMine-MP",
    stack: ["PHP"],
    github: "https://github.com/Kylan1940/PMMP-HealAndFeed",
    demo: null,
    status: "Archived",
    featured: false,
  },
  {
    id: "proj-8",
    name: "PMMP-OnlineUI",
    description: "Check who are in the server with UI, for PocketMine-MP",
    stack: ["PHP"],
    github: "https://github.com/Kylan1940/OnlineUI",
    demo: null,
    status: "Archived",
    featured: false,
  },
  {
    id: "proj-9",
    name: "PMMP-HeadsOrTails",
    description: "Guess! Heads or Tails! for PocketMine-MP",
    stack: ["PHP"],
    github: "https://github.com/Kylan1940/HeadsOrTails",
    demo: null,
    status: "Archived",
    featured: false,
  },
  {
    id: "proj-10",
    name: "PMMP-WhitelistKick",
    description: "Kick all players when whitelist on, for PocketMine-MP",
    stack: ["PHP"],
    github: "https://github.com/Kylan1940/WhitelistKick",
    demo: null,
    status: "Archived",
    featured: false,
  },
]

export const contact = {
  intro: "I'm open to internship opportunities, freelance projects, and meaningful collaborations. Feel free to reach out.",
  methods: [
    {
      label: "Email",
      value: "kevincasendra01@gmail.com",
      href: "mailto:kevincasendra01@gmail.com",
      hint: "Opens your email app"
    },
    {
      label: "GitHub",
      value: "github.com/Kylan1940",
      href: "https://github.com/Kylan1940",
      hint: "View my repositories"
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/valeriankc",
      href: "https://linkedin.com/in/valeriankc",
      hint: "Connect professionally"
    },
  ]
}