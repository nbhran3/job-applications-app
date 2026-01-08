import express from "express";
import { AppDataSource } from "./datasource.js";
import * as CompanyController from "./controllers/company-controller.js";
import * as ApplicationsController from "./controllers/applications-controller.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3002;

app.get("/companies", CompanyController.getAllCompaniesForDropDown);

app.get("/companies/:id", CompanyController.getCompanyById);

app.post("/companies", CompanyController.addNewCompany);

app.delete("/companies/:id", CompanyController.deleteCompany);

app.get("/applications", ApplicationsController.getAllApplications);

app.get("/applications/:id", ApplicationsController.getApplicationById);

app.post("/applications", ApplicationsController.addNewApplication);

app.put("/applications/:id", ApplicationsController.updateApplicationById);

app.delete("/applications/:id", ApplicationsController.deleteApplication);

const main = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`Management server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
};

main();
