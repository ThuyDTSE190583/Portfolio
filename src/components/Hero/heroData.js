import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa';

export const heroData = {
  greeting: "Hello, I'm",
  name: "DO THANH THUY",
  roles: [
    'Backend Developer', 
    2000,
    'Node.js Developer', 
    2000,
    'Software Engineering Student', 
    2000,
  ],
  description: "Building scalable backend applications with Node.js, Java and modern web technologies. Passionate about clean code, problem solving and continuous learning.",
  resumeUrl: "/resume.pdf",
  socials: [
    {
      id: 1,
      name: "GitHub",
      Icon: FaGithub,
      url: import.meta.env.VITE_GITHUB_USERNAME ? `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}` : null,
      ariaLabel: "Visit GitHub Profile"
    },
    {
      id: 2,
      name: "LinkedIn",
      Icon: FaLinkedin,
      url: import.meta.env.VITE_LINKEDIN_URL || null,
      ariaLabel: "Visit LinkedIn Profile"
    },
    {
      id: 3,
      name: "Facebook",
      Icon: FaFacebook,
      url: import.meta.env.VITE_FACEBOOK_URL || null,
      ariaLabel: "Visit Facebook Profile"
    },
    {
      id: 4,
      name: "Email",
      Icon: FaEnvelope,
      url: "mailto:dothanhthuy.dev@gmail.com",
      ariaLabel: "Send an email"
    }
  ]
};
