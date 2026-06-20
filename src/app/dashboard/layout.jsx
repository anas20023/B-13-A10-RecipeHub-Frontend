import { Geist, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "@/app/globals.css"
import { Providers } from "../providers";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: "--font-plus-jakarta",
});
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-inter",
});

export const metadata = {
  title: "RecipeHub Dashboard",
  description: `RecipeHub is a platform where food enthusiasts can create, share, discover, and manage recipes.
Users can publish their own recipes, browse recipes shared by others, save favorite recipes, and interact with the community.
The platform creates a centralized space for recipe sharing and culinary inspiration`,
};

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
            `
          }}
        />
        <Providers>
          {/* <Navbar /> */}
          <main className="min-h-screen">{children}</main>
          {/* <Footer /> */}
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

