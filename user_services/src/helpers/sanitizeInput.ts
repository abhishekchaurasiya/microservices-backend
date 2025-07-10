export function sanitizeInput<T extends Record<string, any>>(input: T): T {
  const sanitized: Partial<T> = {};

  for (const key in input) {
    if (typeof input[key] === "string") {
      sanitized[key] = key.toLocaleLowerCase().includes("email")
        ? input[key].trim().toLocaleLowerCase()
        : input[key].trim();
    } else {
      sanitized[key] = input[key].trim();
    }
  }
  return sanitized as T;
}
