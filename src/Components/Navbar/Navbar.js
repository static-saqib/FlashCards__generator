import React from 'react'
import Logo from './logo.jpg'

const Navbar = () => {
    return (
        <div className='h-14 fixed w-screen bg-white z-40 flex shadow-md'>
            <div className='flex items-center font-serif text-3xl px-1 '>
                <img className='h-10 ml-4' src={Logo} alt="AlmaBetter" />
                <span className='ml-2'>Flash Cards Generator</span>
            </div>
            
        </div>
    )
}
export default Navbar
