import z from "zod";

export const SCHEMA = z.object({
  github_id: z.string().min(1, "GitHub ID is required"),
  email: z.email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  age: z.number().int().positive("Age must be a positive integer"),
  birthday: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]),
  interests: z.string().optional(),
});

export type ADVXData = z.infer<typeof SCHEMA>;
