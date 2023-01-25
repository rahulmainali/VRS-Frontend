import * as BsIcon from 'react-icons/bs'
import * as GiIcon from 'react-icons/gi'
import * as AiIcons from 'react-icons/ai'

export const SidebarData = [

    {
        title: 'Home',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'sidebar-text'
    },

    {
        title: 'Profile',
        path: '/dashboard/profile',
        icon: <BsIcon.BsFillPersonFill />,
        cName: 'sidebar-text'
    },
    {
        title: 'Vehicles',
        path: '/dashboard/vehicles',
        icon: <GiIcon.GiSteeringWheel />,
        cName: 'sidebar-text'
    },
    {
        title: 'Logout',
        path: '/dashboard/logout',
        icon: <AiIcons.AiOutlineLogout />,
        cName: 'sidebar-text'
    },
]
