import { NextResponse } from "next/server";
import {auth} from "@/auth";

export async function GET(req: Request) {
  const session = await auth();
  try {
    return NextResponse.json({ user: session?.user });
  } catch  {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}