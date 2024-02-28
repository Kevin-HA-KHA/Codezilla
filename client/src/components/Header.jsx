import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Codezilla</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/aventure'>
            { currentUser ? <li>Aventure</li> : null}
          </Link>
          <Link to='/course'>
            { currentUser ? <li>Cours</li> : null}
          </Link>
          <Link to='/about'>
          { currentUser ? <li>A propos</li> : null}
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
