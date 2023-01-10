import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import {BrowserRouter as Router, Routes, Route, UNSAFE_RouteContext} from "react-router-dom";

import {Profiles, Transactions, Import, Login, Error, NewTransaction, Overview, Lists, Calculate } from './pages';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    
    return (
      <Router>
      <Routes>
         <Route path="/overview" element={
          <Overview /> 
         } />
          <Route path="/profiles" element={
          <Profiles /> 
         } />
  
          <Route path="/transactions" element={
          <Transactions /> 
         } />
  
          <Route path="/import" element={
          <Import /> 
         } />
  

        <Route path="/newtransaction" element={
          <NewTransaction /> 
         } />

        

        <Route path="/lists" element={
          <Lists /> 
         } />

        <Route path="/calculate" element={
          <Calculate /> 
         } />
  
  
  
       <Route exact path="/login" element={<Login />} />
       <Route exact path="/" element={<Login />} />
       <Route exact path="*" element={<Error />} />
      </Routes>
     </Router>
  )
}
//replace 'localhost' with IP of deployment machine
export const  ipAddress = '192.18.153.223'; 
export default App