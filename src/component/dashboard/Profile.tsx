import {Link} from 'react-router-dom'
const Profile = () => {


    return (
        <div className=' w-[calc(100%-14rem)]  float-right'>
            <div className='main-profile w-4/5 mt-14 mx-auto '>
                <div className='row'>
                    <div className='col-8 h-50 bg-slate-50 '>
                        <form className="w-full">
                            <h1 className="text-gray-800 text-2xl text-left py-2">Edit profile</h1>
                            <div className="form-input-section">
                                <div className="flex user-info-1 mt-2 mb-2">
                                    <div className="user-info-input p-1 w-1/4 flex flex-col align-center">
                                        <label className="text-left text-gray-700">FIRST NAME</label>
                                        <input type='text' className="w-full px-3  py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 shadow-sm" placeholder="First Name"></input>
                                    </div>
                                    <div className="user-info-input flex p-1 w-1/4 flex-col align-center">
                                        <label className="text-left text-gray-700">LAST NAME</label>
                                        <input type='text' className="w-full px-3  py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 shadow-sm" placeholder="Last Name"></input>
                                    </div>
                                    <div className="user-info-input p-1 flex flex-col w-2/4 align-center">
                                        <label className="text-left text-gray-700">EMAIL</label>
                                        <input type='email' className="w-full px-3  py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 shadow-sm" placeholder="Email"></input>
                                    </div>



                                </div>

                                <div className="flex user-info-2 mt-2 mb-2">
                                    <div className="user-info-input p-1 w-full flex flex-col align-center">
                                        <label className="text-left text-gray-700"> ADDRESS</label>
                                        <input type='text' name="address" className="w-full px-3  py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 shadow-sm" placeholder="Address"></input>
                                    </div>



                                </div>
                                <div className="flex user-info-3 mt-2 mb-2">
                                    <div className="user-info-input p-1 w-1/4 flex flex-col align-center">
                                        <label className="text-left text-gray-700">COUNTRY</label>
                                        <input type='text' className="w-full px-3  py-2  border-gray-300 rounded-lg focus:outline-none focus:border-indigo-300 shadow-sm" placeholder="Country"></input>
                                    </div>
                                    <div className="user-info-input flex p-1 w-1/4 flex-col align-center">
                                        <label className="text-left text-gray-700">CITY</label>
                                        <input type='text' className="w-full px-3  py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 shadow-sm" placeholder="City"></input>
                                    </div>
                                    <div className="user-info-input p-1 flex flex-col w-2/4 align-center">
                                        <label className="text-left text-gray-700">POSTAL CODE</label>
                                        <input type='email' className="w-full px-3  py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 shadow-sm" placeholder="Zip Code"></input>
                                    </div>
                                </div>

                                <div className="flex user-info-4 mt-2 mb-2">
                                    <div className="user-info-input p-1 w-full flex flex-col align-center">
                                        <label className="text-left text-gray-700">ABOUT</label>
                                        <textarea className="w-full px-3  py-2  border-gray-300 rounded-lg focus:outline-none focus:border-indigo-300 shadow-sm"
                                            placeholder="Country"></textarea>
                                    </div>
                                </div>

                                <div className="flex user-info-4 mt-2 mb-2 float-right">
                                    <div className="user-info-input p-1 w-full flex flex-col align-right ">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='col-4 '>
                        <div className='profile card-item h-3/4 w-3/4 p-0 align-center mx-auto '>
                            <div className='card-image h-2/5 overflow-hidden bg-no-repeat bg-center bg-cover' style={{ backgroundImage: `url('https://demos.creative-tim.com/light-bootstrap-dashboard-react/static/media/photo-1431578500526-4d9613015464.0c528dc7.jpeg')` }}>
                                <img className='w-full' src=''></img>
                            </div>
                            <div className='card-body h-3/5'>
                                <div className="h-28 w-28 -mt-12 border-4 border-gray-400 mx-auto profile-img align-center bg-no-repeat bg-center bg-cover rounded-full" style={{ backgroundImage: `url('https://media.istockphoto.com/id/1040308104/photo/mature-handsome-business-man.jpg?s=612x612&w=0&k=20&c=QbyH3XFmLOoy8NESjLQC8PYsm6g3UBL6COFaF-Qnnbk=')` }}>
                                </div>
                                <div className="card-body-content">
                                    <p className="profile-card-name text-sm mt-2 text-indigo-500 text-center">Rohan Kumar Mainali</p>
                                    <p className="about-card text-sm mt-2 text-gray-700 text-center w-3/4 align-center mx-auto">I am an enthusiastic, self-motivated, reliable, responsible and hard working person. I am a mature team worker and adaptable to all challenging situations. </p>
                                </div>
                            </div>

                        </div>


                        <Link to = "/dashboard/change-password"><button className="w-3/4 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Change Password</button></Link>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default Profile
