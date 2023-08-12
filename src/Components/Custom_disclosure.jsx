import React, { useState } from 'react';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { NavLink, useLocation } from 'react-router-dom';

export default function Custom_disclosure({
  subIndex,
  subItems,
  checkScroll,
  activeStyle,
  close_modal,
  App_theme,

  data,
}) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div key={subIndex}>
        <div
          className='flex w-full items-center justify-between py-2 px-4 my-1 text-nav_link rounded-lg cursor-pointer  hover:bg-hover transition duration-200 ease-out hover:ease-in '
          onClick={() => {
            checkScroll;
            setOpen(!open);
          }}
        >
          <div className='flex items-center gap-2'>
            <img
              src={`${import.meta.env.VITE_baseURL}/${
                App_theme == 'dark' || location.pathname == subItems.destination
                  ? 'white_icons'
                  : 'icons'
              }/${subItems.label}.svg`}
              alt=''
            />
            <span className={`text-sm font-medium text-nav_link`}>
              {subItems.label}
            </span>
          </div>
          <MdKeyboardArrowDown></MdKeyboardArrowDown>
        </div>

        <div
          aria-label='Teams Nav'
          className={` flex-col ml-6 px-3 my-3 border-l-2 border-l-zinc-300 ${open} ? 'flex' : 'hidden'
          }`}
        >
          {data.map((submenu_items, sub_sub_Index) => {
            if (submenu_items.is_subroute == subItems.label) {
              return (
                <NavLink
                  key={sub_sub_Index}
                  onClick={close_modal}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  to={submenu_items.destination}
                  className='flex items-center gap-2 px-4 py-2 rounded-lg text-nav_link hover:bg-hover transition duration-200 ease-out hover:ease-in'
                >
                  <img
                    src={`${import.meta.env.VITE_baseURL}/${
                      App_theme == 'dark' ||
                      location.pathname == submenu_items.destination
                        ? 'white_icons'
                        : 'icons'
                    }/${submenu_items.label}.svg`}
                    alt=''
                  />
                  <span
                    className={`text-sm font-medium text-nav_link ${
                      location.pathname.includes(submenu_items.destination)
                        ? `text-white`
                        : null
                    }`}
                  >
                    {submenu_items.label}
                  </span>
                </NavLink>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
