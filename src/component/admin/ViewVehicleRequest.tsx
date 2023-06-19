import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper'
import 'swiper/css'

type image = {
  public_id: string
  url: string
}

export interface UserDataProps {
  userData: {
    bluebookImage: {
      url: string
    }
    insuranceImage: {
      url: string
    }

    name: string
    price: string
    model: string
    milage: string
    vehicleNumber: string
    location: string
    description: string
    categoryName: string
    status: string
    seat: string
    _id: string

    carImages: Array<image>
  }
}

const ViewVehicleRequest: React.FC<UserDataProps> = ({ userData }) => {
  const { bluebookImage, insuranceImage, carImages } = userData
  const {
    name,
    price,
    model,
    milage,
    vehicleNumber,
    location,
    description,
    status,
    categoryName,
    seat,
    _id
  } = userData

  const url = 'http://localhost:5000/api'
  const navigate = useNavigate()

  // approve KYC ----------------------------------
  //
  const approveVehicle = async () => {
    try {
      const response = await axios.post(
        `${url}/approveVehicle`,
        { id: _id },
        {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      )
      toast.success('Vehicle verified successfully')

      // navigate to dashboard
    } catch (error: any) {
      showMessage(error.message, 400)
    }
  }

  // rejcet KYC ----------------------------------
  const rejectVehicle = async () => {
    try {
      const response = await axios.post(
        `${url}/rejectVehicle`,
        { id: _id },
        {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      )
      toast.success('Vehicle rejected successfully')

      // navigate to dashboard
    } catch (error: any) {
      showMessage(error.message, 400)
    }
  }

  console.log(carImages)

  // toastify
  const showMessage = async (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) await toast.success(message)
    else await toast.error(message)
  }

  return (
    <div className="h-auto bg-white">
      <div className="main flex justify-between ">
        <div className="sub-details p-4 mt-5 flex float-left w-2/6 space-x-24 justify-center ">
          <div className="left-info w-full">
            <div className="image-array h-1/2">
              <Swiper
                navigation={true}
                loop={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {carImages.map((image: image, index: number) => {
                  return (
                    <div key={index}>
                      <SwiperSlide key={index} className= 'h-full !important' style={{height: '100%'}}>
                        <div className="cursor-pointer transition duration-1000 ease-linear h-3/4 position-relative">
                          <div
                            className="image w-full h-full rounded-sm drop-shadow-sm bg-rounded "
                            style={{
                              backgroundImage: `url(${image.url})`,
                              maxWidth: '100%',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'cover',
                              height: '100%',
                              backgroundPosition: 'top'
                            }}
                          ></div>
                          <span className="gridlove-hidden-overlay" />
                        </div>
                      </SwiperSlide>
                    </div>
                  )
                })}
              </Swiper>
            </div>

            <div className="basic-info  flex">
              <div className="verify-left w-1/2">
                <p className="text-left text-sm">Vehicle Name: </p>
                <p className="text-left text-sm">Model: </p>
                <p className="text-left text-sm">Price: </p>
                <p className="text-left text-sm">Vehicle Number: </p>
                <p className="text-left text-sm">Mileage: </p>
                <p className="text-left text-sm">Seat: </p>
                <p className="text-left text-sm">Category: </p>
                <p className="text-left text-sm">Location: </p>
              </div>
              <div className="verify-right w-1/2">
                <p className="text-right text-sm "></p>
                <p className="text-right text-sm "> {name} </p>
                <p className="text-right text-sm ">{model} </p>
                <p className="text-right text-sm ">{`Rs ${price}/day`}</p>
                <p className="text-right text-sm ">{vehicleNumber}</p>
                <p className="text-right text-sm ">{milage}</p>
                <p className="text-right text-sm ">{seat}</p>
                <p className="text-right text-sm ">{categoryName}</p>
                <p className="text-right text-sm ">{location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 mt-5  w-2/6 space-x-24 justify-center ">
          <div className="float-left m-0">
            <img alt="Citizenship Front" src={insuranceImage.url}></img>
          </div>
        </div>

        <div className="p-4 mt-5  w-2/6 space-x-24 justify-center ">
          <div className="citizenship-details ">
            <div className="left-info w-full">
              <div className="basic-info  flex">
                <p className="text-right text-sm ">{}</p>

                <img alt="Citizenship Back" src={bluebookImage.url}></img>
              </div>
            </div>
          </div>

          <div className="float-left m-0"></div>
        </div>
      </div>
      <div className="mb-20 important">
        <button
          className="mr-5 bg-danger float-left confirmKycButton mt-4"
          style={{ width: '15%' }}
          onClick={rejectVehicle}
        >
          Reject
        </button>
        <button
          className="mr-5 float-left confirmKycButton mt-4"
          style={{ width: '15%' }}
          onClick={approveVehicle}
        >
          Approve
        </button>
      </div>
    </div>
  )
}

export default ViewVehicleRequest
