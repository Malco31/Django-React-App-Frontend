import {React, useEffect, useMemo, useState} from 'react'
import AxiosInstance from './Axios';
import { MaterialReactTable } from 'material-react-table';
import { Checkbox } from '@mui/material';
import Dayjs from 'dayjs';
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Home = () => {

  const [myData, setMydata] = useState([])
  const [loading, setLoading] = useState(true)

  // Function to fetch CSRF token and then data
  const fetchData = async () => {
    try {
      // Ensure we get the CSRF token first
      // await AxiosInstance.get("get-csrf-token/");

      // Now, fetch the data
      const response = await AxiosInstance.get("api/project/", {
        withCredentials: true,
      });
      setMydata(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Run once when the component is mounted
  }, []); // Empty dependency array ensures this runs once
  
  
  
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