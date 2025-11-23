import z from "zod";

export const ADVX_SCHEMA = z.object({
  github_id: z.string().min(1, "GitHub ID is required"),
  email: z.email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  age: z.number().int().positive("Age must be a positive integer"),
  birthday: z.date(),
  gender: z.enum(["male", "female", "other"]),
  interests: z.string().nullable(),
});

export type AdvxData = z.infer<typeof ADVX_SCHEMA>;

// Show in UI
export const ADVX_DATA_DEFAULT: AdvxData = {
  github_id: "",
  email: "",
  name: "",
  age: 0,
  birthday: new Date(NaN),
  gender: "other",
  interests: null,
};
