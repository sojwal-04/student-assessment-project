const db = require("../config/db.connect");

const adminModel = {
  // Add a new admin
  add: (adminData) => {
    let q = `INSERT INTO admins (username, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;

    const insertArray = [
      adminData.username,
      adminData.password,
      adminData.role || "admin",
      new Date(),
      new Date(),
    ];

    return db.query(q, insertArray);
  },

  // Get admin by username
  getAdminByUsername: (username) => {
    let q = `SELECT * FROM admins WHERE username = ?`;
    return db.query(q, [username]);
  },

  // Get admin by ID
  getById: (adminId) => {
    let q = `SELECT * FROM admins WHERE id = ?`;
    return db.query(q, [adminId]);
  },

  getAdminDashboardStats: () => {
    const q = `
      SELECT 
        (SELECT COUNT(*) FROM students) AS total_students,
        (SELECT COUNT(*) FROM faculty) AS total_faculties,
        (SELECT ROUND(AVG(cgpa), 2) FROM performances) AS avg_cgpa,
        (SELECT ROUND(AVG(extracurricular_score), 2) FROM performances) AS avg_extracurricular,
        (SELECT COUNT(*) FROM performances WHERE attendance_percentage < 75) AS low_attendance_students
    `;
  
    return db.query(q);
  }
  
};

module.exports = adminModel;
