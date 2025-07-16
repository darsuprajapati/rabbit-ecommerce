import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URI}/api/admin/users`
const TOKEN = `Bearer ${localStorage.getItem("userToken")}`

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: TOKEN
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Failed to fetch users");
    }
});

// Add new user (admin)
export const addUser = createAsyncThunk("admin/addUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, userData, {
            headers: {
                Authorization: TOKEN
            }
        });
        return response.data; // Assume response contains `{ user: {...} }`
    } catch (error) {
        return rejectWithValue(error.response.data || "Failed to add user");
    }
});

// Update user (admin)
export const updateUser = createAsyncThunk("admin/updateUser", async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { name, email, role }, {
            headers: {
                Authorization: TOKEN
            }
        });
        return response.data.user; // Assume response is the updated user
    } catch (error) {
        return rejectWithValue(error.response.data || "Failed to update user");
    }
});

// Delete user (admin)
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: TOKEN
            }
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data || "Failed to delete user");
    }
});

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add User
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload.user);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload;
                const index = state.users.findIndex((user) => user._id === updatedUser._id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default adminSlice.reducer;
