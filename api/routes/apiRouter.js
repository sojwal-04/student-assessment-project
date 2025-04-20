const asyncHandler = require("../asyncHandler");
const bloodBanksModel = require("../models/bloodBanksModel");
const getRouter = require("../utils/getRouter");
const { sendResponse } = require("../utils/responses/ApiResponse");
const { SUCCESS } = require("../utils/responses/successCodes");
const adminRouter = require("./admin/adminRouter");
const authRouter = require("./auth/authRouter");
const facultyRouter = require("./facultyRouter");
const statsRouter = require("./stats/statsRouter");
const studentsRouter = require("./studentsRouter");

const apiRouter = getRouter();

apiRouter.use("/auth", authRouter);

apiRouter.use("/admin", adminRouter);

apiRouter.use('/faculty', facultyRouter)

apiRouter.use("/stats", statsRouter);

apiRouter.use("/students", studentsRouter);

module.exports = apiRouter;
