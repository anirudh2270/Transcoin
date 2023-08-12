import { Fragment } from 'react';
import React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { Switch_theme } from '../Redux/App_theme.jsx';
import { Switch_sidebar } from '../Redux/MobileNavbar_control.jsx';
import DarkModeSwitch from './DarkModeSwitch.jsx';
import { Hamburger } from './Hamburger.jsx';
import Mobile_navbar from './Mobile_navbar.jsx';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const App_theme = useSelector((state) => state.App_theme.mode);
  const dispatch = useDispatch();
  const { is_collapsed } = useSelector((state) => state.sidebar_collapsed);

  const handle_theme = () => {
    dispatch(Switch_theme());
  };

  const handle_hamburger = () => {
    dispatch(Switch_sidebar());
  };

  return (
    <Disclosure as='nav' className='right-0 md:fixed sticky block md:hidden'>
      <>
        <div className='m-4'>
          <div
            className='text-text_primary rounded-3xl bg-body_secondary px-3 md:px-4 drop-shadow-xl'
            id='nav'
          >
            <div className='relative flex items-center justify-between h-16'>
              <div className='inset-y-0 left-0 flex items-center md:hidden'>
                {/* Mobile menu button*/}
                <Hamburger
                  is_collapsed={is_collapsed}
                  handle_hamburger={handle_hamburger}
                ></Hamburger>
              </div>
              <div className='flex items-center flex-1 sm:items-stretch sm:justify-start'>
                <div className='flex items-center flex-shrink-0'>
                  <img
                    className='block w-auto h-10 md:hidden'
                    src='src/assets/only_logo.svg'
                    alt='Your Company'
                  />
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0'>
                <button
                  type='button'
                  className='rounded-full bg-gray-100 dark:bg-[#2a2a2f] p-1 text-gray-400 dark:text-white'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon
                    className='h-6 w-6 hover:-translate-y-0.5 hover:scale-110 transition'
                    aria-hidden='true'
                  />
                </button>

                {/* Profile dropdown */}

                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='rounded-full bg-gray-100 dark:bg-[#2a2a2f] p-1 text-gray-400 dark:text-white  '>
                      <span className='sr-only'>Open user menu</span>
                      <UserCircleIcon
                        className='h-6 w-6 hover:-translate-y-0.5 hover:scale-110 transition'
                        aria-hidden='true'
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <div className='ml-3'>
                  <DarkModeSwitch
                    App_theme={App_theme}
                    handle_theme={handle_theme}
                  ></DarkModeSwitch>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Mobile_navbar
          state={is_collapsed}
          handle_hamburger={handle_hamburger}
        />
      </>
    </Disclosure>
  );
}
