import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

// Retrieve user info and token from localStorage if available
const userFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// Check for an existing guest ID in the localStorage or generate a new one
const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId)

// Initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/users/login`, userData)
        localStorage.setItem("userInfo", JSON.stringify(response.data.user))
        localStorage.setItem("userToken", response.data.token);

        return response.data.user; //Return the user object from the response
    }
    catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

// Async Thunk for User Register 
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/users/register`, userData)
        localStorage.setItem("userInfo", JSON.stringify(response.data.user))
        localStorage.setItem("userToken", response.data.token);

        return response.data.user; //Return the user object from the response
    }
    catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`; // Reset guest ID on logout
            localStorage.removeItem("userInfo")
            localStorage.removeItem("userToken")
            localStorage.setItem("guestId", state.guestId); //set new guest ID in localStorage
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId)
        }
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.payload || "Login failed";
            })
            // Register cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.payload || "Registration failed";
            })
    }
})

export const { logout, generateNewGuestId } = authSlice.actions
export default authSlice.reducer;