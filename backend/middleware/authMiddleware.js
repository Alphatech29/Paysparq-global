const { generateToken, verifyToken } = require("../controller/utils/jwt");
const { rolePermissions } = require("../controller/utils/permissions");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    // Extract token (handles both "Bearer token" and direct token cases)
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    try {
        const verified = verifyToken(token); // Ensure verifyToken() works without requiring JWT_SECRET
        req.employee = verified; 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid or Expired Token" });
    }
};

const checkPermission = (action) => {
    return (req, res, next) => {
        if (!req.employee || !req.employee.role) {
            return res.status(403).json({ message: "Forbidden: No Role Assigned" });
        }

        const role = req.employee.role;
        if (!rolePermissions[role] || !rolePermissions[role].includes(action)) {
            return res.status(403).json({ message: "Forbidden: No Permission" });
        }
        next();
    };
};

// Updated token creation function
const createAuthToken = (employee, rememberMe = false) => {
    const expiresIn = rememberMe ? "7d" : "1d";
    return generateToken({ uid: employee.uid, role: employee.role }, expiresIn);
};

module.exports = { authMiddleware, checkPermission, createAuthToken };
