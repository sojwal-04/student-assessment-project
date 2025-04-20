const { INTEGER, STRING, DATE, ENUM, TEXT, literal } = require("sequelize");
const sequelize = require("../config/sequelize");

const studentSchema = sequelize.define(
    "students",

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
            comment: "Student's first name",
        },

        last_name: {
            type: STRING,
            allowNull: false,
            comment: "Student's last name",
        },

        email: {
            type: STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            comment: "Student's email address",
        },

        contact_number: {
            type: STRING,
            allowNull: true,
            validate: {
                is: /^[0-9]{10}$/,  // Validate as a 10-digit number
            },
            comment: "Student's contact number",
        },

        date_of_birth: {
            type: DATE,
            allowNull: true,
            comment: "Student's date of birth",
        },

        address: {
            type: TEXT,
            allowNull: true,
            comment: "Student's home address",
        },

        class_name: {
            type: STRING,
            allowNull: true,
            comment: "Class or course the student is enrolled in",
        },

        branch: {
            type: STRING,
            allowNull: true,
            comment: "Branch or specialization of study (e.g., Computer Science, Civil Engineering)",
        },

        year: {
            type: INTEGER,
            allowNull: true,
            comment: "Current academic year of the student (e.g., 1, 2, 3, 4)",
        },

        status: {
            type: ENUM("Active", "Graduated", "Dropped", "Suspended"),
            defaultValue: "Active",
            comment: "Student's current status in the system",
        },

        createdAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: "Date when the record was created",
        },

        updatedAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: "Date when the record was last updated",
        }
    },
    {
        timestamps: true,
        comment: "Table storing student details",
    }
);

module.exports = studentSchema;
