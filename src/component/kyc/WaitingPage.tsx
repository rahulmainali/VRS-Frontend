import React from 'react'
import { FaCheck } from 'react-icons/fa'

function WaitingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="py-8">
        <h1 className="text-4xl font-bold text-center">THANK YOU!</h1>
        <div className="text-center">
          <FaCheck className="text-green-500 w-16 h-16 mx-auto mb-4" />
          <p className="text-lg mb-4">
            Thanks for submitting your application!
          </p>
          <p>
            Your application will be reviewed within 24 hours and you will be
            notified via Mail if your application got verified or rejected
          </p>
        </div>
      </header>

      <footer className="py-4 text-center">
        <p className="text-sm text-gray-500">
          ©2022 Vehicle Rental System | All Rights Reserved
        </p>
      </footer>
    </div>
  )
}

export default WaitingPage
