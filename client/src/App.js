import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import {BrowserRouter as Router, Routes, Route, UNSAFE_RouteContext} from "react-router-dom";

import { UserProfile, Payments, Tenants, FAQs, Contacts, Transactions, Import, Login, Error } from './pages';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    
    return (
      <Router>
      <Routes>
         <Route path="/profile/:username" element={
          <UserProfile /> 
      } />
  
          <Route path="/tenants" element={
          <Tenants /> 
         } />
  
          <Route path="/payments" element={
          <Payments /> 
         } />
  
          <Route path="/transactions" element={
          <Transactions /> 
         } />
  
          <Route path="/import" element={
          <Import /> 
         } />
  
          <Route path="/tenants" element={
          <Tenants /> 
         } />
  
          <Route path="/profile" element={
          <UserProfile /> 
         } />
  
          <Route path="/faqs" element={
          <FAQs /> 
         } />
  
          <Route path="/contacts" element={
          <Contacts /> 
         } />
  
  
  
       <Route exact path="/login" element={<Login />} />
       <Route exact path="/" element={<Login />} />
       <Route exact path="*" element={<Error />} />
      </Routes>
     </Router>
  )
}

export default App