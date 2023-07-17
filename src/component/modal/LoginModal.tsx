import { Link } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'

import AlertPop from './Alert'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BsFacebook, BsTwitter } from 'react-icons/bs'
import { UserContext } from '../../App'

// 'react-redux'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getUserThunk } from '../../features/login/loginSlice'

let logo = require('../../images/newLogo.png')

interface Props {
  show: boolean
  close: () => void
}

interface loginType {
  email: string
  password: string
}
export const LoginModal = ({ show, close }: Props) => {
  const { state, dispatch } = useContext(UserContext)
  const inValues = {
    firstName: '',
    lastName: '',
    signupEmail: '',
    signupPassword: ''
  }
  // redux

  const loginDetail = useAppSelector(state => state.login.loggedIn)
  const dispatchRedux = useAppDispatch()

  function changeLoginState() {
    dispatchRedux(getUserThunk())
  }

  // formik

  const login = async (formik: loginType) => {
    try {
      const payload = { email: formik.email, password: formik.password }
      const response = await axios.post(`${url}/user/login`, payload, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      if (response.status == 200) {
        storeAuthentication(response.data)
        setStatusCode(200)
        close()
        changeLoginState()

        //              0 window.location.replace(`http://localhost:3000`)
      }

      console.log(JSON.stringify(response.data.message))
    } catch (error: any) {
      let status = error.response.status
      if (status == 401) setStatusCode(401)
    }
  }

  const validate = (values: loginType) => {
    const errors = { email: '', password: '' }
    if (!values.email) errors.email = 'Required'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.password) errors.password = 'Required'
    else if (values.password.length < 8)
      errors.password = 'Must be 8 characters or more'
    return errors
  }

  const [values, setValues] = useState(inValues)
  const [statusCode, setStatusCode] = useState(0)

  const url = 'http://localhost:5000/api'

  const storeAuthentication =async (user: any) => {
    await localStorage.setItem('user', JSON.stringify(user))
  }
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // name-> e.target.name
    // value-> e.target.value
    const { name, value } = e.currentTarget

    setValues({
      ...values,
      [name]: value
    })
  }
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose
  } = useDisclosure()
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose
  } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  const signup = async () => {
    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.signupEmail,
        password: values.signupPassword
      }
      const response = await axios.post(`${url}/user/signup`, payload, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      onSignupClose()
      showMessage(response.data.message, 201)
    } catch (error: any) {
      let status = error.response.status
      if (status == 409) {
        console.log(error.message)
        showMessage(error.response.data, status)
      }

      onSignupClose()
    }
  }

  // formik
  //
  //

  function validateEmail(value: string) {
    let errors
    if (!value) {
      errors = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errors = 'Invalid email address'
    }
    return errors
  }

  function validatePassword(value: string) {
    let errors
    if (!value) {
      errors = 'Required'
    } else if (value.length < 8)
      errors = 'Password must be greater than 8 characters'
    return errors
  }

  const google = () => {
    window.open('http://localhost:5000/api/google', '_self')
  }

  const logout = () => {
    window.open('http://localhost:5000/api/logout', '_self')
  }

  return (
    <div className= 'App-login'>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={show}
        onClose={close}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><label className=''>Login</label></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10} className="login-body">
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              onSubmit={values => {
                login(values)
              }}
            >
              {({ errors, touched, isValidating }) => (
                <Form>
                  <FormControl>
                    <FormLabel >Email</FormLabel>
                    <Field
                      name="email"
                      className=" w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                      placeholder="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="text-xs text-red-700 mt-1">
                        {errors.email}
                      </div>
                    )}
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel className= ''>Password</FormLabel>
                    <Field
                      type="password"
                      className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                      placeholder="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="text-xs text-red-700 mt-1">
                        {errors.password}
                      </div>
                    )}
                  </FormControl>

                  <button className="login-btn" type="submit">
                    Login
                  </button>
                  <FormControl mt={1}>
                    <label className="flex flex-row text-sm ">
                      Forgot Password ?{' '}
                      <Link
                        to="/forgot-password-email"
                        onClick={close}
                        className="text-sm text-blue-500 underline ml-2"
                      >
                        {' '}
                        Click Here
                      </Link>
                    </label>
                  </FormControl>

                  {statusCode == 401 ? (
                    <div>
                      <AlertPop
                        statusCode={401}
                        message="Incorrect username or password "
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <FormControl mt={6}>
                    <button className="social-login-btn" onClick={google}>
                      <FcGoogle className="social-logo" /> Continue with Google
                    </button>
                  </FormControl>

               </Form>
              )}
            </Formik>

            <div className="login-footer">
              <p>Don't have an account?</p>
              <button
                onClick={() => {
                  close()
                  onSignupOpen()
                }}
                className="signup-btn"
              >
                Sign up
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isSignupOpen}
        onClose={onSignupClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Let's Get Started</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10} className="signup-body">
            <div className="signup-name">
              <FormControl style={{ width: '43%' }}>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                  ref={initialRef}
                  placeholder="First Name"
                />
              </FormControl>
              <FormControl style={{ width: '43%' }}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={values.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </FormControl>
            </div>

            <FormControl mt={2}>
              <FormLabel>Email</FormLabel>
              <Input
                name="signupEmail"
                value={values.signupEmail}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="signupPassword"
                value={values.signupPassword}
                onChange={handleInputChange}
                placeholder="Password"
              />
            </FormControl>

            <button className="login-btn" onClick={signup}>
              Signup
            </button>
            <FormControl mt={6}>
              <button className="social-login-btn">
                <FcGoogle className="social-logo" /> Continue with Google
              </button>
            </FormControl>

            
            <div className="login-footer">
              <p>Already have an account?</p>
              <button
                className="signup-btn"
                onClick={() => {
                  onSignupClose()
                  close()
                }}
              >
                Login
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

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
  )
}

export default LoginModal
