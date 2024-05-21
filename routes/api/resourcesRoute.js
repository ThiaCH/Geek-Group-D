const express = require("express");
const router = express.Router();
const resourceCtrl = require("../../controllers/api/resourcesController");

router.get("/resources", resourceCtrl.getAllResources);
router.post("/resources", resourceCtrl.createResource);
router.put("/resources/:id", resourceCtrl.updateResource);
router.delete("/resources/:id", resourceCtrl.deleteResource);

module.exports = router;
