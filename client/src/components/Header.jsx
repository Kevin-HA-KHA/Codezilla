import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import logo from "../public/logo.svg"
import { setProgressHTML } from '../redux/user/userSlice';

export default function Header() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => { //refresh les userData pour débloquer ou non les cours
    const fetchData = async () => {
      if(currentUser) {
        try {
          const res = await fetch(`/api/user/${currentUser._id}`);
          const data = await res.json();
          const progressHTML = data.experience_html;
          const progressCSS = data.experience_css;
          dispatch(setProgressHTML(progressHTML));
        } catch (err) {
          console.log(err);
        }
      } else {
        dispatch(setProgressHTML(0));
      }
    };
    fetchData();
  }, [currentUser]);


  

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
