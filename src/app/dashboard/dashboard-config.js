import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  Crown,
  Flag,
  Heart,
  LayoutDashboard,
  PlusCircle,
  Shield,
  User2,
  Users,
  UtensilsCrossed,
} from 'lucide-react'

export const USER_SECTIONS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'my-recipes', label: 'My Recipes', icon: BookOpen },
  { key: 'add-recipe', label: 'Add Recipe', icon: PlusCircle },
  { key: 'favorites', label: 'My Favorites', icon: Heart },
  { key: 'purchased', label: 'My Purchased Recipes', icon: BadgeCheck },
  { key: 'profile', label: 'Profile', icon: User2 },
]

export const ADMIN_SECTIONS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'users', label: 'Manage Users', icon: Users },
  { key: 'recipes', label: 'Manage Recipes', icon: UtensilsCrossed },
  { key: 'reports', label: 'Reports', icon: BarChart3 },
]

export const USER_OVERVIEW_CARDS = [
  {
    title: 'Recipes uploaded',
    value: '2 max',
    note: 'Normal users can add up to 2 recipes.',
    icon: Crown,
  },
  {
    title: 'Premium access',
    value: 'Unlimited',
    note: 'Premium membership unlocks more recipe uploads.',
    icon: Crown,
  },
  {
    title: 'Saved recipes',
    value: 'Favorites',
    note: 'Keep your go-to meals in one place.',
    icon: Heart,
  },
  {
    title: 'Purchased recipes',
    value: 'Library',
    note: 'Access recipes you have already bought.',
    icon: BadgeCheck,
  },
]

export const ADMIN_OVERVIEW_CARDS = [
  {
    title: 'Total users',
    value: 'Community',
    note: 'Review and manage every account in the system.',
    icon: Users,
  },
  {
    title: 'Total recipes',
    value: 'Catalog',
    note: 'Keep recipe content clean, helpful, and searchable.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Open reports',
    value: 'Moderation',
    note: 'Track flagged content and resolve reports quickly.',
    icon: Flag,
  },
  {
    title: 'Platform health',
    value: 'Stable',
    note: 'Monitor usage and keep the marketplace trustworthy.',
    icon: Shield,
  },
]

export function getDashboardSections(role) {
  return role === 'admin' ? ADMIN_SECTIONS : USER_SECTIONS
}

export function getNormalizedSectionKey(role, sectionKey) {
  const sections = getDashboardSections(role)
  return sections.find((section) => section.key === sectionKey)?.key ?? sections[0].key
}
