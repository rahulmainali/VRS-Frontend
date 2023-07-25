import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify'

function ForgotPasswordEmail() {
  const url = 'http://localhost:5000/api'
  type loginType = {
    email: string
  }
  const sendEmail = async (formik: loginType) => {
    try {
      console.log('button clicked')
      const payload = { email: formik.email }
      const response = await axios.post(`${url}/user/forgotPassword`, payload, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })

      console.log(JSON.stringify(response.data.message))

      showMessage(response.data.message, 200)
      formik.email = ''
    } catch (error: any) {
      let status = error.response.status
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

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mt-5 mx-auto center">
        Please enter your email address to recover password
      </h1>
      <Formik
        initialValues={{
          email: ''
        }}
        onSubmit={values => {
          sendEmail(values)
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Form className="w-1/4 mx-auto mt-3">
            <Field
              type="text"
              className="w-full "
              placeholder="email"
              name="email"
              validate={validateEmail}
            />
            {errors.email && touched.email && (
              <div className="text-xs text-red-700 mt-1">{errors.email}</div>
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
  )
}

export default ForgotPasswordEmail
