import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className=''>
      <h1 className=''>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder="Nom d'utilisateur"
          id='username'
          className=''
          onChange={handleChange}
        />
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
          {loading ? 'Chargement...' : 'S\'inscrire'}
        </button>
        <OAuth />
      </form>
      <div className=''>
        <p>Déjà un compte?</p>
        <Link to='/sign-in'>
          <span className=''>Connexion</span>
        </Link>
      </div>
      <p className=''>{error && 'Une erreur s\'est produite!'}</p>
    </div>
  );
}
