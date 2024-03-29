import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
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
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
  errorReset
} from '../redux/user/userSlice';
import ProgressBar from '../components/ProgressBar';
import ProgressBarCss from '../components/ProgressBarCss';
import logo_HTML from "../public/logo_html.png"
// Dépendances Notifications
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// Fin Dépendances Notifications

export default function ProfilePage() {
    const dispatch = useDispatch();
    const { progressHTML, progressCSS, level } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const { currentUser, loading, error } = useSelector((state) => state.user);
    // Convertir la date en objet Date
    const createdAtDate = new Date(currentUser.createdAt);
    // Options de formatage pour le mois
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    // Formater la date selon les options
    const formattedDate = createdAtDate.toLocaleDateString('fr-FR', options);
    const prevLevelRef = useRef(null);

    useEffect(() => {
      if (image) {
        handleFileUpload(image);
      }
    }, [image]);
    const handleFileUpload = async (image) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        (error) => {
          setImageError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, profilePicture: downloadURL })
          );
        }
      );
    };
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(updateUserStart());
        // 1. Encapsulez la requête asynchrone dans une fonction qui renvoie une promesse
        const updateUserData = async () => {
          const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          return await res.json();
        };
    
        // Créez une promesse de timeout de 5 secondes
        const timeoutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(updateUserFailure(error));
            reject(new Error('Timeout exceeded (8 seconds)'));
          }, 8000);
        });
        // 2. Appelez toast.promise en fournissant la fonction et les options de notification
        toast.promise(
          Promise.race([updateUserData(), timeoutPromise]),
          {
            pending: 'Modification du profil...',
            success: 'Votre profil a bien été mis à jour !',
            error: 'La requête a expirée ! Reconnectez vous.',
          }
        );
        const data = await updateUserData(); 
        console.log(data);
    
        if (data.success === false) {
          dispatch(updateUserFailure(data));
          return;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      } catch (error) {
        dispatch(updateUserFailure(error));
      }
    };
  
    const handleDeleteAccount = async () => {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error));
      }
    };

    const handleSignOut = async () => {
      try {
        await fetch('/api/auth/signout');
        dispatch(signOut())
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
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

    // Envoyer notif si le niveau évolue
    useEffect(() => {
      if (prevLevelRef.current !== null && prevLevelRef.current !== level) {
        toast(`Bravo ! Vous avez atteint le niveau ${level} 👌`, {
        });
      }
      prevLevelRef.current = level;
    }, [level]);


    return (
        <div className='profil'>
          <ToastContainer position="top-right" autoClose={8000} limit={4} newestOnTop rtl={false} theme="light" closeOnClick pauseOnFocusLoss draggable />
          <div className='change-profil'>
            {/* <img
              src={currentUser.profilePicture}
              alt='profile'
              className=''
            /> */}
            <p className='username'>{currentUser.username}</p>  
            {/* <ProfilUpdate /> */}
            {/* <Link to={'/profile_update'}><button>Modifier le profil</button></Link> */}
            
            {/* test */}

            <form onSubmit={handleSubmit} className='flex-column'>
              <input
                type='file'
                ref={fileRef}
                hidden
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
              />
              <img
                src={formData.profilePicture || currentUser.profilePicture}
                referrerPolicy='no-referrer'
                alt='profile'
                className=''
                onClick={() => fileRef.current.click()}
              />
              <p className=''>
                {imageError ? (
                  <span className=''>
                    Erreur lors du chargement de l'image (Le fichier doit peser moins de 2 MB)
                  </span>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <span className=''>{`Téléchargement: ${imagePercent} %`}</span>
                ) : imagePercent === 100 ? (
                  <span className=''>L'image a été chargée ! Veuillez sauvegarder.</span>
                ) : (
                  ''
                )}
              </p>
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                defaultValue={currentUser.username}
                type='text'
                id='username'
                placeholder="Nom d'utilisateur"
                className=''
                onChange={handleChange}
              />
              <label htmlFor="email">Adresse mail</label>
              <input
                defaultValue={currentUser.email}
                type='email'
                id='email'
                placeholder='Email'
                className=''
                onChange={handleChange}
              />
              <label htmlFor="password">Mot de passe</label>
              <input
                type='password'
                id='password'
                placeholder='Mot de passe'
                className=''
                onChange={handleChange}
              />
              <p className='rounded-lg p-3'>
                  Inscrit le : {formattedDate}
              </p>
              <button className=''>
                {loading ? 'Chargement...' : 'Mettre à jour'}
              </button>
              {/* <p className=''>{error && 'Une erreur est survenue!'}</p> */}
          <div>
            <Link><button onClick={handleSignOut} className=''>Se déconnecter</button></Link>
            <Link><button onClick={handleDeleteAccount} className=''>Supprimer le compte</button></Link>
          </div>
              {/* <p className=''>
                {updateSuccess && `Votre profil a bien été mis à jour !`}
              </p> */}
          </form>

          </div>
          <div className='dashboard'>
          <h1>Tableau de bord</h1>
            <h2>HTML</h2>
            <section className='html_progress'>
              <img src={logo_HTML} alt="" />
              <ProgressBar experiencePoints={progressHTML} />
            </section>
            <h2>CSS</h2>
            <section className='css_progress'>
              <img src={logo_HTML} alt="" />
              <ProgressBarCss experiencePoints={progressCSS} />
            </section>
            <div className='level'>
            <h2>Niveau du compte</h2>
            <section>
              <div></div>
              <p className='current_level'>{level}</p>
              <div></div>
            </section>
            </div>
          </div>
        </div>
        
    )
}