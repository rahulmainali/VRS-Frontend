import React, { useState } from 'react'
import EditReviewModal from './EditReviewModal'
import { ToastContainer, toast } from 'react-toastify'
import ReactStars from 'react-rating-stars-component'
import commonAxios from '../api/commonAxios'

function Review({
  review,
  createdOn,
  rating,
  reviewId,
  userName,
  userId,
  vehicleId,
  currentUserId,
  image,
  deleteReview
}: any) {
  const [edit, setEdit] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editedReview, setEditedReview] = useState(review)
  const [editedRating, setEditedRating] = useState(rating)
  console.log(image)

  const closeEditModal = () => {
    setEditModal(false)
  }
  const openEditModal = () => {
    setEditModal(true)
    setEdit(false)
  }

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode === 201 || statusCode === 200) toast.success(message)
    else toast.error(message)
  }

  const updateReview = async (
    e: any,
    rating: any,
    review: any,
    reviewId: any
  ) => {
    e.preventDefault()
    console.log('newRating ' + rating)

    setEditedReview(review)
    setEditedRating(rating)

    try {
      const response = await commonAxios.put(`/updateReview/${reviewId}`, {
        rating: rating,
        review: review
      })
      showMessage('Review Updated Successfully', 200)
    } catch (error: any) {
      showMessage(error.message, 200)
    }
    setEditModal(false)
  }

  return (
    <div>
      <article className=" shadow p-2 rounded-xl mb-5 relative">
        <div className="flex  items-center mb-4 space-x-4">
          <img
            className="w-10 h-10 rounded-full"
            src= {image.url}
            alt=""
          />
          <div className="space-y-1 font-medium dark:text-white">
            <p>
              {userName}
              <time
                dateTime="2014-08-16 19:00"
                className="block text-sm text-gray-500 dark:text-gray-400"
              >
                {createdOn}
              </time>
            </p>
          </div>
          {userId === currentUserId && (
            <>
              <div
                className="absolute top-0  right-0 gap-y-1 p-3 flex flex-col cursor-pointer"
                onClick={() => setEdit(!edit)}
              >
                <div className="h-1 w-1 rounded-full color-gray-900 bg-gray-700 flex-end"></div>
                <div className="h-1 w-1 rounded-full color-gray-900 bg-gray-700"></div>
                <div className="h-1 w-1 rounded-full color-gray-900 bg-gray-700"></div>
              </div>
              {edit && (
                <div className=" flex shadow p-2 text-left w-1/3 flex-col absolute right-0 top-9 ">
                  <button
                    className="text-left "
                    onClick={() => openEditModal()}
                  >
                    Edit
                  </button>
                  <button
                    className="text-left"
                    onClick={() => deleteReview(reviewId)}
                  >
                    Delete
                  </button>
                </div>
              )}
              {editModal && (
                <EditReviewModal
                  userName={userName}
                  rating={editedRating}
                  vehicleId={vehicleId}
                  review={editedReview}
                  open={openEditModal}
                  close={closeEditModal}
                  reviewId={reviewId}
                  updateReview={updateReview}
                />
              )}
            </>
          )}
        </div>
        {editedRating && (
          <ReactStars
          key={editedRating}
            count={5}
            value={editedRating}
            isHalf={true}
            edit={false}
            size={24}
            activeColor="#ffd700"
          />
        )}
        <div className="flex items-center mb-1"></div>
        <p className="mb-2 text-gray-500 dark:text-gray-400">{editedReview}</p>
      </article>
    </div>
  )
}

export default Review
