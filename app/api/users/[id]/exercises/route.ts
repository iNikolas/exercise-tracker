import { client } from "@/db";
import { exerciseResponseFactory } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const form = await req.formData();

  const userId = context.params.id;
  const description = form.get("description")?.toString().trim();
  const duration = Number(form.get("duration")?.toString().trim());
  const date = form.get("date")?.toString().trim() || new Date();

  if (!description || !duration || Number.isNaN(duration)) {
    return NextResponse.json(
      {
        error: "Description and valid duration are required fields.",
      },
      { status: 400 }
    );
  }

  try {
    const result = await client.exercise.create({
      data: { description, duration, date, userId },
      include: { user: true },
    });

    return NextResponse.json(exerciseResponseFactory(result));
  } catch (error) {
    return NextResponse.json(
      {
        error: String(error),
      },
      { status: 500 }
    );
  }
}
