const facultyController = require("../controllers/facultyController");
const { isAdmin } = require("../middlewares/authMiddleware");
const getRouter = require("../utils/getRouter");

const facultyRouter = getRouter();

facultyRouter.post("/", isAdmin, facultyController.addFaculty);

facultyRouter.get("/", isAdmin, facultyController.list);

module.exports = facultyRouter;
