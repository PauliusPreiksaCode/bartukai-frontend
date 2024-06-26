import instance from './axios-client';
import authService from './auth';
import toastService from './toastService';

export async function login(user) {
  return await instance
    .post('login', user)
    .then((res) => {
      const token = res.data.token;
      const refreshToken = res.data.refreshToken;
      authService.setCookies(token, refreshToken)
      return {token , refreshToken};
    })
    .catch((err) => {
      toastService.error(err.response.data)
    })
}

export async function register(user) {
  const originalContentType = instance.defaults.headers['Content-Type'];

  try {
    const response = await instance.post('register', user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toastService.success('Registracija sėkminga! Prisijunkite!');
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    toastService.error(error.response.data);
  } finally {
    instance.defaults.headers['Content-Type'] = originalContentType;
  }
}

export async function getUser() {
  return await instance
    .get('user')
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function editUser(user) {
  const originalContentType = instance.defaults.headers['Content-Type'];

  try {
    const response = await instance.put('user', user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    toastService.error(error.response.data);
    console.error('Error editing user:', error);
  } finally {
    instance.defaults.headers['Content-Type'] = originalContentType;
  }
}

export async function deleteUser(id) {
  return await instance
    .delete(`user/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function renewToken() {
  return await instance
    .get('renew-token')
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function createRoom(room) {
  return await instance
    .post('room', room)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getRoomsList() {
  return await instance
    .get('room/list')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getRoomOccupancyList(id) {
    return await instance
        .get(`room/occupancy/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}

export async function getEquipmentOccupancyList(id) {
    return await instance
        .get(`equipment/occupancy/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}

export async function updateRoom(room) {
  return await instance
    .put('room', room)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function removeRoom(roomId){
  return await instance
    .delete(`room/${roomId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getEquipmentList(){
  return await instance
    .get('equipment/list')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function createEquipment(equipment){
  return await instance
    .post('equipment', equipment)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function updateEquipment(equipment){
  return await instance
    .put('equipment', equipment)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function deleteEquipment(equipmentId){
  return await instance
    .delete(`equipment/${equipmentId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getServicesList(params) {
  return await instance
    .post('service/list', params)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getNonApprovedServicesList() {
    return await instance
        .get('service/non-approved-list')
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}

export async function getServiceUnusedtimes(id) {
  return await instance
    .get(`service/unused-times/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getServicesListSpecialist(params) {
  return await instance
    .post('service/list', params)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
} 

export async function createService(service) {
  return await instance
    .post('service', service)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function updateService(service) {
  return await instance
    .put('service', service)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function removeService(serviceId){
  return await instance
    .delete(`service/${serviceId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getServiceCategories() {
  return await instance
    .get('service/categories-list')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function approveService(serviceId) {
  return await instance
    .post('service/approve', serviceId)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getAvailableRooms(dateFrom, dateTo) {
  return await instance
    .get(`room/available-list?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getAvailableEquipment(dateFrom, dateTo) {
  return await instance
    .get(`equipment/available-list?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getOrdersList() {
  return await instance
    .get('order/list')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function createOrder(params) {
  return await instance
    .post('order', params)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function updateOrder(params) {
  return await instance
    .put('order', params)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function deleteOrder(id) {
  return await instance
    .delete(`order/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getMyOrdersList() {
  return await instance
    .get('order/my-list')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
