import '../App.css';
import React, { useState } from "react";
import { Box, Button } from '@mui/material';
import AxiosInstance from './Axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthTextField from './forms/AuthTextField';


const Register = () =>{

    const navigate = useNavigate();
    const { handleSubmit, control } = useForm({
        defaultValues: {
          username: '',
          password: '',
        }
    });

    const [loading, setLoading] = useState(false);

    const submission = async (data) => {
        setLoading(true);
        try {
            // IN PRODUCTION ADD "api/" TO POST
            console.log("Sending to register:", data)
            await AxiosInstance.post(`register/`, {
                username: data.username,
                password: data.password,
            });
            // IN PRODUCTION ADD "api/" TO POST
            const response = await AxiosInstance.post(`token/`, {
                username: data.username,
                password: data.password
            });
            
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    
            navigate(`/login`);     
        } catch (error) {
            console.error("Registration or login failed:", error);
        } finally {
            setLoading(false);
        } 
    }
        


    return(
        <div className={"registerBackground"}>
            <Box className={"registerForm"}>
                <form onSubmit={handleSubmit(submission)}>
                    <Box className={"itemBox"}>
                        <Box className={"title"}>Register</Box>
                    </Box>

                    <Box className={"itemBox"}>
                        <AuthTextField 
                            fullWidth
                            label={"Username"}
                            name={"username"}
                            control={control}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <AuthTextField 
                            fullWidth
                            label="Password"
                            type="password"
                            name={"password"}
                            control={control}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <Button variant="contained" type="submit" color="primary" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </Box>

                  

                    <Box className={"itemBox"}>
                        <a href='/login'>Already have an account? Login Here</a>
                    </Box>
                </form>
                

            </Box>

        </div>
    )
}

export default Register