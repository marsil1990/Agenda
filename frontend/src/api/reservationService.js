import { apiClient } from '../utils/apiClient';
//Objeto con métodos
export const reservationService = {
  getRecords: async () => {
    const response = await apiClient.get('/api/records');
    return response.data;
  },
  updateReservation: async (updateData) => {
    const response = await apiClient.put('/api/updateRecord', updateData);
    return response.data;
  },
  deleteReservation: async (deleteData) => {
    const response = await apiClient.delete('/api/deleteRecord', { data: deleteData});
    return response.data;
  },
  sendData: async (data)=>{
    const response =  await apiClient.post('/api/addRecord', data)
    return response.data
  },
  updateData: async (old_data, new_data)=>{
    const response = await apiClient.put('/api/updateRecord',{newRecord:old_data, oldTask:new_data})
    return response
  }
    
};