import {
  Skill,
  Project,
  ExperienceItem,
  Certification,
  SocialLink,
  NavItem,
  Stat,
} from "@/types";

export const navItems: NavItem[] = [
  { label: "./home", href: "/#home" },
  { label: "./modules", href: "/#projects" },
  { label: "./stack", href: "/#stack" },
  { label: "./log", href: "/#log" },
  { label: "./uplink", href: "/#contact" },
];

export const skills: Skill[] = [
  // Languages
  { name: "Java", category: "language" },
  { name: "Python", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "SQL", category: "language" },
  { name: "R", category: "language" },
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  // Backend
  { name: "Spring Boot", category: "backend" },
  { name: "Flask", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  // Databases
  { name: "MongoDB", category: "database" },
  { name: "Supabase", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "SQL Databases", category: "database" },
  // Tools
  { name: "IntelliJ IDEA", category: "tool" },
  { name: "VS Code", category: "tool" },
  { name: "Google Colab", category: "tool" },
  { name: "Git", category: "tool" },
  { name: "GitHub", category: "tool" },
  // Soft Skills
  { name: "Problem Solving", category: "soft" },
  { name: "Teamwork", category: "soft" },
  { name: "Communication", category: "soft" },
  { name: "Adaptability", category: "soft" },
  { name: "Time Management", category: "soft" },
  { name: "Attention to Detail", category: "soft" },
];

export const categoryLabels: Record<Project["category"], string> = {
  web: "web",
  "ai-ml": "ai / ml",
  hardware: "hardware",
  other: "other",
};

export const projects: Project[] = [
  {
    id: "harvest-hub",
    code: "HARVESTHUB",
    accent: "#84cc16",
    title: "Saara Ketha Harvest Hub",
    year: 2026,
    description:
      "Full-stack platform that digitises agricultural collection centres in Sri Lanka — from farmer registration and crop deliveries to quality grading, buyer orders and farmer payments.",
    overview:
      "HarvestHub replaces the paper-based workflow of a Sri Lankan agricultural collection centre with one secure, role-based platform. It connects nine roles — farmers, collection centre officers, quality inspectors, inventory managers, buyers, finance officers, transport coordinators, managers and administrators. Produce is weighed and graded on arrival, tracked through the warehouse in batches, sold through a buyer marketplace with bidding, and paid out to farmers with receipts and partial payments. A transparent crop-advisor engine scores what a farmer should plant next using district fit, crop rotation, soil pH and rainfall, and shows the reasons behind each recommendation. The whole experience is available in Sinhala, Tamil and English so farmers can use it in their own language. The React + TypeScript frontend runs on Vercel, backed by a Node.js/Express REST API and Supabase (PostgreSQL, Auth, Storage, Realtime and row-level security).",
    technologies: ["React", "TypeScript", "Node.js", "Express", "Supabase", "PostgreSQL", "Tailwind CSS"],
    features: [
      "9 role-based dashboards",
      "Digital weighing & quality grading",
      "Batch-traceable inventory",
      "Buyer marketplace & bidding",
      "Farmer payments & receipts",
      "Transport & delivery scheduling",
      "Crop advisor scoring engine",
      "Sinhala, Tamil & English UI",
      "Reports, notifications & audit log",
    ],
    category: "web",
    featured: true,
    github: "https://github.com/arindu0905/Sara-Ketha-Harvest-Hub",
    live: "https://sara-ketha-harvest-hub-w8ld.vercel.app/",
    screenshots: ["/projects/harvest-hub/landing.jpg", "/projects/harvest-hub/steps-and-prices.jpg"],
  },
  {
    id: "lmms",
    code: "LMMS",
    accent: "#f59e0b",
    title: "Laser Mobile Management System (LMMS)",
    year: 2026,
    description:
      "A comprehensive mobile shop management system handling inventory, suppliers, repairs, payments, and customer reviews.",
    technologies: ["React", "Node.js", "Java", "Supabase"],
    features: [
      "Inventory Management",
      "Supplier Management",
      "Repair Management",
      "Payment Management",
      "Review & Rating Management",
    ],
    category: "web",
    featured: true,
    github: "https://github.com/arindu0905/LMMS",
  },
  {
    id: "edufix",
    code: "EDUFIX",
    accent: "#8b5cf6",
    title: "EduFix Web-Based Help Desk",
    year: 2025,
    description:
      "A platform helping students resolve academic and technical issues efficiently with a streamlined ticketing system.",
    technologies: ["Java", "Spring Boot", "HTML", "CSS", "JavaScript"],
    features: [
      "Ticket Management",
      "Student Support Portal",
      "Admin Dashboard",
    ],
    category: "web",
    featured: true,
  },
  {
    id: "diabetes-detector",
    code: "DIAB.AI",
    accent: "#ef4444",
    title: "AI/ML Diabetes Detector",
    year: 2025,
    description:
      "Machine learning model ensemble for diabetes prediction using multiple classification algorithms with high accuracy.",
    technologies: ["Python", "TensorFlow", "Pandas"],
    features: [
      "Random Forest",
      "KNN",
      "Logistic Regression",
      "SVM",
      "ANN",
      "Decision Tree Models",
    ],
    category: "ai-ml",
    featured: true,
  },
  {
    id: "real-estate",
    code: "REALTY",
    accent: "#3b82f6",
    title: "Real Estate Management System",
    year: 2025,
    description:
      "Full-featured real estate platform managing properties, clients, agents, and appointment bookings.",
    technologies: ["Java", "Servlet", "HTML", "CSS", "JavaScript"],
    features: [
      "Property Management",
      "Client Management",
      "Agent Management",
      "Appointment Booking",
    ],
    category: "web",
  },
  {
    id: "smart-home",
    code: "IOT.HOME",
    accent: "#10b981",
    title: "Smart Home Automation System",
    year: 2024,
    description:
      "IoT-based home automation system with RFID access control, automated lighting, and environmental monitoring.",
    technologies: ["Arduino", "RFID", "DHT11", "IR Sensor", "LDR Sensor"],
    features: [
      "Smart Door Lock",
      "Automatic Lighting",
      "Environmental Monitoring",
    ],
    category: "hardware",
  },
];

export const experience: ExperienceItem[] = [
  {
    type: "work",
    title: "Executive Data Processing",
    organization: "Heineken",
    period: "2024 – 2025",
    responsibilities: [
      "Tested and validated the new SCAD system",
      "Supported system deployment activities",
      "Performed spreadsheet-based data analysis",
      "Assisted inventory and stock management operations",
      "Improved operational efficiency through accurate data processing",
    ],
  },
  {
    type: "education",
    title: "BSc (Hons) Information Systems Engineering",
    organization: "University",
    period: "2024 – 2028",
  },
  {
    type: "education",
    title: "G.C.E Advanced Level",
    organization: "Mahinda Rajapaksha College",
    period: "2021 – 2023",
  },
  {
    type: "education",
    title: "G.C.E Ordinary Level",
    organization: "President's College Maharagama",
    period: "2019 – 2020",
  },
];

export const certifications: Certification[] = [
  {
    title: "Introduction to Project Management with ClickUp",
    issuer: "Coursera",
    year: 2026,
    credential: "https://coursera.org/verify/OUAP7V9O9PFP",
    image: "/certificates/project-management-with-clickup.jpeg",
  },
  {
    title: "Cisco: Networking Basics",
    issuer: "Cisco Networking Academy",
    year: 2026,
    image: "/certificates/networking-basics.jpeg",
  },
  {
    title: "Business Analysis & Process Management",
    issuer: "Coursera",
    year: 2026,
    credential: "https://coursera.org/share/cf6c139bddaac36779cde3f2eb0481ef",
    image: "/certificates/business-analysis-process-management.jpeg",
  },
  {
    title: "Introduction to Business Analysis Using Spreadsheets: Basics",
    issuer: "Coursera",
    year: 2026,
    credential: "https://coursera.org/share/14aaf6d895d8c3908cbd5a3e012630b6",
    image: "/certificates/business-analysis-using-spreadsheets.jpeg",
  },
  {
    title: "Professional Certificate in Python Programming",
    issuer: "Informatics Institute of Technology (IIT) – PDU",
    year: 2024,
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/arindu0905",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/arindumandinu",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:arindumandinu2004@gmail.com",
    icon: "mail",
  },
];

export const stats: Stat[] = [
  { tag: "built", label: "production-style systems", value: 6, suffix: "+" },
  { tag: "stack", label: "technologies in use", value: 20, suffix: "+" },
  { tag: "certs", label: "verified credentials", value: 5 },
  { tag: "industry", label: "at Heineken", value: 1, suffix: "yr" },
];

export const personalInfo = {
  name: "Arindu Mandinu Wanigasekara",
  shortName: "Arindu",
  initials: "AMW",
  roles: [
    "Information Systems Engineering Undergraduate",
    "Software Developer",
    "AI & ML Enthusiast",
    "Full Stack Developer",
    "Problem Solver",
  ],
  location: "Homagama, Sri Lanka",
  tagline:
    "Information Systems Engineering undergrad who builds real systems — inventory platforms, help desks, ML models and IoT hardware. I turn messy business problems into clean software.",
  studyYear: "3rd year undergraduate",
  cv: "/Arindu_Mandinu_CV.pdf",
  email: "arindumandinu2004@gmail.com",
  phone: "+94 76 398 1811",
  about: `I am a passionate Information Systems Engineering undergraduate with strong interests in Software Engineering, Web Development, Artificial Intelligence, and Machine Learning. I enjoy building practical solutions using modern technologies and continuously improving my technical and problem-solving skills. I actively contribute to collaborative projects and seek opportunities to gain industry experience while creating impactful digital solutions.`,
};
