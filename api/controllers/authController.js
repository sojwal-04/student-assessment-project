const asyncHandler = require("../asyncHandler");
const adminModel = require("../models/adminModel");
const bloodBanksModel = require("../models/bloodBanksModel");
const facultyModel = require("../models/facultyModel");
const userModel = require("../models/userModel");


const { sendResponse } = require("../utils/responses/ApiResponse");
const { FAILURE, SUCCESS } = require("../utils/responses/successCodes");

const jwt = require('jsonwebtoken')

const authController = {
    /**
     * Admin Login
     */
    adminLogin: asyncHandler(async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return sendResponse(res, 400, FAILURE, "Username and password required");
        }

        const [existingAdmin] = await adminModel.getAdminByUsername(username);

        if (!existingAdmin?.length || existingAdmin[0]?.password !== password) {
            return sendResponse(res, 401, FAILURE, "Invalid credentials");
        }

        let { password: adminPass, ...adminWithoutPassword } = existingAdmin[0]

        const token = jwt.sign(
            {
                id: adminWithoutPassword.username,
                role: adminWithoutPassword.role || 'admin',
                username: adminWithoutPassword.username
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '2h' }
        )

        return sendResponse(res, 200, SUCCESS, "Login successful", {
            admin: { ...adminWithoutPassword, token }
        });
    }),

 
    /**
     * Faculty Login
     */
    facultyLogin : asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendResponse(res, 400, FAILURE, "Email and password are required");
        }
    
        // Retrieve the faculty by email
        const [existingFaculty] = await facultyModel.getByEmail(email);
    
        if (!existingFaculty?.length || existingFaculty[0]?.password !== password) {
            return sendResponse(res, 401, FAILURE, "Invalid credentials");
        }
    
        // Destructure password from the faculty object to avoid sending it back
        const { password: facultyPassword, ...faculty } = existingFaculty[0];
    
        // Generate JWT token for the faculty user
        const token = jwt.sign(
            {
                id: faculty.id,
                role: 'faculty',
                email: faculty.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '2h' }
        );
    
        return sendResponse(res, 200, SUCCESS, "Login successful", {
            faculty: { ...faculty, role: 'faculty', token }
        });
    })
    
};

module.exports = authController;
