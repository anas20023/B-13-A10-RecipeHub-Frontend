import { Geist,Plus_Jakarta_Sans,Inter   } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'], 
});
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "RecipeHub - Recipe Sharing Platform",
  description: `RecipeHub is a platform where food enthusiasts can create, share, discover, and manage recipes.
Users can publish their own recipes, browse recipes shared by others, save favorite recipes, and interact with the community.
The platform creates a centralized space for recipe sharing and culinary inspiration`,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} ${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
