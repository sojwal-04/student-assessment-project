const sequelize = require("../config/sequelize");
const { Sequelize } = require("sequelize");
const studentSchema = require("../schemas/studentSchema");
const attendanceSchema = require("../schemas/attendanceSchema");
const facultySchema = require("../schemas/facultySchema");
const subjectSchema = require("../schemas/subjectSchema");
const adminSchema = require("../schemas/adminSchema");
const performanceSchema = require("../schemas/performanceSchema");






require('dotenv').config()

const createDatabaseIfNotExists = async () => {
    try {
        // Create a new Sequelize instance without specifying a database
        const tempSequelize = new Sequelize({
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.PORT,
            dialect: "mysql", // Change this if using PostgreSQL or other DB
        });

        // Check if database exists
        const [results] = await tempSequelize.query(`SHOW DATABASES LIKE '${process.env.DB_DATABASE}'`);

        if (results.length === 0) {
            console.log(`⚠️  Database '${process.env.DB_DATABASE}' does not exist. Creating...`);
            await tempSequelize.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
            console.log(`✅ Database '${process.env.DB_DATABASE}' created successfully.`);
        } else {
            console.log(`✅ Database '${process.env.DB_DATABASE}' already exists.`);
        }

        await tempSequelize.close(); // Close the temporary connection
    } catch (error) {
        console.error("❌ Error while checking/creating database:", error);
        process.exit(1);
    }
};



const getSync = async () => {
    try {
        // await createDatabaseIfNotExists(); // Ensure DB exists before syncing

        let { models } = await sequelize.sync({ alter: true });

        console.log(`✅ Total tables created: ${Object.keys(models)?.length}`);

        console.log(
            '\x1b[47m\x1b[30m%s\x1b[0m',
            `Database  has been migrated. You can now start the server.`
        );

        console.log(
            '\x1b[47m\x1b[30m%s\x1b[0m',
            'Use command: npm start (to start the server)'
        );

        process.exit();
    } catch (err) {
        console.error("❌ Error during database sync:", err);
        process.exit(1);
    }
};

// const getSync = async () => {

//     try {

//         let { models } = await sequelize.sync({ alter: true })

//         console.log(`Total tables created: ${Object.keys(models)?.length}`);

//         console.log(
//             '\x1b[47m\x1b[30m%s\x1b[0m',
//             'Database has been migrated successfully. You can now start the server.'
//         );

//         console.log(
//             '\x1b[47m\x1b[30m%s\x1b[0m',
//             'Use command: npm start (to start the server)'
//         );

//         process.exit();

//     } catch (err) {
//         console.error('Error:', err);
//     }

// };

module.exports = getSync;

// ORM - Sequelize