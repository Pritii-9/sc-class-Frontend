import React from 'react';
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Share2
} from 'lucide-react';

const Footer: React.FC = () => {

  const SHARE_URL = "https://sc-class-frontend.vercel.app/";
  const SHARE_TEXT =
    "📈 SC - Creative Group of Companies\n\n" +
    "Share Market Classes & Investment Plans\n\n" +
    "👉 Visit Now:";

  const handleShare = async () => {
    // ✅ 1. Native mobile share (BEST)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SC - Creative Group of Companies",
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
        return;
      } catch (err) {
        console.log("Share cancelled");
      }
    }

    // ✅ 2. WhatsApp fallback
    const whatsappUrl =
      "https://wa.me/?text=" +
      encodeURIComponent(`${SHARE_TEXT}\n${SHARE_URL}`);

    // open immediately on click (gesture-safe)
    window.location.href = whatsappUrl;
  };

  return (
    <>
      <footer className="bg-[#0f172a] text-white py-12 px-6 md:px-16 font-['Hind']">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-[#facc15] text-3xl font-black uppercase">
              SC - Creative Group Of Company's
            </h2>
            <p className="text-slate-400 text-sm font-semibold">
              शेअर मार्केट क्लास आणि इन्व्हेस्टमेंट प्लॅनसाठी विश्वसनीय नाव.
            </p>

            <a
              href="https://wa.me/917219374836"
              className="inline-flex bg-white/10 p-2 rounded-full hover:bg-white/20"
            >
              <MessageCircle size={20} />
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-black border-l-4 border-[#facc15] pl-3 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-slate-300 font-bold">
              <li>Home</li>
              <li>Courses</li>
              <li>Investment Plans</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-black border-l-4 border-[#facc15] pl-3 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-2"><MapPin size={18}/> Hadapsar, Pune</li>
              <li className="flex gap-2"><Phone size={18}/> 7219374836</li>
              <li className="flex gap-2"><Mail size={18}/> sdc101928@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 mt-10">
          © 2026 SC-Creative Group of Companies
        </div>
      </footer>

      {/* ✅ FINAL SHARE BUTTON */}
      <button
        onClick={handleShare}
        className="fixed bottom-6 right-6 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-[100]"
        title="Share"
      >
        <Share2 size={30} />
      </button>
    </>
  );
};

export default Footer;
