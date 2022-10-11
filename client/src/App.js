import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react';

import LoginForm from "./components/loginForm";
import AuthForm from "./components/authForm";
import Profile from "./components/profile";
import Error from "./components/Error";
import {BrowserRouter as Router, Routes, Route, UNSAFE_RouteContext} from "react-router-dom";
import { AuthProvider } from './components/auth';
import { RequireAuth} from './components/requireAuth';

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthProvider>
    <Router>
    <Routes>
       <Route path="/auth" element={
        <RequireAuth>
       <AuthForm />
       </RequireAuth>
       } />
       <Route path="/profile/:username" element={
       <RequireAuth>
        <Profile /> 
        </RequireAuth>} />
     <Route exact path="/login" element={<LoginForm />} />
     <Route exact path="/" element={<LoginForm />} />
     <Route exact path="*" element={<Error />} />
    </Routes>
   </Router>
   </AuthProvider>
  );
}

export default App;
