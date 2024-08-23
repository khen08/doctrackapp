import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { getServerSession } from "next-auth/next";
import options from "@/app/api/auth/[...nextauth]/options";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Document Tracking System",
  description: "Developed by Louiskhen",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the session data using getServerSession
  const session = await getServerSession(options);

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

            {/* Display the user's name below the Navbar if logged in */}
            {session?.user && (
              <div className="text-center mt-4">
                <p>
                  Currently logged in as:{" "}
                  <span className="font-bold text-primary">
                    {session.user.name}
                  </span>
                </p>
              </div>
            )}

            <main className="my-auto items-center justify-center">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
