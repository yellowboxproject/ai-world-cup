import "./globals.css";
import { Footer, Header, MobileBottomNav } from "@/components/layout";

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
