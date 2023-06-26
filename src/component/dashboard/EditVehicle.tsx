import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import { useParams } from 'react-router-dom'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import PreviewImage from './PreviewImage'
import { GiCancel } from 'react-icons/gi'
import '../../index.css'
import SyncLoader from 'react-spinners/SyncLoader'

interface image {
  public_id: string | null
  url: string | null
}

interface vehicleType {
  name: string
  model: string
  price: number
  milage: number
  seat: number
  location: string
  description: string
  vehicleNumber: string
  carImages: any
  bluebookImage: any
  insuranceImage: any
}

const EditVehicle = () => {
  const [id, setId] = useState(useParams().id)
  const [image, setImage] = useState('')
  const [vehicle, setVehicle] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [categories, setCategories] = useState([])
  const [newImages, setNewImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [singleCategory, setSingleCategory] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedOptionName, setSelectedOptionName] = useState('')

  const url = 'http://localhost:5000/api'

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  const getVehicle = async () => {
    try {
      const response = await axios.get(`${url}/getVehicle/${id}`)
      setVehicle(response.data.data)
      const data = response.data.data[0]
      let carImages = response.data.data[0].carImages
      console.log(carImages)
      setSelectedImages(carImages)
      setSelectedOption(data.categoryId)
      setSelectedOptionName(data.categoryName)
    } catch (error) {
      console.log(error)
    }
  }

  const onSelectFile = (event: any) => {
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)

    const imagesArray = selectedFilesArray.map((file: any) => {
      return file
    })

    setNewImages((previousImages: any) => previousImages.concat(imagesArray))
    // FOR BUG IN CHROME
    event.target.value = ''
  }

  // get category
  const getCategories = async () => {
    try {
      const response = await axios.get(`${url}/getCategory`)
      setCategories(response.data.response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value)

    // to get the name of option
    const selectedOption = event.target.options[event.target.selectedIndex]
    const selectedOptionName = selectedOption.getAttribute('data-name')
    setSelectedOptionName(selectedOption.getAttribute('data-name'))
  }

  // delete image
  function deleteHandler(image: any) {
    setSelectedImages(selectedImages.filter(e => e !== image))
  }

  // delete  new image
  function deleteNewImage(image: any) {
    setNewImages(newImages.filter(e => e !== image))
  }

  const editVehicle = async (values: vehicleType) => {
    setLoading(true)
    var form: any = new FormData()
    form.append('name', values.name)
    form.append('model', values.model)
    form.append('price', values.price)
    form.append('milage', values.milage)
    form.append('seat', values.seat)
    form.append('location', values.location)
    form.append('description', values.description)
    form.append('vehicleNumber', values.vehicleNumber)
    form.append('categoryId', selectedOption)
    form.append('categoryName', selectedOptionName)

    if (values.bluebookImage) form.append('bluebookImage', values.bluebookImage)
    if (values.insuranceImage)
      form.append('insuranceImage', values.insuranceImage)
    // for image
    {
      selectedImages.map((prevImage: any) => {
        form.append('prevImage', JSON.stringify(prevImage))
      })
    }
    // for newImageArray

    if (newImages.length !== 0) {
      newImages.map((image: image) => {
        form.append('image', image)
      })
    }

    try {
      const response = await axios.put(`${url}/updateVehicle/${id}`, form)
      setLoading(false)
      showMessage('Vehicle Updated Successfully! ', 200)
    } catch (error: any) {
      setLoading(false)
      showMessage(error.message, 400)
    }
  }

  useEffect(() => {
    getVehicle()
    getCategories()
  }, [setSelectedImages])

  return (
    <div className="w-full float-right h-screen p-0 px-5">
      <div className="dashboard-home bg-white main-profile w-full mx-auto  rounded shadow-xl">
        <div className="w-full px-5 mx-auto">
          <h1 className="text-left text-2xl font-semibold py-3">
            Edit Vehicle
          </h1>
        </div>
        {vehicle.map((item: any) => {
          return (
            <>
              <Formik
                initialValues={{
                  name: item.name,
                  model: item.model,
                  price: item.price,
                  milage: item.milage,
                  seat: item.seat,
                  location: item.location,
                  description: item.description,
                  vehicleNumber: item.vehicleNumber,
                  categoryName: item.categoryName,
                  selectedOption: item.categoryId,
                  carImages: null,
                  bluebookImage: null,
                  insuranceImage: null
                }}
                onSubmit={(values, { resetForm }) => {
                  //addVehicle(values)
                  editVehicle(values)
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
                  <Form className=" flex flex-col gap-4 w-full px-5 h-5/6 mx-auto mt-3 ">
                    <div className="flex justify-between">
                      <div className="flex flex-col w-2/5">
                        <label className="text-left">Name</label>
                        <Field
                          type="text"
                          className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                          placeholder="Name "
                          name="name"
                          // validate={validateOldPassword}
                        />
                        {/*                             {errors.newPassword && touched.newPassword && (
                              <div className="text-left text-xs text-red-700 mt-1">
                                {errors.newPassword}
                              </div>
                            )}
                             */}
                      </div>
                      <div className="flex flex-col w-1/4">
                        <label className="text-left">Model</label>
                        <Field
                          type="text"
                          className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                          placeholder="Model"
                          name="model"
                        />
                      </div>

                      <div className="flex flex-col w-1/4">
                        <label className="text-left">Price</label>
                        <Field
                          type="number"
                          className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                          placeholder="price"
                          name="price"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col w-2/5">
                        <label className="text-left">Location</label>
                        <Field
                          type="text"
                          className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                          placeholder="Seat"
                          name="location"
                        />
                      </div>
                      <div className="flex flex-col w-1/4">
                        <label className="text-left">Milage</label>
                        <Field
                          type="number"
                          className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                          placeholder="Milage"
                          name="milage"
                        />
                      </div>

                      <div className="flex flex-col w-1/4">
                        <label className="text-left">Seat</label>
                        <Field
                          type="number"
                          className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                          placeholder="seat"
                          name="seat"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col w-2/5">
                        <label className="text-left">Vehicle Number</label>
                        <Field
                          type="text"
                          className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                          placeholder="vehicleNumber"
                          name="vehicleNumber"
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
                              <option
                                key={index}
                                data-name={item.name}
                                value={item._id}
                              >
                                {item.name}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>

                    {loading && (
                      <div className="">
                        <SyncLoader
                          loading={true}
                          size={15}
                          color="#593cfb"
                          speedMultiplier={0.5}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </div>
                    )}

                    <div className="flex justify-between">
                      <div className="flex flex-col w-2/5">
                        <label className="text-left">Vehicle Image</label>
                        <input
                          type="file"
                          className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                          name="carImages"
                          onChange={onSelectFile}
                        />
                        <div className="images flex">
                          {newImages &&
                            newImages.map((image: any, index: number) => {
                              return (
                                <div key={index} className="image relative">
                                  <PreviewImage file={image} />
                                  <button
                                    className="absolute top-0 right-0 color-gray-200 "
                                    onClick={() => deleteNewImage(image)}
                                  >
                                    <GiCancel />
                                  </button>
                                </div>
                              )
                            })}

                          {selectedImages &&
                            selectedImages.map((image: any, index: number) => {
                              return (
                                <div key={index} className="image relative">
                                  <img
                                    src={image.url}
                                    width="200px"
                                    height="200px"
                                  ></img>{' '}
                                  <button
                                    className="absolute top-0 right-0 color-gray-200 "
                                    onClick={() => deleteHandler(image)}
                                  >
                                    <GiCancel />
                                  </button>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex flex-col w-2/5">
                        <label className="text-left">Insurance Image</label>
                        <input
                          type="file"
                          className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                          placeholder="insuranceImage"
                          name="insuranceImage"
                          onChange={(e: any) => {
                            setFieldValue('insuranceImage', e.target.files[0])
                          }}
                        />

                        {values.insuranceImage == null &&
                          item.insuranceImage.url && (
                            <img
                              src={item?.insuranceImage?.url}
                              width="200px"
                              height="200px"
                            ></img>
                          )}

                        {values.insuranceImage && (
                          <PreviewImage file={values.insuranceImage} />
                        )}
                      </div>

                      <div className="flex flex-col w-2/5">
                        <label className="text-left">Bluebook Image</label>
                        <input
                          type="file"
                          className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                          placeholder="bluebookImage"
                          name="bluebookImage"
                          onChange={(e: any) => {
                            setFieldValue('bluebookImage', e.target.files[0])
                          }}
                        />

                        {values.bluebookImage == null &&
                          item.bluebookImage.url && (
                            <img
                              src={item?.bluebookImage?.url}
                              width="200px"
                              height="200px"
                            ></img>
                          )}
                        {values.bluebookImage && (
                          <PreviewImage file={values.bluebookImage} />
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between w-full h-auto">
                      <CKEditor
                        editor={ClassicEditor}
                        data={values.description}
                        onReady={(editor: any) => {
                          // You can store the "editor" and use when it is needed.
                        }}
                        onChange={(event: any, editor: any) => {
                          const data = editor.getData()
                          setFieldValue('description', data)
                        }}
                      />
                    </div>
                    <button
                      className="login-btn"
                      type="submit"
                      style={{ width: '20%' }}
                    >
                      Update
                    </button>
                  </Form>
                )}
              </Formik>
            </>
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

export default EditVehicle
