import DashboardHeader from './DashboardHeader'
import DashboardSidebar from './DashboardSidebar'
import AdminDashboardPanels from './AdminDashboardPanels'
import UserDashboardPanels from './UserDashboardPanels'

export default function DashboardShell({
  role,
  sections,
  activeSectionKey,
  panel,
  userName,
  userEmail,
  userAvatar,
  uploadedCount,
  isPremium,
  canUploadMore,
}) {
  const Panels = role === 'admin' ? AdminDashboardPanels : UserDashboardPanels

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_25%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.08),transparent_24%),linear-gradient(180deg,#fff8f1_0%,#fffdf9_100%)] px-4 py-6 dark:bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.10),transparent_25%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.06),transparent_24%),linear-gradient(180deg,#09090b_0%,#111113_100%)] sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar
          role={role}
          sections={sections}
          activeSectionKey={activeSectionKey}
          userName={userName}
          userEmail={userEmail}
          userAvatar={userAvatar}
          uploadedCount={uploadedCount}
          isPremium={isPremium}
        />

        <section className="rounded-[28px] border border-orange-100 bg-white/90 p-5 shadow-[0_20px_60px_rgba(249,115,22,0.10)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 sm:p-6 lg:p-8">
          <DashboardHeader role={role} panel={panel} canUploadMore={canUploadMore} />
          <div className="mt-6">
            <Panels sectionKey={activeSectionKey} />
          </div>
        </section>
      </div>
    </div>
  )
}
