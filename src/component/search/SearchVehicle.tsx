import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import Slider from 'react-slider'
import MultiSelect from './MultiSelect'
import VehicleCardFooter from './VehicleCardFooter'
import axios from 'axios'

function SearchVehicle() {
  const urlLocation = useLocation()
  const parser = require('html-react-parser')
  const url = 'http://localhost:5000/api'
  const searchParams = new URLSearchParams(urlLocation.search)
  const [vehicleName, setVehicleName] = useState<string | null>('')
  const [categoryName, setCategoryName] = useState<string | null>('')
  const [vehicles, setVehicles] = useState([])
  const [categoryList, setCategoryList] = useState<any>([])
  const locationRef = useRef<HTMLInputElement>(null)

  // filters

  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })
  const [location, setLocation] = useState('')

  const searchVehicle = async (
    name: string,
    category: string,
    location: string
  ) => {
    console.log(category)
    if (name) {
      const { data } = await axios.get(`${url}/search?name=${name}`)
      setVehicles(data.data)
    } else if (category && location) {
      const response = await axios.get(
        `${url}/search?category=${category}&location=${location}`
      )
      setVehicles(response.data.data)
      console.log(response)
    } else if (category) {
      const response = await axios.get(`${url}/search?category=${category}`)
      setVehicles(response.data.data)
      console.log(response)
    } else if (location) {
      const response = await axios.get(`${url}/search?location=${location}`)
      setVehicles(response.data.data)
      console.log(response)
    } else {
      setVehicles([])
    }
  }

  const searchAllVehicle = async () => {
    if (urlLocation.search === '') {
      const { data } = await axios.get(`${url}/search?`)
      setVehicles(data.data)
    }
  }

  const getCategory = async () => {
    try {
      const response = await axios.get(`${url}/getCategory`)
      setCategoryList(response.data.response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setVehicleName(searchParams.get('name' || ''))
    searchVehicle(
      searchParams.get('name') || '',
      searchParams.get('category') || '',
      searchParams.get('location') || ''
    )
  }, [urlLocation.search])

  useEffect(() => {
    searchAllVehicle()
    getCategory()
  }, [])
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <div className="container flex  gap-3 mt-5">
        <div className="w-1/5 p-3 rounded border-gray-200 shadow-sm h-fit !important">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className=" text-left block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                className="form-select block w-full py-2 px-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categoryList?.map((item: any, index: number) => {
                  return (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-left text-gray-700 font-bold mb-2"
                htmlFor="priceRange"
              >
                Location
              </label>
              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder='Search location...'
                  value={location}
                  onChange={(event: any) => {
                    setLocation(event.target.value)
                  }}
                  className="w-full"
                ></input>
              </div>
            </div>
            {/* repeat the above for the other filters */}
            <div className="mt-8">
              <Link
                to={`/search?category=${category}&location=${location}`}
              >
                <button className="App-btn align-left flex-start text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                  Search
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="search-lists flex-1 gap-3 min-h-screen">
          {vehicles.map((vehicle: any, index: number) => {
            return (
              <div key={index} className="mb-3">
                <Link
                  to={`/vehicle/${vehicle._id}`}
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-3/4"
                >
                  <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={vehicle.carImages[0].url}
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl text-left font-bold tracking-tight text-gray-900 dark:text-white">
                      {vehicle.name + ' ' + vehicle.model}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 important! text-left text-sm">
                      {vehicle.description
                        .replace(/<[^>]+>/g, '')
                        .replace(/&nbsp;/g, '')
                        .slice(0, 150) + '...........'}
                    </p>
                    <VehicleCardFooter
                      location={vehicle.location}
                      price={vehicle.price}
                    />
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default SearchVehicle
