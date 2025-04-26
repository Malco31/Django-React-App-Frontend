import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import {Controller} from 'react-hook-form';
import { FormControlLabel } from '@mui/material';




export default function MyCheckboxField(props) {
  const {width, control, name} = props

  return (
    <Controller
        name = {name}
        control = {control}
            render = {({
                field:{onChange, value},
   

            }) => (
                <FormControlLabel
                
                    control={<Checkbox onChange={onChange} checked={!!value} />}
                   
                    sx={{width:{width}}}

                />
                
            )
        } />

  );
}