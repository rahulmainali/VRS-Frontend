import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment'
import ViewVehicleRequest from './ViewVehicleRequest'

type image = {
  public_id: string
  url: string
}

interface User {
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
  category: string
  status: string
  seat: string
  categoryName: string
  _id: string
  carImages: Array<image>
}

interface UserListProps {
  users: User[]
}

const VehicleRequest = () => {
  const url = 'http://localhost:5000/api'
  const [user, setUser] = useState([])
  const [singleUser, setSingleUser] = useState()
  const [showModal, setShowModal] = useState(false)
  const [userId, setUserId] = useState(0)
  const [request, setRequest] = useState(false)

  const [toggle, setToggle] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleViewButtonClick = (user: User) => {
    console.log(user)
    setToggle(false)
    setSelectedUser(user)
  }

  const getRequests = async () => {
    try {
      const response = await axios.get(`${url}/vehicleRequest`)
      setUser(response.data.data)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteUser = (id: number) => {
    setShowModal(true)
    setUserId(id)
  }

  const confirmDelete = async () => {
    setShowModal(false)
    try {
      const response = await axios.delete(`${url}/deleteUser/${userId}`)
      console.log(response)
      showMessage(response.data.message, 200)
      if (request) {
        setRequest(false)
      } else {
        setRequest(true)
      }
    } catch (error) {
      showMessage("Couldn't Delete User", 400)
    }
  }

  // verify user

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  useEffect(() => {
    getRequests()
  }, [request])

  return (
    <div className="float-right h-screen px-5 p-0 w-full">
      <div
        className="dashboard-home bg-white main-profile w-full mx-auto  rounded shadow-xl"
        style={{ height: '90vh' }}
      >
        {toggle ? (
          <>
            <div className="w-full m-0 p-0 px-5  mx-auto">
              <h1 className="text-left text-2xl font-semibold p-2">
                Vehicle Listing Requests
              </h1>
            </div>
            {user.length == 0 && <>No New Vehicle Requests Found</>}
            {user.length != 0 && (
              <div className="px-5">
                <table className="table-auto mt-3 w-full mx-auto rounded-xl shadow-xl bg-slate-100 border-collapse border border border-slate-400">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Vehicle Number</th>
                      <th>Price</th>
                      <th>Mileage</th>
                      <th>Posted</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((singleUser: any, index: number) => {
                      return (
                        <>
                          <tr
                            key={index}
                            className={
                              index % 2 == 0 ? 'bg-slate-50' : 'bg-slate-100'
                            }
                          >
                            <td className="border border-slate-300 " width="5%">
                              {index + 1}
                            </td>
                            <td className="border border-slate-300 px-3 text-left">
                              {singleUser.name + ' ' + singleUser.model}
                            </td>
                            <td className="border border-slate-300  text-left px-3">
                              {singleUser.vehicleNumber}
                            </td>

                            <td className="border border-slate-300  text-left px-3">
                              {`${singleUser.price}/day`}
                            </td>

                            <td className="border border-slate-300  text-left px-3">
                              {`${singleUser.milage}`}
                            </td>

                            <td className="border border-slate-300  ">
                              {moment
                                .utc(singleUser.createdOn)
                                .format('MM/DD/YYYY')}
                            </td>
                            <td className="border border-slate-300">
                              {singleUser.status}
                            </td>
                            <td className="border border-slate-300 align-left ">
                              <button
                                className="border bg-green-500 text-white text-sm px-4 mt-1 py-2 mb-2 rounded :hover-bg-green-700"
                                onClick={() =>
                                  handleViewButtonClick(singleUser)
                                }
                              >
                                View
                              </button>

                            </td>
                          </tr>
                        </>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}{' '}
          </>
        ) : (
          <>
            {selectedUser && (
              <div>
                <ViewVehicleRequest userData={selectedUser} />
              </div>
            )}
          </>
        )}
        {showModal ? (
          <div
            id="popup-modal"
            tabIndex={-1}
            className="fixed top-0 left-0 right-0 z-50  flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          >
            <div className="relative w-full h-full max-w-md md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this user?
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={confirmDelete}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div></div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
export default VehicleRequest
