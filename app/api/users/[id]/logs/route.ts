import { client } from "@/db";
import { exerciseResponseFactory } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const userId = context.params.id;

  const userWithExercices = await client.user.findFirst({
    where: { id: userId },
    include: { exercises: true },
  });

  if (!userWithExercices) {
    return NextResponse.json({ error: "User was not found" }, { status: 400 });
  }

  return NextResponse.json({
    _id: userWithExercices.id,
    username: userWithExercices.username,
    count: userWithExercices.exercises.length,
    log: userWithExercices.exercises.map(exerciseResponseFactory),
  });
}
