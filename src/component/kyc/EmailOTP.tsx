import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import OtpInput from 'otp-input-react'

import SyncLoader from 'react-spinners/SyncLoader'

// redux ------------------
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { proceedKycForm } from '../../features/kyc/kycSlice'

function EmailOTP() {
  const [otp, setOtp] = useState('')

  // get user id from local storage
  const user: any = localStorage?.getItem('user')
    ? localStorage.getItem('user')
    : null
  const email = JSON.parse(user).email
  const id = JSON.parse(user).id
  const [loading, setLoading] = useState(false)
  const dispatchRedux = useAppDispatch()
  const url = 'http://localhost:5000/api'

  const verifyEmailOTP = async () => {
    try {

      const response = await axios.post(
        `${url}/verifyEmail`,
        { id: id },
        {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      )
      setLoading(false)
      dispatchRedux(proceedKycForm())
      showMessage(response.data.message, 200)
    } catch (error: any) {
      let status = error.response.status
      showMessage(error.message, status)
    }
  }

  const checkOTP = async () => {
    try {
      setLoading(true)
      const response: any = await axios.get(`${url}/getUser/${id}`)
      const realOtp = await response.data.data.otp
      if (realOtp == otp) verifyEmailOTP()
    } catch (error: any) {
      showMessage('Incorrect OTP', 400)
    }
  }

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  return (
    <div>
      <div className="w-1/4 mx-auto mt-3 flex flex-col justify-center items-center">
        <div className="content w-full ">
          <h2 className="text-xl font-semibold ">
            Enter OTP to verify Your Email
          </h2>
          <img
            className="mx-auto"
            src="https://authenticator.2stable.com/assets/img/press-kit/AppIcon/app-icon-1024-square.png"
            height="150px"
            width="150px"
          />

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

          <p className="text-sm mt-4">
            {' '}
            You need to verify the your email address to proceed KYC
            verification. Please verify your email by entering the OTP sent in
            your email
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
          <button className="login-btn mt-4" onClick={checkOTP}>
            Verify
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailOTP
