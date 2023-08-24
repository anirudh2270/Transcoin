import React, { useLayoutEffect } from 'react';
import 'animate.css';
import loadable from '@loadable/component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Views/Layout.jsx';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Dashborad from './Views/Dashboard.jsx';
const Login = loadable(() => import('./Views/Login.jsx'));
const Page_notFound = loadable(() => import('./Views/Page_notFound.jsx'));
const Account_security = loadable(() => import('./Views/Account_security.jsx'));
// const Dashboard = loadable(() => import('./Views/Dashboard.jsx'));

function App() {
  const App_theme = useSelector((state) => state.App_theme.mode);

  useLayoutEffect(() => {
    document.body.classList.toggle('dark', App_theme == 'dark');
    localStorage.setItem('app_theme', App_theme);
  }, [App_theme]);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<Layout />}>
            <Route path='/' element={<Dashborad />} />
            <Route path='/account/security' element={<Account_security />} />
            <Route path='*' element={<Page_notFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              fontWeight: 500,
              // color: 'green',
              background: App_theme == 'dark' ? 'red' : 'white',
            },
          },
          error: {
            style: {
              fontWeight: 500,
              // color: 'red',
              background: App_theme == 'dark' ? 'red' : 'white',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
