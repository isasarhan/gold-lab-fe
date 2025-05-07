import { IUser } from "@/types/user";
import { cookies } from "next/headers";

export async function getAuth() {
  const token = (await cookies()).get("token")?.value;
  const currentUser = (await cookies()).get("currentUser")?.value || "";
  const user = currentUser ? (JSON.parse(currentUser) as IUser) : undefined;

  return { token, user };
}
