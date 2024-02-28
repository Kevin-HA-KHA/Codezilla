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
    <div className=''>
      <h1 className=''>Connexion</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className=''
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Mot de passe'
          id='password'
          className=''
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className=''
        >
          {loading ? 'Chargement...' : 'Connexion'}
        </button>
        <OAuth />
        <OAuth_Github />
      </form>
      <div className=''>
        <p>Pas encore de compte?</p>
        <Link to='/sign-up'>
          <span className=''>S'inscrire</span>
        </Link>
      </div>
      <p className=''>
        {error ? error.message || 'Une erreur s\'est produite!' : ''}
      </p>
    </div>
  );
}
