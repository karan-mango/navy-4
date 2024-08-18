import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function BinView() {
  const apiUrl = 'http://localhost:3000'; // Base URL for the API
  const [binItems, setBinItems] = useState([]);

  // Fetch bin items from the server
  useEffect(() => {
    const fetchBinItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}/all_bin_entries`); // Correct endpoint
        setBinItems(response.data);
      } catch (error) {
        console.error("Error fetching bin items:", error);
      }
    };
    fetchBinItems();
  }, [apiUrl]);

  // Restore item from bin
  const handleRestore = async (id) => {
    try {
      await axios.put(`${apiUrl}/restore_bin_entry/${id}`); // Correct endpoint for restoration
      setBinItems(binItems.filter(item => item._id !== id)); // Remove restored item from UI
    } catch (error) {
      console.error("Error restoring item:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Bin Items</h2>
      <table className="min-w-full bg-white border-2 border-gray-400 rounded-lg capitalize">
        <thead>
          <tr className="bg-gray-100 text-left border-2 border-gray-400">
            <th className="p-2">Name</th>
            <th className="p-2">Unit</th>
            <th className="p-2">Item</th>
            <th className="p-2">Power On Password</th>
            <th className="p-2">User Name</th>
            <th className="p-2">Defect</th>
            <th className="p-2">Status</th>
            <th className="p-2">Phone Number</th>
            <th className="p-2">Deadline</th>
            <th className="p-2">Current Status</th>
            <th className="p-2">Taken For Repair Date</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {binItems.map((item) => (
            <tr key={item._id} className="border-b border-gray-200">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.unit}</td>
              <td className="p-2">{item.item}</td>
              <td className="p-2">{item.poweronpassword}</td>
              <td className="p-2">{item.user_name}</td>
              <td className="p-2">{item.defect}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">{item.phoneNumber}</td>
              <td className="p-2">{new Date(item.deadline).toLocaleDateString()}</td>
              <td className="p-2">{item.currentStatus}</td>
              <td className="p-2">{new Date(item.takenForRepairDateTime).toLocaleDateString()}</td>
              <td className="p-2">
                <button
                  onClick={() => handleRestore(item._id)}
                  className="bg-blue-500 text-white p-1 rounded"
                >
                  Restore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
