import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noteIcon from "../assets/Notes-icon.png";
import { selectNote } from "../store/noteSlice";
import { selectScreen } from "../store/viewSlice";
import { loadProfile } from "../store/authSlice";
import { GoogleLogout } from "react-google-login";
import { AuthState } from "../interfaces";
import { RootState } from "../store";

const Sidebar = () => {
  const [selectedValue, setSelectedValue] = useState<string>("all-notes");

  const auth: AuthState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setSelectedValue(e.target.value);
    dispatch(selectScreen(e.target.value));
    dispatch(selectNote(null));
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
          <div
            className={` flex justify-between items-center w-3/4 m-3 px-2 py-1 rounded bg-gray-600`}
          >
            <div className="px-1 py-0 ">
              <p className="text-white text-xs font-bold">
                {auth.profile ? auth.profile.name : ""}
              </p>
              {/* <p className="text-white text-xs">{auth.profile?auth.profile.lastName:''}</p> */}
            </div>
            <div className={`px-1 py-1`}>
              <GoogleLogout
                clientId={auth.clientId}
                render={(renderProps) => (
                  // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                  <button
                    className={` p-2 bg-gray-500 rounded-full`}
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
              ></GoogleLogout>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
