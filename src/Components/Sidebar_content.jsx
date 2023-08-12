import Sidebar_skeleton from '../Loading_Skeletons/Sidebar.jsx';
import { sidebar_off } from '../Redux/MobileNavbar_control.jsx';
import { useLogoutMutation, useSidebarQuery } from '../Services/apiSlice.jsx';
import { useCallback, useEffect } from 'react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { TbSunset2 } from 'react-icons/tb';
import DarkModeSwitch from './DarkModeSwitch.jsx';
import { Switch_theme } from '../Redux/App_theme.jsx';
import Custom_disclosure from './Custom_disclosure.jsx';

export const Sidebar_content = ({ checkScroll }) => {
  const App_theme = useSelector((state) => state.App_theme.mode);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [logout] = useLogoutMutation();
  const { data, isLoading, isSuccess, isError } = useSidebarQuery();
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function close_modal() {
    setTimeout(function () {
      dispatch(sidebar_off());
    }, 100);
  }

  const handle_logout = async () => {
    logout();
    localStorage.removeItem('Token');
    localStorage.removeItem('Email');
    navigate('/login');
  };

  const style = { fontSize: '1.4rem', color: ' var(--nav_link)' };

  const handle_theme = () => {
    dispatch(Switch_theme());
  };

  const activeStyle = {
    color: 'white ',
    backgroundImage:
      'linear-gradient(134.6deg, rgba(158, 150, 252, 0.85) -1%, rgba(211, 133, 176, 1) 16.9%, rgba(249, 116, 146, 1) 43.7%, rgba(255, 158, 136, 1) 66.9%, rgba(254, 228, 172, 1) 94.8%)',
  };

  const unique_types = useCallback(() => {
    const type = [];
    if (isSuccess) {
      for (let i = 0; i < data.length; i++) {
        type.push(data[i].type);
      }
    }
    setUniqueTypes(Array.from(new Set(type)));
  }, [data, isSuccess]);

  useEffect(() => {
    unique_types();
  }, [unique_types]);

  return isLoading || isError ? (
    <Sidebar_skeleton />
  ) : (
    <>
      {uniqueTypes.map((items, index) => {
        return (
          <div className='mt-5' key={index}>
            <span className='text-xs font-bold text-nav_link uppercase'>
              {items}
            </span>
            <div className='mt-3'>
              {data.map((subItems, subIndex) => {
                return (
                  <div key={subIndex}>
                    {subItems.type == items &&
                    !subItems.has_subroute &&
                    subItems.is_subroute == 'no' ? (
                      <NavLink
                        onClick={close_modal}
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        to={subItems.destination}
                        className='flex items-center gap-2 my-1  py-2 px-4 rounded-lg text-nav_link hover:bg-hover transition duration-200 ease-out hover:ease-in'
                      >
                        <img
                          src={`${import.meta.env.VITE_baseURL}/${
                            App_theme == 'dark' ||
                            location.pathname == subItems.destination
                              ? 'white_icons'
                              : 'icons'
                          }/${subItems.label}.svg`}
                          alt=''
                        />
                        <span
                          className={`text-sm font-medium text-nav_link ${
                            location.pathname == subItems.destination
                              ? `text-white`
                              : null
                          }`}
                        >
                          {subItems.label}
                        </span>
                      </NavLink>
                    ) : subItems.type == items &&
                      subItems.has_subroute &&
                      subItems.is_subroute == 'no' ? (
                      <Custom_disclosure
                        subIndex={subIndex}
                        subItems={subItems}
                        activeStyle={activeStyle}
                        App_theme={App_theme}
                        close_modal={close_modal}
                        data={data}
                        checkScroll={checkScroll}
                      />
                    ) : // <Disclosure
                    //   key={subIndex}
                    //   defaultOpen={location.pathname.includes(
                    //     subItems.destination
                    //   )}
                    //   as='div'
                    // >
                    //   <Disclosure.Button
                    //     className='flex w-full items-center justify-between py-2 px-4 my-1 text-nav_link rounded-lg cursor-pointer  hover:bg-hover transition duration-200 ease-out hover:ease-in '
                    //     onClick={checkScroll}
                    //   >
                    //     <div className='flex items-center gap-2'>
                    //       <img
                    //         src={`${import.meta.env.VITE_baseURL}/${
                    //           App_theme == 'dark' ||
                    //           location.pathname == subItems.destination
                    //             ? 'white_icons'
                    //             : 'icons'
                    //         }/${subItems.label}.svg`}
                    //         alt=''
                    //       />
                    //       <span
                    //         className={`text-sm font-medium text-nav_link`}
                    //       >
                    //         {subItems.label}
                    //       </span>
                    //     </div>
                    //     <MdKeyboardArrowDown></MdKeyboardArrowDown>
                    //   </Disclosure.Button>
                    //   <Transition
                    //     enter='transition duration-500 ease-in'
                    //     enterFrom='transform scale-95 opacity-0'
                    //     enterTo='transform scale-100 opacity-100'
                    //     leave='transition duration-500 ease-out'
                    //     leaveFrom='transform scale-100 opacity-100'
                    //     leaveTo='transform scale-95 opacity-0'
                    //   >
                    //     <Disclosure.Panel
                    //       aria-label='Teams Nav'
                    //       className='flex flex-col ml-6 px-3 my-3 border-l-2 border-l-zinc-300'
                    //     >
                    //       {data.map((submenu_items, sub_sub_Index) => {
                    //         if (submenu_items.is_subroute == subItems.label) {
                    //           return (
                    //             <NavLink
                    //               key={sub_sub_Index}
                    //               onClick={close_modal}
                    //               style={({ isActive }) =>
                    //                 isActive ? activeStyle : undefined
                    //               }
                    //               to={submenu_items.destination}
                    //               className='flex items-center gap-2 px-4 py-2 rounded-lg text-nav_link hover:bg-hover transition duration-200 ease-out hover:ease-in'
                    //             >
                    //               <img
                    //                 src={`${import.meta.env.VITE_baseURL}/${
                    //                   App_theme == 'dark' ||
                    //                   location.pathname ==
                    //                     submenu_items.destination
                    //                     ? 'white_icons'
                    //                     : 'icons'
                    //                 }/${submenu_items.label}.svg`}
                    //                 alt=''
                    //               />
                    //               <span
                    //                 className={`text-sm font-medium text-nav_link ${
                    //                   location.pathname.includes(
                    //                     submenu_items.destination
                    //                   )
                    //                     ? `text-white`
                    //                     : null
                    //                 }`}
                    //               >
                    //                 {submenu_items.label}
                    //               </span>
                    //             </NavLink>
                    //           );
                    //         }
                    //       })}
                    //     </Disclosure.Panel>
                    //   </Transition>
                    // </Disclosure>
                    null}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className='md:flex w-full hidden  items-center justify-between py-2 px-4 my-1 text-nav_link rounded-lg cursor-pointer  hover:bg-hover transition duration-200 ease-out hover:ease-in '>
        <div className='flex items-center gap-2'>
          <TbSunset2 style={style} />
          <span className='text-sm font-medium'>Theme</span>
        </div>
        <DarkModeSwitch
          App_theme={App_theme}
          handle_theme={handle_theme}
        ></DarkModeSwitch>
      </div>
      <div
        className=' w-full  py-2 px-4 my-1 text-nav_link rounded-lg cursor-pointer  hover:bg-hover transition duration-200 ease-out hover:ease-in '
        onClick={handle_logout}
      >
        <div className='flex items-center gap-2'>
          <img
            src={`${import.meta.env.VITE_baseURL}/${
              App_theme == 'dark' ? 'white_icons' : 'icons'
            }/logout.svg`}
            alt=''
          />
          <span className='text-sm font-medium text-nav_link'>Logout</span>
        </div>
      </div>
    </>
  );
};
