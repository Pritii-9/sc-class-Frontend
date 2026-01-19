import React from 'react';

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, setIsAdmin }) => {
  const login = () => {
    const email = prompt("Enter Admin Email:");
    if (email === "pvjadhav2513@gmail.com") {
      const pass = prompt("Enter Password:");
      if (pass === "admin123") {
        setIsAdmin(true);
        sessionStorage.setItem('sc_admin', 'true');
      } else { alert("Wrong Password!"); }
    } else { alert("Access Denied!"); }
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('sc_admin');
    window.location.reload();
  };

  return (
    <nav className="bg-[#1e3a8a] text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-chart-line bg-white text-blue-900 p-2 rounded text-xl"></i>
          <div>
            <h1 className="font-bold leading-tight uppercase text-sm md:text-base">SC - Creative Group</h1>
            <p className="text-[10px] opacity-80 uppercase">of Company's</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!isAdmin ? (
            <button onClick={login} className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition">Admin Login</button>
          ) : (
            <button onClick={logout} className="text-xs bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">Logout</button>
          )}
          <i className="fas fa-bars text-xl cursor-pointer"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;