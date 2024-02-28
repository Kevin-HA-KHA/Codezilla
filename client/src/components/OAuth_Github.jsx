import { GithubAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth_Github() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGithubClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result._tokenResponse.screenName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Impossible de se connecter avec Github', error);
    }
  };
  return (
    <button
      type='button'
      onClick={handleGithubClick}
      className='bg-gray-900 text-white rounded-lg p-3 uppercase hover:opacity-95'
    >
      Continuer avec Github
    </button>
  );
}
