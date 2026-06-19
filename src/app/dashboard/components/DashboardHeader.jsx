import { Shield, Sparkles } from 'lucide-react'

export default function DashboardHeader({ role, panel, canUploadMore }) {
  return (
    <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600 dark:text-orange-400">
          {panel.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {panel.title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          {panel.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
          <Shield size={15} />
          {role === 'admin' ? 'Admin dashboard' : 'User dashboard'}
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
          <Sparkles size={15} />
          {canUploadMore ? 'Ready to publish' : 'Upload limit reached'}
        </div>
      </div>
    </div>
  )
}
