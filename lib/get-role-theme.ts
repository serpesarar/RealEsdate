export type UserRole = "PROPERTY_OWNER" | "PROPERTY_MANAGER" | "TENANT" | "HANDYMAN"

export interface RoleTheme {
  sidebar: string
  accent: string
  hover: string
  text: string
  border: string
}

export const getRoleTheme = (role: UserRole): RoleTheme => {
  const themes: Record<UserRole, RoleTheme> = {
    PROPERTY_OWNER: {
      sidebar: "bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900",
      accent: "from-blue-600 to-indigo-600",
      hover: "hover:bg-blue-800/50",
      text: "text-blue-100",
      border: "border-blue-700",
    },
    PROPERTY_MANAGER: {
      sidebar: "bg-white border-r border-gray-200",
      accent: "from-gray-600 to-gray-700",
      hover: "hover:bg-gray-100",
      text: "text-gray-900",
      border: "border-gray-200",
    },
    TENANT: {
      sidebar: "bg-gradient-to-b from-green-900 via-teal-900 to-green-900",
      accent: "from-green-600 to-emerald-600",
      hover: "hover:bg-green-800/50",
      text: "text-green-100",
      border: "border-green-700",
    },
    HANDYMAN: {
      sidebar: "bg-gradient-to-b from-orange-900 via-amber-900 to-orange-900",
      accent: "from-orange-600 to-red-600",
      hover: "hover:bg-orange-800/50",
      text: "text-orange-100",
      border: "border-orange-700",
    },
  }

  return themes[role] || themes.TENANT
}
