const express = require('express');
const PackageController = require('../controller/PackageController'); 


const packageRouters = express.Router();

const packageController  = new PackageController();

packageRouters.post("/:userId", packageController.createPackage)
packageRouters.get("/", packageController.getAllPackages)
packageRouters.get("/active", packageController.getAllActivePackages)
packageRouters.get("/:id", packageController.getPackageById)
packageRouters.put("/:id", packageController.updatePackage)
packageRouters.delete("/:id", packageController.deleteById)
packageRouters.patch("/:id/tests/:testId", packageController.addTestToPackage)
packageRouters.delete("/:id/tests/:testId", packageController.removeTestFromPackage)




module.exports = packageRouters;