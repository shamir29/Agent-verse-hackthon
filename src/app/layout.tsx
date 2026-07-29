import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { UserProvider } from "@/context/UserContext";
import { EnterpriseLayout } from "@/components/layout/EnterpriseLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeuraGrid.ai — Unified Smart City AI Operating System",
  description: "Enterprise Smart City OS for Power Grid, Water, Air Quality, Solar, Mobility & Urban Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen bg-bg text-text-primary flex flex-col antialiased">
        <ReactQueryProvider>
          <UserProvider>
            <EnterpriseLayout>{children}</EnterpriseLayout>
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
