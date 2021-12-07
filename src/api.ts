import axios from 'axios';
import { Ticket } from 'types';

export const BACKEND_URL = 'https://front-test.beta.aviasales.ru/';

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
})

export async function getTickets() {
  const {
    data: { searchId }
  } = await axiosInstance.get<{ searchId: string }>('search');
  const {
    data: { tickets }
  } = await axiosInstance.get<{ stop: boolean, tickets: Ticket[] }>(`tickets?searchId=${searchId}`);
  return tickets;
}