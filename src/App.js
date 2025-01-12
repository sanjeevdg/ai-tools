import './App.css';

import React, {useState,useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthPage from './components/AuthPage';
import BlogPage from './components/BlogPage';
import EditBlog from './components/EditBlog';
import BlogAdmin from './components/BlogAdmin';
import VerifyEmail from './components/VerifyEmail';
import LogoutPage from './components/LogoutPage';
import { useDispatch } from 'react-redux';
import {auth} from './utils/firebase';
import {onAuthStateChanged} from 'firebase/auth';


import {setUser} from './redux/userSlice';


const App = () => {

let dispatch = useDispatch();
const [auser, setAuser] = useState(false);


useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User

              const uid = user.uid;
              dispatch(setUser({'email':user.email,'uid':user.uid}));    
              setAuser(true);
            //   navigate('/blogs/admin'); 
              // ...
              console.log("uid", user);
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });

    }, []);


  return (
    <Router>  
               <Routes>
          <Route path="/signin" element={<AuthPage/>} />          
          <Route path="/" element={auser?<BlogAdmin/>: <AuthPage/>} />          
          <Route path="/logout" element={<LogoutPage/>} />          
          <Route path="/blogs/new" element={<BlogPage/>} />   
          <Route path="/blogs/edit" element={<EditBlog/>} />   
          <Route path="/blogs/admin" element={<BlogAdmin/>} />
          <Route path="/verify-email" element={<VerifyEmail/>} />          
                    
                </Routes>

    </Router> 
    
  );
}

export default App;
