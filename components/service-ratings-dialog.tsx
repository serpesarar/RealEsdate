"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Star, Wrench, CheckCircle, Clock, User } from "lucide-react"
import { useState } from "react"

interface ServiceRatingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ServiceRatingsDialog({ open, onOpenChange }: ServiceRatingsDialogProps) {
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const completedServices = [
    {
      id: 1,
      type: "Plumbing",
      description: "Kitchen faucet repair",
      technician: "Mike Johnson",
      completedDate: "Dec 15, 2024",
      status: "Completed",
      rated: false,
    },
    {
      id: 2,
      type: "Electrical",
      description: "Bathroom light fixture replacement",
      technician: "Sarah Wilson",
      completedDate: "Dec 10, 2024",
      status: "Completed",
      rated: true,
      rating: 5,
      review: "Excellent work! Very professional and clean.",
    },
    {
      id: 3,
      type: "HVAC",
      description: "Air conditioning filter replacement",
      technician: "Tom Davis",
      completedDate: "Dec 5, 2024",
      status: "Completed",
      rated: true,
      rating: 4,
      review: "Good service, arrived on time.",
    },
  ]

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= (interactive ? hoveredRating || selectedRating : rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
            onClick={() => interactive && onRate && onRate(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
          />
        ))}
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Service Ratings
          </DialogTitle>
          <DialogDescription>Rate completed maintenance work and provide feedback</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pending Ratings */}
          <div>
            <h3 className="text-lg font-medium mb-4">Pending Your Rating</h3>
            {completedServices
              .filter((service) => !service.rated)
              .map((service) => (
                <Card key={service.id} className="border-orange-200 bg-orange-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{service.description}</h4>
                          <Badge className="bg-orange-500 text-white">Awaiting Rating</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{service.technician}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>Completed {service.completedDate}</span>
                          </div>
                          <Badge variant="outline">{service.type}</Badge>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Rate this service:</label>
                            {renderStars(selectedRating, true, setSelectedRating)}
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 block">Your feedback:</label>
                            <Textarea
                              placeholder="How was the service? Any comments about the technician's work, punctuality, or professionalism?"
                              className="min-h-[100px]"
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button className="bg-orange-500 hover:bg-orange-600">Submit Rating</Button>
                            <Button variant="outline">Skip for Now</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Previous Ratings */}
          <div>
            <h3 className="text-lg font-medium mb-4">Your Previous Ratings</h3>
            <div className="space-y-3">
              {completedServices
                .filter((service) => service.rated)
                .map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{service.description}</h4>
                            <div className="flex items-center gap-2">
                              {renderStars(service.rating || 0)}
                              <span className="text-sm text-muted-foreground">({service.rating}/5)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{service.technician}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{service.completedDate}</span>
                            </div>
                            <Badge variant="outline">{service.type}</Badge>
                          </div>
                          {service.review && (
                            <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                              "{service.review}"
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Rating Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rating Summary</CardTitle>
              <CardDescription>Overview of your service ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">4.5</div>
                  <div className="flex justify-center mb-1">{renderStars(4.5)}</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Services Rated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-muted-foreground">Pending Ratings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
