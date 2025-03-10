import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/AuthPage/LoginPage';
import RegisterPage from './pages/AuthPage/RegisterPage';
// import UserProfilePage from './pages/UserProfilePage';

import PrivateRoute from './components/routing/PrivateRoute';

import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import setAuthToken from './utils/setAuthToken';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router> 
        <div className="App">
          {/* Header will go herer */}
            <Routes>
              <Route path="/" element={<HomePage />} /> 
              <Route path="/category/:categoryId" element={<CategoryPage />} /> 
              <Route path="/product/:productId" element={<ProductPage />} /> 
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* <Route path="/profile" element={<PrivatRoute><UserProfilePage /></PrivatRoute>} /> */}
              {/* Another routes */}
            </Routes>
          {/* Footer will go here */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
