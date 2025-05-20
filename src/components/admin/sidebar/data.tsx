import { Clock, CreditCard, LayoutDashboard, Package, ReceiptText, Upload, User, Users, Weight } from "lucide-react"

export const generateSidebar = (pathName: string) => {
    return {
        navMain: [
            {
                title: "Dashboard",
                url: "/",
                icon:<LayoutDashboard/>
            },
            {
                title: "Users",
                url: "#",
                items: [
                    {
                        title: "View Users",
                        url: "/admin/users",
                        isActive: pathName === "/admin/users",
                        icon: <Users />
                    },
                    {
                        title: "New User",
                        url: "/admin/users/add",
                        isActive: pathName === "/admin/users/add",
                        icon: <User />
                    },

                ],
            },
            {
                title: "Customers",
                url: "#",
                items: [
                    {
                        title: "View Customers",
                        url: "/admin/customers",
                        isActive: pathName === "/admin/customers",
                        icon: <Users />
                    },
                    {
                        title: "View Balances",
                        url: "/admin/balances",
                        isActive: pathName === "/admin/balances",
                        icon: <Weight />
                    }
                ],
            },
            {
                title: "Transactions",
                url: "#",
                items: [
                    {
                        title: "Invoices",
                        url: "/admin/invoices",
                        isActive: pathName === "/admin/invoices",
                        icon: <ReceiptText />
                    },
                    {
                        title: "Receipts",
                        url: "/admin/receipts",
                        isActive: pathName === "/admin/receipts",
                        icon: <CreditCard />
                    }
                ],
            },
            {
                title: "Supplies",
                url: "#",
                items: [
                    {
                        title: "View Supplies",
                        url: "/admin/supplies",
                        isActive: pathName === "/admin/supplies",
                        icon: <Users />

                    },
                    {
                        title: "View Suppliers",
                        url: "/admin/suppliers",
                        isActive: pathName === "/admin/suppliers",
                        icon: <Package />
                    },
                    {
                        title: "Payments",
                        url: "/admin/payments",
                        isActive: pathName === "/admin/payments",
                        icon: <Package />
                    },

                ],
            },
            {
                title: "Employees",
                url: "#",
                items: [
                    {
                        title: "View Employees",
                        url: "/admin/employees",
                        isActive: pathName === "/admin/employees",
                        icon: <Users />

                    },
                    {
                        title: "View Attendences",
                        url: "/admin/employees/attendence",
                        isActive: pathName === "/admin/employees/attendence",
                        icon: <Clock />
                    },
                    {
                        title: "Upload Attendences",
                        url: "/admin/employees/attendence/upload",
                        isActive: pathName === "/admin/employees/attendence/upload",
                        icon: <Upload />
                    },
                ],
            },

        ],
    }
}