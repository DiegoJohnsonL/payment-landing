"use server";

import { authFormSchema } from "@/types/schemas/auth-schema";
import { IUserSession } from "@/types/user-session";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { domainsConfig } from "@/config";

type AuthFormInputs = z.infer<typeof authFormSchema>;

const tempUser: IUserSession = {
  id: "1",
  phone: "1234567890",
  token: "token",
};

export async function requestCode(phoneNumber: string) {
  const res = await fetch(`${domainsConfig.urlPaymentAPI}/auth/request-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `phoneNumber=${encodeURIComponent(phoneNumber)}`,
    cache: "no-store",
  });
  return res
    .json()
    .then((json) => ({
      status: res.status,
      message: json.message as string,
    }))
    .catch((_) => ({
      status: res.status,
      message: undefined,
    }));
}

export async function authenticate(formData: AuthFormInputs) {
  const body = new URLSearchParams({
    phoneNumber: formData.phone,
    code: formData.twoFaCode,
  });

  try {
    const res = await fetch(`${domainsConfig.urlPaymentAPI}/auth/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    });

    if (res.ok) {
      const jwt = res.headers.get("Authorization");
      if (!jwt) {
        throw new Error("No Authorization header");
      }

      cookies().set("Authorization", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // One week
        path: "/",
      });

      return { status: res.status, message: "Success" };
    } else {
      const json = await res.json();
      return { status: res.status, message: json.message as string || "Unknown error" };
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}


export async function isUserLoggedIn() {
  return true;
}

export async function logout() {
  cookies().delete("Authorization");
  redirect("/login");
}

export async function getUserSession() {
  const userSession = cookies().get("Authorization")?.value;
  if (!userSession) {
    return null;
  }
  return tempUser;
}
