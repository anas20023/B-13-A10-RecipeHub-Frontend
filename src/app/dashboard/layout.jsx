export const metadata = {
    title: "RecipeHub Dashboard",
    description: `RecipeHub is a platform where food enthusiasts can create, share, discover, and manage recipes.
Users can publish their own recipes, browse recipes shared by others, save favorite recipes, and interact with the community.
The platform creates a centralized space for recipe sharing and culinary inspiration`,
};

export default function DashboardLayout({ children }) {
    return <main className="min-h-screen">{children}</main>;
}
