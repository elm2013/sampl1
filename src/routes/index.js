const express = require("express");
const router = express.Router();
const connectionsRoutes = require("./connections");

router.use("/connections", connectionsRoutes);
module.exports = router;
