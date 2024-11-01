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
import V2Zap from './components/Odos/SmartOrder/V2Zap.jsx'
import Assemble from './components/Odos/SmartOrder/Assemble.jsx'
import BlockMetrix from './components/Functions/BlockMetrix.jsx'
import WhaleTransaction from './components/Functions/WhaleTransaction.jsx'
import MultichainTransaction from './components/Functions/MultichainTransaction.jsx'
import GasPrice from './components/Functions/GasPrice.jsx'
import OdosLayout from './components/Odos/OdosLayout.jsx'
import CreateStream from './components/Streams/CreateStream.jsx'
import RetrieveStream from './components/Streams/RetrieveStream.jsx'
import NotificationById from './components/Streams/NotificationById.jsx'
import PauseId from './components/Streams/PauseId.jsx'
import ActivateId from './components/Streams/ActivateId.jsx'

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
      <Route path='/V2zap' element={<V2Zap/>}/>
      <Route path='/assemble' element={<Assemble/>}/>
      <Route path='/blockmetrix' element={<BlockMetrix/>}/>
      <Route path='/gasprice' element={<GasPrice/>}/>
      <Route path='/multichain-txn' element={<MultichainTransaction/>}/>
      <Route path='/whale-txn' element={<WhaleTransaction/>}/>
      <Route path='/odos-layout' element={<OdosLayout/>}/>
      <Route path='/create-stream' element={<CreateStream/>}/>
      <Route path='/retrieve-stream' element={<RetrieveStream/>}/>
      <Route path='/notification-id' element={<NotificationById/>}/>
      <Route path='/pause-id' element={<PauseId/>}/>
      <Route path='/activate-id' element={<ActivateId/>}/>
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <RouterProvider router={router} />
  </StrictMode>,
)
