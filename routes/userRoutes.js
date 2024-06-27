import express from 'express'
import userAuth from '../middlewares/authMiddleware.js';
import { updateUserController, getUserController } from '../controllers/userController.js';

const router  = express.Router();


// routes
// GET USERS || GET
router.get("/get-user", userAuth, getUserController)

// UPDATE USERS || PUT
router.put("/update-user", userAuth, updateUserController)

export default router;