//https://headlessui.com/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { INote } from '../interfaces';
import { RootState } from '../store';
import { deleteNote, selectNote } from '../store/taskSlice';
import { GoogleLogout } from 'react-google-login';
import { loadProfile } from '../store/authSlice';
import { Popover } from '@headlessui/react';
import { stringify } from 'querystring';


const NoteListView = () => {

    const screen = useSelector((state:RootState) => state.tasks.selectedScreen)
    const notes = useSelector((state:RootState) => state.tasks.notes);
    const trashNotes = useSelector((state:RootState) => state.tasks.trashNotes);
    const selectedNote = useSelector((state:RootState) => state.tasks.selectedNote)
    const dispatch = useDispatch();


  return (
    <div className='h-screen bg-gray-100 border-r-2 flex flex-col justify-between'>
      <div className='m-0 p-5'>
          <p className='text-xl font-bold'>Notes List</p>
        </div>
      <div className='h-full overflow-auto'>
        
        <div className=''>
        {
          screen==='all-notes'?notes.map((e:any) => <div className={selectedNote?selectedNote.id==e.id?'m-2 bg-blue-50 rounded-lg border-2  border-blue-200':'m-2 bg-white rounded':'m-2 bg-white rounded'}>
            <button className='p-3 w-full text-start' onClick={() => dispatch(selectNote(e))}>
              <p className='text-md font-bold'>{e.title}</p>
              <p className='text-sm'>{JSON.parse(e.body).blocks[0].text.length>100?`${JSON.parse(e.body).blocks[0].text.slice(0,100)}...`:JSON.parse(e.body).blocks[0].text}</p>
            </button>
          </div>
            ):
            screen==='favourites'?notes.map((e:any) => {
              if(e.favourite)
                return (<div className={selectedNote?selectedNote.id==e.id?'m-2 bg-blue-50 rounded-lg border-2  border-blue-200':'m-2 bg-white rounded':'m-2 bg-white rounded'}>
                <button className='p-3 w-full text-start' onClick={() => dispatch(selectNote(e))}>
                  <p className='text-md font-bold'>{e.title}</p>
                  <p className='text-sm'>{JSON.parse(e.body).blocks[0].text.length>100?`${JSON.parse(e.body).blocks[0].text.slice(0,100)}...`:JSON.parse(e.body).blocks[0].text}</p>
                </button>
              </div>)
            })
            :screen==='trash'?trashNotes.map((e:any) => <div className={selectedNote?selectedNote.id==e.id?'m-2 bg-blue-50 rounded-lg border-2  border-blue-200':'m-2 bg-white rounded':'m-2 bg-white rounded'}>
            <button className='p-3 w-full text-start' onClick={() => dispatch(selectNote(e))}>
              <p className='text-md font-bold'>{e.title}</p>
              <p className='text-sm'>{JSON.parse(e.body).blocks[0].text.length>100?`${JSON.parse(e.body).blocks[0].text.slice(0,100)}...`:JSON.parse(e.body).blocks[0].text}</p>
            </button>
          </div>
            ):null
        }
        </div>
      </div>
      {screen!=='trash'?<div className='m-5 self-end'>
        <button
                className=" p-0 w-14 h-14 bg-blue-400 rounded-full hover:bg-blue-300 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                onClick={() => dispatch(selectNote(null))}
                >
          <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" className="w-6 h-6 inline-block">
            <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z" />
          </svg>
        </button>
      </div>:null}  
      
    </div>
  )
}


export default NoteListView