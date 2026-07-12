import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gopikrishnan M | Portfolio",
  description:
    "Portfolio of Gopikrishnan M showcasing full-stack development, AI integration, and modern web applications.",

  keywords: [
    "Gopikrishnan",
    "Portfolio",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "AI",
    "Web Developer",
  ],

  authors: [{ name: "Gopikrishnan M" }],
  creator: "Gopikrishnan M",

  openGraph: {
    title: "Gopikrishnan M | Portfolio",
    description:
      "Modern portfolio showcasing projects and development experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}