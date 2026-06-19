import Link from 'next/link'
import { Crown, Shield, Sparkles } from 'lucide-react'

export default function DashboardSidebar({
  role,
  sections,
  activeSectionKey,
  userName,
  userEmail,
  userAvatar,
  uploadedCount,
  isPremium,
}) {
  return (
    <aside className="rounded-[28px] border border-orange-100 bg-white/90 p-5 shadow-[0_20px_60px_rgba(249,115,22,0.10)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="rounded-[24px] bg-linear-to-br from-orange-600 to-amber-500 p-5 text-white shadow-lg shadow-orange-500/20">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/15 p-3">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/75">RecipeHub</p>
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white/20 text-sm font-bold">
              {userAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={userAvatar} alt={userName} className="h-full w-full object-cover" />
              ) : (
                <span>{userName.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{userName}</p>
              <p className="truncate text-xs text-white/75">{userEmail}</p>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            {role === 'admin' ? <Shield size={13} /> : <Sparkles size={13} />}
            {role === 'admin' ? 'Admin User' : 'User Account'}
          </div>
        </div>
      </div>

      <nav className="mt-6 space-y-1.5">
        {sections.map((item) => {
          const Icon = item.icon
          const active = item.key === activeSectionKey
          return (
            <Link
              key={item.key}
              href={`/dashboard?section=${item.key}`}
              className={[
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                active
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-zinc-600 hover:bg-orange-50 hover:text-orange-700 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-orange-400',
              ].join(' ')}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {role !== 'admin' && (
        <div className="mt-6 rounded-3xl border border-amber-200 bg-linear-to-br from-amber-50 to-orange-50 p-5 dark:border-amber-500/20 dark:from-amber-500/10 dark:to-orange-500/5">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
            <Crown size={16} />
            <span className="text-sm font-semibold">Premium member</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {isPremium
              ? 'You already have premium access and can add unlimited recipes.'
              : `You have uploaded ${uploadedCount} of 2 recipes. Upgrade to continue growing.`}
          </p>
          <Link
            href="/premium"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
          >
            Check This
          </Link>
        </div>
      )}

      {role === 'admin' && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Admin access</p>
          <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Use the sidebar to manage users, recipes, and reports from a single place.
          </p>
        </div>
      )}
    </aside>
  )
}
