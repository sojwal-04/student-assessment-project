const asyncHandler = require("../asyncHandler");
const facultyModel = require("../models/facultyModel");
const { sendResponse } = require("../utils/responses/ApiResponse");
const { FAILURE, SUCCESS } = require("../utils/responses/successCodes");

const facultyController = {
  addFaculty: asyncHandler(async (req, res) => {
    const faculty = req.body;

    if (!faculty) {
      return sendResponse(res, 400, FAILURE, "Faculty data is required");
    }

    const [saveRes] = await facultyModel.addFaculty(faculty);

    return sendResponse(res, 200, SUCCESS, "Faculty added successfully", {
      faculty,
    });
  }),

  list: asyncHandler(async (req, res) => {
    const [faculties] = await facultyModel.list();

    return sendResponse(res, 200, SUCCESS, "Faculty added successfully", {
      faculties,
    });
  }),
};

module.exports = facultyController;
