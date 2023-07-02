import React from 'react'

export const test =() => {
    return (
        <div>
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
    )
}
