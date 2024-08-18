import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Footer from './navbar/Footer';
import Home from './dashboard/Home';
import Form1 from './dashboard/Form'; // Renamed from `Form` to `Form1` based on your import
import Pending from './dashboard/Pending';
import Login from './login/Login';
import EditForm from './dashboard/EditForm';
import BinView from './dashboard/BinView'; // Import the BinView component
import DetailPage from './dashboard/DetailedPage'; // Import the DetailPage component

export default function App() {
  const location = useLocation();
  const isFormRoute = location.pathname === '/form';
  
  return (
    <div className='flex flex-col min-h-[100vh] overflow-x-hidden'>
      <Navbar />
      <div className={`content flex-1 ${isFormRoute ? 'flex justify-center items-center' : ''}`}>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/form' element={<Form1 />} />
          <Route path='/pending' element={<Pending />} />
          <Route path='/login' element={<Login />} />
          <Route path='/edit/:id' element={<EditForm />} />
          <Route path='/bin' element={<BinView />} /> {/* New route for BinView */}
          <Route path='/detail/:id' element={<DetailPage />} /> {/* New route for DetailPage */}
        </Routes>
      </div>
      <Footer />
      
    </div>
  );
}
