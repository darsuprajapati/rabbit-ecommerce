import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useSelector } from 'react-redux';



const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false)
    const {cart} = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.auth);

    const cartItemsCount = cart?.products?.reduce((total,product)=>total + product.quantity,0) || 0;

    const togglecartDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen)
    }

    return (
        <>
            <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
                {/* Left Logo */}
                <div>
                    <Link to='/' className="text-2xl font-medium">
                        Rabbit
                    </Link>
                </div>
                {/* Center - Navigation Links */}
                <div className='hidden md:flex space-x-6'>
                    <Link to='/collections/all?gender=Men' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Men
                    </Link>
                    <Link to='/collections/all?gender=Women' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        WoMen
                    </Link>
                    <Link to='/collections/all?category=Top Wear' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Top Wear
                    </Link>
                    <Link to='/collections/all?category=Bottom Wear' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Bottom Wear
                    </Link>
                </div>
                {/* Right Icons */}
                <div className='flex items-center space-x-4'>
                    {user && user.role === "admin" && (
                    <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>
                    )}
                    <Link to={'/profile'} className='hover:text-black'>
                        <HiOutlineUser className='w-6 h-6 text-gray-700' />
                    </Link>
                    <button className='relative hover:text-black cursor-pointer ' onClick={togglecartDrawer}>
                        <HiOutlineShoppingBag className='w-6 h-6 text-gray-700' />
                        {cartItemsCount >0 && (
                            <span className='absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5'>{cartItemsCount}</span>
                        )}
                    </button>
                    {/* Search */}
                    <SearchBar />
                    <button className='md:hidden' onClick={toggleNavDrawer}>
                        <HiBars3BottomRight className='w-6 h-6 text-gray-700' />
                    </button>
                </div>
            </nav>
            <CartDrawer drawerOpen={drawerOpen} togglecartDrawer={togglecartDrawer} />
            {/* Mobile Navigation  */}
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='flex justify-end p-4'>
                    <button onClick={toggleNavDrawer} className='cursor-pointer'>
                        <IoMdClose className='w-6 h-6 text-gray-600' />
                    </button>
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-4 '>Menu</h2>
                    <nav className='space-y-4'>
                        <Link to="/collections/all?gender=Men" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Men</Link>
                        <Link to="/collections/all?gender=Women" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>WoMen</Link>
                        <Link to="/collections/all?category=Top Wear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Top Waer</Link>
                        <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Bottom Waer</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar