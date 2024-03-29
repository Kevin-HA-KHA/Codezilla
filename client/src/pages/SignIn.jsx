import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import OAuth_Github from '../components/OAuth_Github';
import banner from "../public/home_banner.jpeg"
import dino from "../public/dino.png"


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className='container'>
            <div className='banner singin-banner container flex-center'>
              <img className='banner-site' src={banner} alt="" /> 
    
      <div className='singin singin-block'>
        {/* <h1 className=''>Connexion</h1> */}
        <form onSubmit={handleSubmit} className='singin'>
        <div className="intro">
          <img src={dino} />
          <h1>Bienvenue !</h1>
          <p>Connecte toi à ton compte</p>
        </div>
          <label htmlFor="email">Adresse mail</label>
          <input
            type='email'
            placeholder='codeurexpert@html.fr'
            id='email'
            className=''
            onChange={handleChange}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type='password'
            placeholder='htmlcss4ever'
            id='password'
            className=''
            onChange={handleChange}
          />
            <div className='OAuth'>
                <button
                  disabled={loading}
                  className=''
                >
                  {loading ? 'Chargement...' : 'Connexion'}
                </button>

              <section>
                <OAuth />
                <OAuth_Github />
              </section>
            </div>
        </form>
        <div className='singup-link'>
          <Link to='/sign-up'>
            <span className=''>Créer un compte</span>
          </Link>
        </div>
        <p className=''>
          {error ? error.message || 'Une erreur s\'est produite!' : ''}
        </p>

      </div>
      </div>
    </div>
  );
}
