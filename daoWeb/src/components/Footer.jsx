import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-xl font-bold">Accountify</h1>
        <p className="text-sm">Your Numbers, Simplified</p>
        <p className="mt-2 text-sm">Contact: +92 300 6509123</p>
        <p className="text-xs mt-4">&copy; {new Date().getFullYear()} Accountify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
