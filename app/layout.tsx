import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen">
            <nav className="flex-none border-b">
              <Navbar />
            </nav>

            <main className="my-auto items-center justify-center">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
