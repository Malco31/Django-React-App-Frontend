import {React, useEffect, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';

import MyTextField from './forms/MyTextField';
import MyGaugeChart from './forms/MyGuageChart';

import {useForm} from 'react-hook-form';
import AxiosInstance from './Axios';


const About = () => {

  const [incomeData, setIncomeData] = useState({
    monthly_income: 0,
    remaining_income: 0,
    total_payments_price: 0,
  })

  

  useEffect(() => {
    // IN PRODUCTION ADD "api/" TO GET
    AxiosInstance.get('monthly_income/')
      .then(response => {
        console.log(response)
        setIncomeData(response.data);
      })
      .catch(error => {
        console.error("Error fetching income data:", error);
      });
  }, []);

  const defaultValues = {
    monthly_income: incomeData.monthly_income
  };

  const {handleSubmit, control, setValue} = useForm({defaultValues:defaultValues})

  useEffect(() => {
    setValue("monthly_income", incomeData.monthly_income);
  }, [incomeData, setValue]);

    const monthlyIncomeId = 1;

    const submission = (data) => 
    {  
      // IN PRODUCTION ADD "api/" TO put
        AxiosInstance.put( `monthly_income/${monthlyIncomeId}/`,{
            income: data.monthly_income,
        }).then(response => {
            console.log(response);
            window.location.reload();
          })
          .catch(error => {
            console.error("Error:", error.response.data); // detailed error response
          })
    }

  return (
    <div>
        <form onSubmit={handleSubmit(submission)}>
            <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                <Typography sx={{marginLeft:'20px', color: '#ffff'}}>
                    Change Income
                </Typography>
            </Box>

            

            <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

                <Box sx={{display:'flex', height: 300,  justifyContent:'space-around',  margin:'10px'}}> 

                  <MyGaugeChart
                    value = {incomeData.total_payments_price}
                    valueMax = {incomeData.monthly_income}
                  />

                  <MyTextField
                      label="Estimated Monthly Income"
                      name="monthly_income"
                      control={control}
                      placeholder="$0.00"
                      width={'30%'}
                      defaultValue={incomeData.monthly_income}
                  />

                </Box>

                <Box sx={{display:'flex', justifyContent:'flex-start', margin:'10px'}}>
                  <Typography variant="h6">
                    Remaining Income: ${incomeData.remaining_income} 

                  </Typography>

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

export default About