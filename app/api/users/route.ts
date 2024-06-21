import { client } from "@/db";
import { markIdWithUnderscore } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const allUsers = await client.user.findMany();

  return NextResponse.json(allUsers.map(markIdWithUnderscore));
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const username = form.get("username")?.toString().trim();

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  const existingUser = await client.user.findFirst({ where: { username } });

  if (existingUser) {
    return NextResponse.json(markIdWithUnderscore(existingUser));
  }

  const newUser = await client.user.create({ data: { username } });

  return NextResponse.json(markIdWithUnderscore(newUser));
}
