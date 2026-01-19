/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  clients: any[];
  refresh: () => void;
  apiUrl: string;
}

const AdminPanel: React.FC<Props> = ({ clients, refresh, apiUrl }) => {
  const [form, setForm] = useState({ date: '', name: '', phone: '', amount: 0, roi: 0 });

  const addClient = async () => {
    const profit = (form.amount * form.roi) / 100;
    await axios.post(apiUrl, { ...form, profit });
    refresh();
    alert("Client Added!");
  };

  const deleteClient = async (id: string) => {
    if (window.confirm("Delete client?")) {
      await axios.delete(`${apiUrl}/${id}`);
      refresh();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-blue-900 mb-10">
        <h3 className="text-2xl font-bold mb-6">Client Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input type="text" placeholder="Name" className="border p-3 rounded-xl" onChange={e => setForm({...form, name: e.target.value})} />
          <input type="number" placeholder="Investment Amount" className="border p-3 rounded-xl" onChange={e => setForm({...form, amount: Number(e.target.value)})} />
          <input type="number" placeholder="ROI %" className="border p-3 rounded-xl" onChange={e => setForm({...form, roi: Number(e.target.value)})} />
          <button onClick={addClient} className="bg-blue-900 text-white p-3 rounded-xl font-bold col-span-full md:col-span-1">Add Client</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Investment</th>
                <th className="p-4">Profit</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c._id} className="border-b">
                  <td className="p-4 font-bold">{c.name}</td>
                  <td className="p-4">₹{c.amount.toLocaleString()}</td>
                  <td className="p-4 text-green-600 font-bold">₹{c.profit.toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => deleteClient(c._id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;