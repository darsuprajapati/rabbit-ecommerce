import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URI}`
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`

// ✅ Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: USER_TOKEN },
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

// ✅ Update order delivery status
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/orders/${id}`,
        { status },
        { headers: { Authorization: USER_TOKEN } }
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

// ✅ Delete an order (fixed action type)
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
        headers: { Authorization: USER_TOKEN },
      })
      return id
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📦 Fetch Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
        state.totalOrders = action.payload.length
        state.totalSales = action.payload.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        )
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "Failed to fetch orders"
      })

      // ✅ Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload
        const index = state.orders.findIndex((o) => o._id === updatedOrder._id)
        if (index !== -1) {
          state.orders[index] = updatedOrder
        }
      })

      // ✅ Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((o) => o._id !== action.payload)
        state.totalOrders = state.orders.length
        state.totalSales = state.orders.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        )
      })
  },
})

export default adminOrderSlice.reducer
