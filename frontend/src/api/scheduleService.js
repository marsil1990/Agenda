import { getReservations } from '../hooks/useReservations';
import { apiClient } from '../utils/apiClient';
//Objeto con métodos
export const scheduleService = {
  getSchedule: async () => {
    const response = await apiClient.get('/api/schedule');
    return response.data;
  },
  createReservation: async (reservationData) => {
    const response = await apiClient.post('/api/reservation', reservationData);
    return response.data;
  },
  
};