import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Property {
  id: number;
  address: string;
  price: string;
  size: number;
  description: string;
  property_type: string;
}

interface UpdatePropertyFormProps {
  property: Property;
  onClose: () => void;
}

const UpdatePropertyForm: React.FC<UpdatePropertyFormProps> = ({ property, onClose }) => {
  const [formData, setFormData] = useState<Property>({
    id: property.id,
    address: property.address || '',
    price: property.price || '',
    size: property.size || 0,
    description: property.description || '',
    property_type: property.property_type || 'casa', // Valor predeterminado
  });

  useEffect(() => {
    setFormData({
      id: property.id,
      address: property.address || '',
      price: property.price || '',
      size: property.size || 0,
      description: property.description || '',
      property_type: property.property_type || 'casa', // Valor predeterminado
    });
  }, [property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = window.localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.patch(`http://localhost:8000/api/properties/${formData.id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onClose(); // Aqui cierro modal después de la actualización
    } catch (error) {
      console.error('Update property error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Size:</label>
        <input
          type="number"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Property Type:</label>
        <select
          name="property_type"
          value={formData.property_type}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        >
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
};

export default UpdatePropertyForm;
