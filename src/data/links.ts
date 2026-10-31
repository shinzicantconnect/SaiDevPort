import { SocialLink, SkillGroup } from "./types";

// Leave `url` empty until ready — the UI renders these as inactive/"soon".
export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "@ShinziCantConnect",
    url: "https://github.com/shinzicantconnect",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "@Sai Mendoza",
    url: "https://www.facebook.com/share/1CMt9Ka84M/",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@saimndza",
    url: "https://www.instagram.com/saimndza?rpxt=cG0zejVlNzBnbG5z",
  },

  {
    id: "linkedIn",
    label: "LinkedIn",
    handle: "@Ed Simon Mendoza",
    url: "https://www.linkedin.com/in/ed-simon-mendoza-0a0aa4316/"
  },


];

export const skillGroups: SkillGroup[] = [
  {
    id: "development",
    title: "Development",
    items: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase"],
  },
  {
    id: "systems",
    title: "Systems & Networking",
    items: ["System Architecture", "Cisco Networking", "REST APIs"],
  },
  {
    id: "design",
    title: "Design",
    items: ["UI/UX Design", "Graphic Design", "Sublimation / Apparel Layout"],
  },
];
