import React from "react";
import { MessageCircle, MapPin, Phone, Mail, Share2 } from "lucide-react";

const Footer: React.FC = () => {
  const SHARE_URL = "https://sc-class-frontend.vercel.app/";

  const handleShareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(SHARE_URL)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* FOOTER */}
      <footer className="bg-[#0f172a] text-white py-12 px-6 md:px-16 font-['Hind']">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* BRAND */}
          <div className="space-y-6">
            <h2 className="text-[#facc15] text-3xl font-black uppercase tracking-tight">
              SC - Creative Group Of Company's
            </h2>
            <p className="text-slate-400 text-sm font-semibold">
              शेअर मार्केट क्लास आणि इन्व्हेस्टमेंट प्लॅनसाठी विश्वसनीय नाव.
            </p>
            {/* SHARE ON WHATSAPP */}
            <button
              onClick={handleShareOnWhatsApp}
              className="inline-flex bg-white/10 p-2 rounded-full hover:bg-white/20 transition"
              title="Share on WhatsApp"
            >
              <MessageCircle size={20} />
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-widest border-l-4 border-[#facc15] pl-3">
              Quick Links
            </h3>
            <ul className="space-y-4 text-slate-300 font-bold">
              <li>Home</li>
              <li>Courses</li>
              <li>Investment Plans</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-widest border-l-4 border-[#facc15] pl-3">
              Contact Us
            </h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center gap-3">
                <MapPin className="text-slate-500" size={20} />
                <span>Hadapsar, Pune</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-slate-500" size={20} />
                <span>7219374836</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-slate-500" size={20} />
                <span>sdc101928@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="container mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 uppercase tracking-[0.3em]">
          © 2026 SC-Creative Group of Companies
        </div>
      </footer>

      {/* OPTIONAL: FLOATING SHARE BUTTON */}
      <button
        onClick={handleShareOnWhatsApp}
        className="fixed bottom-6 right-6 bg-[#1e3a8a] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-[100]"
        title="Share on WhatsApp"
      >
        <Share2 size={30} />
      </button>
    </>
  );
};

export default Footer;