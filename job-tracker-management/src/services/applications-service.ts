import * as ApplicationsRepository from "../repositories/applications-repository.js";

export const getAllApplications = async (userId: number) => {
  return await ApplicationsRepository.getAllApplications(userId);
};

export const addNewApplication = async (
  userId: number,
  companyId: number,
  jobTitle: string,
  description: string | null,
  postUrl: string | null,
  salary: number | null,
  status: string,
  applicationDate: Date | null,
  interviewDate: Date | null,
  notes: string | null
) => {
  const application = await ApplicationsRepository.addNewApplication(
    userId,
    companyId,
    jobTitle,
    description,
    postUrl,
    salary,
    status,
    applicationDate,
    interviewDate,
    notes
  );
  if (!application) {
    throw new Error("Company not found");
  }
  return application;
};

export const getApplicationById = async (
  userId: number,
  applicationId: number
) => {
  const application = await ApplicationsRepository.getApplicationById(
    userId,
    applicationId
  );
  if (!application) {
    throw new Error("Application not found");
  }
  return application;
};

export const updateApplicationById = async (
  userId: number,
  applicationId: number,
  updateData: {
    job_title?: string;
    description?: string | null;
    post_url?: string | null;
    salary?: number | null;
    status?: string;
    application_date?: Date | null;
    interview_date?: Date | null;
    notes?: string | null;
  }
) => {
  const updatedApplication = await ApplicationsRepository.updateApplicationById(
    userId,
    applicationId,
    updateData
  );
  if (!updatedApplication) {
    throw new Error("Application not found");
  }
  return updatedApplication;
};

export const deleteApplication = async (
  userId: number,
  applicationId: number
) => {
  const updatedApplications = await ApplicationsRepository.deleteApplication(
    userId,
    applicationId
  );
  if (!updatedApplications) {
    throw new Error("Application not found");
  }
  return updatedApplications;
};

