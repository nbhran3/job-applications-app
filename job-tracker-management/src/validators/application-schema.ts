import { z } from "zod";

const urlSchema = z.union([z.string().url("Invalid URL"), z.literal(""), z.null()]).optional();
const dateSchema = z.union([z.string(), z.literal(""), z.null()]).optional();

export const addApplicationSchema = z.object({
  companyId: z.number().int().positive("Company ID must be a positive number"),
  job_title: z.string().min(1, "Job title is required"),
  description: z.string().nullable().optional(),
  post_url: urlSchema,
  salary: z.number().int().positive("Salary must be a positive number").nullable().optional(),
  status: z.enum(["saved", "applied", "interview", "offer", "rejected"]).optional(),
  application_date: dateSchema,
  interview_date: dateSchema,
  notes: z.string().nullable().optional(),
});

export const updateApplicationSchema = z.object({
  job_title: z.string().min(1, "Job title is required").optional(),
  description: z.string().nullable().optional(),
  post_url: urlSchema,
  salary: z.number().int().positive("Salary must be a positive number").nullable().optional(),
  status: z.enum(["saved", "applied", "interview", "offer", "rejected"]).optional(),
  application_date: dateSchema,
  interview_date: dateSchema,
  notes: z.string().nullable().optional(),
});

export type AddApplicationInput = z.infer<typeof addApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;

