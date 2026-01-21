import React from 'react';
import { 
  Facebook, 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  Menu,
  Share2 // Added Share2 for the universal share icon
} from 'lucide-react';

const Footer: React.FC = () => {
  // This function creates the sharing message
  const shareMessage = encodeURIComponent(
    "Check out SC - Creative Group of Companies for Share Market classes and Investment plans: " + 
    window.location.href
  );

  return (
    <>
      <footer className="bg-[#0f172a] text-white py-12 px-6 md:px-16 font-['Hind']">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-[#facc15] text-3xl font-black uppercase tracking-tight">
                SC - Creative Group Of Company's
              </h2>
              <p className="text-slate-400 text-sm mt-2 font-semibold">
                शेअर मार्केट क्लास आणि इन्व्हेस्टमेंट प्लॅनसाठी विश्वसनीय नाव.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="https://wa.me/917219374836" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-widest border-l-4 border-[#facc15] pl-3">
              Quick Links
            </h3>
            <ul className="space-y-4 text-slate-300 font-bold">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Courses</a></li>
              <li><a href="#" className="hover:text-white transition">Investment Plans</a></li>
            </ul>
          </div>

          {/* Contact Us Section */}
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

        {/* Bottom Bar */}
        <div className="container mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 uppercase tracking-[0.3em]">
          &copy; 2026 SC-Creative Group of Companies
        </div>
      </footer>

      {/* Floating Universal WhatsApp Share Button */}
      {/* Note: Removing the 'phone' parameter from the URL forces WhatsApp to open the contact picker */}
     
      {/* Floating Universal WhatsApp Share Button */}
      <a
  href={`https://wa.me/?text=${encodeURIComponent(
    "📈 SC - Creative Group of Companies\n\n" +
    "Share Market Classes & Investment Plans\n\n" +
    "👉 Visit Now: https://sc-class-frontend.vercel.app/"
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-[100] flex items-center justify-center"
  title="Share on WhatsApp"
>
  <Share2 size={32} />
</a>

    </>
  );
};

export default Footer;