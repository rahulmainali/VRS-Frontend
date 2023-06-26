import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import { useParams } from 'react-router-dom'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import PreviewImage from './PreviewImage'
import SyncLoader from 'react-spinners/SyncLoader'

import '../../index.css'

const EditCategory = () => {
  const [image, setImage] = useState('')
  const [id, setId] = useState(useParams().id)
  const [categories, setCategories] = useState([])
  const [singleCategory, setSingleCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const url = 'http://localhost:5000/api'

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }
  const updateCategory = async (values: any) => {
    setLoading(true)
    var form: any = new FormData()
    form.append('name', values.name)
    form.append('slug', values.name)
    if (selectedOption) {
      form.append('parentId', selectedOption)
    }

    // if image is changed

    if (values.image) form.append('image', values.image)

    try {
      const response = await axios.put(`${url}/updateCategory/${id}`, form)
      setLoading(false)
      showMessage('Category Posted Successfully! ', 200)
    } catch (error: any) {
      showMessage(error.message, 400)
    }
  }

  // get category for parent
  const getCategories = async () => {
    try {
      const response = await axios.get(`${url}/getCategory`)
      setCategories(response.data.response)
    } catch (error) {
      console.log(error)
    }
  }

  // get single category

  const getSingleCategory = async () => {
    try {
      const response = await axios.get(`${url}/getCategory/${id}`)
      setSingleCategory(response.data.response)
      setSelectedOption(response.data.response[0].parentId)
      console.log(response.data.response[0].parentId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value)
  }

  useEffect(() => {
    getCategories()
    getSingleCategory()
  }, [])
  return (
    <div
      className={` w-full p-0 px-5 float-right h-screen ${
        loading ? 'spinner-fade' : ''
      } `}
    >
    {loading &&
  <div className="spinner">
        <SyncLoader
          loading={true}
          size={15}
          color="#593cfb"
          speedMultiplier={0.5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
     
    }
     <div className="dashboard-home bg-white main-profile w-full mx-auto  rounded shadow-xl">
        <div className="w-11/12 mx-auto">
          <h1 className="text-left text-2xl font-semibold p-2">
            Edit Category
          </h1>
        </div>
        {singleCategory?.map((item: any, index: number) => {
          return (
            <div key={index}>
              <Formik
                initialValues={{
                  name: item.name,
                  image: null
                }}
                onSubmit={(values, { resetForm }) => {
                  //addVehicle(values)
                  updateCategory(values)
                }}
              >
                {({
                  errors,
                  touched,
                  isValidating,
                  resetForm,
                  values,
                  setFieldValue
                }) => (
                  <Form className=" flex flex-col gap-4 w-5/6 h-5/6 mx-auto mt-1 py-5">
                    <div className="flex justify-between">
                      <div className="flex flex-col w-2/5">
                        <label className="text-left">Name</label>
                        <Field
                          type="text"
                          className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                          placeholder="Name "
                          name="name"
                        />
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="text-left">Parent Category</label>
                        <select
                          value={selectedOption}
                          onChange={handleSelectChange}
                        >
                          <option value="" disabled selected>
                            Select
                          </option>

                          {categories.map((item: any, index: number) => {
                            return (
                              <option key={index} value={item._id}>
                                {item.name}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex flex-col w-2/5">
                        <label className="text-left">Category Image</label>
                        <input
                          type="file"
                          className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                          placeholder="image"
                          name="image"
                          onChange={(e: any) => {
                            setFieldValue('image', e.target.files[0])
                          }}
                        />

                        {values.image === null && item.image.url && (
                          <img
                            src={item?.image?.url}
                            width="200px"
                            height="200px"
                          ></img>
                        )}

                        {values.image && <PreviewImage file={values.image} />}
                      </div>
                    </div>

                    <button
                      className="w-1/4 float-left login-btn"
                      type="submit"
                      style={{ width: '20%' }}
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          )
        })}

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
    </div>
  )
}

export default EditCategory
