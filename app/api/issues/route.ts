import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      property,
      unit,
      urgency,
      category,
      priority,
      location,
      availabilityDate,
      additionalNotes,
      photos,
      tenantId,
    } = body

    // Validate required fields
    if (!title || !description || !property || !unit) {
      return NextResponse.json(
        {
          error: "Missing required fields: title, description, property, unit",
        },
        { status: 400 },
      )
    }

    // Generate issue ID
    const issueId = `ISS-${Date.now()}`

    const issue = {
      id: issueId,
      title,
      description,
      property,
      unit,
      urgency,
      category: category || "OTHER",
      priority: priority || "MEDIUM",
      location: location || "Not specified",
      availabilityDate: availabilityDate || null,
      additionalNotes: additionalNotes || "",
      photos: photos || [],
      status: "OPEN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: null,
      tenantId: tenantId || "current-tenant",
      handymanAssigned: false,
      estimatedCost: "TBD",
      suggestedContractor: "General Maintenance",
      confidence: 85,
    }

    console.log("[v0] Created new issue:", issue)

    // await saveIssueToDatabase(issue)
    // await assignToHandyman(issue)

    return NextResponse.json({
      success: true,
      issue,
      message: "Issue created successfully and will be assigned to a handyman",
    })
  } catch (error) {
    console.error("Error creating issue:", error)
    return NextResponse.json({ error: "Failed to create issue" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Mock issues data - in real app, fetch from database
    const issues = [
      {
        id: "ISS-1704067200000",
        title: "Kitchen Faucet Leak",
        description: "Water is dripping from the kitchen faucet",
        property: "park-avenue",
        unit: "12A",
        urgency: "normal",
        category: "PLUMBING",
        priority: "HIGH",
        location: "Not specified",
        availabilityDate: null,
        additionalNotes: "",
        photos: [],
        status: "IN_PROGRESS",
        createdAt: "2024-01-01T10:00:00Z",
        updatedAt: "2024-01-02T14:30:00Z",
        assignedTo: "Mike Rodriguez",
        tenantId: "current-tenant",
        handymanAssigned: false,
        estimatedCost: "$150-400",
        suggestedContractor: "Mike Johnson (Plumber)",
        confidence: 95,
      },
    ]

    return NextResponse.json({
      success: true,
      issues,
    })
  } catch (error) {
    console.error("Error fetching issues:", error)
    return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 })
  }
}
