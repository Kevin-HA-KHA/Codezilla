import React from 'react';
import banner from "../public/home_banner.jpeg"
import { Link, useNavigate } from 'react-router-dom';


export default function Home() {
  return (


    <div className='main container'>
      <div className='banner container'>
          <img src={banner} alt="" /> 
        <div className='accueil container'>
            <h2>Apprendre le code en s'amusant <br />HTML - CSS- JAVASCRIPT</h2>
            <h2>Apprendre le code en s'amusant <br />HTML - CSS- JAVASCRIPT</h2>
        </div>
        <div className='btn-start container'>
            <div className='couche1 container'></div>
            <div className='couche2 container'></div>
              <Link to="/course">
                <div className='couche3 container'>
                <p>
                Commencer maintenant

                </p>
                </div>
              </Link>
        </div>
      </div>


      <div className='apprentissage block-noir container'>
      <div className='transition transition-orange container'></div>
        <h2>Processus d'apprentisage</h2>
        <p>
          This is a full-stack web application built with the MERN (MongoDB,
          Express, React, Node.js) stack. It includes authentication features that
          allow users to sign up, log in, and log out, and provides access to
          protected routes only for authenticated users.
          This is a full-stack web application built with the MERN (MongoDB,
          Express, React, Node.js) stack. It includes authentication features that
          allow users to sign up, log in, and log out, and provides access to
          protected routes only for authenticated users.
          This is a full-stack web application built with the MERN (MongoDB,
          Express, React, Node.js) stack. It includes authentication features that
          allow users to sign up, log in, and log out, and provides access to
          protected routes only for authenticated users.
        </p>
      </div>
      <div className='apprentissage block-orange container'>
        <div className='transition transition-bleu container'></div>
        <h2>Processus d'apprentisage</h2>
        <p>
          The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is implemented
          using JSON Web Tokens (JWT).
          The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is implemented
          using JSON Web Tokens (JWT).
          The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is implemented
          using JSON Web Tokens (JWT).
          The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is implemented
          using JSON Web Tokens (JWT).
        </p>
      </div>
      <div className='apprentissage block-noir container'>
      <div className='transition transition-orange container'></div>
        <h2>Processus d'apprentisage</h2>
      <p>
        This application is intended as a starting point for building full-stack
        web applications with authentication using the MERN stack. Feel free to
        use it as a template for your own projects!
      </p>

      </div>
    </div>
  );
}
