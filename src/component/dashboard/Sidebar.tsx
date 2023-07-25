import React from 'react'
import { SidebarData } from './SidebarData'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'

interface sidebarItem {
  title: string
  path: string
  icon: any
  cName: string
}

const Sidebar = () => {
  const url = 'http://localhost:5000/api'
  const [user, setUser] = useState({})
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState()
  const [role, setRole] = useState()

  // redux
  const userRole = useAppSelector(state => state.login.role)

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
      setUser(details)
      setUserName(details.firstName + ' ' + details.lastName)
      setEmail(details.email)
      setRole(details.role)
    } catch (error: any) {
      console.log('error')
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 bg-gray-900 text-white shadow w-[15vw] fixed top-0 left-0">
        <div className="space-y-3">
          <div className="flex items-center border-solid border-2 border-white-600 ">
            <h2 className="text-2xl font-bold text-center mx-auto align-middle m-0 p-3">
              Dashboard
            </h2>
          </div>
          <div className="flex-1">
            <ul className="p-0 space-y-1 text-sm">
              {SidebarData.map((item: sidebarItem, index: number) => {
                return (
                  <li key={index} className="rounded-sm">
                    {userRole == 'admin' && (
                      <Link
                        to={item.path}
                        key={index}
                        className="flex  no-underline text-white items-center p-2 space-x-3 rounded-md"
                      >
                        <li className="text-2xl">{item.icon}</li>
                        <span className="p-3 text-xl">{item.title}</span>
                      </Link>
                    )}
                    {userRole == 'user' &&
                      item.title != 'Users' &&
                      item.title != 'Kyc' && (
                        <Link
                          to={item.path}
                          key={index}
                          className="flex  no-underline text-white items-center p-2 space-x-3 rounded-md"
                        >
                          <li className="text-2xl">{item.icon}</li>
                          <span className="p-3 text-xl">{item.title}</span>
                        </Link>
                      )}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex items-center absolute bottom-0 border-solid  ">
            <Link to="/">
              <h2 className="text-sm  text-center text-slate-50 mx-auto align-middle m-0 p-3 underline">
                {' '}
                Back to website
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
