const pool = require("../../../models/db");
const bcrypt = require('bcrypt');


// Get all employees with their roles (including all employee and role data)
const getAllEmployeesWithRoles = async (req, res) => {
  try {
    const [employeesWithRoles] = await pool.execute(`
      SELECT e.*, r.role_name
      FROM employees e
      JOIN roles r ON e.role_id = r.role_id
    `);
    res.status(200).json({ employees: employeesWithRoles });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const [roles] = await pool.execute(`SELECT * FROM roles`);
    res.status(200).json({ roles });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


const editEmployeeById = async (req, res) => {
  const { id } = req.params; 
  const { password, phone_number, role_name } = req.body;

  console.log('Data received from frontend:', req.body);

  let updateData = [];
  let updateQuery = `UPDATE employees SET`;
  let isUpdated = false; 

  // Check if role_name is provided and valid
  if (role_name) {
    const [role] = await pool.execute(`
      SELECT role_id FROM roles WHERE role_name = ?`, 
      [role_name]
    );

    if (role.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    updateQuery += ` role_id = ?,`;
    updateData.push(role[0].role_id);
    isUpdated = true; 
  }

  // Check if phone_number is provided and it's different from the current value
  if (phone_number) {
    const [existingPhoneNumber] = await pool.execute(`
      SELECT phone_number FROM employees WHERE uid = ?`, [id]);
    if (existingPhoneNumber[0] && existingPhoneNumber[0].phone_number !== phone_number) {
      updateQuery += ` phone_number = ?,`;
      updateData.push(phone_number);
      isUpdated = true; 
    }
  }

  // Check if password is provided and valid, and if it's different from the current value
  if (password) {
    const [existingPassword] = await pool.execute(`
      SELECT password FROM employees WHERE uid = ?`, [id]);
    if (existingPassword[0] && existingPassword[0].password !== password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery += ` password = ?,`;
      updateData.push(hashedPassword);
      isUpdated = true; // Set flag to true if password is updated
    } else {
      return res.status(400).json({ error: "Password must be a non-empty string and different from the current one" });
    }
  }

  // If no fields were updated, respond without updating
  if (!isUpdated) {
    return res.status(400).json({ error: "No valid fields provided to update" });
  }

  // Remove trailing comma and add the WHERE condition
  updateQuery = updateQuery.slice(0, -1);  
  updateQuery += ` WHERE uid = ?`;
  updateData.push(id);

  console.log('Update data:', updateData);

  // Execute the update query
  try {
    const [result] = await pool.execute(updateQuery, updateData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found or no changes made" });
    }

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};








module.exports = { getAllEmployeesWithRoles, getAllRoles, editEmployeeById };
