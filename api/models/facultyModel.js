const db = require("../config/db.connect");

const facultyModel = {
  // Add a new faculty
  addFaculty: (facultyData) => {
    const {
      first_name,
      last_name,
      email,
      password,
      contact_number,
      department,
      qualifications,
    } = facultyData;

    const q = `
      INSERT INTO faculty 
        (first_name, last_name, email, password, contact_number, department, qualifications, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const values = [
      first_name,
      last_name,
      email,
      password,
      contact_number,
      department,
      qualifications,
    ];

    return db.query(q, values);
  },

  // Get all faculty members
  list: () => {
    const q = `
      SELECT 
        id,
        first_name,
        last_name,
        email,
        contact_number,
        department,
        qualifications,
        createdAt
      FROM faculty
      ORDER BY createdAt DESC
    `;

    return db.query(q);
  },

  getByEmail: (email) => {
    const q = `
      SELECT 
        id,
        first_name,
        last_name,
        password,
        email,
        contact_number,
        department,
        qualifications,
        createdAt
      FROM faculty
      WHERE email = ?
    `;

    return db.query(q, [email]);
  },

  getFacultyDashboardStats: () => {
    const q = `
        SELECT 
            (SELECT COUNT(*) FROM students) AS total_students,
            (SELECT ROUND(AVG(cgpa), 2) FROM performances) AS avg_cgpa,
            (SELECT COUNT(*) FROM performances WHERE attendance_percentage < 75) AS low_attendance_students,
            (SELECT COUNT(*) FROM performances) AS total_performances
    `;

    return db.query(q);
  },
};

module.exports = facultyModel;
