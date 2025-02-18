
import { useState, useEffect } from 'react';
import { reservationService } from '../api/reservationService';

export const useReservations = () => {  // ✅ Un hook debe comenzar con "use"
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecords = async () => {  // ✅ Cambio de nombre para evitar conflicto
            try {
                const data = await reservationService.getRecords();
                setRecords(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecords();
    }, []);

    return { records, loading, error };  // ✅ Devuelve el estado correctamente
};
