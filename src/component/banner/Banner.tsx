import React from 'react'
import './Banner.css'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import FAQ from './FAQ'
import GradientSection from './GradientSection'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import About from './About'
import ReactStars from 'react-rating-stars-component'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

// import required modules

//test the ssh
let bikes = require('../../images/bikes.jpg')

function Banner() {
  const [vehicles, setVehicles] = useState([])
  const [categories, setCategories] = useState([])
  const url = 'http://localhost:5000/api'

  const getVehicle = async () => {
    try {
      const response = await axios.get(`${url}/getTopRatedVehicle`)
      setVehicles(response.data.vehicles)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchData = async () => {
    try {
      const response: any = await axios(`${url}/getCategory`).catch(err =>
        console.log(err)
      )
      console.log(response.data.response)
      setCategories(response.data.response)
    } catch (error) {
      console.log('error in fetchData category ' + fetchData)
    }
  }

  useEffect(() => {
    getVehicle()
    fetchData()
  }, [])

  return (
    <div>
      <div className="container-fluid ">
        <div className="row align-items-center">
          <div
            className="bike-image"
            style={{
              backgroundImage: `url(${bikes})`,
              maxWidth: '100%',
              height: '95vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'top'
            }}
          ></div>
          <div className="banner-text1">
            <h1>Find Your Drive</h1>
            <h5>Explore Nepal's vehicle renting marketplace</h5>
          </div>
        </div>
      </div>

      <div className="h-auto popular-categories h-auto h-52  w-2/3  mx-auto">
        <h2 className="text-2xl font-semibold text-left mt-16">
          Browse by categories
        </h2>
        <div className="category-list relative flex justify-between mt-3">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          <Swiper
            navigation={{
              nextEl: '.image-swiper-button-next',
              prevEl: '.image-swiper-button-prev',
              disabledClass: 'swiper-button-disabled'
            }}
            slidesPerView={4}
            modules={[Navigation]}
            spaceBetween={20}
            className="mySwiper w-full"
          >
            {categories.map((category: any, index: number) => {
              return (
                <div key={index}>
                  <SwiperSlide key={index} className="p-3">
                    <div
                      className="h-44 w-full shadow-sm rounded-lg drop-shadow-sm"
                      key={index}
                    >
                      <Link to={`/search?category=${category.name}`}>
                        <div
                          className="h-4/5"
                          style={{
                            backgroundImage: `url(${category.image.url})`,
                            maxWidth: '100%',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'top'
                          }}
                        ></div>
                      </Link>
                      <div className="h-1/5 flex items-center justify-center">
                        {' '}
                        <span className="text-lg font-semibold text-center">
                          {category.name}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              )
            })}
          </Swiper>
        </div>
        <div className="popular-categories mt-5 h-96 h-auto w-full  mx-auto ">
          <h2 className="text-5xl text-center font-semibold ">
            Top Rated Vehicles
          </h2>
          <div className=" grid gap-12 grid-cols-3 mt-20 mb-20">
            {/* Vehicle list */}

            {vehicles &&
              vehicles.map((item: any, index: number) => {
                return (
                  <Link to={`vehicle/${item._id}`} key={index + 1}>
                    <div key={index} className="App-link">
                      <div className="h-auto  shadow rounded-lg drop-shadow-sm">
                        <div
                          className="h-64"
                          style={{
                            backgroundImage: `url(${item?.carImages[0]?.url})`,
                            maxWidth: '100%',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'top'
                          }}
                        ></div>
                        <div className="h-auto flex items-center justify-between">
                          <div className="left-side">
                            <ReactStars
                              count={5}
                              value={item.avgRating}
                              isHalf={true}
                              edit={false}
                              size={24}
                              activeColor="#ffd700"
                            />
                            <p className="text-lg font-semibold  px-2 text-left m-0">{`${item.name} ${item.model}`}</p>
                          </div>

                          <div className="right-side">
                            <p className="text-lg font-semibold px-2 text-right m-0">{`${item.reviewCount} Reviews`}</p>
                            <p className="text-lg font-semibold px-2 text-right m-0">{`Rs ${item.price}/day`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      </div>

      <div className="relative h-auto">
        <GradientSection />
      </div>
    </div>
  )
}

export default Banner
