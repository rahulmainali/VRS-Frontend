import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

import OtpInput from 'otp-input-react'

// redux ------------------
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { proceedKycForm } from '../../features/kyc/kycSlice'

import { Formik, Form, Field } from 'formik'
const khaltiImg = require('../../images/logo1.png')

function PaymentInfo() {
  const dispatchRedux = useAppDispatch()

  const user: any = localStorage?.getItem('user')
    ? localStorage.getItem('user')
    : null
  const userId = JSON.parse(user).id

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  const addPaymentInfo = async(formik: any) => {
    const phoneNumber = formik.phoneNumber
    const userName = formik.userName
    const email = formik.email
    
    const form : any = new FormData();
    form.append('phoneNumber',phoneNumber)
    form.append('userName',userName)
    form.append('email',email)
    form.append('id',userId)

    try {
      const response = await axios.post(`http://localhost:5000/api/postPaymentInfo`, form)
      showMessage(response.data.message,201)
      dispatchRedux(proceedKycForm())
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
  <div>
      <Formik
        initialValues={{
          phoneNumber: '',
          email:'',
          userName: '',
        }}
        onSubmit={values => {
            console.log(values)
          addPaymentInfo(values)
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Form className="w-1/4 mx-auto mt-3 flex flex-col justify-center items-center">

            <h2 className="text-3xl font-semibold ">Provide your Khalti Information </h2>
            <img
              src={khaltiImg}
              height="400px"
              width="400px"
            />

            <Field
              type="text "
              className="mt-3 w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
              placeholder="User Name"
              name="userName"
            />
            <Field
              type="text "
              className="mt-3 w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
              placeholder="Email"
              name="email"
            />
            <Field
              type="text "
              className="mt-3 w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
              placeholder="Phone Number"
              name="phoneNumber"
            />

            <button className="login-btn" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PaymentInfo
