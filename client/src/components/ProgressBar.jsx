import React from 'react';
import './style/ProgressBar.css'; // Fichier CSS pour styliser la barre de progression
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProgressBar = ({ experiencePoints }) => {
  const percentage = (experiencePoints / 1000) * 100;  // Calculer le pourcentage d'expérience par rapport au maximum (1000 dans ce cas)
  const dispatch = useDispatch();
    const { currentUser, error } = useSelector((state) => state.user);
  useEffect(() => {

  }, [currentUser])

  return (
    <div className="progress-bar-container">
      <p className='progress-bar-text'>{experiencePoints} / 1000</p>
      <div
        className="progress-bar-fill"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;