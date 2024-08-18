import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditForm() {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate(); // For navigation
  const [item, setItem] = useState({
    name: '',
    unit: '',
    item: '',
    poweronpassword: '',
    user_name: '',
    defect: '',
    status: '',
    phoneNumber: '',
    deadline: '',
    currentStatus: '',
    takenForRepairDateTime: '',
    delivery_status: '',
    dummyField2: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/complaint/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch item.');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/update_complaint/${id}`, item);
      navigate('/home'); // Redirect to the home page after successful update
    } catch (err) {
      setError('Failed to update item.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Edit Complaint</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 border border-gray-300 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Unit:</label>
          <input
            type="text"
            name="unit"
            value={item.unit}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Item:</label>
          <input
            type="text"
            name="item"
            value={item.item}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Power On Password:</label>
          <input
            type="text"
            name="poweronpassword"
            value={item.poweronpassword}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">User Name:</label>
          <input
            type="text"
            name="user_name"
            value={item.user_name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Defect:</label>
          <input
            type="text"
            name="defect"
            value={item.defect}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status:</label>
          <input
            type="text"
            name="status"
            value={item.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={item.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={item.deadline.slice(0, 10)}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Current Status:</label>
          <input
            type="text"
            name="currentStatus"
            value={item.currentStatus}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Taken For Repair DateTime:</label>
          <input
            type="datetime-local"
            name="takenForRepairDateTime"
            value={item.takenForRepairDateTime.slice(0, 16)}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>


       <div className="mb-4">
  <label className="block text-gray-700">Delivery Status:</label>
  <select
    name="delivery_status"
    value={item.delivery_status}
    onChange={handleChange}
    className="mt-1 block w-full p-2 border border-gray-300 rounded"
  >
    <option value="">Select a status</option>
    <option value="with_us">With Us</option>
    <option value="gave_back">Gave Back</option>
    {/* Add more options as needed */}
  </select>
</div>










        
        <div className="mb-4">
          <label className="block text-gray-700">df:</label>
          <input
            type="text"
            name="delivery_status-2"
            value={item.dummyField2}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
