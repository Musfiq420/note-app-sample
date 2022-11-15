import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { addNote, getNoteList, updateNote, deleteNote, moveToTrash, restoreNote, markFavourite } from '../store/taskSlice';
import {EditorState, Modifier, RichUtils, SelectionState, convertToRaw, convertFromRaw} from 'draft-js';
import { Editor, SyntheticKeyboardEvent } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { RootState } from '../store';

const InputForm = () => {
  
  const auth = useSelector((state:RootState) => state.auth);
  const selectedNote = useSelector((state:RootState) => state.tasks.selectedNote)
  const screen = useSelector((state:RootState) => state.tasks.selectedScreen)

    const [title, setTitle] = useState<string>('');
    const [editorState, setEditorState] = React.useState(
      () => EditorState.createEmpty()
    );
    
    
    
    const dispatch = useDispatch();

    function handleReturn(e:SyntheticKeyboardEvent) {
      
      const currentContent = editorState.getCurrentContent();

 // create new selection state where focus is at the end
    const blockMap = currentContent.getBlockMap();
    const key = blockMap.last().getKey();
    const length = blockMap.last().getLength();
    const selection = new SelectionState({
        anchorKey: key,
        anchorOffset: length,
        focusKey: key,
        focusOffset: length,
      });

   //insert text at the selection created above 
    const textWithInsert = Modifier.insertText(currentContent, selection, '\n');
    const editorWithInsert = EditorState.push(editorState, textWithInsert, 'insert-characters');

    //also focuses cursor at the end of the editor 
    const newEditorState = EditorState.moveFocusToEnd(editorWithInsert);
    setEditorState(newEditorState);
      console.log(e.key);
      return true;
    }



    useEffect(() => {
        dispatch(getNoteList(auth.profile.email))
        console.log("useEffect called and email: ", auth.profile.email)
    }, [])


    useEffect(() => {
      if(selectedNote) 
      {
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(selectedNote.body))))
        setTitle(selectedNote.title)
      } 
      else 
      {
        setEditorState(EditorState.createEmpty())
        setTitle('')
      }

    }, [selectedNote])
  return (
      <>
        
        <div className="flex flex-col items-center h-screen">
          
          <div className='w-3/4 flex justify-between items-center'>
            <p>{`-> ${screen}`}</p>
            {screen!=='trash'?<div className='flex justify-center items-center'>
              <div className='p-1 flex items-center justify-center'>
                <button 
                  onClick={() => dispatch(moveToTrash(selectedNote.id))}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                </svg>

                </button>
              </div>

              <div className='p-1 flex items-center justify-center'>
                <button
                  onClick={() => dispatch(markFavourite(selectedNote.id, !selectedNote.favourite))}
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fca5a5" className="w-6 h-6">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg> */}

                  {selectedNote?<svg xmlns="http://www.w3.org/2000/svg" fill={selectedNote.favourite?"red":"none"} viewBox="0 0 24 24" strokeWidth={1} stroke="black" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>:null}
                </button>
              </div>

              <div className='py-5 px-2'>
                <button className="rounded-md disabled:bg-gray-300 bg-blue-400 py-2 px-4 text-sm font-medium text-white hover:bg-blue-300 "
                  disabled={selectedNote===null&&title===''}
                  // onClick={() => {
                  // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
                  // setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(`{"blocks":[{"key":"c931f","text":"Hello world","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":11,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"avk5j","text":"is this styled?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"fontsize-24"},{"offset":0,"length":15,"style":"color-rgb(97,189,109)"}],"entityRanges":[],"data":{}}],"entityMap":{}}`))))
                  // }}
                  onClick={() => 
                    {
                      if(selectedNote)
                      return dispatch(updateNote({
                    id: selectedNote.id,
                    title: title,
                    body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                    user: auth.profile.email,
                    favourite: false,
                    trash: false
                  }));
                  else 
                    return dispatch(addNote({
                      title: title,
                      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                      user: auth.profile.email,
                      favourite: false,
                      trash: false
                    }));
                }}
                >
                  Save
                </button>
              </div>
            </div>:
            <div className='p-5'>
            <button className="rounded-md disabled:bg-gray-300 bg-blue-400 py-2 px-4 text-sm font-medium text-white hover:bg-blue-300 "
            onClick={() => dispatch(restoreNote(selectedNote.id))}
            disabled={selectedNote===null}
          >
            Restore
          </button></div>}
            
          </div>
          
          <div className='py-4'></div>

          <div className='w-3/4 flex justify-center items-center'>
            <input
                type="text"
                className="w-full  m-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleText0"
                placeholder="Title"
                value={title}
                disabled={screen==='trash'}
                onChange={(e:ChangeEvent<HTMLInputElement>):void => setTitle(e.target.value)}
              />
          </div>
          <div className='my-3'></div>
          <div className='w-3/4 h-2/3'>
            <Editor editorState={editorState}
              placeholder="Body"
              editorStyle={{paddingLeft: 10, paddingRight: 10, borderWidth:1, height:'50vh', overflow:'auto'}}
              toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'textAlign', 'list', 'colorPicker', 'link', 'history'],
                inline: { inDropdown: false },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: false },
              }}
              readOnly={screen==='trash'}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={setEditorState}
              // handleReturn={handleReturn}
              />
          </div>

        
        {/* <div className='w-full h-1/2 flex justify-center '>
          <textarea
            className='min-h-fit w-2/3 mt-2 px-3 py-1.5  font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            id='exampleText0'
            placeholder="Description"
            onChange={(e:ChangeEvent<HTMLTextAreaElement>):void => setBody(e.target.value)}
          />
        </div>
        <button onClick={() => dispatch(addNote({title:title, body:body}))} className="rounded-md  bg-blue-400 my-6 py-2 px-4 text-sm font-medium text-white hover:bg-blue-300 ">Save</button>
       */}
    </div>
      </>
      
  )
}


export default InputForm
