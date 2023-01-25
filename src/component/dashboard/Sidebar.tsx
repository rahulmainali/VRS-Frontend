import React from 'react'
import { SidebarData } from './SidebarData'
import {Link} from 'react-router-dom'

interface sidebarItem {
    title: string,
    path: string,
    icon: any,
    cName: string
}

const Sidebar = () => {

    return (
        <div className="flex">
            <div className="flex flex-col h-screen p-3 bg-gray-900 text-white shadow w-56 fixed top-0 left-0">
                <div className="space-y-3">
                    <div className="flex items-center border-solid border-2 border-white-600 ">
                        <h2 className="text-2xl font-bold text-center mx-auto align-middle m-0 p-3">Dashboard</h2>
                    </div>
                    <div className="flex-1">
                        <ul className="p-0 space-y-1 text-sm">
                            {SidebarData.map((item: sidebarItem, index: number) => {
                                return (
                                    <li key={index} className="rounded-sm">
                                    <Link to ={item.path}
                                            className="flex  no-underline text-white items-center p-2 space-x-3 rounded-md">
                                           <li className="text-2xl">{item.icon}</li>
                                           <span className='p-3 text-xl'>{item.title}</span>
                                    </Link>
                                    </li>

                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Sidebar
