import React, { useEffect, useState } from 'react';
import {CourseComponent, ButtonComponent} from '../components/CoursesDisplay';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentCourse,
  setAllCourseData,
} from '../redux/course/courseSlice';

function Course() {
  const dispatch = useDispatch();
  const { currentCourseId, allCourseData } = useSelector((state) => state.course);
  // const { progressHTML } = useSelector((state) => state.user);
  const [ progressHTML, setProgressHTML ] = useState('');
  const [courseData, setCourseData] = useState({
    _id: "",
    title: "",
    description: "",
    sections: []
  });

  useEffect(() => {
    // Fonction pour récupérer toutes les courses et créer les boutons en conséquence
    const getAllCoursesData = async () => {
      try {
        const res = await fetch(`/api/course/`);
        const data = await res.json();
        if (data.success === false) {
          throw new Error(data.error);
        }
        dispatch(setAllCourseData(data)); // Dispatch l'action pour stocker les données dans Redux
      } catch (err) {
        console.error("Erreur lors de la récupération des données de cours :", err);
      }
    };
    getAllCoursesData(); 
  }, []);
  

  useEffect(() => { // récupérer les données du cours quand courseID change
    if (currentCourseId !== null) {
      const fetchData = async () => { 
        try {
          const res = await fetch(`/api/course/${currentCourseId}`);
          const data = await res.json();
          if (data.success === false) {
            return res.json(data);
          }
          setCourseData(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [currentCourseId]);

  return (
    <div className='course'>
      <div className='course-selector'>
      <h1>Cours HMTL</h1>
      {/* <button onClick={() => dispatch(setCurrentCourse("65e092420cc67c24901ac345"))}>Les balises</button>
      <button onClick={() => dispatch(setCurrentCourse("65e09f310cc67c24901c9f4c"))}>test</button>
      <button onClick={() => dispatch(setCurrentCourse("65e09f310cc67c24901c9f4c"))}>test</button> */}
      <ul>
        <li onClick={() => dispatch(setCurrentCourse("65e092420cc67c24901ac345"))}>Les balises</li>
        {progressHTML === 100 ? <li onClick={() => dispatch(setCurrentCourse("65e09f310cc67c24901c9f4c"))}>Chapitre 2</li> : <li className='blocked' onClick={() => dispatch(setCurrentCourse("65e09f310cc67c24901c9f4c"))}>Chapitre 2</li>}
        {progressHTML === 200 ? <li onClick={() => dispatch(setCurrentCourse("65e0f8890cc67c2490285f78"))}>Chapitre 3</li> : <li className='blocked' onClick={() => dispatch(setCurrentCourse("65e0f8890cc67c2490285f78"))}>Chapitre 3</li>}
      </ul>
      {/* <ButtonComponent coursesData={allCourseData} /> */}
      </div>
      <div className='course-body'>
        {
          courseData._id ? <CourseComponent courseData={courseData} /> : ''
        }
        <div className='CourseNav'>
          <button onClick={() => {setProgressHTML(100)}}>Niveau suivant</button>
          <button onClick={() => {setProgressHTML(0)}}>Réinitialiser</button>
        </div>
      </div>
      
    </div>
  )
}

export default Course