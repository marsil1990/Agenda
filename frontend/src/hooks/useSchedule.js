import { useState, useEffect } from 'react';
import { scheduleService } from '../api/scheduleService';

export const useSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const data = await scheduleService.getSchedule();
        setSchedule(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadSchedule();
  }, []);

  return { schedule, loading, error };
};

