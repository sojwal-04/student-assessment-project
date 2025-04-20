const asyncHandler = require("../asyncHandler");
const adminModel = require("../models/adminModel");
const bloodBanksModel = require("../models/bloodBanksModel");
const bloodStocksModel = require("../models/bloodStocksModel");
const ordersModel = require("../models/ordersModel");
const { sendResponse } = require("../utils/responses/ApiResponse");
const { SUCCESS } = require("../utils/responses/successCodes");

const statsController = {
  getAdminDashboardStats: asyncHandler(async (req, res) => {
    const [adminStats] = await adminModel.getAdminDashboardStats();

    return sendResponse(res, 200, SUCCESS, "Admin stats fetched successfully", {
      adminStats: adminStats[0],
    });
  }),
};

module.exports = statsController;
