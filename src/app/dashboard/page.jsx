import { headers } from 'next/headers'
import { auth } from '../lib/auth'
import { getDashboardSections, getNormalizedSectionKey } from './dashboard-config'
import DashboardShell from './components/DashboardShell'

export default async function DashboardPage({ searchParams }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const role = session?.user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user'
  const params = await searchParams
  const sectionKey = typeof params?.section === 'string' ? params.section : 'overview'
  const activeSectionKey = getNormalizedSectionKey(role, sectionKey)
  const sections = getDashboardSections(role)

  const userName = session?.user?.name || 'RecipeHub Member'
  const userEmail = session?.user?.email || 'Active account'
  const userAvatar = session?.user?.image
  const uploadedCount = Number(session?.user?.uploaded) || 0
  const isPremium = Boolean(session?.user?.isPremium)
  const canUploadMore = role === 'admin' || isPremium || uploadedCount < 2

  const panelByRole = {
    user: {
      overview: {
        eyebrow: 'User Dashboard',
        title: 'Overview',
        description: 'Track your recipe activity, favorites, and premium status from one place.',
      },
      'my-recipes': {
        eyebrow: 'User Dashboard',
        title: 'My Recipes',
        description: 'View the recipes you have published and keep track of your upload limit.',
      },
      'add-recipe': {
        eyebrow: 'User Dashboard',
        title: 'Add Recipe',
        description: 'Publish a new recipe while keeping the free-plan upload limit in mind.',
      },
      favorites: {
        eyebrow: 'User Dashboard',
        title: 'My Favorites',
        description: 'Recipes you save will appear here for quick access later.',
      },
      purchased: {
        eyebrow: 'User Dashboard',
        title: 'My Purchased Recipes',
        description: 'All paid recipes you own will be available in this section.',
      },
      profile: {
        eyebrow: 'User Dashboard',
        title: 'Profile',
        description: 'Manage your account details, plan status, and personal preferences.',
      },
    },
    admin: {
      overview: {
        eyebrow: 'Admin Dashboard',
        title: 'Overview',
        description: 'Monitor users, recipes, and reports from one control center.',
      },
      users: {
        eyebrow: 'Admin Dashboard',
        title: 'Manage Users',
        description: 'Review account roles, premium status, and moderation flags.',
      },
      recipes: {
        eyebrow: 'Admin Dashboard',
        title: 'Manage Recipes',
        description: 'Approve, feature, or remove recipes that do not match policy.',
      },
      reports: {
        eyebrow: 'Admin Dashboard',
        title: 'Reports',
        description: 'See what needs attention and keep the community safe.',
      },
    },
  }

  const panel = panelByRole[role][activeSectionKey] ?? panelByRole[role].overview

  return (
    <DashboardShell
      role={role}
      sections={sections}
      activeSectionKey={activeSectionKey}
      panel={panel}
      userName={userName}
      userEmail={userEmail}
      userAvatar={userAvatar}
      uploadedCount={uploadedCount}
      isPremium={isPremium}
      canUploadMore={canUploadMore}
    />
  )
}
