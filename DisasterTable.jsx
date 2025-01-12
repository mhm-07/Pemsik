import React from "react";

const DisasterTable = ({ disasters, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse bg-white shadow-sm">
        <thead>
          <tr className="bg-indigo-100 text-gray-700">
            <th className="p-4 text-left border">ID</th>
            <th className="p-4 text-left border">Name</th>
            <th className="p-4 text-left border">Description</th>
            <th className="p-4 text-left border">Location</th>
            <th className="p-4 text-left border">Date</th>
            <th className="p-4 text-left border">Status</th>
            <th className="p-4 text-left border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {disasters.length > 0 ? (
            disasters.map((disaster) => (
              <tr
                key={disaster.id}
                className="hover:bg-indigo-50 transition-all duration-200"
              >
                <td className="p-4 border text-gray-600">{disaster.id}</td>
                <td className="p-4 border text-gray-600">{disaster.name}</td>
                <td className="p-4 border text-gray-600">{disaster.description}</td>
                <td className="p-4 border text-gray-600">{disaster.location}</td>
                <td className="p-4 border text-gray-600">
                  {new Date(disaster.date).toLocaleString()}
                </td>
                <td className="p-4 border text-gray-600">{disaster.status}</td>
                <td className="p-4 border flex space-x-2">
                  <button
                    onClick={() => handleEdit(disaster)}
                    className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(disaster.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="p-6 text-center text-gray-500 bg-gray-50"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisasterTable;
