import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import { useParams } from 'react-router-dom'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import PreviewImage from './PreviewImage'
import '../../index.css'
import axiosConfig from '../../api/axiosConfig'
import SyncLoader from 'react-spinners/SyncLoader'
import { GiCancel } from 'react-icons/gi'

interface vehicleType {
    name: string
    model: string
    price: number
    milage: number
    seat: number
    location: string
    description: string
    vehicleNumber: string
    images: any
    bluebookImage: any
    insuranceImage: any
}


const AddVehicle = () => {
    const [image, setImage] = useState('')
    const [userId, setUserId] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('')
    const url = 'http://localhost:5000/api'
    const [selectedImages, setSelectedImages] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedOptionName, setSelctedOptionName] = useState('')
    const [loading, setLoading] = useState(false)

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
            setOwnerName(details.firstName + ' ' + details.lastName)
            setOwnerEmail(details.email)
        } catch (error: any) {
            console.log(error)
        }
    }

    const showMessage = (message: string, statusCode: number) => {
        if (statusCode == 201 || statusCode == 200) toast.success(message)
        else toast.error(message)
    }

    const onSelectFile = (event: any) => {
        const selectedFiles = event.target.files
        const selectedFilesArray = Array.from(selectedFiles)

        const imagesArray = selectedFilesArray.map((file: any) => {
            return file
        })

        setSelectedImages((previousImages: any) =>
            previousImages.concat(imagesArray)
        )
        console.log(selectedFilesArray)

        // FOR BUG IN CHROME
        event.target.value = ''
    }

    // delete image
    function deleteHandler(e: any, image: any) {
        e.preventDefault()
        setSelectedImages(selectedImages.filter(e => e !== image))
        URL.revokeObjectURL(image)
    }

    //get category to show in parent categories

    const getCategories = async () => {
        try {
            const response = await axios.get(`${url}/getCategory`)
            setCategories(response.data.response)
        } catch (error) {
            console.log(error)
        }
    }

    // change option in category logic

    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value)
        // to get the name of option
        const selectedOption = event.target.options[event.target.selectedIndex]
        const selectedOptionName = selectedOption.getAttribute('data-name')
        setSelctedOptionName(selectedOption.getAttribute('data-name'))
    }

    const addVehicle = async (values: vehicleType) => {
        setLoading(true)
        var form: any = new FormData()
        form.append('userId', userId)
        form.append('name', values.name)
        form.append('ownerName', ownerName)
        form.append('ownerEmail', ownerEmail)
        form.append('model', values.model)
        form.append('price', JSON.stringify(values.price))
        form.append('milage', JSON.stringify(values.milage))
        form.append('seat', JSON.stringify(values.seat))
        form.append('location', values.location)
        form.append('description', values.description)
        form.append('vehicleNumber', values.vehicleNumber)
        form.append('categoryId', selectedOption)
        form.append('categoryName', selectedOptionName)

        console.log(form)

        {
            selectedImages.map((image: any, index: number) => {
                form.append('image', selectedImages[index])
            })
        }
        form.append('bluebookImage', values.bluebookImage)
        form.append('insuranceImage', values.insuranceImage)
        console.log('images ' + values.images)
        console.log(form)
        try {
            const response = await axios.post(`${url}/postVehicle`, form)
            setLoading(false)
            showMessage('Vehicle Posted Successfully! ', 200)
        } catch (error: any) {
            setLoading(false)
            showMessage(error.message, 400)
        }
    }

    useEffect(() => {
        getUser()
        getCategories()
    }, [])
    return (
        <div className=" w-full p-0 px-5 float-right h-screen ">
            <div className="dashboard-home bg-white main-profile w-full  mx-auto  rounded shadow-xl">
                <div className="w-11/12 mx-auto">
                    <h1 className="text-left text-2xl font-semibold p-2">Add Vehicle</h1>
                </div>
                <Formik
                    initialValues={{
                        name: '',
                        model: '',
                        price: 0,
                        milage: 0,
                        seat: 0,
                        location: '',
                        description: '',
                        vehicleNumber: '',
                        images: null,
                        bluebookImage: null,
                        insuranceImage: null
                    }}
                    onSubmit={(values, { resetForm }) => {
                        //addVehicle(values)
                        addVehicle(values)
                        resetForm({
                            values: {
                                name: '',
                                model: '',
                                price: 0,
                                milage: 0,
                                seat: 0,
                                location: '',
                                description: '',
                                vehicleNumber: '',
                                images: null,
                                bluebookImage: null,
                                insuranceImage: null
                            }
                        })
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
                                        placeholder="Location"
                                        name="location"
                                    />
                                </div>
                                <div className="flex flex-col w-1/4">
                                    <label className="text-left">Mileage</label>
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
                                <div className="flex flex-col w-1/4">
                                    <label className="text-left">Category</label>

                                    <select value={selectedOption} onChange={handleSelectChange}>
                                        <option value="" disabled selected>
                                            Select
                                        </option>
                                        {categories.map((item: any) => {
                                            return (
                                                <option
                                                    key={item.id}
                                                    data-name={item.name}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="flex flex-col w-1/4"></div>
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

                            <div className="flex flex-col w-2/5"></div>

                            <div className="flex justify-between">
                                <div className="flex flex-col w-2/5">
                                    <label className="text-left">Vehicle Image</label>
                                    <input
                                        type="file"
                                        className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                                        name="images"
                                        onChange={onSelectFile}
                                        multiple
                                        accept="image/png , image/jpeg, image/webp"
                                    />
                                    <div className="images flex">
                                        {selectedImages &&
                                            selectedImages.map((image: any, index: number) => {
                                                return (
                                                    <div key={index} className="image relative">
                                                        <PreviewImage file={image} />
                                                        <button
                                                            className="absolute top-0 right-0 color-gray-200 "
                                                            onClick={(e: any) => deleteHandler(e, image)}
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

                                    {values.bluebookImage && (
                                        <PreviewImage file={values.bluebookImage} />
                                    )}
                                </div>
                            </div>

                            <div
                                className="flex justify-between w-full"
                                style={{ height: 'auto' }}
                            >
                                <CKEditor
                                    editor={ClassicEditor}
                                    data=""
                                    onReady={(editor: any) => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor)
                                    }}
                                    onChange={(event: any, editor: any) => {
                                        const data = editor.getData()
                                        setFieldValue('description', data)
                                    }}
                                />
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

export default AddVehicle
