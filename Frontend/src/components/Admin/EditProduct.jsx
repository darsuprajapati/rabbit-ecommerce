import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails, updateProduct } from '../../redux/slices/productsSlice';
import axios from 'axios';

const EditProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {id} = useParams()
    const {selectedProduct,loading,error} = useSelector((state)=>state.products)

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStok: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: []
    })

    const [uploading,setUploading] = useState(false) // Image uploading state

    useEffect(()=>{
        if(id){
            dispatch(fetchProductDetails({id}))
        }
    },[dispatch,id])

    useEffect(()=>{
        if(selectedProduct){
            setProductData(selectedProduct)
        }
    },[selectedProduct])

    const handleChange = (e) => {
        const { name, value } = e.target
        setProductData((prevData) => ({ ...prevData, [name]: value }))
    }
    const handleImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image",file)
        // console.log(file);
        try{
            setUploading(true);
            const {data} = await axios.post(
                `${import.meta.env.VITE_BACKEND_URI}/api/upload`,formData,{
                    headers:{"Content-Type":"multipart/form-data"}
                }
            )
            setProductData((prevData)=>({
                ...prevData,
                images:[...prevData.images,{url:data.imageUrl,altText:""}],
            }))
            setUploading(false);
        }
        catch(error){
            console.error(error)
            setUploading(false);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // reset the form
        // console.log(productData);
        dispatch(updateProduct({id,productData}))
        navigate("/admin/products")
    }

    if (loading) {
        return (
            <div className='p-6'>
                <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg text-center'>
                    <p>Loading....</p>
                </div>
            </div>
        )
    }
    
    if (error) {
        return (
            <div className='p-6'>
                <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg text-center'>
                    <p className='text-red-500'>Error: {error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
            <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {/* name */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Product Name</label>
                    <input type="text" name='name' value={productData.name} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required />
                </div>
                {/* description */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Description</label>
                    <textarea name="description" value={productData.description} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' rows={4} required></textarea>
                </div>

                {/* Price */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Price</label>
                    <input type="text" name="price" value={productData.price} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                {/* Count In stock */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Count In Stock</label>
                    <input type="text" name="countInStok" value={productData.countInStok} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                {/* SKU */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>SKU</label>
                    <input type="text" name="sku" value={productData.sku} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                {/* Sizes */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Sizes (comma-separated)</label>
                    <input type="text" name="sizes" value={productData.sizes.join(", ")} onChange={(e) => setProductData({ ...productData, sizes: e.target.value.split(",").map((size) => size.trim()) })} className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                {/* colors */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Color (comma-separated)</label>
                    <input type="text" name="color" value={productData.colors.join(", ")} onChange={(e) => setProductData({ ...productData, colors: e.target.value.split(",").map((color) => color.trim()) })} className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                {/* Image Upload */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Upload Images</label>
                    <input type="file" onChange={handleImage} />
                    {uploading && <p>uploading images...</p>}
                    <div className='flex gap-4 mt-4'>
                        {productData.images.map((image, index) => (
                            <div key={index}>
                                <img src={image.url} alt={image.altText || "product image"} className='w-20 h-20 object-cover rounded-md shadow-md' />
                            </div>
                        ))}
                    </div>
                </div>
                <button type='submit' className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors'>Update Product</button>
            </form>
        </div>
    )
}

export default EditProduct

 