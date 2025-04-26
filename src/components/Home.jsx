import {React, useEffect, useMemo, useState} from 'react'
import AxiosInstance from './Axios'
import { MaterialReactTable } from 'material-react-table';
import { Checkbox } from '@mui/material';
import Dayjs from 'dayjs';
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Home = () => {

  const [myData, setMydata] = useState()
  const [loading, setLoading] = useState(true)

  const GetData = () => {
    AxiosInstance.get(`project/`).then((res) => {
      setMydata(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    GetData();
  },[]) // GetData is only run on the initial render []
  
  
  
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 150,
        Cell: ({ cell }) => {
          const value = Number(cell.getValue()); // convert to number
          return isNaN(value) ? 'Invalid Price' : `$${value.toFixed(2)}`;
        },
      },
      {
        accessorKey: 'is_necessity', //normal accessorKey
        header: 'Necessity',
        size: 200,
        Cell: ({ row }) => (
          <Checkbox checked={row.original.is_necessity}/>
        )
      },
      {
        accessorFn: (row) => Dayjs(row.start_date).format('DD-MM-YYYY'),
        header: 'Start Date',
        size: 150,
      },
      
    ],
    [],
  );
  

  return (
    <div>
      { loading ? <p>Loading data...</p> :        //if loading is true return loading data..., if else return the table
        <MaterialReactTable 
          columns={columns} 
          data={myData} 

          enableRowActions
          renderRowActions={({row}) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px'}}>

              <IconButton color="secondary" component = {Link} to={`edit/${row.original.id}`}>
                <EditIcon />
              </IconButton>

              <IconButton color="error" component = {Link} to={`delete/${row.original.id}`}>
                <DeleteIcon />
              </IconButton>
            </Box>

          )}


        />
      }
    </div>
  )
}

export default Home