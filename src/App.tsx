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
  UserCheck,
  Save,
  XCircle
} from 'lucide-react';

// Make sure Footer.tsx exists in the same folder
import Footer from './components/Footer'; 

const API_URL = "sc-class-backend.vercel.app/api/clients";;
const ADMIN_EMAIL = "sdc101928@gmail.com";

const App: React.FC = () => {
    // --- State Management ---
    const [isAdmin, setIsAdmin] = useState<boolean>(sessionStorage.getItem('sc_admin') === 'true');
    const [clients, setClients] = useState<any[]>([]);
    const [form, setForm] = useState({ date: '', name: '', phone: '', amount: 0, roi: 0, profit: 0 });
    
    // Editing State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>(null);

    // Load data on component mount
    useEffect(() => {
        fetchClients();
    }, []);

    // --- Database Functions ---
    const fetchClients = async () => {
        try {
            const res = await axios.get(API_URL);
            setClients(res.data);
        } catch (err) { 
            console.error("Error fetching data", err);
        }
    };

    const handleAddClient = async () => {
        if (!form.name || !form.amount) return alert("कृपया नाव आणि गुंतवणूक रक्कम भरा!");
        const finalProfit = (form.amount * form.roi) / 100;
        try {
            await axios.post(API_URL, { ...form, profit: finalProfit });
            setForm({ date: '', name: '', phone: '', amount: 0, roi: 0, profit: 0 });
            fetchClients();
            alert("क्लायंट यशस्वीरित्या जोडला गेला!");
        } catch (err) {
            alert("डेटा सेव्ह करताना त्रुटी आली.");
        }
    };

    const startEdit = (client: any) => {
        setEditingId(client._id);
        setEditForm({ ...client });
    };

    const handleUpdate = async () => {
        const finalProfit = (editForm.amount * editForm.roi) / 100;
        try {
            await axios.put(`${API_URL}/${editingId}`, { ...editForm, profit: finalProfit });
            setEditingId(null);
            fetchClients();
        } catch (err) {
            alert("अपडेट करताना त्रुटी आली.");
        }
    };

    const deleteClient = async (id: string) => {
        if (window.confirm("तुम्हाला खात्री आहे की तुम्हाला हा डेटा डिलीट करायचा आहे?")) {
            await axios.delete(`${API_URL}/${id}`);
            fetchClients();
        }
    };

    // --- Admin Auth ---
    const adminLogin = () => {
        const email = prompt("तुमचा ईमेल टाका:");
        if (email === ADMIN_EMAIL) {
            const pass = prompt("पासवर्ड टाका:");
            if (pass === "admin123") {
                setIsAdmin(true);
                sessionStorage.setItem('sc_admin', 'true');
            } else { alert("चुकीचा पासवर्ड!"); }
        } else { alert("तुम्हाला परवानगी नाही!"); }
    };

    const adminLogout = () => {
        sessionStorage.removeItem('sc_admin');
        setIsAdmin(false);
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] font-['Hind'] text-slate-800">
            {/* Navbar */}
            <nav className="bg-[#1e3a8a] text-white p-4 sticky top-0 z-50 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg">
                            <TrendingUp className="text-[#1e3a8a] w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-bold leading-tight uppercase text-lg tracking-wider">SC - Creative Group</h1>
                            <p className="text-[20px] opacity-80 uppercase font-semibold text-yellow-400">of Company's</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {!isAdmin ? (
                            <button onClick={adminLogin} className="flex items-center gap-2 text-xs bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/20">
                                <UserCheck size={14} /> Admin Login
                            </button>
                        ) : (
                            <button onClick={adminLogout} className="flex items-center gap-2 text-xs bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition-all shadow-md">
                                <LogOut size={14} /> Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] text-white py-20 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                                <div className="border-2 border-yellow-500 inline-block px-4 py-1 rounded-full mb-6 text-xs font-bold uppercase text-yellow-400 tracking-widest">SC - Creative Investment Company</div>

<h2 className="text-4xl md:text-6xl font-black mb-6 uppercase leading-tight drop-shadow-md">
  एकदा शिका ! <br /> 
  <span className="text-[#facc15]">आयुष्यभर कमवा !</span>
</h2>
                    <p className="text-xl md:text-2xl opacity-90 font-medium italic mb-10">तुमची आर्थिक प्रगती आमचे ध्येय.</p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <a href="tel:7219374836" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-105">
                            <Phone size={20} fill="currentColor" /> कॉल करा: 7219374836
                        </a>
                        <a href="https://wa.me/917219374836" className="bg-white hover:bg-slate-50 text-slate-800 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-105 border-b-4 border-slate-200">
                            <MessageCircle className="text-green-500" size={20} fill="currentColor" /> WhatsApp करा
                        </a>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 -mt-12 pb-24 space-y-12">
                
                {/* SHARE MARKET CLASS SECTION */}
                <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
                        <h3 className="text-[#1e3a8a] text-2xl md:text-4xl font-black uppercase tracking-tight">SC-CREATIVE SHARE MARKET CLASS</h3>
                        <span className="flex items-center gap-2 bg-red-50 text-red-700 text-lg font-bold px-5 py-2 rounded-full border border-green-200">
                            <CheckCircle2 size={29} /> मार्च 2025 पासून सुरु - आता हडपसरमध्ये 
                        </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h4 className="font-black text-slate-800 text-lg uppercase tracking-widest">क्लासची वैशिष्ट्ये</h4>
                            {[
                                { t: "Basic To Advance ",  d: "शेअर मार्केटचे पूर्ण ज्ञान एकाच ठिकाणी." },
                                { t: "Technical & 100% Practical ",  d: "फक्त थिअरी नाही, प्रॅक्टिकल ट्रेनिंगवर भर." },
                                { t: "No Computer Needed ",  d: "फक्त मोबाईल आणि इंटरनेट पुरेसे आहे." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-start">
                                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={24} />
                                    <p className="text-lg"><span className="font-black text-[#1e3a8a]">{item.t}:</span> {item.d}</p>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-5 bg-blue-50 p-6 rounded-[2rem] border border-blue-100 transition-hover hover:bg-blue-100">
                                <Calendar className="text-blue-600" size={32} />
                                <p className="font-black text-xl text-blue-900">15 दिवसांची लाईव्ह प्रॅक्टिकल बॅच.</p>
                            </div>
                            <div className="flex items-center gap-5 bg-green-50 p-6 rounded-[2rem] border border-green-100 transition-hover hover:bg-green-100">
                                <IndianRupee className="text-green-600" size={32} />
                                <p className="font-black text-xl text-green-900">महिना 15,000 किंवा त्यापेक्षा जास्त कमवा.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CUSTOMER INTENT SECTION */}
                <section className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl text-center">
    <h3 className="text-2xl md:text-3xl font-black mb-12 italic text-slate-800">
        तुम्ही कशाच्या शोधात आहात ?
    </h3>
    
    <div className="space-y-6 mb-16 max-w-2xl mx-auto text-lg md:text-2xl font-bold text-slate-700">
        {[
            "तुम्ही पार्टटाईम इनकमच्या शोधात आहात का?",
            "शेअर मार्केटची सुरूवात कशी करणार?",
            "करिअर किंवा बिजनेस करू इच्छिता?"
        ].map((q, i) => (
            <div key={i} className="flex items-center gap-4 group justify-center md:justify-start">
                {/* Custom Blue Bullet Point */}
                <div className="h-3 w-3 rounded-full bg-[#1e3a8a] shadow-[0_0_10px_rgba(30,58,138,0.3)] group-hover:scale-125 transition-transform"></div>
                <p className="group-hover:text-[#1e3a8a] transition-colors">{q}</p>
            </div>
        ))}
    </div>

    <div className="bg-[#fffdf0] border-4 border-dashed border-yellow-300 rounded-[3rem] p-8 md:p-14 max-w-5xl mx-auto shadow-inner">
        <h4 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight">
            शेअर मार्केट क्लास शिकून, हमखास <span className="text-green-600 underline underline-offset-8 decoration-green-200">₹1000 प्रॉफिट</span> मिळवा (दररोज).
        </h4>
        <p className="text-slate-800 mt-6 font-bold uppercase tracking-widest text-lg">
            वैयक्तिक लक्ष • लाईव्ह ट्रेनिंग
        </p>
    </div>
</section>

                {/* SMART PLAN SECTION */}
                <section className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl text-center">
                    <div className="mb-16">
                        <h3 className="text-[#1e3a8a] text-3xl md:text-5xl font-black mb-4 uppercase">SC-Creative Investment Smart Plan</h3>
                        <p className="mt-12 text-slate-800 italic font-bold text-base md:text-lg text-center leading-relaxed max-w-3xl mx-auto px-4">तुमच्या गुंतवणुकीवर बँकेच्या FD पेक्षा जास्त परतावा.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            { i: <Building2 size={36} />, t: "9% वार्षिक परतावा", s: "तुमच्या गुंतवणूकीवर खात्रीशीर परतावा (YEARLY RATE OF INTEREST).", c: "text-blue-600", bg: "bg-blue-50" },
                                                        { i: <HandCoins size={36} />, t: "गुंतवणूक मर्यादा", s: "₹25,000 ते ₹5,00,000 पर्यंत गुंतवणूक करण्याची संधी.", c: "text-green-600", bg: "bg-green-50" },

                            { i: <Clock size={36} />, t: "कालावधी", s: "1 वर्ष ते 2 वर्षांसाठी गुंतवणूक लॉक-इन पिरेड.", c: "text-purple-600", bg: "bg-purple-50" }
                        ].map((card, idx) => (
                            <div key={idx} className="p-10 border-2 border-slate-50 rounded-[3rem] hover:shadow-xl transition-all hover:-translate-y-2">
                                <div className={`${card.bg} ${card.c} w-40 h-40 rounded-[2rem] flex items-center justify-center mx-auto mb-8`}>{card.i}</div>
                                <h5 className="text-3xl font-black mb-2">{card.t}</h5>
                                <p className="text-slate-500 font-bold uppercase text-lg tracking-widest">{card.s}</p>
                            </div>
                        ))}
                    </div>
                 <div className="max-w-5xl mx-auto">
                 <h1 className="text-[#1e3a8a] text-3xl md:text-5xl font-black mb-4 uppercase">उपलब्ध गुंतवणूक स्लॉट्स ( Slots )</h1> <br />
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {['₹ 25,000', '₹ 50,000', '₹ 1,00,000', '₹ 2,00,000', '₹ 3,00,000', '₹ 5,00,000 (Max)'].map((slot, i) => (
            <div 
                key={i} 
                className={`p-6 rounded-[1.5rem] font-black text-lg border-2 transition-all hover:scale-105 shadow-sm text-center
                ${slot.includes('5,00,000') 
                    ? 'bg-green-600 border-green-700 text-white shadow-red-200' 
                    : 'bg-blue-50 border-blue-100 text-blue-900 hover:bg-blue-100' 
                }`}
            >
                {slot}
            </div>
        ))}
    </div>

    {/* Adjusted Quote Div */}
   <div className="mt-12 text-slate-800 italic font-bold text-base md:text-lg text-center leading-relaxed max-w-3xl mx-auto px-4">
        "गुंतवणूक म्हणजे स्वतःचे किंवा व्यवस्थापनाचे पैसे अधिक उत्पन्न मिळवण्याच्या उद्देशाने वापरणे."
    </div>
</div>

                </section>

                 <section className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl text-center border border-slate-100">
                    <h3 className="text-2xl md:text-3xl font-black mb-6 text-[#1e3a8a] uppercase">तुमची गुंतवणूक आजच सुरू करा</h3>
                    <p className="text-slate-600 font-bold text-lg mb-10 italic">खालील QR कोड स्कॅन करून तुमची रक्कम जमा करा.</p>
                    <div className="bg-slate-50 p-8 rounded-[3rem] border-2 border-dashed border-blue-200 inline-block shadow-inner">
<img 
  src="/image.png" 
  alt="Payment QR" 
  className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-2xl shadow-xl border-4 border-white" 
/>                        <p className="text-slate-800 font-black text-xl mt-6">Sachin Chobe</p>
                        <p className="text-slate-500 font-bold text-sm uppercase mt-1">Scan to pay with any UPI app</p>
                    </div>
                    <div className="mt-10 bg-blue-50 p-6 rounded-2xl border border-blue-100 max-w-2xl mx-auto">
                        <p className="text-[#1e3a8a] font-bold text-md">
                            <span className="text-red-600">टीप:</span> पेमेंट केल्यानंतर स्क्रीनशॉट WhatsApp नंबरवर (7219374836) पाठवावा.
                        </p>
                    </div>
                </section>


                {/* ADMIN CLIENT MANAGEMENT */}
                {/* ADMIN CLIENT MANAGEMENT - WHITE THEME */}
{isAdmin && (
    <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100">
        <div className="flex items-center gap-3 mb-10">
            <div className="bg-blue-600 p-2 rounded-lg shadow-md">
                <ShieldCheck className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <span className="text-blue-600">Client</span> Portfolio Status
            </h3>
        </div>

        {/* Add Client Form - Dashed Border Style */}
        <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 mb-12 bg-slate-50/30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <input 
                    type="date" 
                    value={form.date} 
                    onChange={e => setForm({...form, date: e.target.value})} 
                    className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 outline-none focus:ring-2 ring-blue-500 shadow-sm transition-all" 
                />
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={form.name} 
                    onChange={e => setForm({...form, name: e.target.value})} 
                    className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 outline-none focus:ring-2 ring-blue-500 shadow-sm transition-all" 
                />
                <input 
                    type="text" 
                    placeholder="Mobile No." 
                    value={form.phone} 
                    onChange={e => setForm({...form, phone: e.target.value})} 
                    className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 outline-none focus:ring-2 ring-blue-500 shadow-sm transition-all" 
                />
                <input 
                    type="number" 
                    placeholder="Investment (₹)" 
                    value={form.amount || ''} 
                    onChange={e => setForm({...form, amount: Number(e.target.value)})} 
                    className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-blue-900 font-bold outline-none focus:ring-2 ring-blue-500 shadow-sm transition-all" 
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                    type="number" 
                    placeholder="Rate of Interest (%)" 
                    value={form.roi || ''} 
                    onChange={e => setForm({...form, roi: Number(e.target.value)})} 
                    className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-blue-700 font-bold outline-none focus:ring-2 ring-blue-500 shadow-sm transition-all" 
                />
                <input 
                    type="text" 
                    readOnly 
                    placeholder="Auto Profit" 
                    value={form.amount && form.roi ? `₹${((form.amount * form.roi) / 100).toLocaleString()}` : ''}
                    className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-blue-700 font-bold outline-none shadow-sm" 
                />
                <button 
                    onClick={handleAddClient} 
                    className="bg-[#1e3a8a] hover:bg-blue-800 text-white font-black rounded-2xl py-4 transition-all shadow-lg shadow-blue-200 uppercase tracking-widest"
                >
                    Add Client
                </button>
            </div>
        </div>

        {/* Clients Table - Modern White Style */}
        <div className="overflow-hidden rounded-[2rem] border border-slate-100 shadow-xl bg-white">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#0f172a] text-[10px] font-black uppercase tracking-widest text-slate-300">
                    <tr>
                        <th className="p-6">Sr.No</th>
                        <th className="p-6">Date</th>
                        <th className="p-6">Client Name</th>
                        <th className="p-6">Contact No.</th>
                        <th className="p-6">Investment</th>
                        <th className="p-6">Yearly Interest</th>
                        <th className="p-6 text-green-400">Profit</th>
                        <th className="p-6 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                    {clients.map((c, i) => (
                        <tr key={c._id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="p-6 text-slate-400">{i + 1}</td>
                            <td className="p-6">{c.date || "2026-01-19"}</td>
                            <td className="p-6 font-bold text-slate-800">{c.name}</td>
                            <td className="p-6 text-blue-600 underline italic decoration-blue-200">
                                <a href={`tel:${c.phone}`}>{c.phone}</a>
                            </td>
                            <td className="p-6 font-bold">₹{c.amount.toLocaleString()}</td>
                            <td className="p-6 text-orange-600 font-bold">{c.roi}%</td>
                            <td className="p-6 text-green-600 font-black">₹{c.profit.toLocaleString()}</td>
                            <td className="p-6">
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => window.open(`https://wa.me/91${c.phone}`)} className="text-green-500 hover:scale-125 transition-transform">
                                        <MessageCircle size={18} fill="currentColor" />
                                    </button>
                                    <button onClick={() => deleteClient(c._id)} className="text-red-400 hover:scale-125 transition-transform">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
)}
            </main>

            <Footer />
        </div>
    );
};

export default App;