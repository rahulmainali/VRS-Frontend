import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { formType } from './KYCForm'

// redux ------------------
// redux ------------------
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { backKycForm, proceedKycForm } from '../../features/kyc/kycSlice'

function ViewKyc() {
  // get user id from local storage
  const user: any = localStorage?.getItem('user')
    ? localStorage.getItem('user')
    : null
  const id = JSON.parse(user).id
  const url = 'http://localhost:5000/api'
  const [kycFormData, setKyc] = useState([])
  const [kycImage, setKycImage] = useState([])
  const reduxDispatch = useAppDispatch()
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const response = await axios.get(`${url}/getUser/${id}`)
      console.log(response.data.data.kyc)
      let arr: any = []
      arr.push(response.data.data.kyc.kycFormData)
      setKycImage(response.data.data.kyc)
      setKyc(arr)
    } catch (error: any) {
      console.log(error)
    }
  }
  const goBack = () => {
    reduxDispatch(backKycForm())
  }

  const confirm = () => {
    toast.success('KYC form submitted successfully!')
    reduxDispatch(proceedKycForm())
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="details w-3/4 mx-auto">
      <h2 className="mt-4">Please check and confirm your information</h2>
      <div className="main flex justify-between">
        {kycFormData.map((item: any) => {
          return (
            <>
              <div className="sub-details p-4 mt-5 flex float-left bg-blue-50 w-2/5 space-x-24 justify-center ">
                <div className="left-info w-full">
                  <div className="basic-info  flex">
                    <div className="verify-left w-1/2">
                      <p className="text-left text-sm">Full Name: </p>
                      <p className="text-left text-sm">Date Of Birth: </p>
                      <p className="text-left text-sm">Province: </p>
                      <p className="text-left text-sm">District: </p>
                      <p className="text-left text-sm">Municipality: </p>
                      <p className="text-left text-sm">Ward Number: </p>
                      <p className="text-left text-sm">Citizenship Number: </p>
                      <p className="text-left text-sm">
                        Citizenship Issued BY:{' '}
                      </p>
                      <p className="text-left text-sm">
                        Citizenship Issued Date:{' '}
                      </p>
                      <p className="text-left text-sm">
                        Driving License Number:{' '}
                      </p>
                      <p className="text-left text-sm">License Issued Date: </p>
                      <p className="text-left text-sm">License Expiry Date: </p>
                      <p className="text-left text-sm">License Issued By: </p>
                    </div>
                    <div className="verify-right w-1/2">
                      <p className="text-right text-sm ">{`${item.firstName} ${item.middleName} ${item.lastName}`}</p>
                      <p className="text-right text-sm ">
                        {' '}
                        {item.dateOfBirth}{' '}
                      </p>
                      <p className="text-right text-sm ">{item.province} </p>
                      <p className="text-right text-sm ">{item.district}</p>
                      <p className="text-right text-sm ">{item.municipality}</p>
                      <p className="text-right text-sm ">{item.wardNumber}</p>
                      <p className="text-right text-sm ">
                        {item.citizenshipNumber}
                      </p>
                      <p className="text-right text-sm ">
                        {item.citizenshipIssuedBy}
                      </p>
                      <p className="text-right text-sm ">
                        {item.citizenshipIssuedDate}
                      </p>
                      <p className="text-right text-sm ">
                        {item.drivingLicenseNumber}
                      </p>
                      <p className="text-right text-sm ">
                        {item.drivingLicenseIssuedDate}
                      </p>
                      <p className="text-right text-sm ">
                        {item.drivingLicenseExpireDate}
                      </p>
                      <p className="text-right text-sm ">
                        {item.drivingLicenseIssuedBy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })}
        <div className="mt-5 bg-slate-50 float-right w-3/5 p-4">
          <div className="text-sm">
            <h6 className="text-danger text-left align-left ">
              <p>नियम र सर्तहरू</p>
              <p>Terms and Conditions of Sadhan </p>
            </h6>
            <ol>
              <li>
                <p className="text-left">
                  {' '}
                  यदि तपाइँ जारी राख्नुहुन्छ भने तपाइँ हाम्रो नियम र सर्तहरूसँग
                  सहमत हुनुहुन्छ
                </p>
                <p className="text-left">
                  If you continue, you agree with our terms and conditions
                </p>

                <h6 className="text-left text-danger">हाम्रो नियम र सर्तहरू</h6>
                <ul className="text-left p-0 list-disc">
                  <li>
                    तपाईंले प्रदान गर्नुहुने सबै छविहरू र कागजातहरू तपाईंको
                    आफ्नै छविहरू हुन् र तपाईंले तिनीहरूलाई हाम्रो वेब
                    अनुप्रयोगमा भण्डारण गर्ने अधिकार दिनुहुन्छ
                  </li>
                  <li>
                    तपाईंलाई कुनै पनि खराब वा आपत्तिजनक शब्द वा भाषा प्रयोग गर्न
                    अनुमति छैन
                  </li>
                  <li>
                    हानि गर्न हाम्रो प्रणालीको अनुचित प्रयोगले कानुनी समस्याहरू
                    निम्त्याउन सक्छ
                  </li>
                </ul>
                <h6 className="text-left mt-3 text-danger">
                  Our terms and conditions
                </h6>
                <ul className="text-left p-0 list-disc">
                  <li>
                    All the images and documents you provide are your own images
                    and you give rights to store them in our web application{' '}
                  </li>
                  <li>
                    No abusive/offensive language are allowed in any sections
                    like review
                  </li>
                  <li>
                    Improper use of web application could lead to legal issues
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <button
        className="float-left mt-4 back-button"
        style={{ width: '10%' }}
        onClick={goBack}
      >
        {' '}
        Back
      </button>
      <button
        className="mr-5 float-left confirmKycButton mt-4"
        style={{ width: '15%', margin: '5%' }}
        onClick={confirm}
      >
        Confirm
      </button>
    </div>
  )
}

export default ViewKyc
