import React from 'react'
import axios from 'axios'
import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { useTable } from 'react-table'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import { useParams } from 'react-router-dom'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import PreviewImage from '../dashboard/PreviewImage'
import Table from '../table/Table'
import { StatusPill, CreatedDate } from '../table/Status'
import { ActionButtons } from '../table/Button'

interface passwordType {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
interface userType {
  id: string
}
function VehicleList() {
  const url = 'http://localhost:5000/api'
  const [vehicles, setVehicles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [addVehicleModal, setAddVehicleModal] = useState(false)
  const [vehicleId, setVehicleId] = useState(0)
  const [request, setRequest] = useState(false)
  const fileRef = useRef(null)

  const getUsers = async () => {
    try {
      const response = await axios.get(`${url}/getVehicle`)
      setVehicles(response.data.vehicles)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteVehicle = (id: number) => {
    setShowModal(true)
    setVehicleId(id)
  }

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  {
    /* add vehicle */
  }
  const addVehicle = async (formik: passwordType) => {
    const url = 'http://localhost:5000/api'
  }

  useEffect(() => {
    getUsers()
  }, [])

  //new method

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'name',
        sticky: 'left'
      },

      {
        Header: 'Model ',
        Footer: 'Model',
        accessor: 'model'
      },
      {
        Header: 'Price ',
        Footer: 'Price',
        accessor: 'price',
        sticky: 'left'
      },

      {
        Header: 'Mileage',
        Footer: 'Mileage',
        accessor: 'milage'
      },

      {
        Header: 'Created On',
        Footer: 'Created on',
        accessor: 'createdOn',
        Cell: CreatedDate
      },

      {
        Header: 'Status',
        Footer: 'Status',
        accessor: 'status',
        Cell: StatusPill
      },

      {
        Header: 'Action',
        Footer: 'vehicles',
        accessor: '_id',
        User: 'admin',
        Cell: ({ value, row, column }: any) => {
          return (
            <ActionButtons
              value={value}
              column={column}
              deleteVehicle={deleteVehicle}
            />
          )
        }
      }
    ],

    []
  )

  const [data, setData] = useState([])

  const fetchData = async () => {
    const response: any = await axios(`${url}/getVehicle`).catch(err =>
      console.log(err)
    )
    console.log('data')
    console.log(response.data.vehicles)
    setData(response.data.vehicles)
  }

  const confirmDelete = useCallback(async () => {
    setShowModal(false)
    try {
      const response = await axios.delete(`${url}/deleteVehicle/${vehicleId}`)
      setData(data.filter((item: any)=> item._id != vehicleId))
      console.log(response)
      showMessage(response.data.message, 200)
    } catch (error) {
      showMessage("Couldn't Delete Vehicle", 400)
    }
  }, [vehicleId, data])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="float-right h-screen w-full p-0 px-5">
      <div
        className="dashboard-home bg-white main-profile w-full mx-auto  rounded shadow-xl"
        style={{ height: '90vh' }}
      >
        <div className="w-full px-5 py-3 mx-auto">
          <h1 className="text-left text-2xl font-semibold ">Manage Vehicles</h1>
        </div>
        <div className="user-table w-full px-5 mx-auto">
          <Table column={columns} mockData={data} />
        </div>

        <div className=" mt-3 w-full px-5 float-left ">
          <Link to="/admin/dashboard-vehicles/addVehicle">
            <button className="border float-left py-2 px-1 text-white rounded App-btn btn text-xs font-medium">
              Add vehicle
            </button>
          </Link>
        </div>
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
                    Are you sure you want to delete this Vehicle?
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
                    onClick={() => {
                      confirmDelete()
                      setShowModal(false)
                    }}
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

export default VehicleList
