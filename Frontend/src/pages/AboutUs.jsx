import React from 'react';
import { FaTshirt, FaUsers, FaAward, FaHeart } from 'react-icons/fa';
import storyimg from '../assets/mens-collection.webp'

const AboutUs = () => {
    const stats = [
        { number: '10+', label: 'Years Experience', icon: FaAward },
        { number: '50K+', label: 'Happy Customers', icon: FaUsers },
        { number: '1000+', label: 'Products', icon: FaTshirt },
        { number: '24/7', label: 'Customer Support', icon: FaHeart },
    ];

    const team = [
        {
            name: 'John Doe',
            position: 'CEO & Founder',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        },
        {
            name: 'Jane Smith',
            position: 'Creative Director',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
        },
        {
            name: 'Mike Johnson',
            position: 'Head of Design',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6">About Rabbit</h1>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    We are a premium fashion brand dedicated to bringing you the latest trends 
                    in clothing and accessories. Our mission is to make high-quality fashion 
                    accessible to everyone while maintaining sustainable practices.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                        <stat.icon className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                        <div className="text-3xl font-bold mb-2">{stat.number}</div>
                        <div className="text-gray-600">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Story Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <p className="text-gray-600 mb-4">
                        Founded in 2015, Rabbit started as a small boutique in New York City. 
                        What began as a passion project quickly grew into a beloved fashion brand 
                        known for its quality and style.
                    </p>
                    <p className="text-gray-600 mb-4">
                        Today, we continue to expand our reach while staying true to our core 
                        values of quality, sustainability, and customer satisfaction.
                    </p>
                </div>
                <div className="bg-gray-200 rounded-lg h-96">
                    {/* Add your image here */}
                    <img src={storyimg} className='w-full h-full object-cover' />
                </div>
            </div>

            {/* Team Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="text-center">
                            <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                                <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                            <p className="text-gray-600">{member.position}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-50 p-12 rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">Quality</h3>
                        <p className="text-gray-600">
                            We never compromise on the quality of our products, ensuring 
                            that every item meets our high standards.
                        </p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
                        <p className="text-gray-600">
                            We are committed to sustainable practices and reducing our 
                            environmental impact.
                        </p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                        <p className="text-gray-600">
                            We constantly innovate to bring you the latest trends and 
                            technologies in fashion.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs; 