import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import {useParams} from 'react-router-dom'

function ForgotPassword() {

    const url = 'http://localhost:5000/api'
    type passwordType = {
        newPassword: string,
        confirmPassword: string,
        }
    const params = useParams();
    const {id,token} = useParams();
    const sendEmail = async (formik:passwordType) => {
        try {
            console.log('button clicked')
            const payload = { newPassword: formik.newPassword, confirmPassword: formik.confirmPassword}
            const response = await axios.post(`${url}/user/forgotPassword/${id}/${token}`, payload, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
                }
            });
            console.log(response)

            console.log(JSON.stringify(response.data.message))

            showMessage(response.data.message, 200);
        } catch (error: any) {
            let status = error.response.status;
            showMessage('The recovery time of password is expired !', status)
        }
    }
    function validateNewPassword(value: string) {
        let errors;
        if (!value) {
            errors = 'Required';
        } else if (value.length<8) {
            errors = 'Password must be greater than 8 characters';
        }
        return errors;
    }
    function validateConfirmPassword(value: string) {
        let errors;
        if (!value) {
            errors = 'Required';
        } else if (value.length<8) {
            errors = 'Password must be greater than 8 characters';
        }
    }
    

    
    const showMessage = (message: string, statusCode: number) => {
        if (statusCode == 201 || statusCode == 200) toast.success(message)
        else toast.error(message)
    }

    return (
        <div>
            <h1 className='font-bold text-2xl mt-5 text-center mx-auto'>Change Password</h1>

            <Formik
                initialValues={{
                    newPassword: "",
                    confirmPassword: ""
                }}

                onSubmit={values => { sendEmail(values) }}

            >
                {({ errors, touched, isValidating }) => (
                    <Form className='w-1/4 mx-auto mt-3 flex flex-col gap-y-2'>
                        <Field type='password' className="p-2 w-full " placeholder='New Password' name='newPassword' validate={validateNewPassword} />
                        {errors.newPassword && touched.newPassword && <div className='text-xs text-red-700 mt-1'>{errors.newPassword}</div>}
                        <Field type='password' className="p-2 w-full mb-2" placeholder='Confirm Password' name='confirmPassword' validate={validateConfirmPassword} />
                        {errors.confirmPassword && touched.confirmPassword && <div className='text-xs text-red-700 mt-1'>{errors.confirmPassword}</div>}


                        <button className='login-btn' type='submit' >
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

export default ForgotPassword
