import * as CompanyService from "../services/company-service.js";
import type { Request, Response } from "express";

export const getAllCompaniesForDropDown = async (
  req: Request,
  res: Response
) => {
  const userId = Number(req.headers["x-user-id"]);
  try {
    const companies = await CompanyService.getAllCompaniesForDropDown(userId);
    return res.json({ companies });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  const userId = Number(req.headers["x-user-id"]);
  const companyId = Number(req.params.id);
  const company = await CompanyService.getCompanyById(userId, companyId);
  try {
    if (!company) {
      res.status(404).json({ message: "Error fetching company" });
    }
    return res.json({ company });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export const addNewCompany = async (req: Request, res: Response) => {
  const userId = Number(req.headers["x-user-id"]);
  const { companyName, website, location, note } = req.body;

  try {
    await CompanyService.addNewCompany(
      userId,
      companyName,
      website,
      location,
      note
    );
    return res.status(201).json({ message: "Company added successfully" });
  } catch (error) {
    if (error instanceof Error && error.message === "Company already exists") {
      return res.status(409).json({ error: "Company already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  const userId = Number(req.headers["x-user-id"]);
  const companyId = Number(req.params.id);
  try {
    const updatedCompanies = await CompanyService.deleteCompany(
      userId,
      companyId
    );
    if (!updatedCompanies) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.json({ updatedCompanies });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
