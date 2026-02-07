import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PropertiesPage from './pages/PropertyPage'
import ServicePage  from './pages/ServicePage'
import CustomerPage from './pages/CustomerPage'
import FurniturePage from './pages/FurniturePage'
import ContactPage from './pages/ContactPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccess from './pages/OrderSuccess'
import Breadcurmb from './hooks/Breadcrumb'
import BackToTop from './components/BackToTop'


function App() {

  return(
    <div className="App">

      <NavBar />

      <Routes>
        <Route path='/' element={ <HomePage />}></Route>
        <Route path='/aboutus' element={ <AboutPage /> }></Route>
        <Route path='/properties' element={ <PropertiesPage />}></Route>
        <Route path='/services' element={ <ServicePage />}></Route>
        <Route path='/customers' element={ <CustomerPage /> }></Route>

        <Route path='/furnitures' element={ <FurniturePage />}></Route>
        <Route path='/furnitures/:id' element={ <ProductDetails />}></Route>
        <Route path='/carts' element={ <CartPage />}></Route>
        <Route path='/checkout' element={ <CheckoutPage />}></Route>

        <Route path='/contacts' element={ <ContactPage />}></Route>
        <Route path='/order-success' element={ <OrderSuccess /> }></Route>

      </Routes>

      <Breadcurmb />
      <BackToTop />

      <Footer />

    </div>
  )

}

export default App
