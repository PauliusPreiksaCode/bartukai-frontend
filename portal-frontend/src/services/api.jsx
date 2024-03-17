import instance from './axios-client';
import authService from './auth';
import toastService from './toastService';

export async function login(user) {
  return await instance
    .post('login', user)
    .then((res) => {
      const token = res.data.token;
      const refreshToken = res.data.refreshToken;
      authService.setCookies(token, refreshToken);
      return {token , refreshToken};
    })
    .catch((err) => {
    });
};

export async function register(user) {
  const originalContentType = instance.defaults.headers['Content-Type'];

  try {
    const response = await instance.post('register', user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  } finally {
    instance.defaults.headers['Content-Type'] = originalContentType;
  }
};

export async function getUser() {
  return await instance
    .get('user')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export async function renewToken() {
  return await instance
    .get('renew-token')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export async function createRoom(room) {
  return await instance
    .post('room', room)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
};

export async function getRoomsList() {
  return await instance
    .get('room/list')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export async function updateRoom(room) {
  return await instance
    .put('room', room)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
};

export async function removeRoom(roomId){
  return await instance
    .delete(`room/${roomId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
};

export async function getEquipmentList(){
  return await instance
    .get('equipment/list')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export async function createEquipment(equipment){
  return await instance
    .post('equipment', equipment)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
};

export async function updateEquipment(equipment){
  return await instance
    .put('equipment', equipment)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
};

export async function deleteEquipment(equipmentId){
  return await instance
    .delete(`equipment/${equipmentId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
};