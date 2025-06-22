import api from '@/axios/axios.instance';

const getUserReservations = async () => {
  try {
    const res = await api.get('/booking');
    return res.data;
  } catch (error) {
    return { error: `GET RESERVATIONS ERROR: ${error}` };
  }
};

const getSeatsService = async (date: string) => {
  try {
    const res = await api.get(`/booking/seats/${date}`);
    return res.data;
  } catch (error) {
    return { error: `GET SEATS ERROR: ${error}` };
  }
};

const addReservationService = async (data: {
  seatId: number;
  name: string;
  phone: string;
}) => {
  try {
    const res = await api.post(`/booking/seats/${data.seatId}`, {
      name: data.name,
      phone: data.phone,
    });
    return res.data;
  } catch (error) {
    return { error: `ADD RESERVATION ERROR: ${error}` };
  }
};

const mvolaPaymetService = async (seatIds: number[]) => {
  try {
    const res = await api.post('/mada-co/payment', {
      seatIds,
    });
    return res.data;
  } catch (error) {
    return { error: `MVOLA PAYMENT ERROR: ${error}` };
  }
};

const transactionStatusService = async (id: number) => {
  try {
    const res = await api.get(`/mada-co/payment/${id}/status`);
    return res.data;
  } catch (error) {
    return { error: `GET TRANSACTION DETAILS ERROR: ${error}` };
  }
};

export {
  getUserReservations,
  getSeatsService,
  addReservationService,
  mvolaPaymetService,
  transactionStatusService,
};
