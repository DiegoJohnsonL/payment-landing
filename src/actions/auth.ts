"use server";

import { authFormSchema } from "@/types/schemas/auth-schema";
import { IUserSession } from "@/types/user-session";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type AuthFormInputs = z.infer<typeof authFormSchema>;
const tempUser: IUserSession = {
  id: "1",
  phone: "1234567890",
  token: "token",
};

async function signIn(data: AuthFormInputs) {
  cookies().set("session", "session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
  return tempUser;
}

async function requestCode(phoneNumber: string) {
  return true;
}

export async function authenticate(formData: AuthFormInputs) {
  const user = await signIn(formData);
  return user;
}

export async function isUserLoggedIn() {
  return true;
}

export async function logout() {
  cookies().delete("session");
  redirect("/login");
  return true;
}

export async function getUserSession() {
  const userSession = cookies().get("session");
  if (!userSession) {
    return null;
  }
  return tempUser;
}
