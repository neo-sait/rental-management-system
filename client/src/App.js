import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import {BrowserRouter as Router, Routes, Route, UNSAFE_RouteContext} from "react-router-dom";

import {Tenants, Transactions, Import, Login, Error, NewTransaction, Overview, Lists } from './pages';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    
    return (
      <Router>
      <Routes>
  
          <Route path="/tenants" element={
          <Tenants /> 
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
  

        <Route path="/newtransaction" element={
          <NewTransaction /> 
         } />

        <Route path="/overview" element={
          <Overview /> 
         } />

        <Route path="/lists" element={
          <Lists /> 
         } />
  
  
  
       <Route exact path="/login" element={<Login />} />
       <Route exact path="/" element={<Login />} />
       <Route exact path="*" element={<Error />} />
      </Routes>
     </Router>
  )
}

export default App