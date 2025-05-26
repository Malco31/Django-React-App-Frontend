import '../App.css';
import React, { useState } from "react";
import { Box, Button, Alert } from '@mui/material';
import AxiosInstance from './Axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthTextField from './forms/AuthTextField';

const Login = () => {

    const navigate = useNavigate();
    const { handleSubmit, control } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submission = async (data) => {
        setLoading(true);
        setError('');

        try {
            // fetch a fresh csrf token before login
            // await AxiosInstance.get("get-csrf-token/", { withCredentials: true });
            // console.log("Document Cookies:", document.cookie);
            // const csrfToken = getCookie("csrftoken");
            // console.log("CSRF Token:", csrfToken); 

            // if (!csrfToken) {
            //     console.error("No CSRF token found after fetch attempt");
            //     setError("Authentication error: No CSRF token available. Please refresh the page.");
            //     setLoading(false);
            //     return;
            // }

            const response = await AxiosInstance.post("token/", {
                username: data.username,
                password: data.password,
            });

            localStorage.setItem('access', response.data.success);
            localStorage.setItem('refresh', response.data.refresh);

            // console.log("Login Response:", response); 
            // AxiosInstance.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");
            // await AxiosInstance.get("get-csrf-token/", { withCredentials: true });
            // console.log("Document Cookies:", document.cookie);
            // const csrfToken = await fetchCSRFToken();
            // console.log('CSRF token after login:', csrfToken);
            
                // This will verify if our authentication is working
            const authCheck = await AxiosInstance.get("auth-check/", {withCredentials: true});
            console.log("Auth check successful:", authCheck.data);
            
            console.log("Document Cookies:", document.cookie);
                // If we got here, authentication is working properly
            navigate('/');
        } catch (error) {
            console.error("Login failed:", error);
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 400) {
                    setError("Invalid username or password");
                } else if (error.response.status === 403) {
                    setError("CSRF verification failed. Please refresh and try again.")
                } else {
                    setError(`Server error: ${error.response.data?.detail || "Unknown error"}`);
                }
            } else if (error.request) {
                setError("No response from server. Please check your connection");
            } else {
                setError("An error occurred during login.");
            }
        } finally {
            setLoading(false);
        }  
                
        AxiosInstance.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");
        await AxiosInstance.get("get-csrf-token/", { withCredentials: true });
        console.log("Document Cookies:", document.cookie);   
    };

    return(
        <div className={"loginBackground"}>
            <Box className={"loginForm"} component={"form"} onSubmit={handleSubmit(submission)}>

                <Box className={"itemBox"}>
                    <Box className={"title"}>Login</Box>
                </Box>

                {/* Experimental */}
                {error && (
                    <Box className={"itemBox"}>
                        <Alert severity="error" sx={{ width: '80%' }}>{error}</Alert>
                    </Box>
                )}
                {/* ------------ */}

                <Box className={"itemBox"}>
                    <AuthTextField
                        label="Name"
                        name="username"
                        control={control}
                        placeholder="Enter your email"
                        width={'80%'}
                        type="text"
                    />
                </Box>

                <Box className={"itemBox"}>
                <AuthTextField
                        label="Password"
                        name="password"
                        control={control}
                        placeholder="Enter your password"
                        width={'80%'}
                        type="password"
                    />
                </Box>

                <Box className={"itemBox"}>
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </Box>

                <Box className={"itemBox"}>
                    <a href='/register'>Don't have an account? Register Here</a>
                </Box>

            </Box>

        </div>
    )
}

export default Login