import Link from 'next/link'
import { BadgeCheck, Crown, Heart, PlusCircle, Sparkles } from 'lucide-react'
import { USER_OVERVIEW_CARDS } from '../dashboard-config'

function OverviewPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {USER_OVERVIEW_CARDS.map((card) => {
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

function MyRecipesPanel() {
  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_12px_40px_rgba(249,115,22,0.08)] dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
            Recipe quota
          </p>
          <h3 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Normal users can add 2 recipes</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Premium members can add unlimited recipes. Upgrade when you are ready to grow your kitchen brand.
          </p>
        </div>

        <Link
          href="/premium"
          className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-orange-600 to-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5"
        >
          Check This
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl bg-orange-50 p-4 dark:bg-orange-500/10">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Upload limit</p>
          <p className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">2 recipes</p>
        </div>
        <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/60">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Premium unlock</p>
          <p className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">Unlimited uploads</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Recommended next step</p>
          <p className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">Upgrade to premium</p>
        </div>
      </div>
    </div>
  )
}

function AddRecipePanel() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
      <section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_12px_40px_rgba(249,115,22,0.08)] dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-orange-50 p-3 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            <PlusCircle size={20} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Add a new recipe</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              A normal user can add 2 recipes. Premium unlocks unlimited recipe creation.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Recipe title</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">What will you cook?</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Upload status</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Ready for your next recipe</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Plan limit</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">2 recipes on free plan</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Upgrade path</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Become premium to unlock unlimited uploads
            </p>
          </div>
        </div>
      </section>

      <aside className="rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_12px_40px_rgba(249,115,22,0.08)] dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Premium reminder</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Free accounts stop at two recipes.</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-linear-to-br from-orange-500 to-amber-500 p-5 text-white shadow-lg shadow-orange-500/25">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">Unlock more</p>
          <p className="mt-3 text-xl font-bold">Upgrade to premium and keep publishing without limits.</p>
          <Link
            href="/premium"
            className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
          >
            Check This
          </Link>
        </div>
      </aside>
    </div>
  )
}

function FavoritesPanel() {
  return (
    <div className="rounded-3xl border border-dashed border-orange-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/80">
      <Heart className="mx-auto text-orange-500" size={36} />
      <h3 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">No favorites yet</h3>
      <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        Save recipes you love so they are easy to find the next time you are cooking.
      </p>
      <Link
        href="/recipes"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
      >
        Browse recipes
      </Link>
    </div>
  )
}

function PurchasedPanel() {
  return (
    <div className="rounded-3xl border border-dashed border-orange-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/80">
      <BadgeCheck className="mx-auto text-emerald-500" size={36} />
      <h3 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Nothing purchased yet</h3>
      <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        When you buy a recipe, you will be able to open it from this library anytime.
      </p>
    </div>
  )
}

function ProfilePanel() {
  return (
    <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_12px_40px_rgba(249,115,22,0.08)] dark:border-zinc-800 dark:bg-zinc-900/80">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Account summary</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950/60">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Role</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">User</p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950/60">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Plan</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Free</p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950/60">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Recipe limit</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">2 uploads</p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950/60">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Upgrade path</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Premium</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-orange-100 bg-linear-to-br from-orange-500 to-amber-500 p-6 text-white shadow-lg shadow-orange-500/20">
        <h3 className="text-xl font-bold">Become a premium member</h3>
        <p className="mt-3 text-sm leading-6 text-white/85">
          Unlock unlimited uploads, remove the 2-recipe cap, and grow your RecipeHub presence faster.
        </p>
        <Link
          href="/premium"
          className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
        >
          Check This
        </Link>
      </div>
    </div>
  )
}

export default function UserDashboardPanels({ sectionKey }) {
  switch (sectionKey) {
    case 'my-recipes':
      return <MyRecipesPanel />
    case 'add-recipe':
      return <AddRecipePanel />
    case 'favorites':
      return <FavoritesPanel />
    case 'purchased':
      return <PurchasedPanel />
    case 'profile':
      return <ProfilePanel />
    case 'overview':
    default:
      return <OverviewPanel />
  }
}
