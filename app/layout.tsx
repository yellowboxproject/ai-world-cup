import "./globals.css";
import { Footer, Header, MobileBottomNav } from "@/components/layout";

export const metadata = {
  metadataBase: new URL("https://aiworldcupmodels.com"),
  title: "AI Model World Cup",
  description: "48 AI models. 12 groups. One champion chosen by fan votes.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
  openGraph: {
    title: "AI Model World Cup",
    description: "48 AI models. 12 groups. One champion chosen by fan votes.",
    url: "https://aiworldcupmodels.com",
    siteName: "AI Model World Cup",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Model World Cup"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Model World Cup",
    description: "48 AI models. 12 groups. One champion chosen by fan votes.",
    images: ["/opengraph-image"]
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
