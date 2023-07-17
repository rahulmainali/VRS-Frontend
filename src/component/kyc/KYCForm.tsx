import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { auth } from '../../Firebase'
import moment from 'moment'
import PreviewImage from '../dashboard/PreviewImage'
import * as Yup from 'yup'

import SyncLoader from 'react-spinners/SyncLoader'
// redux ------------------
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { proceedKycForm } from '../../features/kyc/kycSlice'
import { saveForm } from '../../features/kyc/kycFormSlice'

export interface formType {
  firstName: string
  middleName: string
  lastName: string
  id: string
  province: number
  district: string
  municipality: string
  wardNumber: number
  dateOfBirth: string
  citizenshipNumber: string
  citizenshipIssuedBy: string
  citizenshipIssuedDate: string
  drivingLicenseNumber: string
  drivingLicenseIssuedBy: string
  drivingLicenseIssuedDate: string
  drivingLicenseExpireDate: string

  // images
  citizenshipImageFront: any
  citizenshipImageBack: any
  drivingLicenseImage: any
}

const KYCForm = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required *'),
    lastName: Yup.string().required('Last Name is required *'),
    dateOfBirth: Yup.date().required('Date of Birth is required *'),
    province: Yup.number().required('Province is required *'),
    district: Yup.string().required('District is required *'),
    municipality: Yup.string().required('Municipality is required *'),
    wardNumber: Yup.number().required('Ward Number is required *'),
    citizenshipNumber: Yup.string().required('Citizenship Number is required *'),
    citizenshipIssuedBy: Yup.string().required(
      'Citizenship Issued By is required *'
    ),
    citizenshipIssuedDate: Yup.date().required(
      'Citizenship Issued Date is required *'
    ),
    drivingLicenseNumber: Yup.string().required('License Number is required *'),
    drivingLicenseIssuedBy: Yup.string().required(
      'License Issued By is required *'
    ),
    drivingLicenseIssuedDate: Yup.date().required(
      'License Issued Date is required *'
    ),

    drivingLicenseExpireDate: Yup.date().required(
      'License Issued Date is required *'
    )
  })
  // get user id from local storage

  const user: any = localStorage?.getItem('user')
    ? localStorage.getItem('user')
    : null
  const id = JSON.parse(user).id
  const [loading, setLoading] = useState(false)

  const url = 'http://localhost:5000/api'
  const dispatchRedux = useAppDispatch()

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  const postKyc = async (values: any) => {
    setLoading(true)
    var form: any = new FormData()

    for (const keys in values) {
      form.append(keys, values[keys])
    }
    form.append('id', id)
    console.log(form)

    // converting form into json to save in redux
    let formData: any = {}
    form.forEach(function (value: any, key: string) {
      formData[key] = value
    })

    dispatchRedux(saveForm({ kycDetail: formData }))
    console.log(form)
    try {
      const response = await axios.put(`${url}/postKyc`, form)
      showMessage('KYC Posted Successfully! ', 200)
      dispatchRedux(proceedKycForm())
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      showMessage(error.message, 400)
    }
  }
  return (
    <div className="h-auto bg-white">
      <div className="w-full mx-auto mt-3 flex flex-col justify-center items-center h-auto">
        <div className="content w-full h-auto">
          <Formik
            initialValues={{
              firstName: '',
              middleName: '',
              lastName: '',
              id: '',
              province: 0,
              district: '',
              municipality: '',
              wardNumber: 0,
              dateOfBirth: '',
              citizenshipNumber: '',
              citizenshipIssuedBy: '',
              citizenshipIssuedDate: '',
              drivingLicenseNumber: '',
              drivingLicenseIssuedBy: '',
              drivingLicenseIssuedDate: '',
              drivingLicenseExpireDate: '',

              // images
              citizenshipImageFront: null,
              citizenshipImageBack: null,
              drivingLicenseImage: null
            }}
            onSubmit={(values, { resetForm }) => {
              //addVehicle(values)
              console.log(values)
              postKyc(values)
            }}
            validationSchema={validationSchema}
          >
            {({
              errors,
              touched,
              isValidating,
              resetForm,
              values,
              setFieldValue
            }) => (
              <Form className=" flex flex-col gap-4 w-5/6 h-auto mx-auto mt-3 py-5">
                <div className="flex justify-between">
                  <div className="flex flex-col w-1/5">
                    <label className="text-left">First Name</label>
                    <Field
                      type="text"
                      className="w-full h-8 p-2"
                      name="firstName"
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="error">{errors.firstName}</div>
                    )}
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">Middle Name</label>
                    <Field
                      type="text"
                      className="w-full h-8 p-2"
                      name="middleName"
                    />
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">Last Name</label>
                    <Field
                      type="text"
                      className="w-full h-8 p-2"
                      name="lastName"
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="error">{errors.lastName}</div>
                    )}
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">Date Of Birth</label>
                    <Field
                      type="date"
                      className="w-full  h-8 p-2"
                      name="dateOfBirth"
                    />

                    {touched.dateOfBirth && errors.dateOfBirth && (
                      <div className="error">{errors.dateOfBirth}</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col w-1/5">
                    <label className="text-left">Province</label>
                    <Field
                      type="number"
                      className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                      name="province"
                    />

                    {touched.province && errors.province && (
                      <div className="error">{errors.province}</div>
                    )}
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">District</label>
                    <Field
                      type="text"
                      className="w-full h-8 p-2"
                      name="district"
                    />
                    {touched.district && errors.district && (
                      <div className="error">{errors.district}</div>
                    )}
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">Municipality</label>
                    <Field
                      type="text"
                      className="w-full h-8 p-2"
                      name="municipality"
                    />
                    {touched.municipality && errors.municipality && (
                      <div className="error">{errors.municipality}</div>
                    )}
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">Ward Number</label>
                    <Field
                      type="text"
                      className="w-full h-8 p-2"
                      name="wardNumber"
                    />
                    {touched.wardNumber && errors.wardNumber && (
                      <div className="error">{errors.wardNumber}</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col w-1/5">
                    <label className="text-left">Citizenship Number</label>
                    <Field
                      type="text"
                      className="w-full h-8 p-2"
                      name="citizenshipNumber"
                    />
                    {touched.citizenshipNumber && errors.citizenshipNumber && (
                      <div className="error">{errors.citizenshipNumber}</div>
                    )}
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">Citizenship Issued By</label>
                    <Field
                      type="text"
                      className="w-full h-8 p-2"
                      name="citizenshipIssuedBy"
                    />

                    {touched.citizenshipIssuedBy &&
                      errors.citizenshipIssuedBy && (
                        <div className="error">
                          {errors.citizenshipIssuedBy}
                        </div>
                      )}
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">Citizenship Issued Date</label>
                    <Field
                      type="date"
                      className="w-full h-8 p-2"
                      name="citizenshipIssuedDate"
                    />

                    {touched.citizenshipIssuedDate &&
                      errors.citizenshipIssuedDate && (
                        <div className="error">
                          {errors.citizenshipIssuedDate}
                        </div>
                      )}
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

                <div className="flex justify-between">
                  <div className="flex flex-col w-1/5">
                    <label className="text-left">Citizenship Image Front</label>
                    <input
                      type="file"
                      className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                      name="citizenshipImageFront"
                      onChange={(e: any) => {
                        setFieldValue(
                          'citizenshipImageFront',
                          e.target.files[0]
                        )
                      }}
                    />

                    {values.citizenshipImageFront && (
                      <PreviewImage file={values.citizenshipImageFront} />
                    )}
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">Citizenship Image Back</label>
                    <input
                      type="file"
                      className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                      name="citizenshipImageBack"
                      onChange={(e: any) => {
                        setFieldValue('citizenshipImageBack', e.target.files[0])
                      }}
                    />

                    {values.citizenshipImageBack && (
                      <PreviewImage file={values.citizenshipImageBack} />
                    )}
                  </div>
                  <div className="flex flex-col w-1/4"></div>
                  <div className="flex flex-col w-1/4"></div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col w-1/5">
                    <label className="text-left">Driving Licence Id</label>
                    <Field
                      type="text"
                      className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                      name="drivingLicenseNumber"
                    />

                    {touched.drivingLicenseNumber &&
                      errors.drivingLicenseNumber && (
                        <div className="error">
                          {errors.drivingLicenseNumber}
                        </div>
                      )}
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">Licence Issued By</label>
                    <Field
                      type="text"
                      className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                      name="drivingLicenseIssuedBy"
                    />

                    {touched.drivingLicenseIssuedBy &&
                      errors.drivingLicenseIssuedBy && (
                        <div className="error">
                          {errors.drivingLicenseIssuedBy}
                        </div>
                      )}
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">Licence Issued Date</label>
                    <Field
                      type="date"
                      className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                      name="drivingLicenseIssuedDate"
                    />

                    {touched.drivingLicenseIssuedDate &&
                      errors.drivingLicenseIssuedDate && (
                        <div className="error">
                          {errors.drivingLicenseIssuedDate}
                        </div>
                      )}
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="text-left">Licence Expiry Date</label>
                    <Field
                      type="date"
                      className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                      name="drivingLicenseExpireDate"
                    />

                    {touched.drivingLicenseExpireDate &&
                      errors.drivingLicenseExpireDate && (
                        <div className="error">
                          {errors.drivingLicenseExpireDate}
                        </div>
                      )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col w-1/5">
                    <label className="text-left">Driving Licence Image</label>
                    <input
                      type="file"
                      className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                      name="drivingLicenseImage"
                      onChange={(e: any) => {
                        setFieldValue('drivingLicenseImage', e.target.files[0])
                      }}
                    />

                    {values.drivingLicenseImage && (
                      <PreviewImage file={values.drivingLicenseImage} />
                    )}
                  </div>
                </div>
                <button
                  className=" w-1/4 float-left login-btn"
                  style={{ width: '20%' }}
                  type="submit"
                >
                  Proceed
                </button>
              </Form>
            )}
          </Formik>
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
    </div>
  )
}

export default KYCForm
