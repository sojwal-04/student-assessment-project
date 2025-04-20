const asyncHandler = require("../asyncHandler");
const studentModel = require("../models/studentModel");
const { sendResponse } = require("../utils/responses/ApiResponse");
const { SUCCESS, FAILURE } = require("../utils/responses/successCodes");

const studentsController = {
  addStudent: asyncHandler(async (req, res) => {
    const studentData = req.body;

    // Validate required fields
    if (
      !studentData.first_name ||
      !studentData.last_name ||
      !studentData.email
    ) {
      return sendResponse(
        res,
        400,
        FAILURE,
        "First name, last name, and email are required."
      );
    }

    // Add student to the database
    const [result] = await studentModel.addStudent(studentData);

    if (result.affectedRows > 0) {
      return sendResponse(res, 201, SUCCESS, "Student added successfully.");
    } else {
      return sendResponse(res, 500, FAILURE, "Failed to add student.");
    }
  }),

  getStudents: asyncHandler(async (req, res) => {
    const { branch, year } = req.query;

    const [students] = await studentModel.getStudents({ branch, year });

    // console.log(students);

    return sendResponse(res, 200, SUCCESS, "Students fetched successfully.", {
      students,
    });
  }),

  getStudentById: asyncHandler(async (req, res) => {
    let { studentId } = req.params;
    const [students] = await studentModel.getStudentById(studentId);

    return sendResponse(res, 200, SUCCESS, "Student fetched successfully.", {
      student: students[0],
    });
  }),

  getStudentByEmail: asyncHandler(async (req, res) => {
    let { email } = req.params;
    const [students] = await studentModel.getStudentByEmail(email);

    return sendResponse(res, 200, SUCCESS, "Student fetched successfully.", {
      student: students[0],
    });
  }),

  getPerformance: asyncHandler(async (req, res) => {
    let { studentId } = req.params;
    const [students] = await studentModel.getStudentById(studentId);

    if (students.length === 0) {
      return sendResponse(res, 404, FAILURE, "Student not found.");
    }

    // Assuming you have a function to fetch performances based on studentId
    const [performances] = await studentModel.getPerformance(studentId);

    return sendResponse(
      res,
      200,
      SUCCESS,
      "Performances fetched successfully.",
      {
        performances,
      }
    );
  }),

  addPerformance: asyncHandler(async (req, res) => {
    const performanceData = req.body;

    await studentModel.addPerformance(performanceData);

    return sendResponse(res, 201, SUCCESS, "Performance added successfully.");
  }),

  getPerformances: asyncHandler(async (req, res) => {
    const filters = req.query
    const [performances] = await studentModel.getPerformances(filters);

    return sendResponse(
      res,
      200,
      SUCCESS,
      "Performances fetched successfully.",
      {
        performances,
      }
    );
  }),
};

module.exports = studentsController;
