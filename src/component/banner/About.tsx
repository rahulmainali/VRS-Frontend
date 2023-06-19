import React from 'react'
import { motion } from 'framer-motion'

let carImage = require('../../images/Front car-pana(1).png')
let carImage1 = require('../../images/banner.jpg')
let carImage2 = require('../../images/real1.png')
let carImage3 = require('../../images/real2.png')
let carImage4 = require('../../images/real3.png')

function About() {
  return (
    <div
      style={{
        background:
          'radial-gradient(circle at 90% 50%, rgba(56, 25, 219, 0.52) 0.3%, rgba(255, 255, 255, 0) 25%)',
        height: '60rem'
      }}
      className="relative"
    >
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
        <div className="p-5 text-left">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Become a Host in Vehicle Rental System 
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
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
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
