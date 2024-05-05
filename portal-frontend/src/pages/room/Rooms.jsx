import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Button, IconButton } from '@mui/material';
import { RoomViewModal } from './components/RoomViewModal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { RoomEditModal } from './components/RoomEditModal';
import { RoomRemoveModal } from './components/RoomRemoveModal';
import { RoomCreateModal } from './components/RoomCreateModal';
import { useCreateRoom, useRemoveRoom, useRoomsList, useUpdateRoom } from '../../hooks/rooms';

const Rooms = () => {
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
      field: 'type',
      headerName: 'Tipas',
      width: 350,
    },
    {
      field: 'floor',
      headerName: 'Aukštas',
      type: 'number',
    },
    {
      field: 'accommodates',
      headerName: 'Talpinama žmonių',
      type: 'number',
      width: 140,
    },
    {
      field: 'description',
      headerName: 'Patalpos aprašymas',
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
      headerName: 'Veiksmai',
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <IconButton aria-label="view" sx={{ color: 'blue' }} onClick={() => handleRoomView(params.row)}>
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton aria-label="edit" sx={{ color: 'orange' }} onClick={() => handleRoomEdit(params.row)}>
              <ModeEditIcon />
            </IconButton>
            <IconButton aria-label="remove" sx={{ color: 'red' }} onClick={() => handleRoomRemove(params.row)}>
              <DeleteForeverIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const [gridRows, setGridRows] = useState([]);

  const { data, isLoading, isFetching} = useRoomsList();
  useEffect(() => {
    setGridRows(data || []);
  }, [data]);

  const updateRoom = useUpdateRoom();
  const createRoom = useCreateRoom();
  const removeRoom = useRemoveRoom();

  const [showRoomViewModal, setShowRoomViewModal] = useState(false);
  const [showRoomEditModal, setShowRoomEditModal] = useState(false);
  const [showRoomRemoveModal, setShowRoomRemoveModal] = useState(false);
  const [showRoomCreateModal, setShowRoomCreateModal] = useState(false);
  const [room, setRoom] = useState();

  const handleRoomView = (row) => {
    setRoom(row);
    setShowRoomViewModal(true);
  };

  const handleRoomViewModalClose = () => {
    setShowRoomViewModal(false);
    setRoom(undefined);
  };

  const handleRoomEdit = (row) => {
    setRoom(row);
    setShowRoomEditModal(true);
  };

  const handleRoomEditModalClose = () => {
    setShowRoomEditModal(false);
    setRoom(undefined);
  };

  const handleRoomRemove = (row) => {
    setRoom(row);
    setShowRoomRemoveModal(true);
  };

  const handleRoomRemoveModalClose = () => {
    setShowRoomRemoveModal(false);
    setRoom(undefined);
  };

  const handleRoomCreate = () => {
    setShowRoomCreateModal(true);
  };

  const handleRoomCreateModalClose = () => {
    setShowRoomCreateModal(false);
  };

  return (
    <>
      <div className='flex flex-col justify-center mt-6'>
        <h1 className='main-header'>Patalpų Sąrašas</h1>
        <div className='flex flex-row justify-center gap-10 my-5'>
          <button 
           className='bg-black w-[150px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500'
           onClick={() => { navigate(-1);}}>
            Atgal
          </button>

          <button
           className='bg-black w-[150px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500'
           onClick={() => {handleRoomCreate(); }}>
            Pridėti patalpą
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
      {showRoomViewModal && (
        <RoomViewModal
          open={showRoomViewModal}
          handleClose={handleRoomViewModalClose}
          room={room}
        />
      )}
      {showRoomEditModal && (
        <RoomEditModal
          open={showRoomEditModal}
          handleClose={handleRoomEditModalClose}
          room={room}
          onUpdateRoom={updateRoom}
        />
      )}
      {showRoomRemoveModal && (
        <RoomRemoveModal
          open={showRoomRemoveModal}
          handleClose={handleRoomRemoveModalClose}
          room={room}
          onRemoveRoom={removeRoom}
        />
      )}
      {showRoomCreateModal && (
        <RoomCreateModal
          open={showRoomCreateModal}
          handleClose={handleRoomCreateModalClose}
          onCreateRoom={createRoom}
        />
      )}
    </>
  );
};

export default Rooms;