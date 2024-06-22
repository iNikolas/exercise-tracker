import { client } from "@/db";
import { exerciseResponseFactory, isDateFormat } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const userId = context.params.id;
  const searchParams = req.nextUrl.searchParams;

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const limit = searchParams.get("limit");

  if (from && !isDateFormat(from)) {
    return NextResponse.json(
      { error: "'from' date must be in yyyy-mm-dd format" },
      { status: 400 }
    );
  }

  if (to && !isDateFormat(to)) {
    return NextResponse.json(
      { error: "'to' date must be in yyyy-mm-dd format" },
      { status: 400 }
    );
  }

  const limitNumber = limit ? Number(limit) : null;
  if (limitNumber && (limitNumber <= 0 || Number.isNaN(limitNumber))) {
    return NextResponse.json(
      { error: "'limit' must be a positive number" },
      { status: 400 }
    );
  }

  const userWithExercises = await client.user.findFirst({
    where: { id: userId },
    include: { exercises: true },
  });

  if (!userWithExercises) {
    return NextResponse.json({ error: "User was not found" }, { status: 400 });
  }

  let exercises = userWithExercises.exercises;
  if (from) {
    exercises = exercises.filter(exercise => new Date(exercise.date) >= new Date(from));
  }
  if (to) {
    exercises = exercises.filter(exercise => new Date(exercise.date) <= new Date(to));
  }

  if (limitNumber) {
    exercises = exercises.slice(0, limitNumber);
  }


  return NextResponse.json({
    _id: userWithExercises.id,
    username: userWithExercises.username,
    count: userWithExercises.exercises.length,
    log: exercises.map(exerciseResponseFactory),
  });
}
