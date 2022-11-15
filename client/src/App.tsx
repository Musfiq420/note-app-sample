
import { FC, useEffect, useState } from 'react';
import './App.css';
import InputForm from './components/inputForm';
import NoteListView from './components/noteListView';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { AuthState } from './interfaces';
import { loadProfile } from './store/authSlice';
import useCheckMobile from './hooks/useCheckMobile';
import Sidebar from './components/sidebar';
import noteIcon from "./assets/Notes-icon.png";

const App:FC = () => {
  
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const auth:AuthState = useSelector((state:RootState) => state.auth);
  const isMobile = useCheckMobile();
  const dispatch = useDispatch();

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: auth.clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

  return (
    <>
    {auth.profile?<div className='grid grid-cols-6'>
      <div className='col-span-1'>
        <Sidebar />
      </div>
      <div className='col-span-2'>
        <NoteListView />
      </div>
      <div className='col-span-3'>
        <InputForm />
      </div>
    </div>
    :<div className='flex flex-col h-screen bg-blue-100 justify-center items-center'>
      <div className='p-5 flex flex-row justify-center items-center'>
      <img src={noteIcon} className="w-12 h-12 mt-2" />
        <div className='flex flex-col justify-center items-center'>
          <p className='p-2 text-xl font-bold'>Simple</p>
          <p className="text-xs opacity-60 ">Note App</p>
        </div>
        
      </div>
      <div className='mt-5'>
      <GoogleLogin
          clientId={auth.clientId}
          buttonText="Sign in with Google"
          onSuccess={(res:any) => dispatch(loadProfile(res.profileObj))}
          onFailure={(err:any) => console.log('failed:', err)}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
      </div>
      
      </div>}

    {/* {auth.profile?
      <div className={`flex flex-row ${isMobile&&sideBarOpen? 'bg-white':'bg-gray-100' } overflow-hidden h-screen`}>

      {isMobile&&!sideBarOpen?null: 
      <div className={`${isMobile? 'absolute w-full':'w-2/3'}  w-full border-x border-gray-200 h-full bg-white`}>
        <NoteListView isMobile={isMobile} setSideBarOpen={setSideBarOpen} />
      </div>}

      <div className='w-full h-full'>
        <InputForm isMobile={isMobile} setSideBarOpen={setSideBarOpen} />
      </div>      

      </div>

        :<GoogleLogin
          clientId={auth.clientId}
          buttonText="Sign in with Google"
          onSuccess={(res:any) => dispatch(loadProfile(res.profileObj))}
          onFailure={(err:any) => console.log('failed:', err)}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />} */}
    </>
    
    
  );
}

export default App;
