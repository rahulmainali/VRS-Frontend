import React from 'react'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import KhaltiCheckout from 'khalti-checkout-web'
import VehicleSkeleton from '../skeleton/VehicleSkeleton'
import Review from '../Review'
import ReviewModal from '../ReviewModal'
import BiDotsVerticalRounded from 'react-icons/bi'
import { Swiper, SwiperSlide } from 'swiper/react'
import axiosConfig from '../../api/axiosConfig'
import commonAxios from '../../api/commonAxios'
import KycModal from '../../component/modal/KycModal'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper'
import 'swiper/css'
const Vehicle = () => {
  const parser = require('html-react-parser')
  const [id, setId] = useState(useParams().id)
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [showKyc, setShowKyc] = useState(false)
  const [canReview, setCanReview] = useState(false)
  const [vehicle, setVehicle] = useState([])
  const [review, setReview] = useState<any>([])
  const [image, setImage] = useState<any>(null)
  const [vehicleId, setVehicleId] = useState('')
  const [status, setStatus] = useState('')
  const [vehicleName, setVehicleName] = useState('')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [vehicleModel, setVehicleModel] = useState('')
  const [ownerId, setOwnerId] = useState('')
  const [vehiclePrice, setVehiclePrice] = useState(0)

  const changeModalState = () => setShowKyc(!showKyc)

  // open or onClose
  const [openReview, setOpenReview] = useState(false)
  const closeReview = () => setOpenReview(false)

  const addReview = () => {
    if (status === 'verified') {
        setOpenReview(true)
    } else {
      setShowKyc(true)
    }
  }

  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState(0)

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [bookedDates, setBookedDates] = useState([])
  const [days, setDays] = useState<Date>(new Date())
  const url = 'http://localhost:5000/api'

  const getVehicle = async () => {
    try {
      const response = await axios.get(`${url}/getVehicle/${id}`)
      const data = response.data.data[0]
      setVehicle(response.data.data)
      setVehicleId(data._id)
      setVehicleName(data.name)
      setVehicleNumber(data.vehicleNumber)
      setOwnerId(data.userId)
      setOwnerName(data.ownerName)
      setOwnerEmail(data.ownerEmail)
      setVehicleModel(data.model)
      setVehiclePrice(data.price)
      getReview(data._id)
      setLoading(false)
      getBookings(data._id)
    } catch (error: any) {
      console.log(error)
    }
  }

  const getReview = async (vehicleId: string) => {
    try {
      const response = await axios.get(`${url}/getReview/vehicle/${vehicleId}`)
      setReview(response.data.response[0])
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleAddReview = (addedReview: any) => {
    setReview([...review, addedReview])
  }

  const deleteReview = async (reviewId: string) => {
    try {
      const response = await axios.delete(`${url}/deleteReview/${reviewId}`)
      setReview(review.filter((item: any) => item._id !== reviewId))
    } catch (error: any) {
      console.log(error.message)
    }
  }

  // to get userId who is posting vehicle
  const getUser = async () => {
    try {
      const response = await commonAxios.get(`${url}/session`)
      let details = response.data.payload
      setUserId(details.id)
      setUserName(`${details.firstName} ${details.lastName}`)
      setUserEmail(details.email)
      setStatus(details.status ? details.status : 'unverified')
      setImage(details.image)
    } catch (error: any) {
      console.log(error)
    }
  }

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  const dayDifference = (startDate: Date, endDate: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * miliseconds
    const diff = Math.round(
      Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
    )
    return diff
  }
  const correctTimezone = (e: any): Date => {
    const dateValue = new Date(e.target.value)
    const timezoneOffset = dateValue.getTimezoneOffset() * 60 * 1000 // convert minutes into miliseconds
    const newDate = new Date(dateValue.getTime() - timezoneOffset)
    return newDate
  }

  // book vehicle

  const bookVehicle = async (amount: number) => {
    try {
      const response = await axios.post(`${url}/bookVehicle`, {
        vehicleName,
        userName,
        vehicleModel,
        vehiclePrice,
        vehicleNumber,
        startDate,
        endDate,
        userId,
        ownerId,
        ownerName,
        vehicleId,
        userEmail,
        ownerEmail,
        amount
      })
      showMessage('Vehicle Booked Successfully!', 200)
      return response.data.bookingDetail._id
    } catch (error: any) {
      showMessage(error.response.data.message, 400)
      console.log(error.message)
    }
  }

  // fetch bookings

  const getBookings = async (vehicleId: string) => {
    const response = await axios.get(`${url}/booking?vehicleId=${vehicleId}`)
    const bookings = response.data.bookings

    const canReview = bookings.forEach((element: any) => {
      if (element.userId === userId) return false
    })
    console.log(userId)
    console.log(canReview)
    console.log(response.data.bookings)
    setBookedDates(response.data.bookings)
  }

  // khalti configuration
  let config = {
    // replace this key with yours
    publicKey: 'test_public_key_707fd3948d384680ac905e50372648f5',
    productIdentity: '1234567890',
    productName: 'Drogon',
    productUrl: 'http://gameofthrones.com/buy/Dragons',
    eventHandler: {
      onSuccess(payload: any) {
        // hit merchant api for initiating verfication
        let data = {
          token: payload.token,
          amount: payload.amount
        }

        // verifying the request
        const response = axios
          .get(
            `http://localhost:5000/api/khalti/verify/${payload.token}/${payload.amount}`
          )
          .then(response => {
            console.log(response)
          })

        bookVehicle(data.amount)

        // after payment lets book the vehicle for selected date
      },

      // onError handler is optional
      onError(error: any) {
        console.log(error)
      },
      onClose() {
        console.log('widget is closing')
      }
    },
    paymentPreference: ['KHALTI']
  }

  let khalti = new KhaltiCheckout(config)
  const showCheckout = (amount: number) => {
    // converting paisa into rupees
    //
    if (status === 'verified') {
      khalti.show({ amount: amount })
    } else {
      setShowKyc(true)
    }
  }

  useEffect(() => {
    getVehicle()
    getUser()
  }, [])

  return (
    <div className="container-fluid" id="vehicle-info">
      {loading && <VehicleSkeleton />}
      {vehicle.map((item: any, index: number) => {
        return (
          <div key={index}>
            <div className=" bg-white w-9/12 mx-auto mt-4 flex flex-col h-auto">
              <div className="header float-left">
                <h1 className="text-2xl text-left p-2 font-semibold">
                  {item.name + ' ' + item.model}
                </h1>
              </div>

              <div className="body h-4/5 flex justify-between">
                <div className="w-8/12 h-3/4 ">
                  <Swiper
                    navigation={true}
                    loop={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    key={index}
                  >
                    {item.carImages.map((image: any, index: number) => {
                      return (
                        <div key={index}>
                          <SwiperSlide key={index}>
                            <div className="cursor-pointer transition duration-1000 ease-linear h-3/4 position-relative">
                              <div
                                className="image w-full h-3/4 bg-green-200 rounded-sm drop-shadow-sm bg-rounded "
                                style={{
                                  backgroundImage: `url(${image.url})`,
                                  maxWidth: '100%',
                                  height: '60vh',
                                  backgroundRepeat: 'no-repeat',
                                  backgroundSize: 'cover',
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

                <div className="booking w-3/12 h-3/4 rounded-xl bg-white drop-shadow-lg py-4">
                  <div className="content date ">
                    <h1 className="text-xl font-semibold py-2">Duration</h1>
                    <div className="date-container flex flex-col gap-y-4 mt-2">
                      <div className="date-input flex justify-between w-2/3 mx-auto">
                        <label className="texl-sm">Start Date</label>
                        <input
                          name="startDate"
                          type="date"
                          value={startDate.toISOString().substr(0, 10)}
                          className="bg-white-100 rounded-sm shadow"
                          onChange={(e: any) => {
                            const newDate = correctTimezone(e)
                            setStartDate(newDate)
                          }}
                        ></input>
                      </div>

                      <div className="date-input flex justify-between w-2/3 mx-auto">
                        <label className="texl-sm">End Date</label>
                        <input
                          name="endDate"
                          type="date"
                          value={endDate.toISOString().substr(0, 10)}
                          className="bg-white-100 rounded-sm shadow"
                          onChange={(e: any) => {
                            const newDate = correctTimezone(e)
                            setEndDate(newDate)
                          }}
                        ></input>
                      </div>
                      <div className="total flex w-2/3 gap-y-4 mx-auto justify-between align-left">
                        <label className="text-left text-lg font-semibold">
                          Price
                        </label>
                        <label className="text-lg font-semibold">
                          {' '}
                          Rs {item.price + '/day'}
                        </label>
                      </div>

                      <div className="total flex w-2/3 gap-y-4 mx-auto justify-between align-left">
                        <label className="text-left text-lg font-semibold">
                          Time
                        </label>
                        <label className="text-lg font-semibold">
                          {dayDifference(startDate, endDate)} Days
                        </label>
                      </div>

                      <div className="total flex w-2/3 gap-y-4 mx-auto justify-between align-left">
                        <label className="text-left text-lg font-semibold">
                          Total
                        </label>
                        <label className="text-lg font-semibold">
                          Rs {dayDifference(startDate, endDate) * item.price}
                        </label>
                      </div>

                      <button
                        onClick={() =>
                          showCheckout(
                            dayDifference(startDate, endDate) * item.price
                          )
                        }
                        className="w-2/3 bg-indigo-500 App-btn text-white mx-auto py-2 px-1 shadow-sm rounded-sm text-xl font-semibold"
                      >
                        Book Now!{' '}
                      </button>
                      { bookedDates.length>0 && (
                        <label className="text-sm text-red-600">
                          {' '}
                          This vehicle is booked for given time below
                        </label>
                      )}

                      {bookedDates.map((booking: any, index: number) => (
                        <div
                          key={index}
                          className="p-0 px-2 flex justify-between"
                        >
                          <div className="">
                            {moment(booking.startDate).format('MMMM Do YYYY')}
                          </div>
                          <div className="">
                            <span>To</span>
                          </div>
                          <div className="">
                            {moment(booking.endDate).format('MMMM Do YYYY')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {showKyc && (
                <KycModal
                  changeModalState={changeModalState}
                  isOpen={showKyc}
                />
              )}

              <div className=" bg-white w-7/12 h-auto ">
                <div className="general-info w-3/4 flex justify-between py-2">
                  <div className="flex flex-col text-left">
                    <h3 className=" text-xl font-semibold">Milage</h3>
                    <p className=" text-sm ">{item.milage}</p>
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className=" text-xl font-semibold">Price</h3>
                    <p className=" text-sm ">{'Rs ' + item.price + '/day'}</p>
                  </div>

                  <div className="flex flex-col text-left">
                    <h3 className=" text-xl font-semibold">Location</h3>
                    <p className=" text-sm ">{item.location}</p>
                  </div>

                  <div className="flex flex-col text-left">
                    <h3 className=" text-xl font-semibold">Vehicle Number</h3>
                    <p className=" text-sm ">{item.vehicleNumber}</p>
                  </div>
                </div>
                <div className="description mb-5">
                  <h2 className="text-xl text-left">Description</h2>
                  <p className="text-left">{parser(item.description)}</p>
                </div>
              </div>

              <button
                className="post-review App-btn w-1/6 p-2 rounded-sm mb-3"
                onClick={addReview}
              >
                Post Review
              </button>
              {openReview && (
                <ReviewModal
                  open={closeReview}
                  vehicleId={vehicleId}
                  userName={userName}
                  userId={userId}
                  image={image}
                  handleAddReview={handleAddReview}
                />
              )}
              <div className="reviews grid grid-cols-3 gap-2 ">
                {review.map((item: any, index: number) => {
                  return (
                    <>
                      <Review
                        key={index}
                        review={item.review}
                        rating={item.rating}
                        createdOn={item.createdOn}
                        userName={item.userName}
                        currentUserId={userId}
                        image={item.image}
                        vehicleId={vehicleId}
                        userId={item.userId}
                        reviewId={item._id}
                        deleteReview={deleteReview}
                      />
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Vehicle
