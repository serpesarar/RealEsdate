"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Home, Search } from "lucide-react"
import Link from "next/link"

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg text-center"
      >
        <Card>
          <CardHeader className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold">404 - Page Not Found</CardTitle>
              <CardDescription className="mt-2 text-lg">
                The page you're looking for doesn't exist in PropertyFlow.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Button asChild size="lg" className="w-full">
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Go to Homepage
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="w-full bg-transparent">
                <Link href="/dashboard">
                  <Search className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Common pages you might be looking for:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/dashboard" className="text-blue-600 hover:underline">
                  Dashboard
                </Link>
                <span>•</span>
                <Link href="/dashboard/properties" className="text-blue-600 hover:underline">
                  Properties
                </Link>
                <span>•</span>
                <Link href="/dashboard/tenants" className="text-blue-600 hover:underline">
                  Tenants
                </Link>
                <span>•</span>
                <Link href="/dashboard/leases" className="text-blue-600 hover:underline">
                  Leases
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
