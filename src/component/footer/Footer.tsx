import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900">
        <div className="mx-auto w-full container">
          <div className="grid grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-left text-gray-500 uppercase dark:text-gray-400">
                Company
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 text-xs p-0 text-left">
                <li className="mb-2 text-indigo-500">
                  <Link to="/dashboard/become-a-host" className='text-indigo-700'>Become A Host</Link>
                </li>
                <li className="mb-2">
                  <Link to="/search" className='text-indigo-700'>Rent Vehicle</Link>
                </li>
                <li className="mb-2">
                  <Link to="/dashboard/verifyKyc" className='text-indigo-700'>KYC</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-500 text-left uppercase dark:text-gray-400">
                Contact
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 p-0 text-left text-xs">
                <li className="mb-2">
                  Old Baneshowr, Kathmandu Bhimsengola Marg
                </li>
                <li className="mb-2">+977 9840289595</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-500 text-left uppercase dark:text-gray-400">
                Privacy Policy
              </h2>
              <ul className="text-gray-500 list-disc dark:text-gray-400 p-0 text-left text-xs">
                <li className='mb-2'>
                  All the images and documents you provide are your own images
                  and you give rights to store them in our web application{' '}
                </li>
                <li className='mb-2'>
                  No abusive/offensive language are allowed in any sections like
                  review
                </li>
                <li className='mb-2'>
                  Improper use of web application could lead to legal issues
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-500 text-left uppercase dark:text-gray-400">
                नियम र सर्तहरू
              </h2>
              <ul className="list-disc text-gray-500 dark:text-gray-400 p-0 text-left text-xs">
                <li className='mb-2'>
                  तपाईंले प्रदान गर्नुहुने सबै छविहरू र कागजातहरू तपाईंको आफ्नै
                  छविहरू हुन् र तपाईंले तिनीहरूलाई हाम्रो वेब अनुप्रयोगमा
                  भण्डारण गर्ने अधिकार दिनुहुन्छ
                </li>
                <li className='mb-2'>
                  तपाईंलाई कुनै पनि खराब वा आपत्तिजनक शब्द वा भाषा प्रयोग गर्न
                  अनुमति छैन
                </li>
                <li className='mb-2'>
                  हानि गर्न हाम्रो प्रणालीको अनुचित प्रयोगले कानुनी समस्याहरू
                  निम्त्याउन सक्छ
                </li>
              </ul>
            </div>
          </div>
          <div className="p-1 rounded-sm px-4 mb-15 bg-gray-900 dark:bg-gray-700 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
              © 2023 <a href="#" className='text-indigo-700'>Vehicle Rental System</a>. All Rights
              Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
