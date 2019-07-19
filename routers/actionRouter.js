const express = require("express");

const ActionDb = require("../helpers/actionModel");

const router = express.Router();

router.post("/", validateActionInfo, async (req, res) => {
  const actionInfo = req.body;
  try {
    const addAct = await ActionDb.addAction(actionInfo);
    res.status(200).json(addAct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Middleware
function validateActionInfo(req, res, next) {
  const actionInfo = req.body;
  console.log("time to validate the action info");
  if (!actionInfo.project_id || !actionInfo.description || !actionInfo.notes) {
    res.status(400).json({ message: "missing action data" });
  } else {
    next();
  }
}
module.exports = router;
