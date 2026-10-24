import { Project } from "./types";

export const projects: Project[] = [
  {
    id: "citec-portal",
    index: "01",
    title: "CITEC Portal",
    category: "System",
    year: "2026",
    description:
      "A Next.js attendance management system built around live QR code scanning — designed for fast check-ins at scale and a clean administrative dashboard.",
    tags: ["Next.js", "TypeScript", "QR Scanning", "Dashboard"],
    liveUrl: "https://citec-u-days-attendance-system.vercel.app/",
    repoUrl: "https://github.com/Daniel2525-ui/CITEC-UDays-Attendance-System.git",
    image: "/citec-portal.png",
  },
  {
    id: "Popseat",
    index: "02",
    title: "Popseat",
    category: "Web App",
    year: "2026",
    description:
      "A online cinema seat booking platform built with immerse transactions and easy aim to watch.",
    tags: ["Next.js", "TypeScript", "Supabase"],
    liveUrl: "https://popseat-egsktvxyj-edsimonmendoza-6556s-projects.vercel.app/",
    repoUrl: "https://github.com/shinzicantconnect/PopSeatReserve.git",
    image: "/popseat.png",
  },
  {
    id: "Drip",
    index: "03",
    title: "Drip: Apparel E-Commerce",
    category: "Web App",
    year: "2026",
    description:
      "Shop with your style at Drip!",
    tags: ["Next.js", "Camera API", "Realtime UI"],
    liveUrl: "https://drip-zeta-three.vercel.app",
    repoUrl: "https://github.com/shinzzzzyyyy/Drip.git",
    image: "drip.png",
  },
  {
    id: "apparel-layouts",
    index: "04",
    title: "Apparel & Graphic Layouts",
    category: "Graphic",
    year: "2026",
    description:
      "Selected sublimation and apparel layout work — print-ready graphic design produced alongside full-stack development projects.",
    tags: ["Sublimation", "Layout Design", "Print"],
    images: [
      "/CHASS SANGKA CODM.png",
      "/CCJE BATCH SHIRT DESIGN.png",
      "/CCJE SHIRT FINALS.png",
      "/CITEC DEPT SHIRT 2.png",
      "/CITEC LSG SHIRT 1.png",
      "/CITEC MLBB.png",
      "/CITEC WARMER.png",
      "/EGL FINALS.png",
      "/SOCCOM SANTIAGO 1.png",
      "/ULISS OFFICERS.png"
    ],
  },
];
