import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ServiceViewModal } from './components/ServiceViewModal';
import { useServicesList } from '../../../hooks/service';
import { getServiceCategories } from '../../../services/api';
import { useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';


const Services = () => {
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
      width: 500,
    },
    {
      field: 'price',
      headerName: 'Kaina',
      type: 'number',
    },
    {
      field: 'approved',
      headerName: 'Patvirtinta',
      width: 140,
    },
    {
      field: 'serviceCategories',
      headerName: 'Kategorijos',
      width: 300,
      valueGetter: (params) => {
        return params.value.map(category => category.name).join(', ');
      },
    },
    {
      field: 'isAvailable',
      headerName: 'Teikiama',
      width: 50,
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
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <IconButton aria-label="view" sx={{ color: 'blue' }} onClick={() => handleServiceView(params.row)}>
              <RemoveRedEyeIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const [gridRows, setGridRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showServiceViewModal, setShowServiceViewModal] = useState(false);
  const [service, setService] = useState();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [serviceName, setServiceName] = useState(null);
  const [rangeValue, setRangeValue] = useState([0, 999]);

  const [queryParams, setQueryParams] = useState({
    'stringSearch': null,
    'priceFrom': null,
    'priceTo': null,
    'serviceCategoriesIds': []
  });

  const queryClient = useQueryClient();

  const { data, isLoading, isFetching} = useServicesList(queryParams);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getServiceCategories();
      setCategories(fetchedCategories);
    };
    fetchData();
  }, []);

  useEffect(() => {
    queryClient.invalidateQueries(['get-service-list', queryParams]);
  }, [queryParams, queryClient]);

  useEffect(() => {
    const approvedServices = data?.filter((x) => x.isVerified);
    setGridRows(approvedServices || []);
  }, [data]);

  

  const debouncedSetQueryParams = useMemo(() => {
    return debounce((params) => {
      setQueryParams(params);
    }, 300);
  }, []);


  useEffect(() => {
    debouncedSetQueryParams((prevParams) => ({
      'stringSearch': serviceName,
      'priceFrom': rangeValue[0],
      'priceTo': rangeValue[1],
      'serviceCategoriesIds': selectedCategories
    }));
    return () => debouncedSetQueryParams.cancel();
  }, [serviceName, rangeValue, selectedCategories, debouncedSetQueryParams]);

  const handleServiceView = (row) => {
    setService(row);
    setShowServiceViewModal(true);
  };

  const handleServiceViewModalClose = () => {
    setShowServiceViewModal(false);
    setService(undefined);
  };

  const handleOrderClick = () => {
    setShowServiceViewModal(false);
    navigate('/order', { state: { service: service } });
    setService(undefined);
  };

  return (
    <>

      <div className='flex flex-col justify-center mt-6'>
        <h1 className='main-header'>Paslaugų sąrašas</h1>
        <div className='flex flex-row justify-center gap-10 my-5'>
          <button 
           className='bg-black w-[150px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500'
           onClick={() => { navigate('/');}}>
            Atgal
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: 15, marginLeft: 5 }}>
        <FormControl fullWidth style={{ width: 300, marginLeft: 15 }}>
          <InputLabel id="category-select-label" style={{background: 'white'}}>Pasirinkite kategorijas</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            multiple
            value={selectedCategories}
            onChange={(event) => setSelectedCategories(event.target.value)}
            renderValue={(selected) => (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {selected.map((id) => (
                  <Chip key={id} label={categories.find(cat => cat.id === id)?.name || id} style={{ margin: 2 }} />
                ))}
              </div>
            )}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Pavadinimas"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />

        <Box sx={{ width: 300 }}>
          <Typography id="range-slider" gutterBottom>
            Kaina
          </Typography>
          <Slider
            aria-labelledby="range-slider"
            value={rangeValue}
            onChange={(event, newValue) => setRangeValue(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={700}
          />
        </Box>
      </div>

      <div style={{margin: 20}}>
        <Grid style={{margin: '10 auto', width: 1300}}>
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
              approved: false,
            }}
          />
        </Grid>
        {showServiceViewModal && (
          <ServiceViewModal
            open={showServiceViewModal}
            handleClose={handleServiceViewModalClose}
            handleOrderClick={handleOrderClick}
            service={service}
          />
        )}
      </div>
    </>
  );
};

export default Services;