const router = require("express").Router();
const agenceController = require("../controllers/agenceController");
const upload = require("../middleware/uploadImage");

router.get("/", agenceController.getAllAgences);
router.post("/", upload, agenceController.createAgence);

router.get("/:id", agenceController.getOneVol);
router.put("/:id", upload, agenceController.volUpdated);
router.delete("/:id", agenceController.deleteVol);

module.exports = router;