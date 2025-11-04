import { ZodError, ZodIssue } from "zod";

export function formatZodErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};

  error.issues.forEach((issue: ZodIssue) => {
    if (issue.path[0]) {
      errors[issue.path[0].toString()] = issue.message;
    }
  });

  return errors;
}

