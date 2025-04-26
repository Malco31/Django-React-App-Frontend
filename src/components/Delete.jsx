import { React, useEffect, useState } from 'react';
import {Box, Button, Typography} from '@mui/material';

import AxiosInstance from './Axios';

import { useNavigate, useParams } from 'react-router-dom';

const Delete = () => {
  
  const MyParam = useParams()
  const MyId = MyParam.id

  const [myData, setMydata] = useState()
  const [loading,setLoading] = useState(true)


  const GetData = () => {
    AxiosInstance.get(`project/${MyId}`).then((res) => {
      setMydata(res.data)
      console.log(res.data)
      setLoading(false)
      
    })
  }

  useEffect(() => {
    GetData();
  },[]) // GetData is only run on the initial render []

  const navigate = useNavigate()

  const submission = (data) => 
  {   
    AxiosInstance.delete( `project/${MyId}/`)
    .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error("Error:", error.response.data); // detailed error response
      }).then(res => {
        navigate(`/`)
      });
  }

  return (
    <div>

      { loading ? <p>Loading data...</p> : 

      <div>

        <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
          <Typography sx={{marginLeft:'20px', color: '#ffff'}}>
              Delete expense: {myData.name}
          </Typography>
        </Box>

        <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

            <Box sx={{display:'flex', justifyContent:'space-around',  margin:'10px'}}>
                Are you sure that you want to delete expense: {myData.name}
            </Box>

            <Box>

              <Button variant='contained' onClick={submission} sx={{width:'30%'}}>
                  Delete the expense
              </Button>

            </Box>

        </Box>

      </div> }
      
        
    </div>
  )
}

export default Delete