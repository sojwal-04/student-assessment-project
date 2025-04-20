const { INTEGER, STRING, literal, DATE } = require("sequelize");
const sequelize = require("../config/sequelize");

const subjectSchema = sequelize.define(
  "subjects",

  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    branch: {
      type: STRING,
      allowNull: false,
      comment: "Branch of the subject",
    },

    year: {
      type: INTEGER,
      allowNull: false,
      comment: "Year of the subject in the branch curriculum",
    },

    subject_name: {
      type: STRING,
      allowNull: false,
      comment: "Name of the subject/course",
    },

    credit_hours: {
      type: INTEGER,
      allowNull: false,
      comment: "Number of credit hours for the subject",
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
    comment: "Table storing subject/course details",
  }
);

module.exports = subjectSchema;
