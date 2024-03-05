import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setCurrentCourse,
} from '../redux/course/courseSlice';

const CourseComponent = ({ courseData }) => {
  return (
    <div className='course-body'>
      <h1 className='course-title' dangerouslySetInnerHTML={{ __html: courseData.title }}></h1>
      <p className='course-description' dangerouslySetInnerHTML={{ __html: courseData.description }}></p>
      {courseData.sections.map(section => (
        <div className='courses-sections' key={section._id}>
          <h2 className='course-section-title' dangerouslySetInnerHTML={{ __html: section.title }}></h2>
          <p className='course-section-content' dangerouslySetInnerHTML={{ __html: section.content }}></p>
          <img src={section.image} alt="" />
        </div>
      ))}
    </div>
  );
};

const ButtonComponent = ({ coursesData }) => {
    const dispatch = useDispatch();
    return (
      <>
        {coursesData.map(courseData => (
          <li className="course-btn" key={courseData._id} onClick={() => dispatch(setCurrentCourse(courseData._id))}>
            {courseData.title}
          </li>
        ))}
      </>
    );
  };


  

export {CourseComponent, ButtonComponent};
