/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TrendingUp, 
  CheckCircle2, 
  Calendar, 
  IndianRupee, 
  Phone, 
  MessageCircle, 
  Building2, 
  Clock, 
  HandCoins,
  ShieldCheck,
  Trash2,
  Edit3,
  LogOut,
  UserCheck
} from 'lucide-react';

import Modal from './components/ui/Modal';
import { ToastContainer } from './components/ui/Toast';
import Footer from './components/Footer'; 

const API_URL = "https://sc-class-backend.vercel.app/api/clients";
const ADMIN_EMAIL = "sdc101928@gmail.com";

const App: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(sessionStorage.getItem('sc_admin') === 'true');
    const [clients, setClients] = useState<any[]>([]);
    const [form, setForm] = useState({ date: '', name: '', phone: '', amount: 0, roi: 0, profit: 0 });
    
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>(null);

    const [loginStep, setLoginStep] = useState<'email' | 'password' | null>(null);
    const [loginEmail, setLoginEmail] = useState('');
    const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

    const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' }>>([]);

    const addToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };

    useEffect(() => {
        fetchClients();
    }, []); 

    const fetchClients = async () => {
        try {
            const res = await axios.get(API_URL);
            setClients(res.data);
        } catch (err) { 
            console.error("Error fetching data", err);
        }
    };

    const handleAddClient = async () => {
        if (!form.name || !form.amount) {
          addToast("कृपया नाव आणि गुंतवणूक रक्कम भरा!", 'warning');
          return;
        }
        const finalProfit = (form.amount * form.roi) / 100;
        try {
            await axios.post(API_URL, { ...form, profit: finalProfit });
            setForm({ date: '', name: '', phone: '', amount: 0, roi: 0, profit: 0 });
            fetchClients();
            addToast("क्लायंट यशस्वीरित्या जोडला गेला!", 'success');
        } catch (err) {
            addToast("डेटा सेव्ह करताना त्रुटी आली.", 'error');
        }
    }; 

    const startEdit = (client: any) => {
        setEditingId(client._id);
        setEditForm({ ...client });
    };

    const handleUpdate = async () => {
        const finalProfit = (editForm!.amount * editForm!.roi) / 100;
        try {
            await axios.put(`${API_URL}/${editingId}`, { ...editForm, profit: finalProfit });
            setEditingId(null);
            setEditForm(null);
            fetchClients();
            addToast("क्लायंट अपडेट झाला!", 'success');
        } catch (err) {
            addToast("अपडेट त्रुटी.", 'error');
        }
    }; 

    const requestDelete = (id: string) => {
      setShowConfirmDelete(id);
    };

    const confirmDelete = async () => {
      if (showConfirmDelete) {
        try {
          await axios.delete(`${API_URL}/${showConfirmDelete}`);
          fetchClients();
          addToast("Client deleted!", 'success');
        } catch (err) {
          addToast("Delete failed.", 'error');
        }
        setShowConfirmDelete(null);
      }
    }; 

    const adminLogin = () => {
      setLoginStep('email');
      setLoginEmail('');
    };

    const handleEmailSubmit = () => {
      if (loginEmail === ADMIN_EMAIL) {
        setLoginStep('password');
      } else {
        addToast("Invalid email!", 'error');
        setLoginStep(null);
      }
    };

    const handlePasswordSubmit = (password: string) => {
      if (password === "admin123") {
        setIsAdmin(true);
        sessionStorage.setItem('sc_admin', 'true');
        addToast("Admin login successful!", 'success');
        setLoginStep(null);
        window.location.reload();
      } else {
        addToast("Wrong password!", 'error');
      }
    }; 

    const adminLogout = () => {
        sessionStorage.removeItem('sc_admin');
        setIsAdmin(false);
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-['Hind'] text-slate-800">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 sticky top-0 z-50 shadow-2xl">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                            <TrendingUp className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="font-black text-xl uppercase tracking-wider">SC Creative Group</h1>
                            <p className="text-yellow-300 text-lg font-bold uppercase opacity-90">Investment Company</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {!isAdmin ? (
                            <button onClick={adminLogin} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-2 rounded-2xl font-bold transition-all border border-white/30 text-sm">
                                <UserCheck size={16} className="inline mr-2" /> Admin
                            </button>
                        ) : (
                            <button onClick={adminLogout} className="bg-red-500/90 hover:bg-red-600 px-6 py-2 rounded-2xl font-bold transition-all shadow-lg text-sm">
                                <LogOut size={16} className="inline mr-2" /> Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24 px-6 text-center relative overflow-hidden">
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="inline-block bg-yellow-400/20 px-6 py-2 rounded-full mb-8 text-xs font-black uppercase tracking-widest border-2 border-yellow-400/50">
                        SC Creative Investment Company
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 uppercase leading-tight">
                        एकदा शिका! <br />
                        <span className="text-yellow-300 block text-5xl md:text-7xl">आयुष्यभर कमवा!</span>
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 font-medium italic mb-12 max-w-2xl mx-auto leading-relaxed">
                        तुमची आर्थिक प्रगती आमचे ध्येय
                    </p>
                    <div className="flex flex-col lg:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                        <a href="tel:+917219374836" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-3xl font-bold text-lg flex items-center gap-3 shadow-2xl hover:shadow-3xl transition-all w-full lg:w-auto">
                            <Phone size={22} /> कॉल: 7219374836
                        </a>
                        <a href="https://wa.me/917219374836" className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-3xl font-bold text-lg flex items-center gap-3 shadow-2xl hover:shadow-3xl transition-all w-full lg:w-auto border-4 border-slate-200">
                            <MessageCircle size={22} className="text-emerald-500" /> WhatsApp
                        </a>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 -mt-16 pb-24 space-y-16">
                {/* Investment Cards */}
                <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-16 shadow-2xl border border-white/50">
                    <h2 className="text-3xl md:text-5xl font-black mb-8 text-center text-slate-800 uppercase tracking-tight">
                        SC Creative Investment Smart Plan
                    </h2>
                    <p className="text-xl md:text-2xl text-center mb-16 text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        बँकेच्या FD पेक्षा 2X जास्त परतावा • सुरक्षित • 9% वार्षिक व्याज
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group p-10 border-2 border-slate-100 rounded-3xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-gradient-to-b from-blue-50 to-indigo-50">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                                <Building2 size={28} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-blue-900">9% Yearly ROI</h3>
                            <p className="text-slate-600 font-semibold uppercase tracking-wide text-sm">खात्रीशीर परतावा • Yearly Interest Rate</p>
                        </div>
                        <div className="group p-10 border-2 border-slate-100 rounded-3xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-gradient-to-b from-emerald-50 to-green-50">
                            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                                <IndianRupee size={28} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-emerald-900">₹25K - ₹5L Investment</h3>
                            <p className="text-slate-600 font-semibold uppercase tracking-wide text-sm">Minimum ₹25,000 • Maximum ₹5 Lakh</p>
                        </div>
                        <div className="group p-10 border-2 border-slate-100 rounded-3xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-gradient-to-b from-purple-50 to-violet-50">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                                <Clock size={28} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-purple-900">1-2 Years Lock-in</h3>
                            <p className="text-slate-600 font-semibold uppercase tracking-wide text-sm">Secure long-term investment period</p>
                        </div>
                    </div>
                    <div className="mt-16 text-center">
                        <h3 className="text-3xl md:text-4xl font-black mb-6 uppercase text-slate-800">Available Investment Slots</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            {['₹25,000', '₹50,000', '₹1L', '₹2L', '₹3L', '₹5L (Max)'].map((slot, i) => (
                                <div key={i} className={`p-6 rounded-2xl font-black text-lg border-4 shadow-lg text-center transition-all hover:scale-105 cursor-pointer group
                                    ${i === 5 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-400 shadow-emerald-300/50 group-hover:shadow-emerald-400/70' : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white border-blue-400 shadow-blue-300/50 group-hover:shadow-blue-400/70'}`}>
                                    {slot}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ADMIN PANEL */}
                {isAdmin && (
                    <section className="bg-gradient-to-br from-slate-50 to-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-16 shadow-2xl border border-slate-100/50">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
                                <ShieldCheck className="text-white w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-800">Client Portfolio Dashboard</h2>
                        </div>

                        {/* Add Client Form */}
                        <div className="border-4 border-dashed border-slate-200/50 rounded-3xl p-8 mb-12 bg-white/70 shadow-xl backdrop-blur-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="p-4 rounded-2xl border border-slate-200 focus:ring-2 ring-blue-500 outline-none shadow-sm transition-all text-sm" />
                                <input type="text" placeholder="Client Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="p-4 rounded-2xl border border-slate-200 focus:ring-2 ring-blue-500 outline-none shadow-sm transition-all text-sm" />
                                <input type="tel" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="p-4 rounded-2xl border border-slate-200 focus:ring-2 ring-blue-500 outline-none shadow-sm transition-all text-sm" />
                                <input type="number" placeholder="Investment ₹ *" value={form.amount} onChange={e => setForm({...form, amount: Number(e.target.value)})} className="p-4 rounded-2xl border-2 border-blue-300 bg-blue-50 text-blue-900 font-bold focus:ring-3 ring-blue-500 shadow-md transition-all text-lg" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="number" placeholder="ROI % *" value={form.roi} onChange={e => setForm({...form, roi: Number(e.target.value)})} className="p-4 rounded-2xl border border-slate-200 focus:ring-2 ring-orange-500 outline-none shadow-sm transition-all text-lg font-bold" />
                                <input type="text" readOnly placeholder="Profit (Auto)" value={form.amount && form.roi ? `₹${((form.amount * form.roi) / 100).toLocaleString('en-IN')}` : ''} className="p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 font-bold shadow-md text-xl" />
                                <button onClick={handleAddClient} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black rounded-2xl py-5 text-lg transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-1 w-full uppercase tracking-wide">
                                    ➕ Add New Client
                                </button>
                            </div>
                        </div>

                        {/* Mobile-First Responsive Table */}
                        <div className="w-full overflow-x-auto rounded-3xl border-4 border-slate-100/50 shadow-2xl bg-white/80 backdrop-blur-sm">
                            <table className="w-full text-left border-spacing-0 min-w-[800px]">
                                <thead className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800/90 backdrop-blur-md z-20">
                                    <tr>
                                        <th className="p-3 sm:p-6 hidden sm:table-cell text-xs font-black text-slate-200 text-center">#</th>
                                        <th className="p-3 sm:p-6 text-xs sm:text-sm font-black text-slate-200 text-left">Date</th>
                                        <th className="p-3 sm:p-6 text-xs sm:text-sm font-black text-slate-200 text-left">Name</th>
                                        <th className="p-3 sm:p-6 text-xs sm:text-sm font-black text-slate-200 text-left">Contact</th>
                                        <th className="p-3 sm:p-6 text-xs sm:text-sm font-black text-slate-200 text-right">Investment</th>
                                        <th className="p-3 sm:p-6 text-xs sm:text-sm font-black text-slate-200 text-right">ROI</th>
                                        <th className="p-3 sm:p-6 text-xs sm:text-sm font-black text-emerald-300 text-right">Profit</th>
                                        <th className="p-3 sm:p-6 text-xs sm:text-sm font-black text-slate-200 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100/50">
                                    {clients.map((c, i) => (
                                        <tr key={c._id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all group border-b border-slate-100/50">
                                            <td className="p-3 sm:p-6 hidden sm:table-cell text-slate-500 font-mono text-xs">{i + 1}</td>
                                            <td className="p-3 sm:p-6 text-sm font-medium text-slate-700">{c.date || 'Recent'}</td>
                                            <td className="p-3 sm:p-6 font-bold text-xl text-slate-900 group-hover:text-blue-900">{c.name}</td>
                                            <td className="p-3 sm:p-6">
                                                <a href={`tel:${c.phone}`} className="text-blue-600 hover:text-blue-700 font-mono text-sm underline block sm:inline sm:break-all">
                                                    {c.phone}
                                                </a>
                                            </td>
                                            <td className="p-3 sm:p-6 font-bold text-xl text-slate-900">₹{c.amount.toLocaleString('en-IN')}</td>
                                            <td className="p-3 sm:p-6 text-orange-600 font-bold text-lg uppercase">{c.roi}%</td>
                                            <td className="p-3 sm:p-6 font-black text-2xl text-emerald-600 bg-emerald-100/50 px-3 py-1 rounded-full inline-block shadow-lg">
                                                ₹{c.profit.toLocaleString('en-IN')}
                                            </td>
                                            <td className="p-3 sm:p-6">
                                                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                                    <a href={`https://wa.me/91${c.phone}`} className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center w-12 h-12 sm:w-auto sm:px-4">
                                                        <MessageCircle size={20} />
                                                    </a>
                                                    {editingId === c._id ? (
                                                        <div className="flex flex-wrap gap-2 justify-center items-center p-2 bg-yellow-50 rounded-xl">
                                                            <input type="date" value={editForm?.date || ''} onChange={(e) => setEditForm({...editForm, date: e.target.value})} className="p-2 rounded-lg border border-yellow-300 text-xs w-24" />
                                                            <input type="number" value={editForm?.amount || ''} onChange={(e) => setEditForm({...editForm, amount: Number(e.target.value)})} className="p-2 rounded-lg border border-yellow-300 text-xs w-24 font-bold" />
                                                            <button onClick={handleUpdate} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm shadow font-bold transition-all">
                                                                💾 Save
                                                            </button>
                                                            <button onClick={() => {setEditingId(null); setEditForm(null);}} className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm shadow font-bold transition-all">
                                                                ❌ Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <button onClick={() => startEdit(c)} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1 w-12 h-12 sm:w-auto sm:px-4">
                                                                <Edit3 size={18} />
                                                            </button>
                                                            <button onClick={() => requestDelete(c._id)} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1 w-12 h-12 sm:w-auto sm:px-4">
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                <ToastContainer toasts={toasts} onRemove={removeToast} />

                {/* Login Modal */}
                <Modal
                  isOpen={loginStep !== null}
                  onClose={() => setLoginStep(null)}
                  title={loginStep === 'email' ? '🔐 Admin Login' : '🔐 Enter Password'}
                >
                  {loginStep === 'email' ? (
                    <div className="space-y-4">
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Admin Email"
                        className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-4 ring-blue-500/20 outline-none bg-white shadow-lg text-lg"
                      />
                      <button onClick={handleEmailSubmit} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                        Next →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <input
                        type="password"
                        id="admin-password"
                        placeholder="Enter Password..."
                        className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-4 ring-blue-500/20 outline-none bg-white shadow-lg text-lg"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const target = e.target as HTMLInputElement;
                            handlePasswordSubmit(target.value);
                          }
                        }}
                      />
                      <button 
                        onClick={() => {
                          const passInput = document.getElementById('admin-password') as HTMLInputElement;
                          handlePasswordSubmit(passInput.value);
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                      >
                        Login → 
                      </button>
                    </div>
                  )}
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                  isOpen={showConfirmDelete !== null}
                  onClose={() => setShowConfirmDelete(null)}
                  title="🗑️ Confirm Delete"
                  showCancel
                  confirmText="Delete Client"
                  onConfirm={confirmDelete}
                >
                  <p className="text-lg text-slate-700 font-medium">
                    हे क्लायंट आणि सर्व डेटा कायमचा डिलीट होईल. खरंच डिलीट करायचं का?
                  </p>
                </Modal>
            </main>

            <Footer />
        </div>
    );
};

export default App;