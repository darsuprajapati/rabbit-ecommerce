import React from 'react'
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";




const Topbar = () => {
    return (
        <div className='bg-rabbit-red text-white'>
            <div className='container mx-auto  py-3 px-4'>
                <div className='flex items-center justify-between'>
                    <div className='hidden md:flex items-center space-x-4'>
                        <a href="#" className='hover:text-gray-300'>
                            <TbBrandMeta className='w-5 h-5' />
                        </a>
                        <a href="#" className='hover:text-gray-300'>
                            <IoLogoInstagram className='w-5 h-5' />
                        </a>
                        <a href="#" className='hover:text-gray-300'>
                            <RiTwitterXLine className='w-4 h-4' />
                        </a>
                    </div>
                    <div className='text-sm text-center flex-grow'>
                        <span>we ship worldwide - Fast and reliable shipping !</span>
                    </div>
                    <div className='text-sm hidden md:block'>
                        <a href="tel:+1234567890" className='hover:text-gray-300'>
                            +91 987654321
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Topbar