import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our payment gateway."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping may take 7-14 business days depending on the destination. Express shipping options are available for faster delivery."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all items in their original condition. Items must be unworn, unwashed, and with all original tags attached. Please contact our customer service team to initiate a return."
        },
        {
            question: "How do I track my order?",
            answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'Order History' section."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can view shipping rates during checkout."
        },
        {
            question: "How do I change or cancel my order?",
            answer: "Orders can be modified or cancelled within 1 hour of placement. Please contact our customer service team immediately for assistance. Once an order is processed, it cannot be cancelled."
        },
        {
            question: "What sizes do you offer?",
            answer: "We offer sizes XS to XXL for most items. Each product page includes a detailed size guide to help you find the perfect fit. We recommend measuring yourself and comparing with our size chart before ordering."
        },
        {
            question: "How do I care for my clothes?",
            answer: "Care instructions are provided on the label of each garment. Generally, we recommend washing in cold water and air drying to maintain the quality and longevity of your items."
        },
        {
            question: "Do you offer gift wrapping?",
            answer: "Yes, we offer gift wrapping services for an additional fee. You can select this option during checkout. Gift-wrapped items come with a personalized message card."
        },
        {
            question: "How can I contact customer service?",
            answer: "Our customer service team is available 24/7. You can reach us via email at support@rabbit.com, phone at +1 (234) 567-8900, or through the contact form on our website."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h1>
            
            <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className="border-b border-gray-200 last:border-b-0"
                    >
                        <button
                            className="w-full py-6 text-left flex justify-between items-center focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className="text-lg font-semibold">{faq.question}</span>
                            {openIndex === index ? (
                                <FiChevronUp className="w-6 h-6 text-gray-500" />
                            ) : (
                                <FiChevronDown className="w-6 h-6 text-gray-500" />
                            )}
                        </button>
                        
                        {openIndex === index && (
                            <div className="pb-6 text-gray-600">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Contact Section */}
            <div className="mt-16 text-center">
                <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
                <p className="text-gray-600 mb-6">
                    Can't find the answer you're looking for? Please chat with our friendly team.
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors">
                    Contact Us
                </button>
            </div>
        </div>
    );
};

export default FAQ; 