import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import {BrowserRouter as Router, Routes, Route, UNSAFE_RouteContext} from "react-router-dom";
import { AuthProvider } from './components/auth';
import { RequireAuth} from './components/requireAuth';

import { UserProfile, Payments, Tenants, FAQs, Contacts, Transactions, Import, Login, Error } from './pages';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    
    return (
      <AuthProvider>
      <Router>
      <Routes>
         <Route path="/profile/:username" element={
         //<RequireAuth>
          <UserProfile /> 
         // </RequireAuth>
      } />
  
          <Route path="/tenants" element={
         //<RequireAuth>
          <Tenants /> 
         // </RequireAuth>
         } />
  
          <Route path="/payments" element={
         //<RequireAuth>
          <Payments /> 
         // </RequireAuth>
         } />
  
          <Route path="/transactions" element={
         //<RequireAuth>
          <Transactions /> 
         // </RequireAuth>
         } />
  
          <Route path="/import" element={
         //<RequireAuth>
          <Import /> 
         // </RequireAuth>
         } />
  
          <Route path="/tenants" element={
         //<RequireAuth>
          <Tenants /> 
         // </RequireAuth>
         } />
  
          <Route path="/profile" element={
         //<RequireAuth>
          <UserProfile /> 
         // </RequireAuth>
         } />
  
          <Route path="/faqs" element={
         //<RequireAuth>
          <FAQs /> 
         // </RequireAuth>
         } />
  
          <Route path="/contacts" element={
         //<RequireAuth>
          <Contacts /> 
         // </RequireAuth>
         } />
  
  
  
       <Route exact path="/login" element={<Login />} />
       <Route exact path="/" element={<Login />} />
       <Route exact path="*" element={<Error />} />
      </Routes>
     </Router>
     </AuthProvider>

  )
}

export default App