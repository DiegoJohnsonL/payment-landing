"use server";

import { IUserSession } from "@/types/user-session";

async function signIn(data: FormData) {
  //   const response = await fetch("/api/auth", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ data }),
  //   });
  const user: IUserSession = {
    id: "1",
    phone: "1234567890",
    token: "token",
  };
  return user;
}

async function requestCode(phoneNumber: string) {
  //   const response = await fetch("/api/auth/request-code", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ phoneNumber }),
  //   });
  return true;
}

export async function authenticate(formData: FormData) {
  try {
    await signIn(formData);
  } catch (error) {
    if (error) {
      return "Something went wrong.";
    }
    throw error;
  }
}
