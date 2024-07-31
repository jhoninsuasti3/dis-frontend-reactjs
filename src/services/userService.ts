import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

// Registro de un nuevo usuario
export const registerUser = async (userData: RegisterFormValues) => {
  try {
    const response = await axios.post(`${API_BASE_URL}auth/register/`, userData);
    return response.data; // Asegúrate de que esto devuelva los datos esperados
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const loginUser = async (formValues: LoginFormValues) => {
  try {
    const response = await axios.post(`${API_BASE_URL}auth/login/`, formValues);
    
    const { access } = response.data; 
    if (access) {
      localStorage.setItem('access_token', access);
      console.log('Token received:', access);
    } else {
      console.error('No access token received');
    }
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

export const fetchProperties = async () => {
  try {
    // Recuperacion del token
    const token = window.localStorage.getItem("access_token")

    if (!token) {
      console.error('No token found');
      return;
    }

    //Peticion
    const response = await axios.get(`${API_BASE_URL}properties/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Properties:', response.data);
    return response.data;
  } catch (error) {
    console.error('Fetch properties error:', error);
  }
};


export const registerProperty = async (propertyData: {
  address: string;
  price: string;
  size: string;
  description: string;
  property_type: string;
}) => {
  try {
    const token = window.localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post(`${API_BASE_URL}properties/`, propertyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Register property error:', error);
    throw error;
  }
};