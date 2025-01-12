import React, { useState,useRef } from 'react';

import { useDispatch ,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {setUser} from '../redux/userSlice';











const LogoutPage = () => { 

	let dispatch = useDispatch();
	let navigate = useNavigate(); 
	const  user  = useSelector((state) => state.user);

	dispatch(setUser({}));

	navigate('/');

}

export default LogoutPage;