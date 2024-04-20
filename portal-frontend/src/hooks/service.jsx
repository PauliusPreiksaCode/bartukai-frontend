import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getServicesList, getServicesListSpecialist, createService, approveService } from '../services/api';
import toastService from '../services/toastService';

export const useServicesList = (queryParams) => {
  return useQuery({
    queryKey: ['get-service-list', queryParams],
    queryFn: () => getServicesList(queryParams),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useApproveService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveService,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Paslauga sėkmingai patvirtinta!');
      queryClient.invalidateQueries(['get-service-list']);
    },
  });
};
export const useServicesListSpecialist = (queryParams) => {
  return useQuery({
    queryKey: ['get-service-list-specialist', queryParams],
    queryFn: () => getServicesListSpecialist(queryParams),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createService,
    onSuccess: (e) => {
      if(e !== undefined)
        toastService.success('Paslauga sėkmingai sukurta!');
      queryClient.invalidateQueries(['get-service-list-specialist']);
    },
  });
};
