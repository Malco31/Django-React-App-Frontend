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

  // Fetch the data
  const fetchData = async () => {
    try {
      // IN PRODUCTION ADD "api/" TO GET
      const response = await AxiosInstance.get("project/", {
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
              {/* // IN PRODUCTION ADD "api/" TO edit */}
              <IconButton color="secondary" component = {Link} to={`edit/${row.original.id}`}>
              
                <EditIcon />
              </IconButton>
              {/* // IN PRODUCTION ADD "api/" TO delete */}
              <IconButton color="error" onClick={async () => {
                try {
                  await AxiosInstance.delete(`project/${row.original.id}/`, {
                    withCredentials: true,
                  });
                  fetchData();
                } catch (err) {
                  console.error("Error deleting project:", err)
                }
              }}>
              
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