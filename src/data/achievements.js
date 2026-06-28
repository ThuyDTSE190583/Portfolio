import { Award, GraduationCap, Zap, BookOpen, ExternalLink, Code, BrainCircuit, ShieldCheck, Database } from 'lucide-react';

export const achievements = [
  // Coursera Specific
  {
    id: 1,
    title: "Software Engineering",
    subtitle: "Coursera: Software Design and Project Management",
    issuer: "Coursera",
    date: "2024",
    credentialId: "PZ6Q27GIVXUX",
    icon: Award,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    url: "https://www.coursera.org/account/accomplishments/verify/PZ6Q27GIVXUX"
  },
  {
    id: 2,
    title: "Generative AI",
    subtitle: "Coursera: Generative AI in Software Development",
    issuer: "Coursera",
    date: "2024",
    credentialId: "c61255bb561085235b1caf3c888094fd",
    icon: BrainCircuit,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    url: "https://coursera.org/share/c61255bb561085235b1caf3c888094fd"
  },
  {
    id: 9,
    title: "AI For Everyone",
    subtitle: "DeepLearning.AI Certificate",
    issuer: "Coursera",
    date: "2024",
    credentialId: "0MCGOA7UF3K5",
    icon: BookOpen,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    url: "https://coursera.org/share/d4c851b2c0cd54d5ee0bbc894f6b6af3"
  },
  // Coursera Specializations
  {
    id: 3,
    title: "Meta Front-End Developer",
    subtitle: "Professional Certificate",
    issuer: "Coursera",
    date: "2024",
    credentialId: "0e29a6687c65c667f9e2c2290bbc2558",
    icon: ShieldCheck,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    url: "https://coursera.org/share/0e29a6687c65c667f9e2c2290bbc2558"
  },
  {
    id: 7,
    title: "IBM Data Science",
    subtitle: "Professional Certificate",
    issuer: "Coursera",
    date: "2024",
    credentialId: "M16624MD7WZP",
    icon: Database,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    url: "https://coursera.org/share/5730b508de7358f108a3ab28c545c2c5"
  },
  {
    id: 8,
    title: "AWS Cloud Technology",
    subtitle: "Professional Certificate",
    issuer: "Coursera",
    date: "2024",
    credentialId: "2VJNZKE12WMA",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/2VJNZKE12WMA"
  },
  // Other Academic/Technical
  {
    id: 6,
    title: "Java Certificate",
    subtitle: "Programming Proficiency",
    issuer: "Tech Institute",
    date: "2022",
    icon: Code,
    color: "text-red-500",
    bg: "bg-red-500/10"
  },
  {
    id: 5,
    title: "FPT Certificate",
    subtitle: "Software Engineering",
    issuer: "FPT University",
    date: "2023",
    icon: Zap,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    id: 4,
    title: "TOPIK Level 4",
    subtitle: "Korean Language Certificate",
    issuer: "NIIED",
    date: "2023",
    icon: GraduationCap,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  }
];
