import { Flag, Shield, UtensilsCrossed } from 'lucide-react'
import { ADMIN_OVERVIEW_CARDS } from '../dashboard-config'

function OverviewPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {ADMIN_OVERVIEW_CARDS.map((card) => {
        const Icon = card.icon
        return (
          <article
            key={card.title}
            className="rounded-3xl border border-orange-100 bg-white p-5 shadow-[0_12px_40px_rgba(249,115,22,0.08)] dark:border-zinc-800 dark:bg-zinc-900/80"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{card.title}</p>
                <h3 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">{card.value}</h3>
              </div>
              <div className="rounded-2xl bg-orange-50 p-3 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                <Icon size={18} />
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{card.note}</p>
          </article>
        )
      })}
    </div>
  )
}

function ManageUsersPanel() {
  return (
    <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_12px_40px_rgba(249,115,22,0.08)] dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">User moderation queue</h3>
      </div>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {[
          ['Ayesha Rahman', 'User', 'Premium: Active', 'Published 14 recipes'],
          ['Tanvir Hasan', 'User', 'Premium: Inactive', 'Published 2 recipes'],
          ['Recipe Moderator', 'Admin', 'Trusted role', 'Monitoring reports'],
        ].map((row) => (
          <div key={row[0]} className="grid gap-3 px-6 py-4 md:grid-cols-[1.2fr_.7fr_.9fr_1fr] md:items-center">
            <div className="font-semibold text-zinc-900 dark:text-zinc-50">{row[0]}</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{row[1]}</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{row[2]}</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{row[3]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ManageRecipesPanel() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {[
        {
          title: 'Reported recipes',
          value: '12 items',
          note: 'Review content quality and policy violations quickly.',
          icon: Flag,
        },
        {
          title: 'Published recipes',
          value: '3.2K items',
          note: 'Healthy content growth across the community.',
          icon: UtensilsCrossed,
        },
      ].map((card) => {
        const Icon = card.icon
        return (
          <article
            key={card.title}
            className="rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_12px_40px_rgba(249,115,22,0.08)] dark:border-zinc-800 dark:bg-zinc-900/80"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{card.title}</p>
                <h3 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">{card.value}</h3>
              </div>
              <div className="rounded-2xl bg-orange-50 p-3 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                <Icon size={18} />
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{card.note}</p>
          </article>
        )
      })}
    </div>
  )
}

function ReportsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        ['Spam reports', '08 open', 'Needs quick review'],
        ['Content flags', '14 open', 'Recipe quality issues'],
        ['User disputes', '03 open', 'Communication support'],
      ].map(([title, value, note]) => (
        <article
          key={title}
          className="rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_12px_40px_rgba(249,115,22,0.08)] dark:border-zinc-800 dark:bg-zinc-900/80"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">{value}</h3>
          <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{note}</p>
        </article>
      ))}
    </div>
  )
}

export default function AdminDashboardPanels({ sectionKey }) {
  switch (sectionKey) {
    case 'users':
      return <ManageUsersPanel />
    case 'recipes':
      return <ManageRecipesPanel />
    case 'reports':
      return <ReportsPanel />
    case 'overview':
    default:
      return <OverviewPanel />
  }
}
