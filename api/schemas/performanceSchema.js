const { INTEGER, STRING, TEXT, literal, DATE } = require("sequelize");
const sequelize = require("../config/sequelize");

const performanceSchema = sequelize.define(
  "performances",

  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    student_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "students",
        key: "id",
      },
      comment: "ID of the student for this performance record",
    },

    semester: {
      type: INTEGER,
      allowNull: false,
      comment: "Semester (e.g., 1st, 2nd, 3rd...)",
    },

    attendance_percentage: {
      type: INTEGER,
      allowNull: false,
      comment: "Attendance percentage for the semester",
    },

    extracurricular_score: {
      type: INTEGER,
      allowNull: false,
      comment: "Extracurricular score out of 100",
    },

    cgpa: {
      type: INTEGER,
      allowNull: false,
      comment: "CGPA out of 10 for the semester",
    },

    academic_rank: {
      type: STRING,
      allowNull: true,
      comment: "Optional academic rank",
    },

    grade: {
      type: STRING,
      allowNull: true,
      comment: "Optional grade (e.g., A, B)",
    },

    remarks: {
      type: TEXT,
      allowNull: true,
      comment: "Additional remarks or feedback",
    },

    createdAt: {
      type: DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },

    updatedAt: {
      type: DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  },

  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["student_id", "semester"],
        name: "unique_student_semester",
      },
    ],
    comment: "Stores semester-wise performance data for students",
  }
);

module.exports = performanceSchema;
