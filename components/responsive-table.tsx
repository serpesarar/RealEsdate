"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Grid, List, MoreHorizontal } from "lucide-react"

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface ResponsiveTableProps {
  data: any[]
  columns: Column[]
  title?: string
  cardView?: boolean
  onRowClick?: (row: any) => void
  renderCard?: (row: any, index: number) => React.ReactNode
}

export function ResponsiveTable({
  data,
  columns,
  title,
  cardView: defaultCardView = false,
  onRowClick,
  renderCard,
}: ResponsiveTableProps) {
  const [viewMode, setViewMode] = useState<"table" | "card">(defaultCardView ? "card" : "table")

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="hidden md:flex"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "card" ? "default" : "outline"} size="sm" onClick={() => setViewMode("card")}>
              <Grid className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Mobile: Always card view, Desktop: Toggle between table and card */}
      <div className="md:hidden">
        <div className="grid gap-4">
          {data.map((row, index) =>
            renderCard ? (
              renderCard(row, index)
            ) : (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onRowClick?.(row)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {columns.map((column) => (
                      <div key={column.key} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">{column.label}:</span>
                        <span className="text-sm">
                          {column.render ? column.render(row[column.key], row) : row[column.key]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </div>

      {/* Desktop: Table or Card view based on toggle */}
      <div className="hidden md:block">
        {viewMode === "table" ? (
          <Card className="rounded-xl shadow-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key}>{column.label}</TableHead>
                  ))}
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index} className="cursor-pointer hover:bg-muted/50" onClick={() => onRowClick?.(row)}>
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.map((row, index) =>
              renderCard ? (
                renderCard(row, index)
              ) : (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 rounded-xl"
                  onClick={() => onRowClick?.(row)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {columns.map((column) => (
                        <div key={column.key} className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">{column.label}:</span>
                          <span className="text-sm">
                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}
