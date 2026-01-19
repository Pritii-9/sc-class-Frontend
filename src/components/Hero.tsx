import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white py-16 px-6 text-center shadow-inner">
      <div className="max-w-4xl mx-auto">
        <div className="border-2 border-yellow-500 inline-block px-4 py-1 rounded-full mb-6 text-xs font-bold uppercase text-yellow-400 tracking-widest">
          SC - Creative Investment Company
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 uppercase leading-tight">
          एकदा शिका ! <br />आयुष्यभर कमवा !
        </h2>
        <p className="text-xl opacity-90 mb-10 font-semibold italic">
          तुमची आर्थिक प्रगती आमचे ध्येय.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="tel:7219374836" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95">
            <i className="fas fa-phone-alt"></i> कॉल करा: 7219374836
          </a>
          <a href="https://wa.me/917219374836" className="w-full sm:w-auto bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95">
            <i className="fab fa-whatsapp text-green-500 text-2xl"></i> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;