import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToNewsletter, resetNewsletterState } from '../../redux/slices/newsletterSlice';
import { toast } from 'sonner';

const Footer = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.newsletter);
    const { categories } = useSelector((state) => state.categories);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }
        
        try {
            await dispatch(subscribeToNewsletter(email)).unwrap();
            toast.success('Successfully subscribed to newsletter!');
            setEmail('');
            // Reset the newsletter state after 3 seconds
            setTimeout(() => {
                dispatch(resetNewsletterState());
            }, 3000);
        } catch (error) {
            toast.error(error.message || 'Failed to subscribe to newsletter');
        }
    };

    return (
        <footer className='border-t py-12'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6'>
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
                    <p className='text-gray-500 mb-4'>
                        Be the first to hear about new products, exclusive events, and online offers.
                    </p>
                    <p className='font-medium text-sm text-gray-600 mb-6'>Sign up get 10% off your first order.</p>

                    {/* Newsletter form */}
                    <form onSubmit={handleSubmit} className='flex'>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email' 
                            className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all' 
                            required 
                        />
                        <button 
                            type='submit' 
                            disabled={loading}
                            className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all disabled:bg-gray-400'
                        >
                            {loading ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                </div>
                {/* shop links */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
                    <ul className='space-y-2 text-gray-600'>
                        {categories.map((category) => (
                            <li key={category.name}>
                                <Link to={category.path} className='hover:text-gray-500 transition-colors'>
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Support Links */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                    <ul className='space-y-2 text-gray-600'>
                        <li>
                            <Link to="/contact" className='hover:text-gray-500 transition-colors'>Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/about" className='hover:text-gray-500 transition-colors'>About Us</Link>
                        </li>
                        <li>
                            <Link to="/faq" className='hover:text-gray-500 transition-colors'>FAQS</Link>
                        </li>
                        <li>
                            <Link to="/features" className='hover:text-gray-500 transition-colors'>Features</Link>
                        </li>
                    </ul>
                </div>
                {/* Follow us */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
                    <div className='flex items-center space-x-4 mb-6'>
                        <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
                            <TbBrandMeta className='w-5 h-5 ' />
                        </a>
                        <a href="https://www.instagram.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
                            <IoLogoInstagram className='w-5 h-5 ' />
                        </a>
                        <a href="https://x.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
                            <RiTwitterXLine className='w-5 h-5 ' />
                        </a>
                    </div>
                    <p className='text-gray-500'>Call us</p>
                    <p>
                        <FiPhoneCall className='inline-block mr-2' />
                        0123-456-789
                    </p>
                </div>
            </div>
            {/* footer bottom */}
            <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
                <p className='text-gray-500 text-sm tracking-tighter text-center'>© 2025 , All Rightts Reserved </p>
            </div>
        </footer>
    )
}

export default Footer