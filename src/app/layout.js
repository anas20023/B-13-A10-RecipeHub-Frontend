import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


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
      className={`${geistSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
