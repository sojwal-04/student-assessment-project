const { INTEGER, STRING, TEXT, DATE, literal } = require("sequelize");
const sequelize = require("../config/sequelize");

const facultySchema = sequelize.define(
  "faculty",

  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    first_name: {
      type: STRING,
      allowNull: false,
      comment: "Faculty member's first name",
    },

    last_name: {
      type: STRING,
      allowNull: false,
      comment: "Faculty member's last name",
    },

    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      comment: "Faculty member's email address",
    },

    password: {
      type: STRING,
      allowNull: false,
      comment: "Faculty member's password",
    },

    contact_number: {
      type: STRING,
      allowNull: true,
      validate: {
        is: /^[0-9]{10}$/, // Validate as a 10-digit number
      },
      comment: "Faculty member's contact number",
    },

    department: {
      type: STRING,
      allowNull: true,
      comment:
        "Department or field of study the faculty belongs to (e.g., Computer Science, Civil Engineering)",
    },

    qualifications: {
      type: TEXT,
      allowNull: true,
      comment: "Faculty member's qualifications and educational background",
    },

    createdAt: {
      type: DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
      comment: "Date when the record was created",
    },

    updatedAt: {
      type: DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
      comment: "Date when the record was last updated",
    },
  },
  {
    timestamps: true,
    comment: "Table storing faculty details",
  }
);

module.exports = facultySchema;
