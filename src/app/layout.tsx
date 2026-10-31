import type { Metadata, Viewport } from "next";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

export const metadata: Metadata = {
  title: "Sai Mendoza — Developer & Designer",
  description:
    "Full-stack web developer and creative layout/apparel designer. Selected works in systems, web applications, and graphic design.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <GrainOverlay />
        {children}
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
