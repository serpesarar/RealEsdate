import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Shield } from "lucide-react"

export default function PlatformServicesStatus() {
  const services = [
    {
      name: "Background Checks",
      status: "active",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    {
      name: "ID Verification",
      status: "active",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    {
      name: "Income Verification",
      status: "active",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    {
      name: "Automated References",
      status: "coming_soon",
      icon: <Clock className="w-5 h-5 text-yellow-600" />,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
      case "coming_soon":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Coming Soon</Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Available Services</span>
        </CardTitle>
        <CardDescription>
          All services are managed by PropertyFlow. No API keys or technical setup required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between p-3 border rounded-lg bg-white/50 dark:bg-slate-800/50"
            >
              <div className="flex items-center space-x-3">
                {service.icon}
                <span className="font-medium">{service.name}</span>
              </div>
              {getStatusBadge(service.status)}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <Shield className="w-4 h-4 inline mr-2" />
            All services are managed by PropertyFlow. No API keys or technical setup required. Just add your payment
            method and start using!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
