import React, { useState,useRef } from 'react';
//import { useDispatch } from 'react-redux';
//import { login } from '../store/actions/authActions'; // Import your action
// ... Material UI imports ...




import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
//import Box from '@mui/material/Box';

import MyAppBar from './MyAppBar';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack' ;
import Button from '@mui/material/Button';
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
//import AppBar from '@mui/material/AppBar';



import Typography from '@mui/material/Typography';

//import {signInWithEmailAndPassword, sendEmailVerification, getAuth, signInWithPopup, GoogleAuthProvider,FacebookAuthProvider} from 'firebase/auth';
//import {auth, googleProvider, facebookProvider} from '../utils/firebase';
//import cover from '../assets/images/rm222-mind-20.jpg';
import {useNavigate} from 'react-router-dom';

//import {createUserWithEmailAndPassword } from 'firebase/auth'

import { Editor } from "@tinymce/tinymce-react";

import OutlinedInput from '@mui/material/OutlinedInput';
//import {sendPasswordResetEmail} from 'firebase/auth'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';




import {
    CollectionsBookmark,
    Edit,
    Feedback,
    Help,
    PermMedia,
    UploadFile,
    Work,
} from "@mui/icons-material";

import {BASE_URL} from '../config/config';

const BlogPage = () => { 
  
 //  const dispatch = useDispatch();
  
const navigate = useNavigate();

const editorRef = useRef(null);


const [bImage, setBImage] = useState('');

const [bTitle, setBTitle] = useState('');

const [bText,setBText] = useState('');
 
const [bCategory, setBCategory] = useState('');
const [bYoutubeLink, setBYoutubeLink] = useState('');
 
const [bMp4Link, setBMp4Link] = useState('');

const [bTitleErrorMessage, setBTitleErrorMessage] = useState('');
const [bTitleError, setBTitleError] = useState(false);

const [bTextErrorMessage, setBTextErrorMessage] = useState('');
const [bTextError, setBTextError] = useState(false);


const [bImageErrorMessage, setBImageErrorMessage] = useState('');
const [bImageError, setBImageError] = useState(false);

const [bCategoryErrorMessage, setBCategoryErrorMessage] = useState('');
const [bCategoryError, setBCategoryError] = useState(false);

const [bYoutubeLinkErrorMessage, setBYoutubeLinkErrorMessage] = useState('');
const [bYoutubeLinkError, setBYoutubeLinkError] = useState(false);

const [bMp4LinkErrorMessage, setBMp4LinkErrorMessage ] = useState('');
const [bMp4LinkError, setBMp4LinkError ] = useState(false);


const [bByline, setBByline] = useState('');
const [bBylineError,setBBylineError] = useState(false);
const [bBylineErrorMessage,setBBylineErrorMessage] = useState('');

const [bSummary,setBSummary] = useState('');
const [bSummaryError,setBSummaryError ] = useState(false);
const [bSummaryErrorMessage,setBSummaryErrorMessage ] = useState('');

const [bLink,setBLink] = useState('');
const [bLinkError, setBLinkError] = useState(false);
const [bLinkErrorMessage,setBLinkErrorMessage ] = useState('')

const [bLinkText, setBLinkText] = useState('')
const [bLinkTextError,setBLinkTextError ] = useState(false);
const [bLinkTextErrorMessage, setBLinkTextErrorMessage] = useState('');

const [open,setOpen] = useState(false);


const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', image.data);
    const response = await fetch(BASE_URL + 'image', {
      method: 'POST',
      body: formData,
    });

let res = await response.json();

console.log('restr-res>>',res);
setBImage(res.fileName);
    if (res.success) { 
      setStatus('OK');
    //  console.log('resp>>',response);
      }
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }



/*
const toggleDrawer = () => (event) =>  {
         if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
 
        setLeft(!left);
    };
 */

//<ListItemIcon sx={{alignItems:'center',alignSelf:'center'}} >
  //</ListItemIcon>
  
 const validateInputs = () => {
    const bTitle = document.getElementById('bTitle');
    const bText = document.getElementById('bText');
    const bImage = document.getElementById('bImage');

    const bByline = document.getElementById('bByline');
    const bSummary = document.getElementById('bSummary');

    const bCategory = document.getElementById('bCategory');
    const bYoutubeLink = document.getElementById('bYoutubeLink');
    const bMp4Link = document.getElementById('bMp4Link');


   let isValid = true;
//console.log(email.value);

    if (!bTitle.value) {
      setBTitleError(true);
      setBTitleErrorMessage('Please enter a valid title.');
      isValid = false;
    } else {
      setBTitleError(false);
      //setEmailErrorMessage('');
    }

    if (!bCategory.value) {
      setBCategoryError(true);
      setBCategoryErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setBCategoryError(false);
      setBCategoryErrorMessage('');
    }
    
 /*   if (!bText.value) {
      setBTextError(true);
      setBTextErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
    }
*/
      setBTextError(false);
      setBTextErrorMessage('');
  

    if (!bByline.value) {
      setBBylineError(true);
      setBBylineErrorMessage('Byline must not be blank.');
      isValid = false;
    } else {
      setBBylineError(false);
      setBBylineErrorMessage('');
    }

    if (!bSummary.value) {
      setBSummaryError(true);
      setBSummaryErrorMessage('Summary must not be blank.');
      isValid = false;
    } else {
      setBSummaryError(false);
      setBSummaryErrorMessage('');
    }

      setBYoutubeLinkError(false);
      setBYoutubeLinkErrorMessage('');
      setBMp4LinkError(false);
      setBMp4LinkErrorMessage('');




    return isValid;
  };


async function sendAddBlogRequest() {

console.log('validinputs?',validateInputs());

if (validateInputs()) {

// send request here to backend - 
  let body = {'btitle':bTitle,'bByline':bByline, 'bSummary': bSummary,'btext':bText,'bCategory':bCategory,'bImage':bImage,'bYoutubeLink':bYoutubeLink,'bMp4Link':bMp4Link,'bLink':bLink,'bLinkText':bLinkText};
const url = BASE_URL + `createBlogPost` ;
let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',                 
            },
            body:JSON.stringify(body)
          }

        try { 
            const response = await fetch(url,options);
            const result = await response.json();
         //   const responseObject = JSON.parse(result);
            console.log('insert res==>',result);
            navigate('/blogs/admin',{'alertVisibility':true});
         //   setMovieItems(result.Search);
        } catch (error) {
            console.log(error);
            alert("Please Try Again! Some Error Occurred at your side");
        }
}


}



const openForgPassDlg = () => {


setOpen(true);


}
 const handleChange = (event) => {
   // setAuth(event.target.checked);
  };

 



//style={{display:'flex',flex:1, alignItems:'center',justifyContent:'center',alignSelf:'center'}} 
//,backgroundImage: `url(${cover})`

/*
<Card sx={{height:'100vh',width:'100vh',marginTop:15,background:'transparent'}} >
     <CardContent>



</CardContent>
</Card>


</Stack>
//console.log('content==',content);

advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks

 fullscreen wordcount


 ModalProps={{
                                keepMounted: true,
                            }}
                            sx={{
                                display: { xs: "block", sm: "none" },
                                "& .MuiDrawer-paper": {
                                    boxSizing: "border-box",
                                    width: drawWidth,
                                },
                            }}


<FormControl style={{marginLeft:20,marginRight:20,width:'91%'}} >
   
<TextField type="text" value={bImage} helperText={bImageError} error={bImageErrorMessage} 
    sx={{marginTop:0}} color={bImageError ? 'error' : 'primary'}  id="bImage" placeholder="Enter category keywords" 
    label="Link to blog image" variant="outlined"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setBImage(event.target.value);
  }} />
</FormControl>



     */

//{ sm: `calc(100% - ${drawWidth}px)` }


return (


<>
 <React.Fragment>
     
<Container maxWidth="lg" >
      <CssBaseline />
 
<MyAppBar/>
 
<CssBaseline />

        <Box component="main" sx={{display:'flex',flexGrow:1,flexDirection:'column',alignSelf:'flex-start',alignItems:'flex-start',borderRadius:8,
        justifyContent:'flex-start',mt:-6,ml:20,width:open?'90%':'95%', height: '100%',marginBottom:5,backgroundColor:'#fff9e3' }} >


<Stack sx={{display:'flex',alignSelf:'flex-start',marginTop:2,marginBottom:15,width:'100%',height:'100vh'}} >



<Typography sx={{textAlign:'left',marginLeft:5,fontSize:30,marginTop:3,marginBottom:3, fontFamily:'UrbanistSemiBold'}}  >

Create new Blog post

  </Typography>


     <FormControl style={{marginLeft:20,marginRight:20,marginBottom:20,width:'91%'}} >
   
<TextField type="text" multiline  required maxRows={4} value={bTitle} helperText={bTitleErrorMessage} error={bTitleError} 
    color={bTitleError ? 'error' : 'primary'} sx={{marginTop:0}} id="bTitle" placeholder="multiline blog title" 
    label="Blog title" variant="outlined"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setBTitle(event.target.value);
  }} />
</FormControl>

     <FormControl style={{marginLeft:20,marginRight:20,marginBottom:20,width:'91%'}} >
<TextField type="text" multiline  required maxRows={4} value={bByline} helperText={bBylineErrorMessage} error={bBylineError} 
    color={bBylineError ? 'error' : 'primary'} sx={{marginTop:0}} id="bByline" placeholder="Author or source name" 
    label="Byline - author or source name" variant="outlined"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setBByline(event.target.value);
  }} />
</FormControl>

<FormControl style={{marginLeft:20,marginRight:20,marginBottom:20,width:'91%'}} >
   
<TextField type="text" value={bCategory} helperText={bCategoryErrorMessage} error={bCategoryError} 
    sx={{marginTop:0}} color={bCategoryError ? 'error' : 'primary'}  id="bCategory" placeholder="Enter category keywords" 
    label="Blog category" variant="outlined"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setBCategory(event.target.value);
  }} />
</FormControl>

<FormControl style={{marginLeft:20,marginRight:20,marginBottom:20,width:'91%'}} >
<TextField type="text" multiline  required maxRows={4} value={bSummary} helperText={bSummaryErrorMessage} error={bSummaryError} 
    color={bSummaryError ? 'error' : 'primary'} sx={{marginTop:0}} id="bSummary" placeholder="Enter a short summary" 
    label="Summary" variant="outlined"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setBSummary(event.target.value);
  }} />
</FormControl>



  <div style={{marginLeft:20,}} >
      <h6>Choose an image to upload</h6>
      {image.preview && <img src={image.preview} width='100' height='100' />}
      
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>


<Box sx={{ display: 'flex',flexDirection:'row',height:'80vh',width:'90%', marginTop:2,justifyContent: 'flex-start',alignSelf: 'flex-start',marginBottom:2 }}>
     <FormControl style={{marginLeft:20,marginRight:20}} >

 <FormLabel>Text</FormLabel>     
 <Editor
        apiKey="il7k6sv7l5v5yya34lxjx9joug5twp1xbc0lsnq0uvf8p0g4"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={bText}
        id="bText"
        init={{
          height: '100%',
          width: 1000,
          menubar: true,
          plugins: "image code",
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat |image| help",
          image_list: [
       { title: 'My image 1', value: 'https://sanjeevdg.github.io/france.png' }       
  ]  
        }}
        onEditorChange={(content) => {setBText(content);} }
      />
</FormControl>
</Box>


<FormControl style={{marginLeft:20,marginRight:20,marginBottom:20,width:'91%'}} >
   
<TextField type="text" value={bYoutubeLink} helperText={bYoutubeLinkErrorMessage} error={bYoutubeLinkError} 
    sx={{marginTop:0}} color={bYoutubeLinkError ? 'error' : 'primary'}  id="bYoutubeLink" placeholder="Paste link to youtube video" 
    label="Youtube link" variant="outlined"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setBYoutubeLink(event.target.value);
  }} />
</FormControl>

<FormControl style={{marginLeft:20,marginRight:20,marginBottom:20,width:'91%'}} >
   
<TextField type="text" value={bMp4Link} helperText={bMp4LinkErrorMessage} error={bMp4LinkError} 
    sx={{marginTop:0}} color={bMp4LinkError ? 'error' : 'primary'}  id="bMp4Link" placeholder="Paste link to youtube video" 
    label="Mp4 link" variant="outlined"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setBMp4Link(event.target.value);
  }} />
</FormControl>

<FormControl style={{marginLeft:20,marginRight:20,marginBottom:20,width:'91%'}} >
   
<TextField type="text" value={bLink} helperText={bLinkErrorMessage} error={bLinkError} 
    sx={{marginTop:0}} color={bLinkError ? 'error' : 'primary'}  id="bLink" placeholder="Enter url" 
    label="Any link" variant="outlined"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setBLink(event.target.value);
  }} />
</FormControl>

<FormControl style={{marginLeft:20,marginRight:20,width:'91%'}} >
   
<TextField type="text" value={bLinkText} helperText={bLinkTextErrorMessage} error={bLinkTextError} 
    sx={{marginTop:0}} color={bLinkTextError ? 'error' : 'primary'}  id="bLinkText" placeholder="Enter link text" 
    label="Any link text" variant="outlined"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setBLinkText(event.target.value);
  }} />
</FormControl>





</Stack>





<Button onClick={()=> { sendAddBlogRequest();console.log('dsfsdfs')}} sx={{marginRight:20,marginBottom:5,height:60,textTransform:'unset !important',marginTop:53,width:'20%',borderRadius:20,alignSelf:'flex-end'}} variant="contained" endIcon={<AppRegistrationIcon />}>
  Create blog post
</Button>





            
        </Box>



      </Container>
    </React.Fragment>


</>

                    );
}
/*  startIcon={<GoogleIcon />} */
export default BlogPage;    