const { INTEGER, STRING, DATE, literal } = require("sequelize");
const sequelize = require("../config/sequelize");

const attendanceSchema = sequelize.define(
    "attendance",

    {
        id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        student_id: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: 'students',
                key: 'id'
            },
            comment: "ID of the student attending the class",
        },

        subject_id: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: 'subjects',
                key: 'id'
            },
            comment: "ID of the subject the student is attending",
        },

        date: {
            type: DATE,
            allowNull: false,
            comment: "Date of the class",
        },

        status: {
            type: STRING,
            allowNull: false,
            comment: "Attendance status (e.g., Present, Absent, Late)",
        },

        createdAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: "Date when the attendance record was created",
        },

        updatedAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: "Date when the attendance record was last updated",
        }
    },
    {
        timestamps: true,
        comment: "Table storing student attendance in each subject",
    }
);

module.exports = attendanceSchema;
