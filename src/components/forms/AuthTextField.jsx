import * as React from 'react';
import "../../App.css";
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';


export default function AuthTextField(props) {
    const {label, placeholder, name, control, type="text"} = props
      return (
    
        <Controller
          name = {name}
          control = {control}
              render = {({
                  field:{onChange, value},
                  fieldState:{error},
                  formState,
    
              }) => (
                  <TextField 
                      onChange={onChange}
                      value={value}
                      id="standard-basic" 
                      label={label} 
                      variant="standard" 
                      placeholder = {placeholder}
                      error = {!!error}
                      helperText = {error?.message}
                      type={type}
                  />
              )
          } />
      );
}