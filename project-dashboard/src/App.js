import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import {Navbar, Footer, Sidebar, } from './components';
import {UserProfile, Payments, Tenants, FAQs, Contacts} from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
    const {activeMenu} = useStateContext();
  return (
    <div>
      <BrowserRouter>
        <div className="flex relative 
        dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{zIndex:'1000'}}>
            <TooltipComponent content="Settings" position="Top">
              <button className="text-3xl p-3
              hover:drop-shadow-xl
              hover:bg-light-gray"
              style={{borderRadius: '50%'}}>
                <FiSettings/>
              </button>
            </TooltipComponent>
          </div> 
          {activeMenu ? (
            <div className="w-72  fixed sidebar
            dark:bg-secondary-dark-bg
            bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0
            dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
            <div className={ `dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72 '
            : 'flex-2'}`
          }>
              <div className="fixed md:static
              bg-main-bg
              dark:bg-main-dark-bg navbar w-full">
                <Navbar />
              </div>
          

          <div>
            <Routes>
              {/* Dashboards */}
              <Route path='/' element={<Tenants />} />
              <Route path='/tenants' element={<Tenants />} />
              <Route path="/payments" element={<Payments />} />

              {/* Profile Information */}
              <Route path="/profile" element={<UserProfile />} />

              {/* Contact Us */}
              <Route path="/faqs" element={<FAQs/>} />
              <Route path="/contacts" element={<Contacts />} />


            </Routes>
          </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
    
  )
}

export default App