export type SubmenuItem = {
  label: string
  href: string
  description?: string
  icon?: string
  badge?: string
}

export type HeaderItem = {
  label: string
  href: string
  submenu?: SubmenuItem[]
}
