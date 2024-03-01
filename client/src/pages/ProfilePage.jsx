import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
// import { ProfilUpdate } from '../pages/ProfileUpdate.jsx'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDataSuccess,
  getUserDataFailure,
  errorReset,
  signOut,
} from '../redux/user/userSlice';
import ProgressBar from '../components/ProgressBar';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const { currentUser, error, progressHTML } = useSelector((state) => state.user);

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
        <div className='profil'>
          <div className='change-profil'>
            <img
              src={currentUser.profilePicture}
              alt='profile'
              className=''
            />
            <p>{currentUser.username}</p>  
            <p className=''>{error && 'Une erreur est survenue!'}</p>
            <p className=''></p>
            {/* <ProfilUpdate /> */}
            <Link to={'/profile_update'}><button>Modifier le profil</button></Link>
            <Link><button onClick={handleSignOut} className=''>Se déconnecter</button></Link>
          </div>
          <div className='dashboard'>
          <h1 className=''>Tableau de bord</h1>
            <h2 className=''>Progression HTML :</h2>
            <ProgressBar experiencePoints={currentUser.experience} />
          </div>
        </div>
        
    )
}