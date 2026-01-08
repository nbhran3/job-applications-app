import * as CompanyRepository from "../repositories/company-repository.js";

export const getAllCompaniesForDropDown = async (userId: number) => {
  return await CompanyRepository.getAllCompaniesForDropDown(userId);
};

export const getCompanyById = async (userId: number, companyId: number) => {
  const company = await CompanyRepository.getCompanyById(userId, companyId);
  if (!company) {
    throw new Error("Company not found");
  }
  return company;
};

export const addNewCompany = async (
  userId: number,
  companyName: string,
  website: string | null,
  location: string | null,
  note: string | null
) => {
  const addCompany = await CompanyRepository.addNewCompany(
    userId,
    companyName,
    website,
    location,
    note
  );
  if (!addCompany) {
    throw new Error("Company already exists");
  }
  return addCompany;
};

export const deleteCompany = async (userId: number, companyId: number) => {
  const updatedCompanies = await CompanyRepository.deleteCompany(
    userId,
    companyId
  );
  return updatedCompanies;
};
