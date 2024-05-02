import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createOrder, getMyOrdersList, getOrdersList, updateOrder, deleteOrder } from '../services/api';
import toastService from '../services/toastService';

export const useOrdersList = () => {
  return useQuery({
    queryKey: ['get-order-list'],
    queryFn: getOrdersList,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useMyOrdersList = () => {
  return useQuery({
    queryKey: ['get-my-order-list'],
    queryFn: getMyOrdersList,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Užsakymas sėkmingai sukurtas!');
      queryClient.invalidateQueries(['get-order-list']);
      queryClient.invalidateQueries(['get-my-order-list']);
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrder,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Užsakymas sėkmingai atnaujintas!');
      queryClient.invalidateQueries(['get-my-order-list']);
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Užsakymas sėkmingai pašalintas!');
      queryClient.invalidateQueries(['get-my-order-list']);
    },
  });
};