import { GithubAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import git_logo from "../public/git_logo.png"

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
          // method: "github",
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
      className='connexion-btn'
    >
      <img src={git_logo} className='logo-btn' />
      Continuer avec Github
    </button>
  );
}
