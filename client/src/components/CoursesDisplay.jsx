import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setCurrentCourse,
} from '../redux/course/courseSlice';

const CourseComponent = ({ courseData }) => {
  return (
    <div>
      <h1 className='course-title'>{courseData.title}</h1>
      <p className='course-description'>{courseData.description}</p>
      {courseData.sections.map(section => (
        <div className='courses-sections' key={section._id}>
          <h2 className='course-section-title'>{section.title}</h2>
          <p className='course-section-content'>{section.content}</p>
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
          <button className="course-btn" key={courseData._id} onClick={() => dispatch(setCurrentCourse(courseData._id))}>
            {courseData.title}
          </button>
        ))}
      </>
    );
  };


  

export {CourseComponent, ButtonComponent};
