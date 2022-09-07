import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { INote } from '../interfaces';
import Note from './Note';
import { RootState } from '../store';
import { deleteNote } from '../store/taskSlice';

const NoteListView = ({isMobile, setSideBarOpen}:Props) => {

    const tasks = useSelector((state:RootState) => state.tasks.notes);
    const dispatch = useDispatch();


  return (
    <>
      <div className='flex justify-between align-center items-center'>
        <p className='p-5 text-xl font-bold'>Note list</p>
        {isMobile?<button onClick={() => setSideBarOpen(false)} type="button" className="my-3 text-white bg-red-300 hover:bg-red-100 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          <span className="sr-only">Icon description</span>
        </button>:null}
      </div>
      {tasks.map((element:INote) => {
      return (
          <Note title={element.title} body={element.body} onDelete={() => dispatch(deleteNote(element.id))}/>
      )      
    })}
    </>
  )
}

interface Props {
  isMobile: boolean,
  setSideBarOpen: (val: boolean) => void
}

export default NoteListView