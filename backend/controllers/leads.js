const { AsyncErrorHandler } = require("../errorhandler/errorhandle");
const lead = require("../models/leadSchema");

// get all leads

let getAllLeads = async (req, res) => {
  let mongo = await lead.find({});
  // console.log("this is leads", mongo);
  if (!mongo) {
    throw new AsyncErrorHandler(400, "leads not founded");
  }

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

// create new lead

let newleads = async (req, res) => {
  let { name, mobile, email, city, service, budget, status } = req.body;
  // console.log(req.body);
  if (!name || !mobile || !email || !city || !service || !budget || !status) {
    throw new AsyncErrorHandler(400, "Field is required!");
  }

  let mongo = new lead({
    name: name,
    mobile: mobile,
    email: email,
    city: city,
    service: service,
    budget: budget,
    status: status,
  });

  await mongo.save();

  res.status(200).json({
    success: true,
    message: "Data insert Successful",
  });
};

// featch single leads

let singleLeads = async (req, res) => {
  let { id } = req.params;

  if (!id) {
    throw new AsyncErrorHandler(400, "user Not founded");
  }

  let mongo = await lead.findById(id);

  res.status(200).json({
    success: true,
    data: mongo,
  });
};

// update lead

let editleads = async (req, res) => {
  let { id } = req.params;
  if (!id) {
    throw new customeError(400, "User not found");
  }

  const mongo = await lead.findByIdAndUpdate(id, req.body, { new: true });

  if (!mongo) {
    throw new AsyncErrorHandler(500, "Erro updating product");
  }

  res.status(200).json({
    success: true,
    message: "Product updated SuccessFully",
    data: mongo,
  });
};
// delete lead

let deletleads = async (req, res) => {
  let { id } = req.params;
  // console.log("this is id", id);

  if (!id) {
    throw new AsyncErrorHandler(400, "Don't delete anythigs");
  }

  let mongo = await lead.findByIdAndDelete(id);

  if (!mongo) {
    throw new customeError(400, "Data is not find");
  }

  res.status(200).json({
    success: true,
    message: "Delete succesfully",
  });
};

//

module.exports = { getAllLeads, newleads, editleads, deletleads, singleLeads };
