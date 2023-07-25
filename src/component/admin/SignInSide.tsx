import React, { useState, useEffect, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import AlertPop from '../modal/Alert'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import axios from 'axios'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { loginAuthAdmin } from '../../features/login/loginSlice'
interface loginType {
  email: string
  password: string
}

export default function SignInSide() {
  const { state, dispatch } = useContext(UserContext)
  const [statusCode, setStatusCode] = useState(0)

  const url = 'http://localhost:5000/api'
  const navigate = useNavigate()
  const storeAuthentication = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  const dispatchRedux = useAppDispatch()

  const adminLogin = () => dispatchRedux(loginAuthAdmin())

  const login = async (formik: loginType) => {
    try {
      console.log('button clicked')
      const payload = { email: formik.email, password: formik.password }
      const response = await axios.post(`${url}/admin/login`, payload, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      if (response.status == 200) {
        storeAuthentication(response.data)
        setStatusCode(200)
        dispatch({ type: 'USER', payload: true })
        dispatchRedux(loginAuthAdmin())
        navigate('/admin/dashboard')
        //              0 window.location.replace(`http://localhost:3000`)
      }
    } catch (error: any) {
      let status = error.response.status

      if (status == 401) {
        setStatusCode(401)
      }
    }
  }

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

  return (
    <div className="h-screen w-100 flex justify-center items-center bg-slate-900 ">
      <h1 className="absolute text-white top-52 text-2xl font-bold">
        Admin Login
      </h1>
      <div className="main w-1/4 flex  justify-center items-center h-2/5 bg-gray-900  rounded-lg shadow-2xl">
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
            <Form className=" px-10  ">
              <label className="text-white float-left mb-2">Email</label>
              <Field
                name="email"
                className="w-full border mb-2 border-gray-300 h-8 p-2 focus:outline-indigo-400"
                placeholder="email"
                validate={validateEmail}
              />
              {errors.email && touched.email && (
                <div className="text-xs text-red-700 mt-1">{errors.email}</div>
              )}
              <label className="text-white float-left mb-2">Password</label>
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

              <button className="login-btn mt-4  rounded" type="submit">
                Login
              </button>
              <label className="flex flex-row text-sm text-white mt-3">
                Forgot Password ?{' '}
                <Link
                  to="/forgot-password-email"
                  className="text-sm text-blue-500 underline ml-2"
                >
                  {' '}
                  Click Here
                </Link>
              </label>

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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
