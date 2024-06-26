import { Exercise, User } from "@prisma/client";

import { format } from "date-fns";

export function markIdWithUnderscore({ id, ...rest }: { id: string }) {
  return { ...rest, _id: id };
}

export function exerciseResponseFactory(exercise: Exercise) {
  return {
    date: formatDate(exercise.date.toString()),
    duration: exercise.duration,
    description: exercise.description,
  };
}

export function exerciseWithUserResponseFactory(
  exercise: {
    user: User;
  } & Exercise
) {
  return {
    ...markIdWithUnderscore(exercise.user),
    ...exerciseResponseFactory(exercise),
  };
}

export function formatDate(input: string, formatStr = "EEE MMM dd yyyy") {
  return format(new Date(input), formatStr);
}

export function isDateFormat(input: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(input);
}
