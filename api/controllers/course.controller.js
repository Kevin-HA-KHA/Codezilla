import Course from '../models/course.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

// get courses

export const getAllCourse = async (req, res, next) => {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
}

export const getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        res.status(200).json(course);
      } catch (error) {
        next(error);
      }
}
