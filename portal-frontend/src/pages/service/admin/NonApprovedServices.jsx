import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ServiceViewGeneralModal } from './components/ServiceViewGeneralModal';
import { useApproveService, useServicesList } from '../../../hooks/service';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useQueryClient } from '@tanstack/react-query';

export default function NonApprovedServices() {
  const navigate = useNavigate();

  const handleBackClick = (event) => {
    navigate(-1);
  };

  const columns = [
    { field: 'id',
      headerName: 'ID',
      width: 50 
    },
    {
      field: 'name',
      headerName: 'Pavadinimas',
      width: 300,
    },
    {
      field: 'description',
      headerName: 'Aprašymas',
      width: 350,
    },
    {
      field: 'price',
      headerName: 'Kaina',
      type: 'number',
    },
    {
      field: 'isVerified',
      headerName: 'Patvirtinta',
      width: 140,
      renderCell: (params) => {
        return (
          <input
            type="checkbox"
            checked={params.value}
            readOnly
          />
        );
      },
    },
    {
      field: 'serviceCategories',
      headerName: 'Kategorijos',
      width: 250,
      valueGetter: (params) => {
        return params.value.map(category => category.name).join(', ');
      },
    },
    {
      field: 'isAvailable',
      headerName: 'Teikiama',
      width: 100,
      renderCell: (params) => {
        return (
          <input
            type="checkbox"
            checked={params.value}
            readOnly
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Peržiūra',
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <IconButton aria-label="view" sx={{ color: 'blue' }} onClick={() => handleServiceView(params.row)}>
              <RemoveRedEyeIcon />
            </IconButton>
            <Button variant="contained" onClick={() => handleApprove(params.row)} style={{marginLeft: 15}}>Patvirtinti</Button>
          </>
        );
      },
    },
  ];


  const [gridRows, setGridRows] = useState([]);
  const [showServiceViewModal, setShowServiceViewModal] = useState(false);
  const [service, setService] = useState();

  const [queryParams, setQueryParams] = useState({
    'stringSearch': null,
    'priceFrom': null,
    'priceTo': null,
    'serviceCategoriesIds': []
  });

  const queryClient = useQueryClient();
  const approveService = useApproveService();

  const { data, isLoading, isFetching} = useServicesList(queryParams);

  useEffect(() => {
    queryClient.invalidateQueries(['get-service-list', queryParams]);
  }, [queryParams, queryClient]);

  useEffect(() => {
    const approvedServices = data?.filter((x) => !x.isVerified);
    setGridRows(approvedServices || []);
  }, [data]);


  const handleServiceView = (row) => {
    setService(row);
    setShowServiceViewModal(true);
  };

  const handleServiceViewModalClose = () => {
    setShowServiceViewModal(false);
    setService(undefined);
  };

  const handleApprove = (row) => {
    const value = {
      serviceId: row.id
    };
    approveService.mutateAsync(value);
  };

  return (
    <>

      <div className='flex flex-col justify-center mt-6'>
        <h1 className='main-header'>Nepatvirtintų paslaugų sąrašas</h1>
        <div className='flex flex-row justify-center gap-10 my-5'>
          <button 
           className='bg-black w-[150px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500'
           onClick={() => { navigate(-1);}}>
            Atgal
          </button>
        </div>
      </div>

      <div style={{margin: 20}}>
        <Grid style={{margin: '10 auto', width: 1400}}>
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
              id: false,
              isAvailable: false,
              isVerified: false,
            }}
          />
        </Grid>
        {showServiceViewModal && (
          <ServiceViewGeneralModal
            open={showServiceViewModal}
            handleClose={handleServiceViewModalClose}
            service={service}
          />
        )}
      </div>
    </>
  );
};
