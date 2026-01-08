import { Company } from "../entities/company-entity.js";
import { AppDataSource } from "../datasource.js";

const companyRepository = AppDataSource.getRepository(Company);

export const getAllCompaniesForDropDown = async (userId: number) => {
  const companies = await companyRepository.find({
    where: { user_id: userId },
    select: ["id", "company_name"],
    order: { company_name: "ASC" },
  });
  return companies;
};

export const getCompanyById = async (userId: number, companyId: number) => {
  const company = await companyRepository.findOne({
    where: { id: companyId, user_id: userId },
  });
  return company;
};

export const addNewCompany = async (
  userId: number,
  companyName: string,
  website: string | null,
  location: string | null,
  note: string | null
) => {
  const existingCompany = await companyRepository.findOne({
    where: { user_id: userId, company_name: companyName },
  });

  if (existingCompany) {
    return null;
  }

  const companyInfo = {
    user_id: userId,
    company_name: companyName,
    website: website,
    location: location,
    note: note,
  };

  await companyRepository.insert(companyInfo);

  const updatedCompanies = await companyRepository.find({
    where: { user_id: userId },
    select: ["id", "company_name"],
    order: { company_name: "ASC" },
  });
  return updatedCompanies;
};
export const deleteCompany = async (userId: number, companyId: number) => {
  const deleteCompany = await companyRepository.findOne({
    where: { id: companyId, user_id: userId },
  });
  if (!deleteCompany) {
    return null;
  }
  await companyRepository.delete({ id: companyId, user_id: userId });

  const updatedCompanies = await companyRepository.find({
    where: { user_id: userId },
    select: ["id", "company_name"],
    order: { company_name: "ASC" },
  });
  return updatedCompanies;
};

export const getJobByCompany = async (companyName: string) => {
  const jobs = await companyRepository.find({
    where: { company_name: companyName },
  });

  return jobs;
};
