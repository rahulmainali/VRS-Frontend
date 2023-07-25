// src/shared/Button.js
import React from 'react'
import { classNames } from './utils'
import { Link } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiEditAlt } from 'react-icons/bi'

export function Button({ children, className, ...rest }: any) {
  return (
    <button
      type="button"
      className={classNames(
        'relative inline-flex  active:bg-gray-500 active:border-gray-300 justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function PageButton({ children, className, ...rest }: any) {
  return (
    <button
      type="button"
      className={classNames(
        'relative inline-flex items-center justify-center px-2 py-2 active:bg-gray-500 active:border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

interface ButtonProps {
  value: any
  deleteVehicle: (id: number) => void
  column: any

  // 👇️ turn off type checking
}

export function ActionButtons({ value, column, deleteVehicle }: ButtonProps) {
  return (
    <>
      <div>
        {column.User === 'admin' ? (
          <Link to={`/${column.User}/dashboard-${column.Footer}/edit/${value}`}>
            <button
              type="button"
              className="relative inline-flex  active:bg-green-100 active:border-gray-300 justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-green-100 hover:bg-green-300"
            >
              <span>
                <BiEditAlt />
              </span>
            </button>
          </Link>
        ) : column.User === 'admin-section' ? (
          <></>
        ) : (
          <Link to={`/dashboard-${column.Footer}/edit/${value}`}>
            <button
              type="button"
              className="relative inline-flex  active:bg-green-100 active:border-gray-300 justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-green-100 hover:bg-green-300"
            >
              <span>
                <BiEditAlt />
              </span>
            </button>
          </Link>
        )}
        <button
          type="button"
          className="relative inline-flex  ml-2 active:bg-gray-500 active:border-gray-300 justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-red-400 hover:bg-red-600 "
          onClick={() => {
            deleteVehicle(value)
          }}
        >
          <span>
            <RiDeleteBin6Line />
          </span>
        </button>
      </div>
    </>
  )
}

// Avatar
export function AvatarCell({ value, column, row }: any) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img className="h-10 w-10 rounded-full" src={value} alt="" />
      </div>
    </div>
  )
}
