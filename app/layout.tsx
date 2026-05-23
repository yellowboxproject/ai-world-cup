import "./globals.css";
import { Footer, Header, MobileBottomNav } from "@/components/layout";

export const metadata = {
  title: "AI Model World Cup",
  description: "48 AI models. 12 groups. One champion chosen by fan votes.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
