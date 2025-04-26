import { React, useEffect } from 'react';
import {Box, Button, Typography} from '@mui/material';
import MyDatePickerField from './forms/MyDatePickerField';
import MyTextField from './forms/MyTextField';
import MyCheckboxField from './forms/MyCheckboxField';
import {useForm} from 'react-hook-form';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  
  const MyParam = useParams()
  const MyId = MyParam.id


  const GetData = () => {
    AxiosInstance.get(`project/${MyId}`).then((res) => {
      console.log(res.data)
      setValue('name',res.data.name)
      setValue('start_date',Dayjs(res.data.start_date))
      setValue('price',res.data.price)
      setValue('is_necessity',res.data.is_necessity)
   
    })
  }

  useEffect(() => {
    GetData();
  },[]) // GetData is only run on the initial render []
  
  const navigate = useNavigate()
  const defaultValues = {
    name: '',
    price: '',
    is_necessity: '',

  }

  const {handleSubmit, setValue, control} = useForm({defaultValues:defaultValues})
    const submission = (data) => 
    {  
        const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
        AxiosInstance.put( `project/${MyId}/`,{
            name: data.name,
            price: data.price,
            is_necessity: data.is_necessity,
            start_date: StartDate
        }).then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error("Error:", error.response.data); // Log detailed error response
          }).then(res => {
            navigate(`/`)
          });
    }

  return (
    <div>
        <form onSubmit={handleSubmit(submission)}>
            <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                <Typography sx={{marginLeft:'20px', color: '#ffff'}}>
                    Add Expenses
                </Typography>
            </Box>

            <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

                <Box sx={{display:'flex', justifyContent:'space-around',  margin:'10px'}}>
                    
                    <MyTextField
                        label="Name"
                        name="name"
                        control={control}
                        placeholder="Name an Expense"
                        width={'30%'}
                    />

                    <MyDatePickerField
                        label="Start date"
                        name="start_date"
                        control={control}
                        width={'30%'}
                    />

                    <MyTextField
                        label="Price"
                        name="price"
                        control={control}
                        placeholder="$0.00"
                        width={'30%'}
                    />

                </Box>

                <Box sx={{display:'flex', justifyContent:'flex-start', margin:'10px'}}>

                    <MyCheckboxField
                        label="Necessity?"
                        name="is_necessity"
                        control={control}
                        width={'30%'}
                    />

                    <Box>

                        <Button variant='contained' type="submit" sx={{width:'30%'}}>
                            Submit
                        </Button>

                    </Box>

                </Box>

            </Box>
        </form>
    </div>
  )
}

export default Edit