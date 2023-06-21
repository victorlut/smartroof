import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/layouts/main-nav"

export function SiteSidebar() {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full lg:translate-x-0 border-r border-slate-200"
      aria-label="Sidebar"
    >
      <div className="h-full px-6 py-6 overflow-y-auto bg-white dark:bg-gray-800">
        <Link href="/" className="flex items-center pl-2.5 mb-5">
          <Icons.logo className="h-6 w-6" />
        </Link>
        <MainNav items={siteConfig.mainNav} />
      </div>
    </aside>
  )
}
