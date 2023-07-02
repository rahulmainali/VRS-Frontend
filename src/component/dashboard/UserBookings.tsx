import React from 'react'
import axios from 'axios'
import { useEffect, useState, useRef, useMemo } from 'react'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import { useParams } from 'react-router-dom'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import PreviewImage from './PreviewImage'

import Table from '../table/Table'
import { StatusPill, CreatedDate } from '../table/Status'
import { ActionButtons } from '../table/Button'

function UserBookings() {
  const url = 'http://localhost:5000/api'
  const [userId, setUserId] = useState('')
  const [bookings, setBookings] = useState([])

  // to get userId who is posting vehicle
  const getUser = async () => {
    try {
      const response = await axios.get(`${url}/session`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      let details = response.data.payload
      console.log(details)
      setUserId(details.id)
      fetchData(details.id)
    } catch (error: any) {
      console.log(error)
    }
  }

  const getVehicle = async () => {}

  useEffect(() => {
    getUser()
  }, [])

  //new method

  const columns = useMemo(
    () => [
      {
        Header: 'Vehicle Name',
        Footer: 'vehicleName',
        accessor: 'vehicleName',
        sticky: 'left'
      },

      {
        Header: 'Model ',
        Footer: 'Model',
        accessor: 'vehicleModel'
      },

      {
        Header: 'Price ',
        Footer: 'Price',
        accessor: 'vehiclePrice',
        sticky: 'left'
      },

      {
        Header: 'Booking Date',
        Footer: 'Created on',
        accessor: 'createdOn',
        Cell: CreatedDate
      },

      {
        Header: 'Start Date',
        Footer: 'State Date',
        accessor: 'startDate',
        Cell: CreatedDate
      },

      {
        Header: 'End Date',
        Footer: 'End Date',
        accessor: 'endDate',
        Cell: CreatedDate
      },
      {
        Header: 'Status',
        Footer: 'Status',
        accessor: 'status',
        Cell: StatusPill
      },
      {
        Header: 'Amount',
        Footer: 'Amount',
        accessor: 'amount'
      }
    ],

    []
  )

  const [data, setData] = useState([])

  const fetchData = async (userId: number) => {
    const response: any = await axios(`${url}/booking?userId=${userId}`).catch(
      err => console.log(err)
    )

    setData(response.data.bookings)
    console.log(response.data.bookings)
  }

  return (
    <div className=" w-full p-0 px-5 float-right h-screen ">
      <div
        className="dashboard-home bg-white main-profile w-full mx-auto  rounded shadow-xl"
        style={{ height: '90vh' }}
      >
        <div className="mx-auto w-full px-5">
          <h1 className="text-left text-2xl font-semibold py-3">
            Vehicle Bookings
          </h1>
          <div className="user-table w-full mx-auto">
            <Table column={columns} mockData={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBookings
