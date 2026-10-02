import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AssistantLauncher from "@/components/assistant/AssistantLauncher";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import Preloader from "@/components/motion/Preloader";
import "./globals.css";

const skipIntroScript =
  "try{if(sessionStorage.getItem('fd-intro-seen')){document.documentElement.classList.add('fd-skip-intro')}}catch(e){}";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "digital marketing agency",
    "web development agency",
    "Next.js development",
    "SEO",
    "branding",
    "UI design",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: skipIntroScript }} />
        <SmoothScroll>
          <ScrollProgress />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AssistantLauncher />
          <CustomCursor />
          <Preloader />
        </SmoothScroll>
      </body>
    </html>
  );
}
