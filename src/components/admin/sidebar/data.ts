export const generateSidebar = (pathName: string) => {
    return {
        navMain: [
            {
                title: "Users",
                url: "#",
                items: [
                    {
                        title: "All Users",
                        url: "/admin/users",
                        isActive: pathName === "/admin/users"
                    },
                    {
                        title: "Add New User",
                        url: "/admin/users/add",
                        isActive: pathName === "/admin/users/add"
                    },

                ],
            },
            {
                title: "Customers",
                url: "#",
                items: [
                    {
                        title: "All Customers",
                        url: "/admin/customers",
                        isActive: pathName === "/admin/customers"
                    },
                    {
                        title: "Add New Customer",
                        url: "/admin/customers/add",
                        isActive: pathName === "/admin/customers/add"
                    },
                    {
                        title: "All Balances",
                        url: "/admin/balances",
                        isActive: pathName === "/admin/balances"
                    }
                ],
            },
            {
                title: "Invoices",
                url: "#",
                items: [
                    {
                        title: "All Invoices",
                        url: "/admin/invoices",
                        isActive: pathName === "/admin/invoices"
                    },
                    {
                        title: "Add New Invoice",
                        url: "/admin/invoices/add",
                        isActive: pathName === "/admin/invoices/add"
                    }
                ],
            },
            {
                title: "Employees",
                url: "#",
                items: [
                    {
                        title: "All Employees",
                        url: "/admin/employees",
                        isActive: pathName === "/admin/employees"
                    },
                    {
                        title: "View Attendences",
                        url: "/admin/employees/attendence",
                        isActive: pathName === "/admin/employees/attendence"
                    },
                    {
                        title: "Upload Employee Arrivals",
                        url: "/admin/employees/attendence/upload",
                        isActive: pathName === "/admin/employees/attendence/upload"
                    },
                ],
            },
        ],
    }
}