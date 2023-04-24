const router = require("express").Router();
const volController = require("../controllers/volController");
const upload = require("../middleware/uploadImage");

router.get("/", volController.getAllVols);
router.post("/", upload, volController.createVol);

router.get("/:id", volController.getOneVol);
router.put("/:id", upload, volController.volUpdated);
router.delete("/:id", volController.deleteVol);

module.exports = router;