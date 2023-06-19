import React from 'react'
import Testimonial from './Testimonial'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
let carImage2 = require('../../images/real1.png')
let carImage3 = require('../../images/real2.png')
let carImage4 = require('../../images/real3.png')

function GradientSection() {
  return (
    <div
      className="h-full"
      //style={{
      // background:
      //  'linear-gradient(0deg, rgba(89,60,240,1) 3%, rgba(255,255,255,0) 100%)'
      //}}

            style={{

                  background: 'linear-gradient(0deg, rgba(94, 70, 221, 0.08) 3%, rgba(225, 225, 225, 0) 100%)'
         }}
    >
      <div className="min-w-screen min-h-screen flex items-center justify-center py-5">
        <div className="w-full px-5 py-16 md:py-24 ">
          <div className="item-1">
            <div className="w-2/3 mx-auto flex justify-start">
              <motion.div
                className="w-80 h-80 overflow-hidden"
                style={{
                  aspectRatio: '1/1'
                }}
                animate={{
                  y: [-10, 10, -10] // Specify the y-axis animation values
                }}
                transition={{
                  repeat: Infinity, // Repeat the animation infinitely
                  duration: 3, // Animation duration (in seconds)
                  ease: 'easeInOut' // Animation easing
                }}
              >
                <img
                  src={carImage3} // Replace with your image URL
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="p-5 w-2/5 text-left">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Become a Host at Vehicle Rental System
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  To become a host and list your vehicle in Vehicle Rental System, You have to
                  verify your KYC and add payment Information. Wait for
                  verification and you are good to go.
                </p>
                <Link to="/dashboard/become-a-host">
                  <button className="App-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Become a Host 
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            <div className="item-2">
              <div className="w-2/3 mx-auto flex justify-end">
                <div className="p-5 w-2/5 text-right">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Start Renting
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    You can start renting your desired vehicle after you verify your KYC, Email and Phone Number 
                  </p>

                  <Link to="/search">
                    <button
                      className="App-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Start Renting 
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <motion.div
                  className="w-80 h-80 overflow-hidden"
                  style={{
                    aspectRatio: '1/1'
                  }}
                  animate={{
                    y: [-20, 20, -20] // Specify the y-axis animation values
                  }}
                  transition={{
                    repeat: Infinity, // Repeat the animation infinitely
                    duration: 3, // Animation duration (in seconds)
                    ease: 'easeInOut' // Animation easing
                  }}
                >
                  <img
                    src={carImage4} // Replace with your image URL
                    alt="Image"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GradientSection
