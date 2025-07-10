import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import LoginPage from './pages/AuthPage/LoginPage';
import RegisterPage from './pages/AuthPage/RegisterPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import OrderSumamryPage from './pages/OrderSummaryPage/OrderSummaryPage';
import OrderHistoryPage from './pages/UserProfilePage/OrderHistoryPage';
import AddressManagementPage from './pages/UserProfilePage/AddressManagementPage';

import Header from './components/layout/Header'

import PrivateRoute from './components/routing/PrivateRoute';

import AdminPrivateRoute from './components/routing/AdminPrivateRoute';
import AdminLayout from './pages/AdminPage/components/AdminLayout';
import AdminDashboard from './pages/AdminPage/subpages/AdminDashboard';
import AdminProductManagment from './pages/AdminPage/subpages/AdminProductManagment';
import AdminCategoryManagment from './pages/AdminPage/subpages/AdminCategoryManagment';
import AdminOrderManagment from './pages/AdminPage/subpages/AdminOrderManagment';
import AdminUserManagment from './pages/AdminPage/subpages/AdminUserManagment';

import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import setAuthToken from './utils/setAuthToken';


if (localStorage.token) { setAuthToken(localStorage.token); }


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router> 
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/category/:categoryId" element={<CategoryPage />} /> 
            <Route path="/product/:productId" element={<ProductPage />} /> 
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* --- Private Routes --- */}
            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-summary/:orderId" element={<OrderSumamryPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/profile/orders" element={<OrderHistoryPage />} />
              <Route path="/profile/addresses" element={<AddressManagementPage />} />
            </Route>

            {/* --- Admin Private Routes --- */}
            <Route element={<AdminPrivateRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProductManagment />} />
                <Route path="categories" element={<AdminCategoryManagment />} />
                <Route path="orders" element={<AdminOrderManagment />} />
                <Route path="users" element={<AdminUserManagment />} />
                <Route index element={<AdminDashboard />} />
              </Route>
            </Route>

            {/* --- Add 404 page --- */}

          </Routes>
          {/* Footer will go here */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
