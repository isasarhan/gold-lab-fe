import { Clock, CreditCard, Package, ReceiptText, Upload, User, Users, Weight } from "lucide-react"

export const generateSidebar = (pathName: string) => {
    return {
        navMain: [
            {
                title: "Customers",
                url: "#",
                items: [
                    // {
                    //     title: "View Customers",
                    //     url: "/account/customers",
                    //     isActive: pathName === "/account/customers",
                    //     icon: <Users />
                    // },
                    {
                        title: "View Balances",
                        url: "/account/balances",
                        isActive: pathName === "/account/balances",
                        icon: <Weight />
                    }
                ],
            },
            {
                title: "Supplies",
                url: "#",
                items: [
                    {
                        title: "View Supplies",
                        url: "/account/supplies",
                        isActive: pathName === "/account/supplies",
                        icon: <Users />

                    },
                    {
                        title: "View Suppliers",
                        url: "/account/suppliers",
                        isActive: pathName === "/account/suppliers",
                        icon: <Package />
                    },
                    {
                        title: "Payments",
                        url: "/account/payments",
                        isActive: pathName === "/account/payments",
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
                        url: "/account/employees",
                        isActive: pathName === "/account/employees",
                        icon: <Users />

                    },
                    {
                        title: "View Attendences",
                        url: "/account/employees/attendence",
                        isActive: pathName === "/account/employees/attendence",
                        icon: <Clock />
                    },
                ],
            },

        ],
    }
}