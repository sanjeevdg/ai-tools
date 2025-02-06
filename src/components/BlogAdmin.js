import React, {useEffect, useState,useRef } from 'react';
import { useDispatch ,useSelector} from 'react-redux';

import {useNavigate,useLocation} from 'react-router-dom';



import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import MyAppBar from './MyAppBar';

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Fade from "@mui/material/Fade";
import CheckIcon from '@mui/icons-material/Check';

import {BASE_URL}  from '../config/config';

const BlogAdmin = ({route, navigation}) => {

const navigate = useNavigate();

const location  = useLocation();

const toggleAlertVisibility = location?.alertVisibility;


const  user  = useSelector((state) => state.user);

console.log('redux user ===',user);

const [blogs, setBlogs] = useState([]);

const [alertVisibility,setAlertVisibility] = useState(toggleAlertVisibility);

useEffect(() => {

async function fetchBlogs() {

const url = BASE_URL + `fetchBlogs` ;
let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',                 
            },
            body:JSON.stringify({})
          }

        try { 
            const response = await fetch(url,options);
            const result = await response.json();
         //   const responseObject = JSON.parse(result);
            console.log('ret blogs==>',result.blogs);

          //  result.blogs.map(obj => {

           //   obj.bImage = "<img src='" + obj.bImage + "' style={{width:'15%'}} />";

          //  })

    //<img src='http:localhost:5000/uploads/1735485574093-kraken-acct-5000.png' style={{width:'15%'}}        
            
            setBlogs(result.blogs);


         //   setMovieItems(result.Search);
        } catch (error) {
            console.log(error);
            alert("Please Try Again! Some Error Occurred at your side");
        }
} 



fetchBlogs();




}, []);


/*
 <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        This success Alert has a custom icon.
      </Alert>
      <Alert icon={false} severity="success">
        This success Alert has no icon.
      </Alert>
*/


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'btitle',
    headerName: 'Title',
    width: 300,
    editable: true,
  },
  {
    field: 'bByline',
    headerName: 'Byline',
    width: 150,
    editable: true,
  },
  {
    field: 'bImage',
    headerName: 'Image',
    type: 'image',
    width: 110,
    height:110,
    renderCell: (params) => {
        console.log('xxxx',params);
        return (
           <Avatar sx={{borderRadius:0,justifyContent:'center',alignSelf:'center'}} src={BASE_URL + 'uploads/'+params.value} />            
        );
      },
    editable: false,
  },
  {
    field: "action",
    headerName: "Edit",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking
        console.log('myparams-dg',params);
        const api: GridApi = params.api;
        const thisRow: Record<string, GridCellValue> = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.row)
              //getValue(params.id, c.field))
          );

        return navigate('/blogs/edit/',{state:{'myblog':params.row} });
        //alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Edit</Button>;
    }
  },
  
];

/*{
'btitle':bTitle,
'bByline':bByline,
'bSummary': bSummary,
'btext':bText,
'bCategory':bCategory,
'bImage':bImage,
'bYoutubeLink':bYoutubeLink,
'bMp4Link':bMp4Link,
'bLink':bLink,
'bLinkText':bLinkText
<AppBar/>
} */


return (

<>
<MyAppBar/>
<Typography sx={{textAlign:'left',fontSize:30,marginLeft:40,marginTop:-2,marginBottom:3, fontFamily:'UrbanistSemiBold'}}  >

Blog Admin

  </Typography>

<Fade
       in={alertVisibility} //Write the needed condition here to make it appear
       timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
       addEndListener={() => {
         setTimeout(() => {
           setAlertVisibility(false)
         }, 5000);
       }}
       >
        <Alert sx={{alignSelf:'flex-end',marginLeft:35,width:'50%'}} icon={<CheckIcon fontSize="inherit" />} severity="success">
        Blog record added to database.
      </Alert>      
    </Fade>

 <Box sx={{ height: 400, marginLeft:35, width: '70%' }}>
      <DataGrid
        rows={blogs}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
</>



	);


} 

export default BlogAdmin;