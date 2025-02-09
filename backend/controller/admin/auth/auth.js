const pool = require("../../../models/db");
const { createAuthToken } = require("../../../middleware/authMiddleware");

// Employee Login Route
const login = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        // Check if the input is a valid email or username
        const query = `
            SELECT * FROM employees 
            WHERE username = ? OR email = ?
        `;
        const [employeeRows] = await pool.query(query, [emailOrUsername, emailOrUsername]);

        if (employeeRows.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const employee = employeeRows[0];

        // Check if the employee has been assigned a role
        if (!employee.role_id) {
            return res.status(400).json({ message: "You have not been assigned to a role yet." });
        }

        // Directly compare the password (plain-text comparison)
        if (password !== employee.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Get the role of the employee using role_id
        const [roleRows] = await pool.query("SELECT * FROM roles WHERE role_id = ?", [employee.role_id]);
        const role = roleRows.length > 0 ? roleRows[0].role_name : "";

        // Create JWT token using the createAuthToken function
        const token = createAuthToken({ uid: employee.uid, role_id: employee.role_id });

        // Construct the response data
        const responseData = {
            token,
            role,
            uid: employee.uid,
            username: employee.username,
            fullname: employee.fullname,
            email: employee.email,
            phone_number: employee.phone_number,
            account_balance: employee.account_balance,
            avatar: employee.avatar,
            created_at: employee.created_at,
            updated_at: employee.updated_at,
        };

        // Log the response data
        console.log("Employee login successful. Response data:", responseData);

        // Return the response
        res.json(responseData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { login };
