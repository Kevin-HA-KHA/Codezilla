import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './pages/Footer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProfileUpdate from './pages/ProfileUpdate';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Aventure from './pages/Aventure';
import Course from './pages/Course';

export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/course' element={<Course/>} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile_page' element={<ProfilePage/>} />
          <Route path='/profile_update' element={<ProfileUpdate/>} />
          <Route path='/aventure' element={<Aventure/>} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
