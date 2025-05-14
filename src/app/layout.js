import { ClerkProvider, SignedOut } from "@clerk/nextjs";
import "./globals.css";
import { Poppins } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";
import LayoutWrapper from "./LayoutWrapper";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: "Ai-Recruiter",
  description: "Interview Using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <ClerkProvider>
          <LayoutWrapper >
            {children}
            <Toaster />
          </LayoutWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
