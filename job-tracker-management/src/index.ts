import express from "express";
import { AppDataSource } from "./datasource.js";
import * as CompanyController from "./controllers/company-controller.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3002;

app.get("/companies", CompanyController.getAllCompaniesForDropDown);

app.get("/companies/:id", CompanyController.getCompanyById);

app.post("/companies", CompanyController.addNewCompany);

app.delete("/companies/:id", CompanyController.deleteCompany);

const main = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`Authentication server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
};

main();
