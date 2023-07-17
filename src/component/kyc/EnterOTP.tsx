import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { auth } from '../../Firebase'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import SyncLoader from 'react-spinners/SyncLoader'
import OtpInput from 'otp-input-react'

// redux ------------------
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { proceedKycForm } from '../../features/kyc/kycSlice'

interface phoneType {
  otp: any
}

const EnterOTP = () => {
  const url = 'http://localhost:5000/api'
  const [loading, setLoading] = useState(false)
  // get user id from local storage
  const user: any = localStorage?.getItem('user')
    ? localStorage.getItem('user')
    : null
  const userId = JSON.parse(user).id

  // verify phone number
  const verifyPhoneNumber = async () => {
    try {
      const response = await axios.post(`${url}/verifyPhoneNumber`, {
        id: userId
      })
      showMessage('Phone number verified', 200)
    } catch (error: any) {
      showMessage('Incorrect OTP ', 400)
    }
  }

  const [otp, setOtp] = useState('')

  // redux

  const dispatchRedux = useAppDispatch()

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  const verifyOTP = (formik: phoneType) => {
    setLoading(true)
    let recaptchaVerifier = window.recaptchaVerifier
    window.confirmationResult
      .confirm(otp)
      .then(async (res: any) => {
        verifyPhoneNumber()
        dispatchRedux(proceedKycForm())
      })
      .catch((error: any) => {
      setLoading(false)
      showMessage('Incorrect OTP ', 400)
      })
  }

  return (
    <div>
      <div className=" mt-10">
        <Formik
          initialValues={{
            otp: ''
          }}
          onSubmit={values => {
            verifyOTP(values)
          }}
        >
          {({ errors, touched, isValidating }) => (
            <Form className="w-1/4 mx-auto mt-3 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold ">Verify it's you</h2>
              <img src="https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7897.jpg" />

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

              <h4 className="text-xl font-semibold ">
                Enter a verification code
              </h4>
              <p className="text-sm ">
                {' '}
                A 6 digit OTP verification code was sent on your phone number
              </p>
              <OtpInput
                value={otp}
                onChange={setOtp}
                autoFocus
                OTPLength={6}
                otpType="text"
                disabled={false}
                className="opt-container mt-5"
              ></OtpInput>
              <button className="login-btn" type="submit">
                Submit
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

      <div id="captcha"></div>
    </div>
  )
}

export default EnterOTP
