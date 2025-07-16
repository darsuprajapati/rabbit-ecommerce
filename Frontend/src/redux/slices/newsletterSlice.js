import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URI}`;

// Async thunk to subscribe to newsletter
export const subscribeToNewsletter = createAsyncThunk(
    "newsletter/subscribe",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/subscribe`, { email });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const newsletterSlice = createSlice({
    name: "newsletter",
    initialState: {
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        resetNewsletterState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribeToNewsletter.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(subscribeToNewsletter.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(subscribeToNewsletter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to subscribe to newsletter";
                state.success = false;
            });
    }
});

export const { resetNewsletterState } = newsletterSlice.actions;
export default newsletterSlice.reducer; 