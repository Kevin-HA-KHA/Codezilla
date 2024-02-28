import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import logo from "../public/logo.svg"

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='header'>
      <div className='nav'>
        <Link to='/'>
          <img className='logo' src={logo} alt="" />
        </Link>
        <ul className='nav-droite'>
          <Link to='/'>
            <li>Cours</li>
          </Link>
          <Link to='/'>
            <li>Aventure</li>
          </Link>
          <Link to='/'>
          { currentUser ? <li>Profil</li> : null}
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='' />
            ) : (
              <li>Se connecter</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
