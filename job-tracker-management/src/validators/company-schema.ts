import { z } from "zod";

export const addCompanySchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  website: z.union([z.string().url("Invalid website URL"), z.literal(""), z.null()]).optional(),
  location: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
});

export type AddCompanyInput = z.infer<typeof addCompanySchema>;