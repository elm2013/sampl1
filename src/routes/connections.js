const express = require("express");
const router = express.Router();
const ConnectionsController = require("../controllers/connections");
const validateCreateConnections = require("./../middleware/validateCreateConnections");
const validateSendData = require("./../middleware/validateSendData");

// "/v1/:connectiaon_name",
router.post(
  "/v1/createConnections",
  validateCreateConnections,
  ConnectionsController.createConnections
);
router.post(
  "/v1/:connectionName",
  [validateSendData],
  ConnectionsController.sendData
);
router.get("/v1/:connectionName", ConnectionsController.getData);
router.put("/v1/:connectionName", ConnectionsController.editConnections);
router.delete("/v1/:connectionName", ConnectionsController.deleteConnections);

module.exports = router;
