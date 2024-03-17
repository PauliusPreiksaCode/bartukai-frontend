import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { EquipmentEditModal } from '../../components/Admin modals/EquipmentEditModal';
import { EquipmentRemoveModal } from '../../components/Admin modals/EquipmentRemoveModal';
import { EquipmentViewModal } from '../../components/Admin modals/EquipmentViewModal';
import { EquipmentCreateModal } from '../../components/Admin modals/EquipmentCreateModal';
import { useCreateEquipment, useEquipmentList, useRemoveEquipment, useUpdateEquipment } from '../../hooks/equipment';

const Equipment = () => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id',
      headerName: 'ID',
      width: 50 
    },
    {
      field: 'inventoryNumber',
      headerName: 'Inventoriaus numeris',
      width: 300,
    },
    {
      field: 'name',
      headerName: 'Pavadinimas',
      width: 350,
    },
    {
      field: 'condition',
      headerName: 'Būsena',
    },
    {
      field: 'type',
      headerName: 'Tipas',
      width: 140,
    },
    {
      field: 'actions',
      headerName: 'Veiksmai',
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <IconButton aria-label="view" sx={{ color: 'blue' }} onClick={() => handleEquipmentView(params.row)}>
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton aria-label="edit" sx={{ color: 'orange' }} onClick={() => handleEquipmentEdit(params.row)}>
              <ModeEditIcon />
            </IconButton>
            <IconButton aria-label="remove" sx={{ color: 'red' }} onClick={() => handleEquipmentRemove(params.row)}>
              <DeleteForeverIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const [gridRows, setGridRows] = useState([]);

  const { data, isLoading, isFetching} = useEquipmentList();
  useEffect(() => {
    setGridRows(data || []);
    console.log(data);
  }, [data]);

  const createEquipment = useCreateEquipment();
  const updateEquipment = useUpdateEquipment();
  const removeEquipment = useRemoveEquipment(); 

  const [showEquipmentViewModal, setShowEquipmentViewModal] = useState(false);
  const [showEquipmentEditModal, setShowEquipmentEditModal] = useState(false);
  const [showEquipmentRemoveModal, setShowEquipmentRemoveModal] = useState(false);
  const [showEquipmentCreateModal, setShowEquipmentCreateModal] = useState(false);
  const [equipment, setEquipment] = useState();

  const handleEquipmentView = (row) => {
    setEquipment(row);
    setShowEquipmentViewModal(true);
  };

  const handleEquipmentViewModalClose = () => {
    setShowEquipmentViewModal(false);
    setEquipment(undefined);
  };

  const handleEquipmentEdit = (row) => {
    setEquipment(row);
    setShowEquipmentEditModal(true);
  };

  const handleEquipmentEditModalClose = () => {
    setShowEquipmentEditModal(false);
    setEquipment(undefined);
  };

  const handleEquipmentRemove = (row) => {
    setEquipment(row);
    setShowEquipmentRemoveModal(true);
  };

  const handleEquipmentRemoveModalClose = () => {
    setShowEquipmentRemoveModal(false);
    setEquipment(undefined);
  };

  const handleEquipmentCreate = () => {
    setShowEquipmentCreateModal(true);
  };

  const handleEquipmentCreateModalClose = () => {
    setShowEquipmentCreateModal(false);
  };

  return (
    <>
    <div className='flex flex-col justify-center mt-6'>
        <h1 className='main-header'>Įrangos Sąrašas</h1>
        <div className='flex flex-row justify-center gap-10 my-5'>
          <button 
           className='bg-black w-[150px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500'
           onClick={() => { navigate(-1);}}>
            Atgal
          </button>

          <button
           className='bg-black w-[150px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500'
           onClick={() => {handleEquipmentCreate(); }}>
            Pridėti įrangą
          </button>
        </div>
      </div>

      <Grid style={{margin: '0 auto' ,width: 1100}}>
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
          }}
        />
      </Grid>
      {showEquipmentViewModal && (
        <EquipmentViewModal
          open={showEquipmentViewModal}
          handleClose={handleEquipmentViewModalClose}
          equipment={equipment}
        />
      )}
      {showEquipmentEditModal && (
        <EquipmentEditModal
          open={showEquipmentEditModal}
          handleClose={handleEquipmentEditModalClose}
          equipment={equipment}
          onEditEquipment={updateEquipment}
        />
      )}
      {showEquipmentRemoveModal && (
        <EquipmentRemoveModal
          open={showEquipmentRemoveModal}
          handleClose={handleEquipmentRemoveModalClose}
          equipment={equipment}
          onRemoveEquipment={removeEquipment}
        />
      )}
      {showEquipmentCreateModal && (
        <EquipmentCreateModal
          open={showEquipmentCreateModal}
          handleClose={handleEquipmentCreateModalClose}
          onCreateEquipment={createEquipment}
        />
      )}
    </>
  );
};

export default Equipment;