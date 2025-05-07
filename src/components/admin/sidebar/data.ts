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
        ],
    }
}