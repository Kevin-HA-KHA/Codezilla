import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {
  getUserDataSuccess,
  getUserDataFailure,
  errorReset,
  signOut,
} from '../redux/user/userSlice';
import ProgressBar from '../components/ProgressBar';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const { currentUser, error } = useSelector((state) => state.user);

    useEffect(() => {
      dispatch(errorReset()); //effacer msg erreur
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/user/${currentUser._id}`);
          const data = await res.json();
          if (data.success === false) {
            dispatch(getUserDataFailure(data));
            return;
          }
          dispatch(getUserDataSuccess(data));
        } catch (err) {
          dispatch(getUserDataFailure(err));
        }
      };
      fetchData();
    }, []);
    
    const handleSignOut = async () => {
      try {
        await fetch('/api/auth/signout');
        dispatch(signOut())
      } catch (error) {
        console.log(error);
      }
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
          <div>
            <h1 className='text-3xl font-semibold text-center my-7'>Tableau de bord</h1>
            <img
              src={currentUser.profilePicture}
              alt='profile'
              className='h-24 w-24 self-center rounded-full object-cover mt-2'
            />
            <p>{currentUser.username}</p>  
            <p className='text-red-700 mt-5'>{error && 'Une erreur est survenue!'}</p>
            <p className='text-green-700 mt-5'></p>
            <Link to={'/profile_update'}><button>Modifier le profil</button></Link>
            <Link><button onClick={handleSignOut} className=''>Se déconnecter</button></Link>
          </div>
          <div>
            <h2 className='text-2xl font-semibold text-center my-7'>Niveau : {currentUser.level}</h2>
            <ProgressBar experiencePoints={currentUser.experience} />
          </div>
        </div>
        
    )
}