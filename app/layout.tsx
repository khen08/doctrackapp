import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Document Tracking System",
  description: "Developed by Louiskhen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
