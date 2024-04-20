import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useOrdersList } from '../../../hooks/order';
import dayjs from 'dayjs';

const Orders = () => {
  const navigate = useNavigate();

  const handleBackClick = (event) => {
    navigate(-1);
  };

  const currentDate = dayjs().format('YYYY-MM-DD');

  const paymentMethod = {
    0: 'Gryni',
    1: 'Kortele',
  };

  const orderStatus = {
    0: 'Sukurta',
    1: 'Atšaukta',
    2: 'Ivykdyta',
  };

  const columns = [
    { field: 'id',
      headerName: 'ID',
      width: 40 
    },
    {
      field: 'orderNumber',
      headerName: 'Usakymo nr.',
      width: 150,
    },
    {
      field: 'customerFirstName',
      headerName: 'Kliento vardas',
      width: 150,
    },
    {
      field: 'customerLastName',
      headerName: 'Kliento pavardė',
      width: 150,
    },
    {
      field: 'customerOrderDate',
      headerName: 'Užsakymo data',
      width: 150,
      renderCell: (params) => {
        return (
          <>{params.value.slice(0, 10)}</>
        );
      }
    },
    {
      field: 'paymentType',
      headerName: 'Apmokėjimo būdas',
      width: 150,
      renderCell: (params) => {
        return (
          <>{paymentMethod[params.value]}</>
        );
      }
    },
    {
      field: 'orderStatus',
      headerName: 'Būsena',
      width: 140,
      renderCell: (params) => {

        const date = params.row.dateTo?.slice(0, 10);

        return (
          <>
            {params.value === 1 ? (
              <>{orderStatus[1]}</>
            ) : (
              <>
                {currentDate > date ? (
                  <>{orderStatus[2]}</>
                ) : (
                  <>{orderStatus[0]}</>
                )}
              </>
            )}
          </>
        );
      },
    },
  ];

  const [gridRows, setGridRows] = useState([]);

  
  const { data, isLoading, isFetching} = useOrdersList();
  useEffect(() => {
    setGridRows(data || []);
    console.log(data);
  }, [data]);

  return (
    <>
      <h1>Užsakymų sąrašas</h1>
      <Button variant="contained" onClick={handleBackClick}>Atgal</Button>

      <div style={{marginTop: 20}}>
        <Grid style={{margin: '0 auto', width: 1000}}>
          <DataGrid
            autoHeight
            rows={gridRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Grid>
      </div>
    </>
  );
};

export default Orders;