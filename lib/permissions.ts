export const permissions = {
  OWNER: {
    canView: ["*"], // Everything
    canEdit: ["*"],
    canDelete: ["*"],
    canApprove: ["*"],
  },
  MANAGER: {
    canView: ["tenants", "maintenance", "contractors", "payments"],
    canEdit: ["maintenance", "contractors"],
    canApprove: ["maintenance_under_500"],
    restricted: ["financial_reports", "owner_settings"],
  },
  TENANT: {
    canView: ["own_profile", "own_lease", "own_payments", "amenities"],
    canEdit: ["own_profile", "issue_reports"],
    canMessage: ["assigned_handyman", "manager"],
    restricted: ["other_tenants", "financial_data"],
  },
  HANDYMAN: {
    canView: ["assigned_jobs", "team_members", "job_history"],
    canEdit: ["job_status", "expenses"],
    canDelegate: ["to_team_members"],
    restricted: ["tenant_personal_info", "financial_data"],
  },
  ACCOUNTANT: {
    canView: ["financial_reports", "transactions", "expenses"],
    canEdit: ["financial_records", "tax_documents"],
    canExport: ["financial_data"],
    restricted: ["tenant_personal_info", "maintenance_details"],
  },
} as const

export type UserRole = keyof typeof permissions
export type Permission = keyof (typeof permissions)[UserRole]

export function hasPermission(role: UserRole, permission: string, resource?: string): boolean {
  const rolePermissions = permissions[role]

  // Check if user has wildcard access
  if (rolePermissions.canView?.includes("*") || rolePermissions.canEdit?.includes("*")) {
    return true
  }

  // Check specific permissions
  const permissionKey = permission as Permission
  const userPermissions = rolePermissions[permissionKey] as string[] | undefined

  if (!userPermissions) return false

  // Check if resource is in allowed list
  if (resource) {
    return userPermissions.includes(resource) || userPermissions.includes("*")
  }

  return userPermissions.length > 0
}

export function isRestricted(role: UserRole, resource: string): boolean {
  const rolePermissions = permissions[role]
  const restricted = rolePermissions.restricted as string[] | undefined

  return restricted?.includes(resource) || false
}
