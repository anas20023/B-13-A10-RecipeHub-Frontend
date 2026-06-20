import { Geist, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-plus-jakarta",
});

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${geistSans.className} ${plusJakarta.variable} ${inter.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col">
                <Script
                    id="theme-initializer"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
                    }}
                />
                <Providers>{children}</Providers>
                <Toaster position="top-center" />
            </body>
        </html>
    );
}
