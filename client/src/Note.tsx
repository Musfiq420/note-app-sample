import React from 'react'
import { INote } from './interfaces'


const Note = (props:INote) => {
  return (
    <>
        <h3>{props.title}</h3>
        <p>{props.body}</p>
        <button onClick={props.onDelete}>delete</button>
    </>
  )
}

export default Note