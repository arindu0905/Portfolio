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
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const skills: Skill[] = [
  // Languages
  { name: "Java", category: "language" },
  { name: "Python", category: "language" },
  { name: "JavaScript", category: "language" },
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
  // Databases
  { name: "MongoDB", category: "database" },
  { name: "Supabase", category: "database" },
  { name: "SQL Databases", category: "database" },
  // Tools
  { name: "IntelliJ IDEA", category: "tool" },
  { name: "VS Code", category: "tool" },
  { name: "Google Colab", category: "tool" },
  { name: "Git & GitHub", category: "tool" },
  // Soft Skills
  { name: "Problem Solving", category: "soft" },
  { name: "Teamwork", category: "soft" },
  { name: "Communication", category: "soft" },
  { name: "Adaptability", category: "soft" },
  { name: "Time Management", category: "soft" },
  { name: "Attention to Detail", category: "soft" },
];

export const projects: Project[] = [
  {
    id: "lmms",
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
  { label: "Projects Built", value: 5, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
  { label: "Years Coding", value: 2, suffix: "+" },
  { label: "Certifications", value: 5, suffix: "+" },
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
  email: "arindumandinu2004@gmail.com",
  phone: "+94 76 398 1811",
  about: `I am a passionate Information Systems Engineering undergraduate with strong interests in Software Engineering, Web Development, Artificial Intelligence, and Machine Learning. I enjoy building practical solutions using modern technologies and continuously improving my technical and problem-solving skills. I actively contribute to collaborative projects and seek opportunities to gain industry experience while creating impactful digital solutions.`,
};
