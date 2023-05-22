import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import {
  Home,
  Cart,
  Checkout,
  Login,
  Products,
  SingleProduct,
  Error,
} from './pages';
import { Navbar, Sidebar, Footer } from './components';

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const dynamicTheme = createTheme({
    palette:
      mode === 'light'
        ? {
            primary: {
              main: '#fffffc',
            },
            secondary: {
              main: '#344e41',
            },
            error: {
              main: '#9d0208',
            },
            action: {
              active: '#344e41',
              selected: '#344e41',
            },
          }
        : {
            primary: {
              main: '#344e41',
            },
            secondary: {
              main: '#fffffc',
            },
            error: {
              main: '#9d0208',
            },
            action: {
              active: '#fffffc',
              selected: '#fffffc',
            },
          },
  });
  return (
    <ThemeProvider theme={dynamicTheme}>
      <Router>
        <Navbar mode={mode} setMode={setMode} />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
