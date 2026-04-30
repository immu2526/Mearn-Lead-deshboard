const express = require("express");
const { catchAsync } = require("../errorhandler/errorhandle");
const {
  getAllLeads,
  newleads,
  singleLeads,
  editleads,
  deletleads,
} = require("../controllers/leads");
let router = express.Router();

router.get("/", catchAsync(getAllLeads));
router.get("/:id", catchAsync(singleLeads));
router.post("/new", catchAsync(newleads));
router.put("/:id", catchAsync(editleads));
router.delete("/:id/delete", catchAsync(deletleads));

module.exports = router;
