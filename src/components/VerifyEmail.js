import './verifyEmail.css';
//import {useAuthValue} from '../util/AuthContext'
import {useState, useEffect} from 'react';
import {auth} from '../utils/firebase';
import {sendEmailVerification} from 'firebase/auth';
import {useNavigate,useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUser,logout} from '../redux/userSlice';


function VerifyEmail({props}) {

  const {currentUser}  = useParams();
 // console.log('mycurruser==',currentUser);
  const [time, setTime] = useState(60);
 // const {timeActive, setTimeActive} = useAuthValue()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        if(currentUser?.emailVerified){
          clearInterval(interval)
          dispatch(setUser(auth.currentUser));
          navigate('/')
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [navigate, currentUser])

  useEffect(() => {
    let interval = null
    //timeActive && 
    if(time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    }else if(time === 0){
   //   setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [time])

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // setTimeActive(true)
    }).catch((err) => {
      alert(err.message)
    })
  }

  return (
    <div className='center'>
      <div className='verifyEmail'>
        <h1>Verify your Email Address</h1>
        <p>
          <strong>A Verification email has been sent to:</strong><br/>
          <span>{currentUser?.email}</span>
        </p>
        <span>Follow the instruction in the email to verify your account</span>       
        <button 
          onClick={resendEmailVerification}
          disabled={time}
        >Resend Email {time}</button>
      </div>
    </div>
  )
}

export default VerifyEmail
