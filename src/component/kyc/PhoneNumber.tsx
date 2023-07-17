import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { auth } from '../../Firebase'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import EnterOTP from './EnterOTP'
import EmailOTP from './EmailOTP'
import EmailVerify from './EmailVerify'
import KYCForm from './KYCForm'
import ViewKyc from './ViewKyc'
import WaitingPage from './WaitingPage'
import { Steps } from 'rsuite'
import './steps.css'

import SyncLoader from 'react-spinners/SyncLoader'
// redux ------------------
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { proceedKycForm } from '../../features/kyc/kycSlice'

interface phoneType {
  phoneNumber: any
}

const PhoneNumber = () => {
  // redux
  const count = useAppSelector(state => state.kyc.kycFormStage)
  const [kycStage, setKycStage] = useState(0)
  const dispatchRedux = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const url = 'http://localhost:5000/api'

  // get user id from local storage
  const user: any = localStorage?.getItem('user')
    ? localStorage.getItem('user')
    : null
  const userId = user.id

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'captcha',
      {
        size: 'invisible',
        callback: (response: any) => {}
      },
      auth
    )
  }
  const [verify, setVerify] = useState(false)
  const sendOTP = (formik: phoneType) => {
    const phoneNumber = formik.phoneNumber
    generateRecaptcha()
    let recaptchaVerifier = window.recaptchaVerifier

    dispatchRedux(proceedKycForm())
    signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      .then((confirmResult: any) => {
        window.confirmationResult = confirmResult
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  const checkState = () => {
    if (count == 0) setKycStage(0)
    if (count == 2) setKycStage(1)
    if (count == 4) setKycStage(2)
    if (count == 5) setKycStage(3)
    if (count == 6) setKycStage(4)
  }

  useEffect(() => {
    checkState()
  }, [count])
  return (
    <div>
      <div>
        <div className="float-right h-screen p-0 px-5 w-full">
          <div
            className="dashboard-home flex bg-white main-profile w-full mx-auto  rounded shadow-xl"
            style={{ height: '90vh' }}
          >
            <div className=" w-full">
              <Steps current={kycStage} className="w-2/3 mx-auto mt-5 p-0">
                <Steps.Item title="Verify Number" />
                <Steps.Item title="Verify Email" />
                <Steps.Item title="KYC Form" />
                <Steps.Item title="Confirm Details" />
              </Steps>

              {count === 0 ? (
                <>
                  <Formik
                    initialValues={{
                      phoneNumber: ''
                    }}
                    onSubmit={values => {
                      sendOTP(values)
                    }}
                  >
                    {({ errors, touched, isValidating }) => (
                      <Form className="w-1/4 mx-auto mt-3 flex flex-col justify-center items-center">
                        <img
                          src="https://cdni.iconscout.com/illustration/premium/thumb/otp-verification-5152137-4309037.png"
                          height="400px"
                          width="400px"
                        />
                        <h2 className="text-3xl font-semibold ">
                          Verify Phone Number
                        </h2>
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
                </>
              ) : count == 1 ? (
                <EnterOTP />
              ) : count == 2 ? (
                <EmailVerify />
              ) : count == 3 ? (
                <EmailOTP />
              ) : count == 4 ? (
                <KYCForm />
              ) : count == 5 ? (
                <ViewKyc />
              ) : (
                <WaitingPage/>
              )}
            </div>
          </div>
        </div>
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

export default PhoneNumber
