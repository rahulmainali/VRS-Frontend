import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

interface passwordType {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
interface userType {
  id: string
}
const ChangePassword = (user: any) => {
  const changePassword = async (formik: passwordType) => {
    const url = 'http://localhost:5000/api'
    console.log('user ' + JSON.stringify(user))
    const payload = {
      id: user.user.id,
      password: formik.oldPassword,
      newPassword: formik.newPassword,
      confirmPassword: formik.confirmPassword
    }

    try {
      const response = await axios.post(`${url}/user/changePassword`, payload, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })

      showMessage(response.data.message, 200)
      formik.oldPassword = ''
    } catch (error: any) {
      showMessage(error.message, 400)
    }
  }

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  function validateNewPassword(value: string) {
    let errors
    if (!value) {
      errors = 'Required'
    } else if (value.length < 8) {
      errors = 'Password must be greater than 8 characters'
    }
    return errors
  }

  function validateOldPassword(value: string) {
    let errors
    if (!value) {
      errors = 'Required'
    } else if (value.length < 8) {
      errors = 'Password must be greater than 8 characters'
    }
  }
  function validateConfirmPassword(value: string) {
    let errors
    if (!value) {
      errors = 'Required'
    } else if (value.length < 8) {
      errors = 'Password must be greater than 8 characters'
    }
  }

  return (
    <>
      <div className="float-right bg-slate-50 p-5 w-full h-screen">
        <div className="dashboard-home main-profile mt-14 mx-auto ">
          <h1 className="text-2xl font-bold mx-auto mt-5">Change Password</h1>
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: ''
            }}
            onSubmit={(values, { resetForm }) => {
              changePassword(values)
              resetForm({
                values: {
                  oldPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                }
              })
            }}
          >
            {({ errors, touched, isValidating, resetForm, values }) => (
              <Form className="w-1/4 mx-auto mt-3 flex flex-col gap-y-2">
                <Field
                  type="password"
                  className="w-full border m-1 p-2 "
                  placeholder="Old Password"
                  name="oldPassword"
                  validate={validateOldPassword}
                />
                {errors.newPassword && touched.newPassword && (
                  <div className="text-xs text-red-700 mt-1">
                    {errors.newPassword}
                  </div>
                )}
                <Field
                  type="password"
                  className="w-full border m-1 mb-2  p-2 "
                  placeholder="New Password"
                  name="newPassword"
                  validate={validateNewPassword}
                />
                {errors.newPassword && touched.newPassword && (
                  <div className="text-xs text-red-700 mt-1">
                    {errors.newPassword}
                  </div>
                )}
                <Field
                  type="password"
                  className="w-full border m-1 border-gray-300 h-8 p-2 focus:outline-indigo-400"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  validate={validateConfirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-xs text-red-700 mt-1">
                    {errors.confirmPassword}
                  </div>
                )}

                <button className="login-btn" type="submit">
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
    </>
  )
}

export default ChangePassword
