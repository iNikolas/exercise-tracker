export function markIdWithUnderscore({ id, ...rest }: { id: string }) {
  return { ...rest, _id: id };
}
