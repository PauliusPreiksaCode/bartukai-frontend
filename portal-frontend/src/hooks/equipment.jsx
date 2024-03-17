import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEquipmentList, createEquipment, updateEquipment, deleteEquipment } from '../services/api';
import toastService from '../services/toastService';

export const useEquipmentList = () => {
  return useQuery({ 
    queryKey: ['get-equipment-list'], 
    queryFn: getEquipmentList,
    refetchOnWindowFocus: false, 
    refetchInterval: false 
  });
};

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEquipment,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Įranga sėkmingai atnaujinta!');
      queryClient.invalidateQueries(['get-equipment-list']);
    },
  });
};

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEquipment,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Įranga sėkmingai sukurta!');
      queryClient.invalidateQueries(['get-equipment-list']);
    },
  });
};

export const useRemoveEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEquipment,
    onSuccess: (e) => {

      if(e !== undefined)
        if(e !== '')
          toastService.success(e);
        else
          toastService.success('Įranga sėkmingai pašalinta!');

      queryClient.invalidateQueries(['get-equipment-list']);
    },
  });
};