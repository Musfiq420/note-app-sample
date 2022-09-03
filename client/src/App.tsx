
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { INote } from './interfaces';
import Note from './Note';
import { RootState, store } from './store';
import { deleteNote, getNoteList, addNote } from './store/taskSlice';

const App:FC = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const tasks = useSelector((state:RootState) => state.tasks.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNoteList())
    console.log("useEffect called")
  }, [])
  

  return (
    <div className="App">
      <h1>Note Creator</h1>
      <p>Title:</p>
      <input onChange={(e:ChangeEvent<HTMLInputElement>):void => setTitle(e.target.value)} />
      <p>Body:</p>
      <input onChange={(e:ChangeEvent<HTMLInputElement>):void => setBody(e.target.value)} />
      <br /><br />
      <button onClick={() => dispatch(addNote({title:title, body:body}))}>Add</button>
      {tasks.map((element:INote) => {
        return (
          <>
            <Note title={element.title} body={element.body} onDelete={() => dispatch(deleteNote(element.id))}/>
          </>
        )
        
      })}
    </div> 
  );
}

export default App;
