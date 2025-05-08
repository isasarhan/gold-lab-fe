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

                ],
            },
            {
                title: "Balances",
                url: "#",
                items: [
                    {
                        title: "All Balances",
                        url: "/admin/balances",
                        isActive: pathName === "/admin/balances"
                    }
                ],
            },
        ],
    }
}