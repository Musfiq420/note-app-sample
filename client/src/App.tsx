
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
import useCheckDevice from './hooks/useCheckDevice';
import Sidebar from './components/sidebar';
import noteIcon from "./assets/Notes-icon.png";
import { getNoteList } from './store/taskSlice';
import Dummy from './components/dummy';

const App:FC = () => {
  
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const currentView = useSelector((state:RootState) => state.tasks.currentView);
  const auth:AuthState = useSelector((state:RootState) => state.auth);
  const checkDevice = useCheckDevice();
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
      
      <><div className={`flex flex-row ${checkDevice==='desktop'?'':sideBarOpen?'absolute z-10':'hidden absolute z-10'}  w-screen h-screen left-0`}>
        <div className={`h-full ${checkDevice==='desktop'?'w-1/6':checkDevice==='tablet'?'w-1/3':'w-2/3'}`}>
          <Sidebar />
        </div> 
        {checkDevice!=='desktop'&&sideBarOpen?<button className={`h-full w-2/3 bg-gray-300 opacity-50`}
          onClick={() => setSideBarOpen(false)}
        >  
        </button>:null}
        
      </div>
      <div className={`m-5 self-end absolute left-0 top-0 ${checkDevice==='desktop'?'hidden':sideBarOpen||currentView==='inputForm'?'hidden':''} `}>
      <button
              className="p-0 w-14 h-14 flex flex-row justify-center items-center bg-blue-400 rounded hover:bg-blue-300 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
              onClick={() => setSideBarOpen(true)}
              >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>


      {/* <p className='font-bold text-xl pb-2'>...</p> */}
      </button>
    </div></>
      
        
      {checkDevice!=="mobile"?<><div className='col-span-2'>
        <NoteListView />
      </div>
      <div className='desktop:col-span-3  col-span-4'>
        <InputForm />
        {/* <Dummy /> */}
      </div></>
      :currentView==="noteList"?
      <div className='col-span-6' >
        <NoteListView />
      </div>
      :<div className='col-span-6'>
        <InputForm />
      </div>}
    </div>
    :<div className='flex flex-col h-screen bg-blue-100 justify-center items-center'>
      <div className='p-5 flex flex-row justify-center items-center'>
      <img src={noteIcon} className="w-12 h-12 mt-2" />
        <div className='flex flex-col justify-center items-center'>
          <p className='p-2 text-xl font-bold'>Simple</p>
          <p className="text-xs opacity-60">Note App</p>
        </div>
        
      </div>
      <div className='text-xs pt-5 opacity-50 flex flex-col text-center'>
      <p >Developed by:<br/>Md. Musfiqur Rahman</p>
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
