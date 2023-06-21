import { NavItem } from "@/types/nav"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      {items?.length ? (
        <ul className="space-y-2 font-medium">
          {items?.map(
            (item, index) =>
              item.href && (
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item.icon && <item.icon />}
                    <span className="ml-3">{item.title}</span>
                  </a>
                </li>
              )
          )}
        </ul>
      ) : null}
    </div>
  )
}
