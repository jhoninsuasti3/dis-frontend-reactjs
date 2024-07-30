// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { registerUser } from '../services/userService';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await registerUser(formValues);
      setSuccess('User registered successfully');
      setError('');
      // Optionally reset the form
      setFormValues({ username: '', email: '', password: '' });
    } catch (error) {
      setError('Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
