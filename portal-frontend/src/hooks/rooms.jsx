import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getRoomsList,
  updateRoom,
  createRoom,
  removeRoom,
  getRoomOccupancyList,
  getEquipmentOccupancyList
} from '../services/api';
import toastService from '../services/toastService';

export const useRoomsList = () => {
  return useQuery({ 
    queryKey: ['get-room-list'], 
    queryFn: getRoomsList,
    refetchOnWindowFocus: false, 
    refetchInterval: false
  });
};

export const useRoomOccupancyList = (id) => {
  return useQuery({
    queryKey: ['get-room-occupancy-list', id],
    queryFn: () => getRoomOccupancyList(id),
    refetchOnWindowFocus: false,
    refetchInterval: false
  });
};

export const useEquipmentOccupancyList = (id) => {
  return useQuery({
    queryKey: ['get-equipment-occupancy-list', id],
    queryFn: () => getEquipmentOccupancyList(id),
    refetchOnWindowFocus: false,
    refetchInterval: false
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRoom,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Patalpa sėkmingai atnaujinta!');
      queryClient.invalidateQueries(['get-room-list']);
    },
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoom,
    onSuccess: (e) => {
      console.log(e);
      if(e !== undefined)
        toastService.success('Patalpa sėkmingai sukurta!');
      queryClient.invalidateQueries(['get-room-list']);
    },
  });
};

export const useRemoveRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeRoom,
    onSuccess: (e) => {
      console.log(e);
      if(e !== undefined)
        if(e !== '')
          toastService.success(e);
        else
          toastService.success('Patalpa sėkmingai pašalinta!');
      queryClient.invalidateQueries(['get-room-list']);
    },
  });
};