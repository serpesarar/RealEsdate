import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle dashboard route redirects and validation
  if (pathname === "/dashboard") {
    // Default dashboard redirect to manager dashboard
    return NextResponse.redirect(new URL("/dashboard/manager", request.url))
  }

  // Handle role-specific dashboard access
  const roleRoutes = [
    "/dashboard/owner",
    "/dashboard/manager",
    "/dashboard/tenant",
    "/dashboard/handyman",
    "/dashboard/accountant",
  ]

  // Check if accessing a role-specific dashboard
  const isRoleDashboard = roleRoutes.some((route) => pathname.startsWith(route))

  if (isRoleDashboard) {
    // Add security headers for dashboard routes
    const response = NextResponse.next()
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    return response
  }

  // Handle legacy route redirects
  const legacyRoutes = {
    "/properties": "/dashboard/properties",
    "/tenants": "/dashboard/tenants",
    "/leases": "/dashboard/leases",
    "/maintenance": "/dashboard/maintenance",
    "/payments": "/dashboard/payments",
  }

  if (legacyRoutes[pathname as keyof typeof legacyRoutes]) {
    return NextResponse.redirect(new URL(legacyRoutes[pathname as keyof typeof legacyRoutes], request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
