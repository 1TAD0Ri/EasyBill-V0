import "./App.css";
import { createContext, useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "./Views/HomePage";
import Register from './Views/Register';
import Login from './Views/Login';
import Dash from "./Views/Dash";
import AllInvoices from "./Views/AllInvoices";
import Sells from "./Views/Sells";
import Purchases from "./Views/Purchases";
import Create from "./components/Create";
import Update from "./components/UpdateClient";
import ShowOneClient from "./components/ShowOneClient";
import DashboardCleint from "./components/DashboardCleint";
import CreateInvoice from "./components/CreateInvoice";
import UpdateInvoice from "./components/UpdateInvoice";
import OneInvoice from "./components/OneInvoice";
import { NewInvoice } from "./components/NewInvoice";
import Home from "./components/Home";
import Cookies from "js-cookie";
export const User = createContext();
function App() {
  const token = Cookies.get('token');
  const [data, setData] = useState([]);
  // const [Id, setUserId] = useState()
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || '');
  useEffect(() => {
    // Save userId to localStorage whenever it changes
    localStorage.setItem('userId', userId);
  }, [userId]);
  return (
    // <User.Provider value={{ userId, setUserId }}>
    <>
      <Routes>

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        {token ? (
          <>
            <Route path="/login" element={<Login setUserId={setUserId} />} />
            <Route path="/register" element={<Register setData={setData} data={data} />} />
            <Route path="/logined" element={<h1>You Have Been Log In {JSON.stringify(userId)}</h1>} />
            <Route path="/dash" element={<Dash userId={userId} />} />
            <Route path="/allinv" element={<Home userId={userId} />} />
            <Route path="/allinvsales" element={<Sells userId={userId} />} />
            <Route path="/allinvpurch" element={<Purchases userId={userId} />} />
            <Route path='/clients/create' element={<Create />} />
            <Route path='/clients/:id/edit' element={<Update />} />
            <Route path='/clients/:id' element={<ShowOneClient />} />
            <Route path='/allContacts' element={<DashboardCleint />} />
            <Route path="/allInvHome" element={<Home />} />
            <Route path='/factures/create' element={<NewInvoice />} />
            <Route path='/factures/:id/edit' element={<UpdateInvoice />} />
            <Route path='/factures/:id' element={<OneInvoice />} />
            <Route path='/invoices' element={<NewInvoice />} />
            <Route path='/invoices/:id' element={<OneInvoice />} />
            <Route path="*" element={<h1>404 Error Not Found</h1>} />
          </>
        ) : (
          <>
          <Route path="/" element={<Navigate to="/home"/>} />
          <Route path="*" element={<Navigate to="/home"/>} />
          <Route path="/login" element={<Login setUserId={setUserId} />} />
          <Route path="/register" element={<Register setData={setData} data={data}/>} />
          </>
        )}
      </Routes>
    </>
    // </User.Provider>
  );
}

export default App;