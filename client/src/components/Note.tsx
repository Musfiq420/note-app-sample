import React from 'react'
import { INote } from '../interfaces'


const Note = (props:INote) => {
  return (
      <div onClick={() => console.log('clicked')} className="flex flex-row justify-between items-center p-6 bg-white border-y border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <div>
          <h6 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h6>
          <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">{props.body}</p>
        </div>
        <button onClick={props.onDelete} className="inline-flex h-min items-center  py-2 px-2 text-sm font-medium text-center text-white bg-red-300 rounded-lg hover:bg-red-100 dark:bg-blue-600 dark:hover:bg-blue-700 ">
          Delete
        <svg className="ml-2 -mr-1 w-4 h-min" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
  )
}

export default Note