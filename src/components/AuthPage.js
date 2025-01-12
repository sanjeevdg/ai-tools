import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { login } from '../store/actions/authActions'; // Import your action
// ... Material UI imports ...

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
//import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack' ;
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton' ;
import InputAdornment from '@mui/material/InputAdornment' ;
import InputLabel from '@mui/material/InputLabel';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoginIcon from '@mui/icons-material/Login';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import GoogleIcon from '@mui/icons-material/Google';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import {signInWithEmailAndPassword, sendEmailVerification, getAuth, signInWithPopup, GoogleAuthProvider,FacebookAuthProvider} from 'firebase/auth';
import {auth, googleProvider, facebookProvider} from '../utils/firebase';
import {setUser,logout} from '../redux/userSlice';
import cover from '../assets/images/rm222-mind-20.jpg';
import {useNavigate} from 'react-router-dom';

import {createUserWithEmailAndPassword } from 'firebase/auth'


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import {sendPasswordResetEmail} from 'firebase/auth'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const AuthPage = () => { 
  
  const dispatch = useDispatch();
const navigate = useNavigate();

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [firstname, setFirstname] = useState('');
const [lastname, setLastname] = useState('');
const [passwd, setPasswd] = useState('');
const [remember, setRemember] = useState(false);

const [recoveremail,setRecoverEmail] = useState('');

const [open,setOpen] = useState(false);

const [showLoginForm,setShowLoginForm]  = useState(true);
const [showSignUpForm,setShowSignupForm] = useState(false);
 

const [signupEmail,setSignupEmail] = useState('');
const [signupPassword,setSignupPassword] = useState('');

const [emailError,setEmailError] = useState(false);
const [emailErrorMessage,setEmailErrorMessage] = useState('');

const [passwordError,setPasswordError] = useState(false);
const [passwordErrorMessage,setPasswordErrorMessage] = useState('');

const [signupEmailError,setSignupEmailError] = useState(false);
const [signupEmailErrorMessage,setSignupEmailErrorMessage] = useState('');

const [signupPasswordError,setSignupPasswordError] = useState(false);
const [signupPasswordErrorMessage,setSignupPasswordErrorMessage] = useState('');

const [showPassword,setShowPassword] = useState(false);
const [showSignupPassword,setShowSignupPassword] = useState(false);



const  user  = useSelector((state) => state.user);
console.log('user in authpage==',user);
/*
useEffect(() => {


if (user) navigate('/blogs');


}, [user]);

*/

  const handleSubmit = () => {

console.log('handilng...'+email +"pass"+password);

    //e.preventDefault();
    validateInputs();

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
         // setTimeActive(true)
      
          navigate('/verify-email');
        })
      .catch(err => alert(err.message))
    } else{
          dispatch(setUser({ 'email':auth.currentUser.email,'uid':auth.currentUser.uid}));
          navigate('/blogs/admin');
    }

    })
    .catch(err => console.log('caught err',err.message))



  //  dispatch(login(username, password));
  };


const handleSignupSubmit = () => {


validateSignupInputs();
console.log('register--'+signupEmail+ '--pass--' +signupPassword);
  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then(() => {
          sendEmailVerification(auth.currentUser)   
          .then(() => {
        //    setTimeActive(true)
            console.log('authcurruser==',auth.currentUser);
            navigate('/verify-email',{'currentUser':auth.currentUser})
          }).catch((err) => alert(err.message))
        })
        .catch(err => console.log('cauterr-->',err.message))
    
    setSignupEmail('')
    setSignupPassword('')


};



const openForgPassDlg = () => {


setOpen(true);


}

 const triggerResetEmail = async () => {
await sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log('reset password success');
        // .. 
        })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
}

const handleClose = () => {


setOpen(false);

}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;
//console.log(email.value);

    if (!email.value || !validateEmail(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      //setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const validateSignupInputs = () => {
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');

    let isValid = true;
console.log(signupEmail.value);

    if (!signupEmail.value || !validateEmail(signupEmail.value)) {
      setSignupEmailError(true);
      setSignupEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setSignupEmailError(false);
      //setEmailErrorMessage('');
    }

    if (!signupPassword.value || signupPassword.value.length < 6) {
      setSignupPasswordError(true);
      setSignupPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setSignupPasswordError(false);
      setSignupPasswordErrorMessage('');
    }

    return isValid;
  };


//style={{display:'flex',flex:1, alignItems:'center',justifyContent:'center',alignSelf:'center'}} 
return (

 <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" >


        <Box sx={{display:'flex',flexDirection:'column',alignSelf:'center',alignItems:'center',
        justifyContent:'center', height: '100vh',backgroundImage: `url(${cover})`,
         backgroundRepeat: "no-repeat", backgroundSize: "cover" }} >

{ showLoginForm &&
<>
<Card sx={{height:'55vh',width:'60vh',marginTop:15,background:'transparent'}} >
     <CardContent>
<Typography sx={{textAlign:'center',fontSize:30,marginTop:-2,marginBottom:3, fontFamily:'UrbanistSemiBold'}}  >Sign In</Typography>

<Stack sx={{display:'flex',alignSelf:'center',marginTop:2,width:300,height:120}} >
     <FormControl>
        
<TextField type="email" size="medium" value={email} helperText={emailErrorMessage} error={emailError} 
    color={emailError ? 'error' : 'primary'} sx={{marginTop:0}} id="email" placeholder="your@email.com" 
    label="Email" variant="standard"  InputLabelProps={{ sx: { fontSize:14,fontFamily:'UrbanistRegular'} }} 
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }} />
<TextField sx={{marginTop:2}} value={password} size="medium" helperText={passwordErrorMessage} error={passwordErrorMessage} color={passwordError ? 'error' : 'primary'} slotProps={{
              input: {
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="description for action"
                      onClick={() => {setShowPassword(!showPassword)}}
                    >
                     {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> } 
                    </IconButton>
                  </InputAdornment>
              },
            }} type={showPassword ? 'text' : 'password'} InputLabelProps={{ sx: { fontSize:14,fontFamily:'UrbanistRegular'} }}
            id="password" label="Password" variant="standard"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }} />

</FormControl>



<Button onClick={()=>handleSubmit()} sx={{marginTop:5,width:'40%',alignSelf:'center'}} variant="contained" endIcon={<LoginIcon />}>
  Login
</Button>
</Stack>

</CardContent>
</Card>

<Box sx={{ display: 'flex', flexDirection:'row',marginTop:2,justifyContent: 'center',alignSelf: 'center',marginBottom:2 }}>
                <Link
                  component="button"
                  type="button"
                  onClick={openForgPassDlg}
                  variant="body2"
                  sx={{ alignSelf: 'flex-start',fontFamily:'UrbanistRegular',marginRight:7 }}
                >
                  Forgot password?
                </Link>

<Typography sx={{ textAlign: 'center',fontSize:13,fontFamily:'UrbanistRegular' }}>
              Don&apos;t have an account?{' '}
              <span>
              <Link
                  onClick={() => {setShowLoginForm(false);setShowSignupForm(true); }}  variant="body2" sx={{ alignSelf: 'flex-end',fontFamily:'UrbanistRegular' }}> Sign up
                     </Link>
              </span>
            </Typography>
 


              </Box>


<Divider sx={{color:'white',fontFamily:'UrbanistRegular'}} />
  <Typography sx={{ textAlign: 'center',fontSize:15,fontFamily:'UrbanistRegular' }}>
    or </Typography>

<Button  sx={{textTransform:'unset !important',fontFamily:'UrbanistSemiBold',fontSize:16,color:'black',backgroundColor:'white',marginTop:3,width:'40%',alignSelf:'center'}} variant="contained">
<img style={{width:24,height:24}} src="https://static.cdnlogo.com/logos/g/23/goolge-icon.png"/> &nbsp;   Login using Google
</Button>


</>

}

{showSignUpForm && 

<>
<Card sx={{height:'55vh',width:'60vh',marginTop:15,background:'transparent'}} >
     <CardContent>
<Typography sx={{textAlign:'center',fontSize:30,marginTop:-2,marginBottom:3, fontFamily:'UrbanistSemiBold'}}  >Sign Up</Typography>

<Stack sx={{display:'flex',alignSelf:'center',marginTop:2,width:300,height:120}} >
     <FormControl>
        
<TextField type="email" value={signupEmail} helperText={signupEmailErrorMessage} error={signupEmailError} 
    color={signupEmailError ? 'error' : 'primary'} sx={{marginTop:0}} id="signupEmail" placeholder="your@email.com" 
    label="Email" variant="standard"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupEmail(event.target.value);
  }} />
<TextField sx={{marginTop:2}} value={signupPassword} helperText={signupPasswordErrorMessage} error={signupPasswordError} color={signupPasswordError ? 'error' : 'primary'} slotProps={{
              input: {
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="description for action"
                      onClick={() => {setShowSignupPassword(!showSignupPassword)}}
                    >
                     {showSignupPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> } 
                    </IconButton>
                  </InputAdornment>
              },
            }} type={showSignupPassword ? 'text' : 'password'} id="signupPassword" label="Password" variant="standard"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupPassword(event.target.value);
  }} />

</FormControl>



<Button onClick={()=>handleSignupSubmit()} sx={{textTransform:'unset !important',marginTop:5,width:'40%',borderRadius:20,alignSelf:'center'}} variant="contained" endIcon={<AppRegistrationIcon />}>
  Signup
</Button>
</Stack>

</CardContent>
</Card>

<Box sx={{ display: 'flex', flexDirection:'row',marginTop:2,justifyContent: 'center',alignSelf: 'center',marginBottom:2 }}>
                
<Typography sx={{ textAlign: 'center',fontSize:13,fontFamily:'UrbanistRegular' }}>
              Already have an account?{' '}
              <span>
              <Link
                  onClick={() => {setShowSignupForm(false);setShowLoginForm(true); }}  variant="body2" sx={{ alignSelf: 'flex-end',fontFamily:'UrbanistRegular' }}> Sign in
                     </Link>
              </span>
            </Typography>
 


              </Box>
</>

    }



              


        



 

        </Box>


<Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          handleClose();
        },
        sx: { backgroundImage: 'none' },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a link to
          reset your password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="recoveremail"
          value={recoveremail}
           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setRecoverEmail(event.target.value);
  }}
          name="recoveremail"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={triggerResetEmail} type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>


      </Container>
    </React.Fragment>
                    );
}
/*  startIcon={<GoogleIcon />} */
export default AuthPage;    