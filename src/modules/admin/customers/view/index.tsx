"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Tag,
  Edit,
  Trash2,
  User,
  Building,
  Store,
  TruckIcon,
  ShoppingBag,
  Briefcase,
  LandmarkIcon,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CustomerType, ICustomer } from "@/types/customer"

// Sample customer data (in a real app, this would come from an API or database)
const sampleCustomers: ICustomer[] = [
  {
    _id: "1",
    name: "Ahmed Mohamed",
    email: "ahmed@example.com",
    phone: "+966 50 123 4567",
    location: "Riyadh, Saudi Arabia",
    type: CustomerType.Individual,
  },
  {
    _id: "2",
    name: "Al Baraka Trading Co.",
    email: "info@albaraka.com",
    phone: "+966 55 987 6543",
    location: "Jeddah, Saudi Arabia",
    type: CustomerType.Wholesaler,
  },
  {
    _id: "3",
    name: "Riyadh Electronics",
    email: "sales@riyadhelectronics.com",
    phone: "+966 54 456 7890",
    location: "Riyadh, Saudi Arabia",
    type: CustomerType.Retailer,
  },
  {
    _id: "4",
    name: "Saudi Distribution Co.",
    email: "contact@saudidist.com",
    phone: "+966 56 789 0123",
    location: "Dammam, Saudi Arabia",
    type: CustomerType.Distributor,
  },
  {
    _id: "5",
    name: "Ministry of Education",
    email: "procurement@moe.gov.sa",
    phone: "+966 11 123 4567",
    location: "Riyadh, Saudi Arabia",
    type: CustomerType.Government,
  },
]

// Customer type translations
const customerTypeTranslations = {
  [CustomerType.Individual]: "فرد",
  [CustomerType.Wholesaler]: "تاجر جملة",
  [CustomerType.Retailer]: "بائع تجزئة",
  [CustomerType.Distributor]: "موزّع",
  [CustomerType.Reseller]: "معيد بيع",
  [CustomerType.Corporate]: "شركة",
  [CustomerType.Government]: "جهة حكومية",
}

// Customer type icons
const getCustomerTypeIcon = (type: CustomerType) => {
  switch (type) {
    case CustomerType.Individual:
      return <User className="h-5 w-5" />
    case CustomerType.Wholesaler:
      return <ShoppingBag className="h-5 w-5" />
    case CustomerType.Retailer:
      return <Store className="h-5 w-5" />
    case CustomerType.Distributor:
      return <TruckIcon className="h-5 w-5" />
    case CustomerType.Reseller:
      return <Store className="h-5 w-5" />
    case CustomerType.Corporate:
      return <Building className="h-5 w-5" />
    case CustomerType.Government:
      return <LandmarkIcon className="h-5 w-5" />
    default:
      return <Briefcase className="h-5 w-5" />
  }
}

// Badge colors based on customer type
const getBadgeVariant = (type: CustomerType) => {
  switch (type) {
    case CustomerType.Individual:
      return "default"
    case CustomerType.Wholesaler:
      return "secondary"
    case CustomerType.Retailer:
      return "destructive"
    case CustomerType.Distributor:
      return "outline"
    case CustomerType.Reseller:
      return "default"
    case CustomerType.Corporate:
      return "secondary"
    case CustomerType.Government:
      return "outline"
    default:
      return "default"
  }
}

import React, { FC } from 'react';
import ConfirmDialog from "../../../../components/common/discard-dialog"
export interface ViewCustomerModuleProps {
  customer: ICustomer
}
const ViewCustomerModule: FC<ViewCustomerModuleProps> = ({ customer }) => {
  const router = useRouter()

  const handleDelete = () => {
    // In a real app, this would be an API call to delete the customer
    router.push("/") // Navigate back to the customer list
  }

  const handleEdit = () => {
    // In a real app, this would navigate to an edit form
    // router.push(`/customers/${customer._id}/edit`)
  }

  if (!customer) {
    return (
      <div className="container mx-auto py-10">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Customers
        </Button>
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Customer not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="grid gap-6 md:grid-cols-2 mb-4">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold">{customer.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center mt-1">
                  <Badge variant={getBadgeVariant(customer.type)} className="flex items-center gap-1">
                    {getCustomerTypeIcon(customer.type)}
                    {customer.type}
                  </Badge>
                  <span className="ml-2 text-muted-foreground">({customerTypeTranslations[customer.type]})</span>
                </div>
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="outline" size="icon" className="bg-destructive text-destructive-foreground " >
                <ConfirmDialog
                  onConfirm={handleDelete}
                  text="Delete Order"
                  title="Delete Order"
                  description="Are you sure you want to delete order?">
                  <Trash size={20} className="text-white"/>
                </ConfirmDialog>
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{customer.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Customer ID</p>
                    <p className="text-sm text-muted-foreground">{customer._id}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>Recent purchases and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-32">
            <p className="text-muted-foreground">No order history available</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default ViewCustomerModule;
