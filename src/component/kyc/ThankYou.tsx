import React from 'react';
import { FaCheck } from 'react-icons/fa';

function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="py-8">
        <h1 className="text-4xl font-bold text-center">THANK YOU!</h1>
        <div className="text-center">
          <FaCheck className="text-green-500 mx-auto h-20 w-20" />
          <p className="text-lg mb-4">
            You are already a verified owner. 
          </p>
        </div>

      </header>


      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-sm text-gray-500">©2023 Vehicle Rental System | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default ThankYouPage;
