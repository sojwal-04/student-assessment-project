const db = require("../config/db.connect");

const studentModel = {
  addStudent: (studentData) => {
    const q = `
        INSERT INTO students (
            first_name, last_name, email, contact_number, date_of_birth, address, 
            class_name, branch, year, status, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const values = [
      studentData.first_name,
      studentData.last_name,
      studentData.email,
      studentData.contact_number || null,
      studentData.date_of_birth || null,
      studentData.address || null,
      studentData.class_name || null,
      studentData.branch || null,
      studentData.year || null,
      studentData.status || "Active",
    ];

    return db.query(q, values);
  },

  getStudents: async (filter = {}) => {
    let q = "SELECT * FROM students";
    const params = [];

    // Add filter conditions based on the provided filter object (branch, year, etc.)
    if (filter.branch) {
      q += " WHERE branch = ?";
      params.push(filter.branch);
    }

    if (filter.year) {
      // Check if there's already a WHERE clause, otherwise use AND
      q += filter.branch ? " AND" : " WHERE";
      q += " year = ?";
      params.push(filter.year);
    }

    // console.log(q);
    // Execute the query with the parameters
    return db.query(q, params);
  },

  getStudentById: (studentId) => {
    const q = `
        SELECT * FROM students WHERE id = ?
    `;

    return db.query(q, [studentId]);
  },

  getStudentByEmail: (email) => {
    const q = `
            SELECT * FROM students WHERE email = ?
        `;

    return db.query(q, [email]);
  },

  getPerformance: (studentId) => {
    const q = `
        SELECT * FROM performances WHERE student_id = ? ORDER BY semester
    `;

    return db.query(q, [studentId]);
  },

  addPerformance: (performanceData) => {
    const {
      student_id,
      semester,
      attendance_percentage,
      extracurricular_score,
      cgpa,
      academic_rank,
      grade,
      remarks,
    } = performanceData;

    const q = `
      INSERT INTO performances (
        student_id,
        semester,
        attendance_percentage,
        extracurricular_score,
        cgpa,
        academic_rank,
        grade,
        remarks
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      student_id,
      semester,
      attendance_percentage,
      extracurricular_score,
      cgpa,
      academic_rank || null,
      grade || null,
      remarks || null,
    ];

    return db.query(q, values);
  },

  getPerformances: async (filter = {}) => {
    /*
      This function calculates a performance score for each student
      based on their semester-wise data and supports filtering by branch and year.
  
      🔢 Performance Score Formula:
        - (CGPA * 10 * 0.6) + (Attendance % * 0.25) + (Extracurricular Score * 0.15)
        - Weighted average favors academic score most, but includes attendance and activities
  
      🔍 Filters:
        - Optional filters can be applied for `branch` and `year`
        - These are applied on the `students` table via JOIN
  
      📊 Grouping & Aggregation:
        - Aggregates performance records using `GROUP BY p.student_id`
        - Only includes students who have performance entries for **at least 2 semesters**
  
      🧮 Sorting:
        - Results are sorted in descending order of `performance_score`
  
      ✅ Returns:
        - student_id, first_name, last_name, branch, year, avg performance score, total semesters
    */

    let q = `
      SELECT 
        p.student_id,
        s.first_name,
        s.last_name,
        s.branch,
        s.year,
        AVG((p.cgpa * 10 * 0.6) + (p.attendance_percentage * 0.15) + (p.extracurricular_score * 0.25)) AS performance_score,
        COUNT(*) AS total_semesters
      FROM performances p
      JOIN students s ON s.id = p.student_id
    `;

    const params = [];
    const conditions = [];

    // Optional filters
    if (filter.branch) {
      conditions.push("s.branch = ?");
      params.push(filter.branch);
    }

    if (filter.year) {
      conditions.push("s.year = ?");
      params.push(filter.year);
    }

    // Apply filters if any
    if (conditions.length > 0) {
      q += " WHERE " + conditions.join(" AND ");
    }

    q += `
      GROUP BY p.student_id
      HAVING total_semesters >= 2
      ORDER BY performance_score DESC
    `;

    return db.query(q, params);
  },
};

module.exports = studentModel;
