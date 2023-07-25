import React, { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import ReactStars from 'react-rating-stars-component'
import commonAxios from '../api/commonAxios'

function ReviewModal({
  open,
  userId,
  vehicleId,
  userName,
  image,
  handleAddReview
}: any) {
  const [rating, setRating] = useState(0)
  const ratingChanged = (newRating: any) => {
    console.log(newRating)
    setRating(newRating)
  }

  const reviewRef = useRef<any>(null)

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  const postReview = async (e: any) => {
    e.preventDefault()
    try {

      const userData = await commonAxios.get(`/getUser/${userId}`)
      const addedReview = {}
      const response = await commonAxios.post('/postReview', {
        rating: rating,
        review: reviewRef?.current?.value,
        userId: userId,
        vehicleId: vehicleId,
        userName: userName,
        image: userData.data.data.image,
      })
      console.log(response.data.response)
      handleAddReview(response.data.response)

      showMessage('Review Posted Successfully', 200)
    } catch (error: any) {
      showMessage('Duplicate review is not allowed', 400)
    }
    open()
  }
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed top-0 left-0 right-0 z-50  flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-5">
          <label>Rating and Review</label>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
          <form onSubmit={postReview} className="flex flex-col">
            <button
              type="button"
              onClick={() => open()}
              className="absolute top-3 right-2.5 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <textarea
              placeholder="write your review"
              ref={reviewRef}
              className="p-2 mt-3 mb-3 rounded-sm resize-y rounded-md "
            ></textarea>

            <button className="App-btn p-3 rounded-sm" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
