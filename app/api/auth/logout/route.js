// app/api/auth/logout/route.ts
import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await signOut({ redirectTo: "/" });
  return NextResponse.redirect("/");
}