import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch} from 'react-redux';
import { addNote, getNoteList } from '../store/taskSlice';

const InputForm = ({isMobile, setSideBarOpen}:Props) => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNoteList())
        console.log("useEffect called")
    }, [])

  return (
      <>
      <div className='flex flex-row w-full justify-start items-start '>
        {isMobile? <button onClick={() => setSideBarOpen(true)} type="button" className="my-3 mx-3 text-white bg-blue-300 hover:bg-blue-100 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
            <span className="sr-only">Icon description</span>
          </button>:<div className='py-8'></div>}
        </div>
        <div className="flex flex-col items-center">
        
        <h1 className='m-3 text-xl font-bold'>Add Note</h1>
        <div className='w-full flex justify-center'>
          <input
            type="text"
            className="w-2/3  mt-2 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleText0"
            placeholder="Title"
            onChange={(e:ChangeEvent<HTMLInputElement>):void => setTitle(e.target.value)}
          />
        </div>
        <div className='my-3'></div>
        <div className='w-full h-1/2 flex justify-center '>
          <textarea
            className='w-2/3  h-2/3 mt-2 px-3 py-1.5  font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            id='exampleText0'
            placeholder="Description"
            onChange={(e:ChangeEvent<HTMLTextAreaElement>):void => setBody(e.target.value)}
          />
        </div>
        <button onClick={() => dispatch(addNote({title:title, body:body}))} className="rounded-md  bg-blue-400 my-6 py-2 px-4 text-sm font-medium text-white hover:bg-blue-300 ">Save</button>
      
    </div>
      </>
      
  )
}

interface Props {
  isMobile: boolean,
  setSideBarOpen: (val: boolean) => void
}

export default InputForm
