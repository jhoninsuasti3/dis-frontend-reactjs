// src/pages/PropertiesPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import UpdatePropertyForm from './UpdatePropertyForm'; // Asegúrate de tener este componente

interface Property {
  id: number;
  address: string;
  price: string;
  size: number;
  description?: string;
  property_type?: string;
}

const PropertiesList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  const loadProperties = useCallback(async (url: string) => {
    try {
      const token = window.localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newProperties = response.data.results;
      setProperties(prevProperties => {
        const existingIds = new Set(prevProperties.map(p => p.id));
        const filteredNewProperties = newProperties.filter(p => !existingIds.has(p.id));
        return [...prevProperties, ...filteredNewProperties];
      });
      setNextPageUrl(response.data.next);
    } catch (error) {
      setError('Failed to fetch properties');
      console.error('Fetch properties error:', error);
    }
  }, []);

  useEffect(() => {
    loadProperties('http://localhost:8000/api/properties/');
  }, [loadProperties]);

  const loadMoreProperties = () => {
    if (nextPageUrl) {
      loadProperties(nextPageUrl);
    }
  };

  const handleEditClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = window.localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:8000/api/properties/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted property from the list
      setProperties(prevProperties => prevProperties.filter(p => p.id !== id));
    } catch (error) {
      setError('Failed to delete property');
      console.error('Delete property error:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Properties List</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Size</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td className="py-2 px-4 border-b">{property.id}</td>
              <td className="py-2 px-4 border-b">{property.address}</td>
              <td className="py-2 px-4 border-b">{property.price}</td>
              <td className="py-2 px-4 border-b">{property.size}</td>
              <td className="py-2 px-4 border-b">{property.description}</td>
              <td className="py-2 px-4 border-b">{property.property_type}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  onClick={() => handleEditClick(property)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Load More Button */}
      {nextPageUrl && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreProperties}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Load More
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500"
            >
              &times;
            </button>
            <UpdatePropertyForm
              property={selectedProperty}
              onClose={closeModal}
              onUpdateSuccess={loadProperties} // Actualiza la lista cuando se realiza una actualización
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
