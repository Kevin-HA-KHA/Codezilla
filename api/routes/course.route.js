import express from 'express';
import {
    getAllCourse,
    getCourseById,
} from '../controllers/course.controller.js';

const router = express.Router();

router.get('/', getAllCourse);
router.get('/:id', getCourseById);


export default router;
