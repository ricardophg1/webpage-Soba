import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  [key: string]: any;
}

interface ScheduleData {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  serviceType: string;
}

export async function sendFormData(formData: FormData, formType: string) {
  try {
    const response = await api.post('/api/send-email', {
      ...formData,
      id: uuidv4(),
      formType,
      adminEmail: 'antoniotopvil@gmail.com'
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao enviar formulário');
    }
    throw new Error('Erro ao conectar com o servidor');
  }
}

export async function registerUser(userData: FormData) {
  try {
    const response = await api.post('/api/register', {
      ...userData,
      id: uuidv4(),
      adminEmail: 'antoniotopvil@gmail.com'
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao registrar usuário');
    }
    throw new Error('Erro ao conectar com o servidor');
  }
}

export async function scheduleAppointment(scheduleData: ScheduleData) {
  try {
    const response = await api.post('/api/schedule', {
      ...scheduleData,
      id: uuidv4(),
      adminEmail: 'antoniotopvil@gmail.com'
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao agendar visita');
    }
    throw new Error('Erro ao conectar com o servidor');
  }
}

export default api;