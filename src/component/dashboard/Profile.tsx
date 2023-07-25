import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { BiEditAlt } from 'react-icons/bi'
import PreviewImage from '../dashboard/PreviewImage'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import commonAxios from '../../api/commonAxios'

const Profile = () => {
  const url = 'http://localhost:5000/api'
  const [user, setUser] = useState({})
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState()
  const [role, setRole] = useState()
  const [image, setImage] = useState<any>(null)
  const [profilePicture, setProfilePicture] = useState<any>(null)
  const [status, setStatus] = useState('')
  const [imageLoading, setImageLoading] = useState(true)
  const imageRef = useRef<any>(null)
  const [preview, setPreview] = useState<any>(null)

  const getTokenFromCookies = async () => {
    const response = await axios.get(`${url}/token`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    let accessToken = ''
    let refreshToken = ''
    if (response) {
      accessToken = response.data.accessToken
      refreshToken = response.data.refreshToken
    }
    return { accessToken, refreshToken }
  }
  const renewToken = async () => {
    try {
      const { refreshToken } = await getTokenFromCookies()

      if (refreshToken !== '') {
        const response = await axios.post(`${url}/renewToken`, {
          refreshToken: refreshToken
        })
        const details = response.data.payload
        localStorage.setItem('user', JSON.stringify(response.data.payload))
        setUser(details)
        setUserName(details.firstName + ' ' + details.lastName)
        setEmail(details.email)
        setRole(details.role)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // handle image upload and handle image file change

  const handleImageButton = () => {
    imageRef?.current?.click()
  }

  const handleImageUpload = () => {
    console.log(imageRef.current)
    const reader: any = new FileReader()
    reader.readAsDataURL(imageRef.current.files[0])
    setProfilePicture(imageRef.current.files[0])
    reader.onload = () => {
      setPreview(reader.result)
      setImageLoading(false)
    }
  }

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  const updateProfile = async () => {
    try {
      const formData = new FormData()
      console.log(profilePicture)
      formData.append('image', profilePicture)
      formData.append('id', userId)
      console.log(formData)
      const response = await axios.put(`${url}/user/profile`, formData)
      showMessage('Profile updated successfully!', 200)
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = async () => {
    try {
      const response = await axios.get(`${url}/session`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      let details = response.data.payload
      setUser(details)
      setUserName(details.firstName + ' ' + details.lastName)
      setEmail(details.email)
      setRole(details.role)
      setImage(details.image)
      console.log(details.image)
      setUserId(details.id)
      const id = details.id
      const userData = await axios.get(`${url}/getUser/${id}`)
      setStatus(userData.data.data.status)
      setImage(userData.data.data.image)
    } catch (error: any) {
      console.log('status code' + JSON.stringify(error.response))
      localStorage.clear()
      if (error.response.data == 'jwt expired') {
        console.log('jwt expired')
        renewToken()
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className=" w-full float-right h-screen p-0 px-5 rounded-xl">
      <div
        className="dashboard-home flex bg-white main-profile w-full mx-auto  rounded shadow-xl"
        style={{ height: '90vh' }}
      >
        <div className=" mx-auto w-full rounded">
          <div className=" h-1/5 bg-gradient-to-r from-slate-50 to-blue-100"></div>
          <div className=" w-11/12 p-0  h-4/5 mx-auto">
            <div className="h-3/5 main ">
              <div className="profile flex w-2/5 space-x-4 items-center">
                {imageLoading && image ? (
                  <div
                    className="h-40 float-left  relative w-40 -mt-12 border-4 border-gray-400 profile-img align-center bg-no-repeat bg-center bg-cover rounded-full"
                    style={{
                      backgroundImage: `url(${image.url})`
                    }}
                  >
                    <input
                      type="file"
                      className="hidden bottom-0 App-btn w-1/2 rounded-sm "
                      ref={imageRef}
                      onChange={handleImageUpload}
                    ></input>
                    <button
                      className="absolute bottom-0 App-btn rounded-sm right-0"
                      onClick={handleImageButton}
                    >
                      <BiEditAlt />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col profile-left">
                    <div
                      className="h-40 float-left  relative w-40 -mt-12 border-4 border-gray-400 profile-img align-center bg-no-repeat bg-center bg-cover rounded-full"
                      style={{
                        backgroundImage: `url(${preview})`
                      }}
                    >
                      <input
                        type="file"
                        className="hidden bottom-0 App-btn w-1/2 rounded-sm "
                        ref={imageRef}
                        onChange={handleImageUpload}
                      ></input>
                      <button
                        className="absolute bottom-0 App-btn rounded-sm right-0"
                        onClick={handleImageButton}
                      >
                        <BiEditAlt />
                      </button>
                    </div>
                    <button
                      className="App-btn p-2 rounded-sm mt-2"
                      onClick={updateProfile}
                    >
                      Update
                    </button>
                  </div>
                )}
                <div>
                  <h1 className=" text-sm   text-left text-gray-700 text-2xl font-bold ">
                    {userName}
                  </h1>

                  <p className="text-sm text-left"> Joined : 2023/01/25</p>
                </div>
              </div>
              <div className="details w-3/4 mx-auto">
                <div className="sub-details flex float-left  space-x-24 justify-center ">
                  <div className="left-info">
                    <div className="basic-info flex p-3 ">
                      <div className="verify-left ">
                        <p className="text-left text-lg">Email: </p>
                        <p className="text-left text-lg">Role: </p>
                        <p className="text-left text-lg">Status</p>
                      </div>
                      <div className="verify-right ml-3 ">
                        <p className="text-right text-lg ">{email}</p>
                        <p className="text-right text-lg "> {role} </p>
                       {status === 'pending' && (
                          <p className="text-right text-indigo-500 ">Pending</p>
                        )}

                        {status === 'unverified' && (
                          <p className="text-right text-indigo-500 ">
                            Not verified
                          </p>
                        )}

                        {status === 'verified' && (
                          <p className="text-right text-indigo-500 ">
                            Verified
                          </p>
                        )}
                        {status !== 'verified' && status !== 'pending' && (
                          <Link to="/dashboard/verifyKyc">
                            <p className="text-right text-indigo-500 ">
                              Verify
                            </p>
                          </Link>
                        )}
                        {role === 'admin' && (
                          <p className="text-right text-indigo-500 ">
                            Verified
                          </p>
                        )}
                      </div>
                    </div>

                    <Link to="/change-password">
                      <button className="w-3/4 mt-2 App-btn text-white font-bold py-2 px-4 rounded ">
                        Change Password
                      </button>
                    </Link>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
