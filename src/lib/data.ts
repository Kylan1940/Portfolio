import type { Certificate } from "./database.types";

export const siteConfig = {
  name: "Valerian Kevin Casendra",
  username: "Kylan1940"
};

export const about = {
  intro: [
    { label: "Name", value: "Valerian Kevin Casendra" },
    { label: "Education", value: "Bachelor of Informatics Engineering, Universitas Dian Nuswantoro" },
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