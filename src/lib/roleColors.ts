import { Role } from "@/types/user"

export const getRoleColor = (role?: Role) => {
  switch (role) {
    case Role.Admin:
      return "text-white p-2 rounded-full bg-red-600"

    case Role.Manager:
      return "text-white p-2 rounded-full bg-indigo-600"

    case Role.Moderator:
      return "text-white p-2 rounded-full bg-yellow-500"

    case Role.User:
      return "text-white p-2 rounded-full bg-gray-500"

    default:
      return "text-white p-2 rounded-full bg-zinc-400"
  }
}
