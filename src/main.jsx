import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import PricingCurrencies from './components/Odos/Pricing/PricingCurrencies.jsx'
import ChainId from './components/Odos/Pricing/ChainId.jsx'
import TokenAddress from './components/Odos/Pricing/TokenAddress.jsx'
import QuoteV2 from './components/Odos/SmartOrder/QuoteV2.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  BrowserRouter,
} from "react-router-dom";
import { Route } from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path='/odos-pricing-currencies' element={<PricingCurrencies/>}/>
      <Route path='/chainId' element={<ChainId/>}/>
      <Route path='/token-address' element={<TokenAddress/>}/>
      <Route path='/quoteV2' element={<QuoteV2/>}/>
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <RouterProvider router={router} />
  </StrictMode>,
)
