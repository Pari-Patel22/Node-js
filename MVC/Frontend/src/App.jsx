import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function App() {
  const [formdata, setFormdata] = useState({
    name: "",
    age: "",
    city: "",
  });
  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const res = await axios.get("http://localhost:2622/getData");
    setRecords(res.data.data);
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex) {
        await axios.put("http://localhost:2622/updatedata", {
          ...formdata,
          id: editIndex,
        });
        toast.success("User updated successfully");
      } else {
        await axios.post("http://localhost:2622/adddata", formdata);
        toast.success("User added successfully");
      }

      fetchdata();
      setEditIndex(null);
      setFormdata({ name: "", age: "", city: "" });
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (id) => {
    const singledata = records.find((item) => item._id === id);
    setFormdata(singledata);
    setEditIndex(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2622/deletedata?id=${id}`);
      setRecords(records.filter((item) => item._id !== id));
      toast.success("User deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            User Management
          </h1>
          <p className="text-sm text-gray-500">
            Professional CRUD Admin Panel
          </p>
        </div>

        {/* Form Table */}
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Age</th>
                  <th className="p-4 text-left">City</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4">
                    <input
                      name="name"
                      value={formdata.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      name="age"
                      type="number"
                      value={formdata.age}
                      onChange={handleChange}
                      placeholder="Age"
                      className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      name="city"
                      value={formdata.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                  </td>
                  <td className="p-4 text-center">
                    <button
                      type="submit"
                      className={`px-5 py-2 rounded-md text-sm font-medium text-white transition
                        ${
                          editIndex
                            ? "bg-amber-500 hover:bg-amber-600"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                      {editIndex ? "Update" : "Add User"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>

        {/* Data Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Age</th>
                <th className="p-4 text-left">City</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {records.map((e) => (
                <tr
                  key={e._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{e.name}</td>
                  <td className="p-4">{e.age}</td>
                  <td className="p-4">{e.city}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(e._id)}
                        className="px-3 py-1.5 text-sm rounded-md
                                   bg-indigo-50 text-indigo-600
                                   border border-indigo-200
                                   hover:bg-indigo-100 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(e._id)}
                        className="px-3 py-1.5 text-sm rounded-md
                                   bg-red-50 text-red-600
                                   border border-red-200
                                   hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {records.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
