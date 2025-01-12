import React, { useEffect, useState } from "react";
import axios from "axios";
import DisasterTable from "../components/DisasterTable";

const Dashboard = ({ sidebar }) => {
  const [disasters, setDisasters] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    location: "",
    date: "",
    status: "",
  });

  const fetchDisasters = async () => {
    try {
      const response = await axios.get(
        "http://localhost/disaster/getDisasters.php"
      );
      setDisasters(response.data);
    } catch (err) {
      setError("Error fetching disaster data");
    }
  };

  useEffect(() => {
    fetchDisasters();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = formData.id
      ? "http://localhost/disaster/updateDisaster.php"
      : "http://localhost/disaster/createDisaster.php";

    try {
      await axios.post(url, formData);
      fetchDisasters();
      setFormData({
        id: "",
        name: "",
        description: "",
        location: "",
        date: "",
        status: "",
      });
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to save data");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this disaster?")) {
      try {
        await axios.post("http://localhost/disaster/deleteDisaster.php", { id });
        fetchDisasters();
      } catch (err) {
        setError("Failed to delete data");
      }
    }
  };

  const handleEdit = (disaster) => {
    setFormData(disaster);
    setIsModalOpen(true);
  };

  return (
    <div className="flex">
      {sidebar}

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 p-6 flex-1">
        <div className="bg-white shadow-2xl rounded-lg w-full max-w-6xl overflow-hidden">
          <div className="bg-indigo-700 text-white p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Disaster Dashboard</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded-lg"
            >
              + Add Disaster
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-center bg-red-100 py-3">{error}</p>
          )}

          <DisasterTable
            disasters={disasters}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                {formData.id ? "Edit Disaster" : "Add Disaster"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border p-2 rounded"
                  required
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full border p-2 rounded"
                  required
                ></textarea>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-400"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
