import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

import {
  Home,
  Cart,
  Checkout,
  Login,
  Products,
  SingleProduct,
  Error,
  Register,
  Dashboard,
  Stats,
  Profile,
  AddCategory,
  AddProduct,
} from './pages';
import { Navbar, Footer } from './components';
import useAppSelector from './hooks/useAppSelector';
import { useAppDispatch } from './hooks/useAppDispatch';
import { calculateTotal } from './store/reducers/cartSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const { cartItems } = useAppSelector((state) => state.cart);
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  const dynamicTheme = createTheme({
    palette:
      mode === 'light'
        ? {
            background: {
              default: '#a3b18a',
            },
            primary: {
              main: '#fffffc',
            },
            secondary: {
              main: '#344e41',
            },
            error: {
              main: '#9d0208',
            },
          }
        : {
            background: {
              default: '#fffffc',
            },
            primary: {
              main: '#344e41',
            },
            secondary: {
              main: '#fffffc',
            },
            error: {
              main: '#9d0208',
            },
          },
  });
  return (
    <ThemeProvider theme={dynamicTheme}>
      <Router>
        <Navbar mode={mode} setMode={setMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Profile />} />
            <Route path="add-categories" element={<AddCategory />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="stats" element={<Stats />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </ThemeProvider>
  );
};

export default App;
