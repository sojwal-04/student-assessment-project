const asyncHandler = require("../../asyncHandler");
const statsController = require("../../controllers/statsController");
const { isAdmin, isFaculty } = require("../../middlewares/authMiddleware");
const facultyModel = require("../../models/facultyModel");
const getRouter = require("../../utils/getRouter");
const { sendResponse } = require("../../utils/responses/ApiResponse");
const { SUCCESS } = require("../../utils/responses/successCodes");

const statsRouter = getRouter();

statsRouter.get("/admin", isAdmin ,statsController.getAdminDashboardStats);


statsRouter.get(
  "/faculty",
  isFaculty,
  asyncHandler(async (req, res) => {
    const [facultyStats] = await facultyModel.getFacultyDashboardStats();

    return sendResponse(res, 200, SUCCESS, "Admin stats fetched successfully", {
        facultyStats: facultyStats[0],
    });
  })
);

module.exports = statsRouter;
