import "~/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from "@clerk/themes";

import { Inter } from "next/font/google";
import Navbar from "~/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Messaging App",
  description: "A Chat app made with nextjs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body className={`font-sans ${inter.variable} h-svh flex flex-col`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
