import { Action, AnyAction, AsyncThunkAction, createSlice, Dispatch, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from ".";
import { INote } from "../interfaces";


export const getNoteList:any= ()=> {
    return async(dispatch:Dispatch, getState:RootState) => {
        const response = await fetch('/getNotes')
        const body:any[] = await response.json();
        
        const obj:INote[] = []
        body.forEach(element => {
            //console.log(element.title+' '+element.body)
            obj.push({id:element._id,title:element.title, body:element.body})
        });
        dispatch(loadNotes(obj))
    }
}


export const deleteNote:any= (noteId:string) => {
    return async(dispatch:Dispatch, getState:RootState) => {
        const response = await fetch('/deleteNote',{ 
            method: 'POST', // or 'PUT'
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({id:noteId})}
            );

        dispatch(getNoteList());
    }
}

export const addNote:any= (note:INote) => {
    return async(dispatch:Dispatch, getState:RootState) => {
        const response = await fetch('/addNote',{ 
            method: 'POST', // or 'PUT'
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({title:note.title, body:note.body})}
            );

        dispatch(getNoteList());
    }
}



export interface NoteState {
    notes: INote[]
}

const initialState:NoteState = {
    notes: [
        {
            id:"Note ID",
            title:"Note Title",
            body: 'Note Description'
        }
    ]
}

export const TaskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        loadNotes:(state, action:PayloadAction<INote[]>) => {
            state.notes=action.payload
        }
    }
})

export const {loadNotes } = TaskSlice.actions;
export default TaskSlice.reducer;