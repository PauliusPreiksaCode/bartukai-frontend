import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { OrderViewModal } from './components/OrderViewModal';
import dayjs from 'dayjs';
import { useMyOrdersList } from '../../../hooks/order';

const Orders = () => {
  const navigate = useNavigate();

  const handleBackClick = (event) => {
    navigate('/');
  };

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
      width: 200,
    },
    {
      field: 'customerOrderDate',
      headerName: 'Užsakymo data',
      width: 200,
      renderCell: (params) => {
        return (
          <>{params.value.slice(0, 10)}</>
        );
      }
    },
    {
      field: 'paymentType',
      headerName: 'Apmokėjimo būdas',
      width: 200,
      renderCell: (params) => {
        return (
          <>{paymentMethod[params.value]}</>
        );
      }
    },
    {
      field: 'orderStatus',
      headerName: 'Būsena',
      width: 150,
      renderCell: (params) => {

        const currentDateObject = dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss'));
        const dateObject = dayjs(params.row.dateTo);
        const canSee = params.row.orderStatus === 0 && currentDateObject.isBefore(dateObject) ? true : false;

        return (
          <>
            {params.value === 1 ? (
              <>{orderStatus[1]}</>
            ) : (
              <>
                {canSee ? (
                  <>{orderStatus[0]}</>
                ) : (
                  <>{orderStatus[2]}</>
                )}
              </>
            )}
          </>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Veiksmai',
      sortable: false,
      width: 200,
      renderCell: (params) => {

        const currentDateObject = dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss'));
        const dateObject = dayjs(params.row.dateTo);
        const canEdit = params.row.orderStatus === 0 && currentDateObject.isBefore(dateObject) ? true : false;

        return (
          <>
            <IconButton aria-label="view" sx={{ color: 'blue' }} onClick={() => handleOrderView(params.row)}>
              <RemoveRedEyeIcon />
            </IconButton>
            {canEdit ? (<>
              <IconButton aria-label="edit" sx={{ color: 'orange' }} onClick={() => {}}>
                <ModeEditIcon />
              </IconButton>
              <IconButton aria-label="remove" sx={{ color: 'red' }} onClick={() => {}}>
                <DeleteForeverIcon />
              </IconButton>
            </>) : null}
            
          </>
        );
      },
    },
  ];

  const [gridRows, setGridRows] = useState([]);
  const [showOrderViewModal, setShowOrderViewModal] = useState(false);
  const [order, setOrder] = useState();

  const { data, isLoading, isFetching} = useMyOrdersList();
  useEffect(() => {
    setGridRows(data || []);
    console.log(data);
  }, [data]);

  const handleOrderView = (row) => {
    setOrder(row);
    setShowOrderViewModal(true);
  };

  const handleOrderViewModalClose = () => {
    setShowOrderViewModal(false);
    setOrder(undefined);
  };

  return (
    <>

      <div className='flex flex-col justify-center mt-6'>
        <h1 className='main-header'>Užsakymų sąrašas</h1>
        <div className='flex flex-row justify-center gap-10 my-5'>
          <button 
           className='bg-black w-[150px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500'
           onClick={() => { navigate('/');}}>
            Atgal
          </button>
        </div>
      </div>

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
          columnVisibilityModel={{
            floor: false,
            description: false,
            id: false
          }}
        />
      </Grid>

      {showOrderViewModal && (
        <OrderViewModal
          open={showOrderViewModal}
          handleClose={handleOrderViewModalClose}
          order={order}
        />
      )}
    </>
  );
};

export default Orders;