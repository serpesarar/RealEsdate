"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Search, Calendar, Receipt, AlertCircle } from "lucide-react"

interface DocumentVaultDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentVaultDialog({ open, onOpenChange }: DocumentVaultDialogProps) {
  const documents = {
    lease: [
      { name: "Lease Agreement - Unit 4B", date: "Jan 15, 2024", size: "2.4 MB", type: "PDF" },
      { name: "Lease Addendum - Pet Policy", date: "Mar 10, 2024", size: "156 KB", type: "PDF" },
      { name: "Lease Renewal Notice", date: "Nov 1, 2024", size: "89 KB", type: "PDF" },
    ],
    receipts: [
      { name: "Rent Receipt - December 2024", date: "Dec 1, 2024", size: "45 KB", type: "PDF" },
      { name: "Rent Receipt - November 2024", date: "Nov 1, 2024", size: "45 KB", type: "PDF" },
      { name: "Security Deposit Receipt", date: "Jan 15, 2024", size: "67 KB", type: "PDF" },
    ],
    notices: [
      { name: "Holiday Schedule 2024", date: "Nov 25, 2024", size: "123 KB", type: "PDF" },
      { name: "Building Maintenance Notice", date: "Oct 15, 2024", size: "78 KB", type: "PDF" },
      { name: "Rent Increase Notice", date: "Sep 1, 2024", size: "234 KB", type: "PDF" },
    ],
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Document Vault
          </DialogTitle>
          <DialogDescription>Access your lease documents, receipts, and important notices</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          <Tabs defaultValue="lease" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="lease">Lease Documents</TabsTrigger>
              <TabsTrigger value="receipts">Receipts</TabsTrigger>
              <TabsTrigger value="notices">Notices</TabsTrigger>
              <TabsTrigger value="all">All Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="lease" className="space-y-3">
              {documents.lease.map((doc, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <Badge variant="outline" className="text-xs">
                              {doc.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="receipts" className="space-y-3">
              {documents.receipts.map((doc, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Receipt className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <Badge variant="outline" className="text-xs">
                              {doc.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="notices" className="space-y-3">
              {documents.notices.map((doc, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <Badge variant="outline" className="text-xs">
                              {doc.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="all" className="space-y-3">
              {[...documents.lease, ...documents.receipts, ...documents.notices].map((doc, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <Badge variant="outline" className="text-xs">
                              {doc.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
