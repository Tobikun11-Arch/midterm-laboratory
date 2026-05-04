import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUserById
} from '../controllers/userController.js';
import {validateRequiredFields} from '../middleware/validateFields.js';
import express from 'express';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', validateRequiredFields, createUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', validateRequiredFields, updateUser);
router.patch('/users/:id', patchUser);
router.delete('/users/:id', deleteUserById);

export default router;