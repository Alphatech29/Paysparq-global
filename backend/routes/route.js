import express from 'express';
const router = express.Router();
import authRoutes from './routes/authRoutes.js';


// Route mappings
router.use('/auth', authRoutes); // Authentication routes (e.g., login, register)


// Export the router
export default router;
