import Sidebar from '../Components/Sidebar.jsx';
import Navbar from '../Components/Navbar.jsx';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Socket from '../Services/Socket.jsx';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (location.state == 'Already_logged in') {
      toast.success(
        <div className='mb-2'>
          <span> Already logged in! </span>
          <span className='text-xl'> 😉</span>
        </div>
      );
      return;
    }
  }, [location.state, navigate]);

  return (
    <div>
      <Socket />
      <div className=''>
        <div className=''>
          {/* main layout */}
          <div className='mx-auto xxl:container' id='main'>
            <div className='flex '>
              <div className='fixed hidden hover:drop-shadow-2xl transition-all duration-700 ease-in-out w-72 md:block'>
                <Sidebar />
              </div>
              <div className='flex-1'>
                <div className='relative top-4'>
                  <Navbar />
                </div>
                <div className='layout_margin '>
                  <div className='mt-5'>
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
