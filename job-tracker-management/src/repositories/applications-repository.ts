import { Application } from "../entities/applications-entity.js";
import { AppDataSource } from "../datasource.js";
import * as CompanyRepository from "./company-repository.js";

const applicationRepository = AppDataSource.getRepository(Application);

export const getAllApplications = async (userId: number) => {
  const applications = await applicationRepository.find({
    where: { user_id: userId },
    select: {
      job_title: true,
      company: {
        company_name: true,
      },
    },
    relations: ["company"],
    order: { created_at: "DESC" },
  });
  return applications;
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
  // Verify the company exists and belongs to the user
  const company = await CompanyRepository.getCompanyById(userId, companyId);

  if (!company) {
    return null; // Company not found or doesn't belong to user
  }

  const applicationInfo = {
    user_id: userId,
    company_id: companyId,
    job_title: jobTitle,
    description: description,
    post_url: postUrl,
    salary: salary,
    status: status,
    application_date: applicationDate,
    interview_date: interviewDate,
    notes: notes,
  };

  await applicationRepository.insert(applicationInfo);
  return applicationInfo;
};

export const getApplicationById = async (
  userId: number,
  applicationId: number
) => {
  const application = await applicationRepository.findOne({
    where: { user_id: userId, id: applicationId },
    select: {
      id: true,
      job_title: true,
      description: true,
      post_url: true,
      salary: true,
      status: true,
      application_date: true,
      interview_date: true,
      notes: true,
      created_at: true,
      updated_at: true,
      company: {
        id: true,
        company_name: true,
        website: true,
        location: true,
        note: true,
      },
    },
    relations: ["company"],
  });
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
  // First, verify the application belongs to the user
  const existingApplication = await applicationRepository.findOne({
    where: { id: applicationId, user_id: userId },
  });

  if (!existingApplication) {
    return null; // Application not found or doesn't belong to user
  }

  // Update the application
  await applicationRepository.update(
    { id: applicationId, user_id: userId },
    updateData
  );

  // Return the updated application
  const updatedApplication = await applicationRepository.findOne({
    where: { id: applicationId, user_id: userId },
    relations: ["company"],
  });

  return updatedApplication;
};

export const deleteApplication = async (
  userId: number,
  applicationId: number
) => {
  const deleteApplication = await applicationRepository.findOne({
    where: { id: applicationId, user_id: userId },
  });
  if (!deleteApplication) {
    return null;
  }
  await applicationRepository.delete({ id: applicationId, user_id: userId });

  const updatedApplications = await applicationRepository.find({
    where: { user_id: userId },
    select: {
      job_title: true,
      company: {
        company_name: true,
      },
    },
    relations: ["company"],
    order: { created_at: "DESC" },
  });
  return updatedApplications;
};


