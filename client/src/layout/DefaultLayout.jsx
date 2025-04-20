import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const DefaultLayout = () => {
    return (
        <div className='relative bg-gray-50'>

            <Navbar />
            
            <div>
                <Outlet />
            </div>

        </div>
    )
}

export default DefaultLayout