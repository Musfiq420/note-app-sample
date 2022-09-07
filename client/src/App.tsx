
import { FC, useEffect, useState } from 'react';
import './App.css';
import InputForm from './components/inputForm';
import NoteListView from './components/noteListView';

const App:FC = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [width, setWidth] = useState<number>(window.innerWidth);


  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);
  
  const isMobile = height/width>0.7;

  return (
    <div className='flex flex-row '>

      {isMobile&&!sideBarOpen?null: 
      <div className={`${isMobile? 'absolute w-full':'w-2/3'} overflow-auto w-full h-screen border-x border-gray-200 bg-white`}>
        <NoteListView isMobile={isMobile} setSideBarOpen={setSideBarOpen} />
      </div>}

      <div className='overflow-hidden w-full bg-gray-100 h-screen'>
        <InputForm isMobile={isMobile} setSideBarOpen={setSideBarOpen} />
      </div>      
      
    </div> 
  );
}

export default App;
