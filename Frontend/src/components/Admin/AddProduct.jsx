import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../redux/slices/adminProductSlice';
import axios from 'axios';

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        discountPrice: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: [],
        isFeatured: false,
        isPublished: false,
        tags: [],
        dimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        weight: 0
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayInput = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value.split(',').map(item => item.trim())
        }));
    };

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            dimensions: {
                ...prevData.dimensions,
                [name]: value
            }
        }));
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URI}/api/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );
            setProductData(prevData => ({
                ...prevData,
                images: [...prevData.images, { url: data.imageUrl, altText: "" }]
            }));
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createProduct(productData));
            navigate("/admin/products");
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
            <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold mb-2">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">SKU</label>
                        <input
                            type="text"
                            name="sku"
                            value={productData.sku}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        rows={4}
                        required
                    />
                </div>

                {/* Pricing and Stock */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block font-semibold mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Discount Price</label>
                        <input
                            type="number"
                            name="discountPrice"
                            value={productData.discountPrice}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Count in Stock</label>
                        <input
                            type="number"
                            name="countInStock"
                            value={productData.countInStock}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                </div>

                {/* Categories and Brand */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block font-semibold mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={productData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={productData.brand}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Collection</label>
                        <input
                            type="text"
                            name="collections"
                            value={productData.collections}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                </div>

                {/* Sizes and Colors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
                        <input
                            type="text"
                            name="sizes"
                            value={productData.sizes.join(", ")}
                            onChange={handleArrayInput}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Colors (comma-separated)</label>
                        <input
                            type="text"
                            name="colors"
                            value={productData.colors.join(", ")}
                            onChange={handleArrayInput}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                </div>

                {/* Material and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold mb-2">Material</label>
                        <input
                            type="text"
                            name="material"
                            value={productData.material}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Gender</label>
                        <select
                            name="gender"
                            value={productData.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>
                </div>

                {/* Dimensions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <label className="block font-semibold mb-2">Length (cm)</label>
                        <input
                            type="number"
                            name="length"
                            value={productData.dimensions.length}
                            onChange={handleDimensionChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Width (cm)</label>
                        <input
                            type="number"
                            name="width"
                            value={productData.dimensions.width}
                            onChange={handleDimensionChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={productData.dimensions.height}
                            onChange={handleDimensionChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={productData.weight}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-semibold mb-2">Upload Images</label>
                    <input
                        type="file"
                        onChange={handleImage}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                    {uploading && <p className="text-gray-500 mt-2">Uploading image...</p>}
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {productData.images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image.url}
                                    alt={image.altText || "Product image"}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Toggles */}
                <div className="flex gap-6">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={productData.isFeatured}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span>Featured Product</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="isPublished"
                            checked={productData.isPublished}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span>Published</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct; 