import React from 'react';
import { 
    FaTruck, 
    FaShieldAlt, 
    FaExchangeAlt, 
    FaCreditCard, 
    FaUserShield, 
    FaHeadset,
    FaLeaf,
    FaMobileAlt
} from 'react-icons/fa';

const Features = () => {
    const features = [
        {
            icon: FaTruck,
            title: "Fast & Free Shipping",
            description: "Enjoy free shipping on all orders over $50. Standard delivery takes 3-5 business days."
        },
        {
            icon: FaShieldAlt,
            title: "Secure Shopping",
            description: "Your data is protected with industry-standard SSL encryption and secure payment processing."
        },
        {
            icon: FaExchangeAlt,
            title: "Easy Returns",
            description: "30-day hassle-free returns. Return any item in its original condition for a full refund."
        },
        {
            icon: FaCreditCard,
            title: "Multiple Payment Options",
            description: "Pay with credit cards, PayPal, or Apple Pay. All transactions are secure and encrypted."
        },
        {
            icon: FaUserShield,
            title: "Account Security",
            description: "Two-factor authentication and advanced security measures to protect your account."
        },
        {
            icon: FaHeadset,
            title: "24/7 Support",
            description: "Our customer service team is available round the clock to assist you with any queries."
        },
        {
            icon: FaLeaf,
            title: "Sustainable Fashion",
            description: "Eco-friendly materials and sustainable practices in our manufacturing process."
        },
        {
            icon: FaMobileAlt,
            title: "Mobile Shopping",
            description: "Shop on the go with our mobile-optimized website and dedicated mobile app."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6">Our Features</h1>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Discover what makes Rabbit the preferred choice for fashion enthusiasts. 
                    We're committed to providing an exceptional shopping experience with our 
                    innovative features and customer-centric approach.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <feature.icon className="w-12 h-12 text-gray-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* Additional Features Section */}
            <div className="bg-gray-50 p-12 rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Rabbit?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Quality Assurance</h3>
                        <p className="text-gray-600 mb-6">
                            Every product undergoes rigorous quality checks to ensure you receive 
                            only the best. Our quality control process includes material testing, 
                            durability checks, and detailed inspections.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                                Premium materials and craftsmanship
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                                Detailed quality inspections
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                                Satisfaction guarantee
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Customer Experience</h3>
                        <p className="text-gray-600 mb-6">
                            We prioritize your shopping experience with personalized recommendations, 
                            easy navigation, and responsive customer support.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                                Personalized shopping experience
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                                Easy-to-use interface
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                                Quick and helpful support
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
                <h2 className="text-2xl font-semibold mb-4">Ready to Experience Rabbit?</h2>
                <p className="text-gray-600 mb-6">
                    Join thousands of satisfied customers who trust Rabbit for their fashion needs.
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors">
                    Start Shopping
                </button>
            </div>
        </div>
    );
};

export default Features; 