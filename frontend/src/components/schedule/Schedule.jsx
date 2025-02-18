import React from 'react';
import { useSchedule } from '../../hooks/useSchedule';
import ScheduleList from './ScheduleList';
import { useAuth } from '../../context/AuthContext';
import { scheduleService } from '../../api/scheduleService';
import { useState } from 'react';

const Schedule = () => {
  const { schedule, loading, error } = useSchedule();
  const { user, logout } = useAuth(); //Obtengo: login, logout y el user ={email:"..."}
  const [reserved, setreserved] = useState(false)
  

  const handleReservation = async (selectedOption) => {
    const [day, month, year, hour] = selectedOption;
    try {
        await scheduleService.createReservation({
        email_user: user.email,
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year),
        hour: hour,
        cost: 1000,
        done: false
      });
      setreserved(true)
    } catch (error) {
      console.error('Reservation failed:', error);
      setreserved(false)
    }
  };

  return (
    <ScheduleList
      schedule={schedule}
      loading={loading}
      error={error}
      onReserve={handleReservation}
      onLogout={logout}
      isAdmin ={user.email === "pruebaEspecial@gmail.com"}
      reserved= {reserved}
    />
  );
};

export default Schedule;