import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noteIcon from "../assets/Notes-icon.png";
import { selectNote, selectScreen } from "../store/taskSlice";
import { loadProfile } from "../store/authSlice";
import { GoogleLogout } from 'react-google-login';
import { AuthState } from "../interfaces";
import { RootState } from "../store";

const Sidebar = () => {

  const [selectedValue, setSelectedValue] = useState<string>("all-notes");

  const auth:AuthState = useSelector((state:RootState) => state.auth);
  const dispatch = useDispatch()

  const handleChange = (e: any) => {
    setSelectedValue(e.target.value);
    dispatch(selectScreen(e.target.value))
    dispatch(selectNote(null))
    console.log(e.target.value);
  };
  return (
    <div className="flex flex-col bg-gray-700 h-screen">
      <div className="mx-5 ">
        <div className="flex justify-start  py-3">
          <img src={noteIcon} className="w-8 h-8 mt-2" />
          <div className="mx-2">
            <h5 className="font-bold text-white">Simple</h5>
            <p className="text-white text-xs opacity-60 ">Note App</p>
          </div>
        </div>
      </div>
      <hr className="my-2 mx-5 h-px bg-gray-400 border-0" />
      <div className="flex flex-col justify-between grow">
        <div className="m-3 flex flex-col">
          <div className="flex flex-row">
            <input
              id="menu-1"
              type="radio"
              value="all-notes"
              name="menu"
              className="peer hidden opacity-50"
              checked={selectedValue === "all-notes"}
              onChange={handleChange}
            />
            <label
              className="m-1 py-2 px-8 flex cursor-pointer bg-gray-500 text-white peer-checked:bg-gray-200 peer-checked:text-black rounded w-full text-start"
              htmlFor="menu-1"
            >
              <p className="">All Notes</p>
            </label>
          </div>
          <div className="flex flex-row">
            <input
              id="menu-2"
              type="radio"
              value="favourites"
              name="menu"
              className="peer hidden opacity-50"
              checked={selectedValue === "favourites"}
              onChange={handleChange}
            />
            <label
              className="m-1 py-2 px-8 flex cursor-pointer bg-gray-500 text-white peer-checked:bg-gray-200 peer-checked:text-black rounded w-full text-start"
              htmlFor="menu-2"
            >
              <p className="">Favourites</p>
            </label>
          </div>

          {/* <div className="flex flex-row">
            <button
              className="m-1 py-2 px-2 flex cursor-pointer bg-gray-500 peer-checked:bg-gray-400 rounded w-full text-start  items-center"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              {!categoriesOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}

              <p className="px-2 text-white">Categories</p>
            </button>
          </div> */}
          {/* {categoriesOpen ? (
            <div className="mx-2">
              <div className="flex flex-row">
                <input
                  id="cat-1"
                  type="radio"
                  value="cat-1"
                  name="default-radio"
                  className="peer hidden opacity-50"
                  checked={selectedValue === "cat-1"}
                  onChange={handleChange}
                />
                <label
                  className="m-1 py-2 px-8 flex cursor-pointer bg-gray-600 text-white peer-checked:bg-gray-200 peer-checked:text-black rounded w-full text-start text-xs"
                  htmlFor="cat-1"
                >
                  <p className="">General Notes</p>
                </label>
              </div>
              <div className="flex flex-row">
                <input
                  id="cat-2"
                  type="radio"
                  value="cat-2"
                  name="default-radio"
                  className="peer hidden opacity-50"
                  checked={selectedValue === "cat-2"}
                  onChange={handleChange}
                />
                <label
                  className="m-1 py-2 px-8 flex cursor-pointer bg-gray-600 text-white peer-checked:bg-gray-200 peer-checked:text-black rounded w-full text-start text-xs"
                  htmlFor="cat-2"
                >
                  <p className="">Science</p>
                </label>
              </div>
              <div className="flex flex-row">
                <button className="m-1 py-2 px-8 justify-between items-center flex cursor-pointer bg-gray-500 peer-checked:bg-gray-400 rounded w-full text-center text-xs">
                  <p className="text-white font-bold">Add New</p>
                  
                </button>
                
              </div>
            </div>
          ) : null} */}
          <div className="flex flex-row">
            <input
              id="menu-3"
              type="radio"
              value="trash"
              name="menu"
              className="peer hidden opacity-50"
              checked={selectedValue === "trash"}
              onChange={handleChange}
            />
            <label
              className="m-1 py-2 px-8 flex cursor-pointer bg-gray-500 text-white peer-checked:bg-gray-200 peer-checked:text-black rounded w-full text-start"
              htmlFor="menu-3"
            >
              <p className="">Trash</p>
            </label>
          </div>
        </div>
        <div className="flex justify-center my-2">
          <div className="flex justify-between items-center w-3/4 m-3 px-2 py-1 rounded bg-gray-600 ">
            <div className="px-1 py-0 ">
              <p className="text-white text-xs font-bold">{auth.profile?auth.profile.name:''}</p>
              {/* <p className="text-white text-xs">{auth.profile?auth.profile.lastName:''}</p> */}
            </div>
            <div className="px-1 py-1">
            <GoogleLogout
              clientId={auth.clientId}
              render={renderProps => (
                // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
               <button className="p-2 bg-gray-500 rounded-full"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button> 
              
                )}
              buttonText="Logout"
              onLogoutSuccess={() => dispatch(loadProfile(null))}
    >
    </GoogleLogout>
              {/* <button className="p-2 bg-gray-500 rounded-full">
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
