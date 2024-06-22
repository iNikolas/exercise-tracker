import { Exercise, User } from "@prisma/client";

export function markIdWithUnderscore({ id, ...rest }: { id: string }) {
  return { ...rest, _id: id };
}

export function exerciseResponseFactory(
  exercise: {
    user: User;
  } & Exercise
) {
  return {
    ...markIdWithUnderscore(exercise.user),
    date: exercise.date,
    duration: exercise.duration,
    description: exercise.description,
  };
}
