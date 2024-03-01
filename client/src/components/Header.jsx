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
          <Link to='/aventure'>
            { currentUser ? <li>Aventure</li> : null}
          </Link>
          <Link to='/course'>
            { currentUser ? <li>Cours</li> : null}
          </Link>
          <Link to='/profile_page'>
            {currentUser ? 
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
             : 
              <li>Se connecter</li>
            }
          </Link>
        </ul>
      </div>
    </div>
  );
}
