import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [
            {
                name: "Men's Top Wear",
                path: "/collections/all?gender=Men&category=Top Wear"
            },
            {
                name: "Women's Top Wear",
                path: "/collections/all?gender=Women&category=Top Wear"
            },
            {
                name: "Men's Bottom Wear",
                path: "/collections/all?gender=Men&category=Bottom Wear"
            },
            {
                name: "Women's Bottom Wear",
                path: "/collections/all?gender=Women&category=Bottom Wear"
            }
        ]
    },
    reducers: {}
});

export default categorySlice.reducer; 