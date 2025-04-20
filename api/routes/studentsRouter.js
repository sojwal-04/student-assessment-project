const studentsController = require("../controllers/studentController");

const getRouter = require("../utils/getRouter");

const studentsRouter = getRouter();

// Add a new student
studentsRouter.post("/add", studentsController.addStudent);

// // Get all students
studentsRouter.get("/", studentsController.getStudents);

// Get a specific student by ID
studentsRouter.get("/s/:studentId", studentsController.getStudentById);

studentsRouter.get("/by-email/:email", studentsController.getStudentByEmail);


studentsRouter.get("/:studentId/performance", studentsController.getPerformance);

// // Update a student's details
studentsRouter.put("/add-performance", studentsController.addPerformance);


studentsRouter.get('/performances', studentsController.getPerformances)

// // Delete a student
// studentsRouter.delete("/:id", deleteStudent);

// // Search students by query
// studentsRouter.get("/search", searchStudents);

// // Get students by class
// studentsRouter.get("/class/:className", getStudentsByClass);

// // Get students by branch
// studentsRouter.get("/branch/:branchName", getStudentsByBranch);

// // Get students by status
// studentsRouter.get("/status/:status", getStudentsByStatus);

// // Get students by academic year
// studentsRouter.get("/year/:year", getStudentsByYear);

module.exports = studentsRouter;
