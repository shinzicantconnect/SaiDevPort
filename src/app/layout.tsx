import type { Metadata } from "next";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";

export const metadata: Metadata = {
  title: "Sai Mendoza — Developer & Designer",
  description:
    "Full-stack web developer and creative layout/apparel designer. Selected works in systems, web applications, and graphic design.",
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
      </body>
    </html>
  );
}
