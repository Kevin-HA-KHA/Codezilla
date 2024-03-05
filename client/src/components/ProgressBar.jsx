import React from 'react';
import './style/ProgressBar.css'; // Fichier CSS pour styliser la barre de progression


const ProgressBar = ({ experiencePoints }) => {
  let percentage = (experiencePoints / 1000) * 100;  // Calculer le pourcentage d'expérience par rapport au maximum (1000 dans ce cas)
  percentage = Math.round(percentage * 10) / 10;

  return (
    <div className="progress-bar-container">
      <p className='progress-bar-text'>{percentage}%</p>
      <div
        className="progress-bar-fill"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;