import * as ApplicationsService from "../services/applications-service.js";
import type { Request, Response } from "express";
import { addApplicationSchema, updateApplicationSchema } from "../validators/application-schema.js";

export const getAllApplications = async (req: Request, res: Response) => {
  const userId = Number(req.headers["x-user-id"]);
  try {
    const applications = await ApplicationsService.getAllApplications(userId);
    return res.json({ applications });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addNewApplication = async (req: Request, res: Response) => {
  const userId = Number(req.headers["x-user-id"]);
  const result = addApplicationSchema.safeParse(req.body);
  
  if (!result.success) {
    const errorMessages = result.error.issues.map((issue) => issue.message);
    return res.status(400).json({ error: errorMessages.join(", ") });
  }

  const {
    companyId,
    job_title,
    description,
    post_url,
    salary,
    status,
    application_date,
    interview_date,
    notes,
  } = result.data;

  try {
    await ApplicationsService.addNewApplication(
      userId,
      companyId,
      job_title,
      description && description !== "" ? description : null,
      post_url && post_url !== "" ? post_url : null,
      salary ?? null,
      status || "saved",
      application_date && application_date !== "" ? new Date(application_date) : null,
      interview_date && interview_date !== "" ? new Date(interview_date) : null,
      notes && notes !== "" ? notes : null
    );
    return res.status(201).json({ message: "Application added successfully" });
  } catch (error) {
    if (error instanceof Error && error.message === "Company not found") {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getApplicationById = async (req: Request, res: Response) => {
  const userId = Number(req.headers["x-user-id"]);
  const applicationId = Number(req.params.id);
  const application = await ApplicationsService.getApplicationById(
    userId,
    applicationId
  );
  try {
    if (!application) {
      res.status(404).json({ message: "Error fetching application" });
    }
    return res.json({ application });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export const updateApplicationById = async (req: Request, res: Response) => {
  const userId = Number(req.headers["x-user-id"]);
  const applicationId = Number(req.params.id);
  const result = updateApplicationSchema.safeParse(req.body);
  
  if (!result.success) {
    const errorMessages = result.error.issues.map((issue) => issue.message);
    return res.status(400).json({ error: errorMessages.join(", ") });
  }

  const {
    job_title,
    description,
    post_url,
    salary,
    status,
    application_date,
    interview_date,
    notes,
  } = result.data;

  try {
    const updateData: {
      job_title?: string;
      description?: string | null;
      post_url?: string | null;
      salary?: number | null;
      status?: string;
      application_date?: Date | null;
      interview_date?: Date | null;
      notes?: string | null;
    } = {};

    if (job_title !== undefined) updateData.job_title = job_title;
    if (description !== undefined) updateData.description = description && description !== "" ? description : null;
    if (post_url !== undefined) updateData.post_url = post_url && post_url !== "" ? post_url : null;
    if (salary !== undefined) updateData.salary = salary ?? null;
    if (status !== undefined) updateData.status = status;
    if (application_date !== undefined) updateData.application_date = application_date && application_date !== "" ? new Date(application_date) : null;
    if (interview_date !== undefined) updateData.interview_date = interview_date && interview_date !== "" ? new Date(interview_date) : null;
    if (notes !== undefined) updateData.notes = notes && notes !== "" ? notes : null;

    const updatedApplication = await ApplicationsService.updateApplicationById(
      userId,
      applicationId,
      updateData
    );
    return res.status(201).json({ message: "Application updated successfully" });
  } catch (error) {
    if (error instanceof Error && error.message === "Application not found") {
      return res.status(404).json({ error: "Application not found" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  const userId = Number(req.headers["x-user-id"]);
  const applicationId = Number(req.params.id);
  try {
    const updatedApplications = await ApplicationsService.deleteApplication(
      userId,
      applicationId
    );
    if (!updatedApplications) {
      return res.status(404).json({ message: "Application not found" });
    }
    return res.json({ updatedApplications });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};