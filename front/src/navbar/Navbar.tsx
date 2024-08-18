import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className='bg-[#1A2130] z-10 text-white fixed w-full h-[60px] pl-5 pr-5 navbar flex justify-between items-center flex-row'>
      
    
      <div className="logo flex  items-center">SO(IT) <img src="../../public/Indian Navy Logo Vector.svg" className="w-22" alt="" /></div>
      <div className="right">
        <ul className='flex capitalize'>
          <li
            className={`p-2 rounded m-2 cursor-pointer ${currentPath === '/home' ? 'bg-blue-600 text-white' : ' text-gray-200'} hover:bg-blue-500`}
          >
            <Link to='/home'>Dashboard</Link>
          </li>
          
          <li
            className={`p-2 rounded m-2 cursor-pointer ${currentPath === '/pending' ? 'bg-blue-600 text-white' : ' text-gray-200'} hover:bg-blue-500`}
          >
            <Link to='/pending'>Pending</Link>
          </li>

          <li
            className={`p-2 rounded m-2 cursor-pointer ${currentPath === '/login' ? 'bg-blue-600 text-white' : ' text-gray-200'} hover:bg-blue-500`}
          >
            <Link to='/login'>Login</Link>
          </li>

          <li
            className={`p-2 rounded m-2 cursor-pointer ${currentPath === '/bin' ? 'bg-blue-600 text-white' : ' text-gray-200'} hover:bg-blue-500`}
          >
            <Link to='/bin'>Bin</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
