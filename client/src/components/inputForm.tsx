import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  getNoteList,
  updateNote,
  moveToTrash,
  restoreNote,
  markFavourite,
} from "../store/noteSlice";
import { selectCurrentView } from "../store/viewSlice";
import { RootState } from "../store";
import useCheckDevice from "../hooks/useCheckDevice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles.css";

const InputForm = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const selectedNote = useSelector(
    (state: RootState) => state.notes.selectedNote
  );
  const screen = useSelector((state: RootState) => state.view.selectedScreen);
  const currentView = useSelector(
    (state: RootState) => state.view.currentView
  );
  const checkDevice = useCheckDevice();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<any>("");

  function handleChange(content:string, delta: any, source:any, editor:ReactQuill.UnprivilegedEditor) {
    setBody(editor.getContents());
  }

  const [saveLoading, setSaveLoading] = useState(false);
  const [favouriteLoading, setFavouriteLoading] = useState(false);
  const [trashLoading, setTrashLoading] = useState(false);


  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ color: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // const noToolbarModules = {
  //   toolbar: false
  // };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "align",
    "color",
    "link",
    "image",
    "clean",
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNoteList(auth.profile.email));
    console.log("useEffect called and email: ", auth.profile.email);
  }, []);

  useEffect(() => {
    if (selectedNote) {
      setBody(JSON.parse(selectedNote.body));
      setTitle(selectedNote.title);
    } else {
      setBody("");
      setTitle("");
    }
  }, [selectedNote]);



  return (
    <div className="flex flex-col items-center h-screen ">
      <div className="w-full h-1/8 flex justify-between items-center bg-gray-100">
        <div className="flex w-3/4">
        {checkDevice === "mobile" && currentView === "inputForm" ? (
          <button
            className="rounded-md disabled:bg-gray-300 bg-blue-400 mx-2 py-2 px-4 text-sm font-medium text-white hover:bg-blue-300 "
            onClick={() => dispatch(selectCurrentView("noteList"))}
          >
            {`<-`}
          </button>
        ) : null}
        <div className="flex justify-center w-full">
          <input
          type="text"
          className="w-full mx-2 py-2 px-3 py-1.5 border border-solid border-gray-300 focus:border-gray-300 text-base font-normal text-gray-700 bg-white bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none"
          id="exampleText0"
          placeholder={screen==='trash'?'':'Title'}
          value={title}
          disabled={screen === "trash"}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setTitle(e.target.value)
          }
        />
          
        </div>
        </div>
        {screen !== "trash" ? (
          <div className="flex justify-center items-center">
            <div className="p-1 flex items-center justify-center">
              <button onClick={() => {
                setTrashLoading(true)
                dispatch(moveToTrash(selectedNote.id))
                .then((e:any) => {setTrashLoading(false)})
              }
                }>
                {selectedNote?trashLoading?
                <svg aria-hidden="true" className=" w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 m-1" fill="#757575" viewBox="0 0 448 512"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/></svg>
                :null}
              </button>
            </div>

            <div className="p-1 flex items-center justify-center">
              <button
                onClick={() =>
                  {setFavouriteLoading(true)
                    dispatch(
                    markFavourite(selectedNote.id, !selectedNote.favourite)
                  )
                  .then((e:any) => {setFavouriteLoading(false)})                
                }
                }
              >
                {selectedNote ? favouriteLoading?
                <svg aria-hidden="true" className=" w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
                :(
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={selectedNote.favourite ? "red" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="black"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                ) : null}
              </button>
            </div>
            

            {saveLoading?
            
            <div className="py-5 px-2">
              <button className="rounded-md bg-blue-400 py-2 px-4">
                  <svg aria-hidden="true" className=" w-7 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                </button>
            </div> 
            :<div className="py-5 px-2">
              <button
                className="rounded-md disabled:bg-gray-300 bg-blue-400 py-2 px-4 text-sm font-medium text-white hover:bg-blue-300 "
                disabled={selectedNote === null && title === ""}
                onClick={() => {
                  setSaveLoading(true);
                  if (selectedNote)
                    dispatch(
                      updateNote({
                        id: selectedNote.id,
                        title: title,
                        body: JSON.stringify(body),
                        user: auth.profile.email,
                        favourite: false,
                        trash: false,
                      })
                    ).then((res:any) => {setSaveLoading(false)});
                  else
                    dispatch(
                      addNote({
                        title: title,
                        body: JSON.stringify(body),
                        user: auth.profile.email,
                        favourite: false,
                        trash: false,
                      })
                    ).then((res:any) => {setSaveLoading(false)});
                }}
              >
                Save
              </button>
            </div>}
          </div>
        ) : saveLoading?
        <div className="p-5">
              <button className="rounded-md bg-blue-400 py-2 px-4">
                  <svg aria-hidden="true" className=" w-12 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                </button>
            </div>
        :(
           <div className="p-5">
            <button
              className="rounded-md disabled:bg-gray-300 bg-blue-400 py-2 px-4 text-sm font-medium text-white hover:bg-blue-300 "
              onClick={() => {
                setSaveLoading(true)
                dispatch(restoreNote(selectedNote.id))
                .then((e:any) => {setSaveLoading(false)})
              }}
              disabled={selectedNote === null}
            >
              Restore
            </button>
          </div>
        )}
      </div>

      {/* <p>{body}</p> */}
      <div className="w-full">
        <ReactQuill
          theme="snow"
          value={body}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          className={`${screen==='trash'?'quill-trash':'quill'}`}
          readOnly={screen==='trash'}
          
        />
      </div>
    </div>
  );
};

export default InputForm;
