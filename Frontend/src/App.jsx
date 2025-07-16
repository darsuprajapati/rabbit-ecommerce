import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/Products/ProductDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfimationPage from './pages/OrderConfimationPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/Admin/UserManagement';
import ProductManagement from './components/Admin/ProductManagement';
import EditProduct from './components/Admin/EditProduct';
import AddProduct from './components/Admin/AddProduct';
import OrederManagemeant from './components/Admin/OrederManagemeant';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import Features from './pages/Features';

import { Provider } from "react-redux"
import store from "./redux/store.js"
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Toaster position='top-right' />
        <Routes>
          {/* User Layout */}
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/collections/:collection' element={<CollectionPage />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order-confirmation' element={<OrderConfimationPage />} />
            <Route path='/my-orders' element={<MyOrdersPage />} />
            <Route path='/order/:id' element={<OrderDetailsPage />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/features' element={<Features />} />
          </Route>
          <Route path='/admin' element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute> }>
            {/* Admin Layout */}
            <Route index element={<AdminHomePage />} />
            <Route path='users' element={<UserManagement />} />
            <Route path='products' element={<ProductManagement />} />
            <Route path='products/add' element={<AddProduct />} />
            <Route path='products/:id/edit' element={<EditProduct />} />
            <Route path='orders' element={<OrederManagemeant />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  )
}

export default App