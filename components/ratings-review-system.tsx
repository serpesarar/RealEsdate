"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MessageSquare, Award, CheckCircle } from "lucide-react"
import { format } from "date-fns"

// Mock ratings and reviews data
const handymenRatings = [
  {
    id: 1,
    name: "Mike Rodriguez",
    specialty: "Plumbing",
    avatar: "/placeholder.svg?height=32&width=32",
    overallRating: 4.8,
    totalReviews: 47,
    completedJobs: 52,
    responseTime: "1.2 hours",
    badges: ["Top Performer", "Quick Response", "Quality Work"],
    ratingBreakdown: {
      5: 38,
      4: 7,
      3: 2,
      2: 0,
      1: 0,
    },
    recentReviews: [
      {
        id: 1,
        tenant: "Sarah Johnson",
        tenantAvatar: "/placeholder.svg?height=32&width=32",
        rating: 5,
        comment:
          "Mike was fantastic! Fixed the kitchen faucet quickly and cleaned up after himself. Very professional and friendly.",
        date: "2024-01-15T14:30:00Z",
        workOrder: "MNT-001",
        property: "Sunset Apartments - Unit 2A",
        categories: {
          quality: 5,
          timeliness: 5,
          communication: 5,
          cleanliness: 5,
        },
      },
      {
        id: 2,
        tenant: "David Wilson",
        tenantAvatar: "/placeholder.svg?height=32&width=32",
        rating: 5,
        comment:
          "Excellent work on the bathroom drain. Explained the issue clearly and provided tips to prevent future problems.",
        date: "2024-01-12T16:45:00Z",
        workOrder: "MNT-004",
        property: "Riverside Condos - Unit 12A",
        categories: {
          quality: 5,
          timeliness: 4,
          communication: 5,
          cleanliness: 5,
        },
      },
    ],
  },
  {
    id: 2,
    name: "John Smith",
    specialty: "Electrical",
    avatar: "/placeholder.svg?height=32&width=32",
    overallRating: 4.6,
    totalReviews: 32,
    completedJobs: 35,
    responseTime: "2.1 hours",
    badges: ["Safety Expert", "Reliable"],
    ratingBreakdown: {
      5: 22,
      4: 8,
      3: 2,
      2: 0,
      1: 0,
    },
    recentReviews: [
      {
        id: 3,
        tenant: "Emily Rodriguez",
        tenantAvatar: "/placeholder.svg?height=32&width=32",
        rating: 4,
        comment:
          "Good work on the light fixture. Arrived on time and completed the job efficiently. Could have communicated better about the timeline.",
        date: "2024-01-10T11:20:00Z",
        workOrder: "MNT-003",
        property: "Garden View Complex - Unit 8C",
        categories: {
          quality: 5,
          timeliness: 4,
          communication: 3,
          cleanliness: 4,
        },
      },
    ],
  },
  {
    id: 3,
    name: "Sarah Davis",
    specialty: "General Maintenance",
    avatar: "/placeholder.svg?height=32&width=32",
    overallRating: 4.7,
    totalReviews: 28,
    completedJobs: 31,
    responseTime: "1.8 hours",
    badges: ["Versatile", "Detail-Oriented"],
    ratingBreakdown: {
      5: 20,
      4: 6,
      3: 2,
      2: 0,
      1: 0,
    },
    recentReviews: [
      {
        id: 4,
        tenant: "Lisa Thompson",
        tenantAvatar: "/placeholder.svg?height=32&width=32",
        rating: 5,
        comment:
          "Sarah did an amazing job with the door hinges. Very thorough and took the time to explain what she was doing.",
        date: "2024-01-08T13:15:00Z",
        workOrder: "MNT-005",
        property: "Modern Heights - Unit 7D",
        categories: {
          quality: 5,
          timeliness: 5,
          communication: 5,
          cleanliness: 4,
        },
      },
    ],
  },
]

const pendingReviews = [
  {
    id: 1,
    workOrder: "MNT-006",
    handyman: "Mike Rodriguez",
    handymanAvatar: "/placeholder.svg?height=32&width=32",
    tenant: "Alex Chen",
    property: "Downtown Lofts - Unit 8B",
    completedDate: "2024-01-16T10:30:00Z",
    issue: "Garbage disposal repair",
    cost: 85.0,
  },
  {
    id: 2,
    workOrder: "MNT-007",
    handyman: "John Smith",
    handymanAvatar: "/placeholder.svg?height=32&width=32",
    tenant: "Maria Garcia",
    property: "Sunset Apartments - Unit 5C",
    completedDate: "2024-01-15T15:20:00Z",
    issue: "Outlet installation",
    cost: 120.0,
  },
]

interface RatingsReviewSystemProps {
  userRole?: "tenant" | "manager" | "owner"
}

export function RatingsReviewSystem({ userRole = "manager" }: RatingsReviewSystemProps) {
  const [selectedHandyman, setSelectedHandyman] = useState<any>(null)
  const [reviewDialog, setReviewDialog] = useState<{
    isOpen: boolean
    workOrder: any
  }>({
    isOpen: false,
    workOrder: null,
  })
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: "",
    categories: {
      quality: 0,
      timeliness: 0,
      communication: 0,
      cleanliness: 0,
    },
  })

  const handleSubmitReview = () => {
    console.log("Submitting review:", reviewForm)
    setReviewDialog({ isOpen: false, workOrder: null })
    setReviewForm({
      rating: 0,
      comment: "",
      categories: {
        quality: 0,
        timeliness: 0,
        communication: 0,
        cleanliness: 0,
      },
    })
  }

  const StarRating = ({
    rating,
    onRatingChange,
    readonly = false,
  }: {
    rating: number
    onRatingChange?: (rating: number) => void
    readonly?: boolean
  }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 cursor-pointer transition-colors ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300 hover:text-yellow-200"
            } ${readonly ? "cursor-default" : ""}`}
            onClick={() => !readonly && onRatingChange?.(star)}
          />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">{rating > 0 ? `${rating}/5` : "Not rated"}</span>
      </div>
    )
  }

  const RatingBreakdown = ({
    breakdown,
    totalReviews,
  }: {
    breakdown: Record<number, number>
    totalReviews: number
  }) => {
    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-12">
              <span className="text-sm">{stars}</span>
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
            </div>
            <Progress value={(breakdown[stars] / totalReviews) * 100} className="flex-1 h-2" />
            <span className="text-sm text-muted-foreground w-8">{breakdown[stars]}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
          <p className="text-muted-foreground">
            {userRole === "tenant"
              ? "Rate completed maintenance work and view handyman profiles"
              : "Monitor service quality and handyman performance"}
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {userRole === "tenant" ? "Tenant View" : "Management View"}
        </Badge>
      </div>

      <Tabs defaultValue={userRole === "tenant" ? "pending" : "handymen"} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="handymen">Handyman Ratings</TabsTrigger>
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          <TabsTrigger value="recent">Recent Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="handymen" className="space-y-6">
          {/* Handyman Performance Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {handymenRatings.map((handyman) => (
              <Card
                key={handyman.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedHandyman(handyman)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={handyman.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {handyman.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{handyman.name}</CardTitle>
                      <CardDescription>{handyman.specialty}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(handyman.overallRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{handyman.overallRating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{handyman.totalReviews} reviews</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Completed Jobs:</span>
                      <div className="text-muted-foreground">{handyman.completedJobs}</div>
                    </div>
                    <div>
                      <span className="font-medium">Response Time:</span>
                      <div className="text-muted-foreground">{handyman.responseTime}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {handyman.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Award className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Handyman Profile Dialog */}
          <Dialog open={!!selectedHandyman} onOpenChange={() => setSelectedHandyman(null)}>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
              {selectedHandyman && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedHandyman.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedHandyman.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{selectedHandyman.name}</div>
                        <div className="text-sm text-muted-foreground font-normal">{selectedHandyman.specialty}</div>
                      </div>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Overall Rating */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-yellow-600">{selectedHandyman.overallRating}</div>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(selectedHandyman.overallRating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Based on {selectedHandyman.totalReviews} reviews
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 justify-center">
                          {selectedHandyman.badges.map((badge: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Rating Breakdown</h4>
                        <RatingBreakdown
                          breakdown={selectedHandyman.ratingBreakdown}
                          totalReviews={selectedHandyman.totalReviews}
                        />
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{selectedHandyman.completedJobs}</div>
                        <div className="text-sm text-muted-foreground">Completed Jobs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{selectedHandyman.responseTime}</div>
                        <div className="text-sm text-muted-foreground">Avg Response</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {Math.round((selectedHandyman.ratingBreakdown[5] / selectedHandyman.totalReviews) * 100)}%
                        </div>
                        <div className="text-sm text-muted-foreground">5-Star Reviews</div>
                      </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Recent Reviews</h4>
                      <div className="space-y-4">
                        {selectedHandyman.recentReviews.map((review: any) => (
                          <Card key={review.id} className="p-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={review.tenantAvatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {review.tenant
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium">{review.tenant}</span>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3 h-3 ${
                                          i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {format(new Date(review.date), "MMM d, yyyy")}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                                <div className="text-xs text-muted-foreground">
                                  {review.property} • Work Order: {review.workOrder}
                                </div>

                                {/* Category Ratings */}
                                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                                  <div className="flex items-center justify-between">
                                    <span>Quality:</span>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-2 h-2 ${
                                            i < review.categories.quality
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Timeliness:</span>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-2 h-2 ${
                                            i < review.categories.timeliness
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Communication:</span>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-2 h-2 ${
                                            i < review.categories.communication
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Cleanliness:</span>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-2 h-2 ${
                                            i < review.categories.cleanliness
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          {/* Pending Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
              <CardDescription>
                {userRole === "tenant"
                  ? "Rate your recent maintenance experiences"
                  : "Work orders awaiting tenant feedback"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviews.map((workOrder) => (
                  <Card key={workOrder.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={workOrder.handymanAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {workOrder.handyman
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{workOrder.issue}</div>
                          <div className="text-sm text-muted-foreground">
                            {workOrder.handyman} • {workOrder.property}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Completed {format(new Date(workOrder.completedDate), "MMM d, yyyy")} • ${workOrder.cost}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Review Pending
                        </Badge>
                        {userRole === "tenant" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" onClick={() => setReviewDialog({ isOpen: true, workOrder })}>
                                Leave Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Rate Your Experience</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="p-4 bg-muted rounded-lg">
                                  <div className="flex items-center gap-3 mb-2">
                                    <Avatar className="w-8 h-8">
                                      <AvatarImage src={workOrder.handymanAvatar || "/placeholder.svg"} />
                                      <AvatarFallback>
                                        {workOrder.handyman
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{workOrder.handyman}</div>
                                      <div className="text-sm text-muted-foreground">{workOrder.issue}</div>
                                    </div>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {workOrder.property} • Work Order: {workOrder.workOrder}
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div>
                                    <Label>Overall Rating</Label>
                                    <div className="mt-2">
                                      <StarRating
                                        rating={reviewForm.rating}
                                        onRatingChange={(rating) => setReviewForm((prev) => ({ ...prev, rating }))}
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Quality of Work</Label>
                                      <div className="mt-1">
                                        <StarRating
                                          rating={reviewForm.categories.quality}
                                          onRatingChange={(rating) =>
                                            setReviewForm((prev) => ({
                                              ...prev,
                                              categories: { ...prev.categories, quality: rating },
                                            }))
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Timeliness</Label>
                                      <div className="mt-1">
                                        <StarRating
                                          rating={reviewForm.categories.timeliness}
                                          onRatingChange={(rating) =>
                                            setReviewForm((prev) => ({
                                              ...prev,
                                              categories: { ...prev.categories, timeliness: rating },
                                            }))
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Communication</Label>
                                      <div className="mt-1">
                                        <StarRating
                                          rating={reviewForm.categories.communication}
                                          onRatingChange={(rating) =>
                                            setReviewForm((prev) => ({
                                              ...prev,
                                              categories: { ...prev.categories, communication: rating },
                                            }))
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Cleanliness</Label>
                                      <div className="mt-1">
                                        <StarRating
                                          rating={reviewForm.categories.cleanliness}
                                          onRatingChange={(rating) =>
                                            setReviewForm((prev) => ({
                                              ...prev,
                                              categories: { ...prev.categories, cleanliness: rating },
                                            }))
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <Label>Comments</Label>
                                    <Textarea
                                      placeholder="Share details about your experience..."
                                      value={reviewForm.comment}
                                      onChange={(e) => setReviewForm((prev) => ({ ...prev, comment: e.target.value }))}
                                      rows={4}
                                      className="mt-2"
                                    />
                                  </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => setReviewDialog({ isOpen: false, workOrder: null })}
                                  >
                                    Cancel
                                  </Button>
                                  <Button onClick={handleSubmitReview} disabled={reviewForm.rating === 0}>
                                    Submit Review
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          {/* Recent Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>Latest feedback from tenants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {handymenRatings
                  .flatMap((handyman) =>
                    handyman.recentReviews.map((review) => ({
                      ...review,
                      handymanName: handyman.name,
                      handymanSpecialty: handyman.specialty,
                    })),
                  )
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((review) => (
                    <Card key={`${review.handymanName}-${review.id}`} className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.tenantAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {review.tenant
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.tenant}</span>
                            <span className="text-muted-foreground">rated</span>
                            <span className="font-medium">{review.handymanName}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(review.date), "MMM d, yyyy")}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-2">{review.comment}</p>
                          <div className="text-sm text-muted-foreground">
                            {review.property} • Work Order: {review.workOrder}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
