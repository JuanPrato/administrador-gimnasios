import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "./_components/ui/sonner";
import { HydrateClient } from "~/trpc/server";
import { Header } from "./_components/common/header";

export const metadata: Metadata = {
  title: "Gym manager",
  description: "Trackea la actividad en tu gimnasio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <div className='min-h-screen bg-gray-50 space-y-6 p-4 md:p-6 lg:p-8'>
              {/* Header */}
              <Header />
              {children}
            </div>
          </HydrateClient>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html >
  );
}
