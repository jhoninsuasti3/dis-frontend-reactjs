// src/services/userService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/register/'; // URL de tu API

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterFormValues) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    // Manejo de errores
    throw new Error('Registration failed');
  }
};
