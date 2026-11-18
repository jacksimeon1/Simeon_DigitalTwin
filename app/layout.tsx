import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "./providers";
import { ThemeProvider } from "./ThemeProvider";
import { LanguageProvider } from "./contexts/LanguageContext";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  title: "Robert Simeon Jr - Digital Twin Portfolio",
  description: "Digital Twin Portfolio of Robert Simeon Jr, a 4th year SPUP student showcasing projects and skills with AI chatbot and voice assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="font-sans antialiased"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <AnalyticsTracker />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
