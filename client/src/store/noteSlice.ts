import { Action, AnyAction, AsyncThunkAction, createAsyncThunk, createSlice, Dispatch, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { URLSearchParams } from "url";
import { AppDispatch, RootState } from ".";
import { INote, ITrashNote } from "../interfaces";


export const getNoteList:any= (user:string)=> {
    return async(dispatch:Dispatch, getState:RootState) => {
        const response = await fetch(`/getNotes?user=${user}`)
        const body:any[] = await response.json();
        
        const notes:INote[] = []
        const trashNotes:ITrashNote[] = []
        body.forEach(element => {
            //console.log(element.title+' '+element.body)
            if(!element.trashAt)
                notes.push({id:element._id,title:element.title, body:element.body, user:element.user, favourite:element.favourite})
            else
                trashNotes.push({id:element._id,title:element.title, body:element.body, user:element.user, favourite:element.favourite, trashAt:element.trashAt})

        });
        console.log(notes)
        dispatch(loadAllNotes(notes))
        dispatch(loadTrashNotes(trashNotes))
    }
}


export const deleteNote:any= (noteId:string) => {
    return async(dispatch:Dispatch, getState:RootState) => {
        const response = await fetch('/deleteNote',{ 
            method: 'POST', // or 'PUT'
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({id:noteId})}
            );
        
        dispatch(selectNote(null))
        dispatch(getNoteList(getState().auth.profile.email));
    }
}

export const addNote:any= (note:INote) => {
    return async(dispatch:Dispatch, getState:RootState) => {
        const response = await fetch('/addNote',{ 
            method: 'POST', // or 'PUT'
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({title:note.title, body:note.body, user:note.user, favourite:note.favourite})}
            );
            const newNote = await response.json();
        dispatch(selectNote(newNote))
        dispatch(getNoteList(getState().auth.profile.email));
    }
}

export const updateNote:any= (note:INote) => {
    return async(dispatch:Dispatch, getState:RootState) => {
        const response = await fetch('/updateNote',{ 
            method: 'POST', // or 'PUT'
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({id:note.id,title:note.title, body:note.body, user:note.user, favourite:note.favourite})}
            );
        dispatch(getNoteList(getState().auth.profile.email));
    }
}

export const markFavourite:any= (noteId:string, favourite:boolean) => {
    return async(dispatch:Dispatch, getState:RootState) => {
        const response = await fetch('/markFavourite',{ 
            method: 'POST', // or 'PUT'
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({id:noteId, favourite:favourite})}
            );
        const favouriteResult = await response.json();
            
        dispatch(markFavouriteNote(favouriteResult.favourite))
        dispatch(getNoteList(getState().auth.profile.email));
    }
}

export const moveToTrash:any= (noteId:string) => {
    return async(dispatch:Dispatch, getState:RootState) => {
        const response = await fetch('/moveToTrash',{ 
            method: 'POST', // or 'PUT'
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({id:noteId})}
            );
        dispatch(selectNote(null))
        dispatch(getNoteList(getState().auth.profile.email));
    }
}

export const restoreNote:any= (noteId:string) => {
    return async(dispatch:Dispatch, getState:RootState) => {
        const response = await fetch('/restoreNote',{ 
            method: 'POST', // or 'PUT'
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({id:noteId})}
            );
        dispatch(selectNote(null))
        dispatch(getNoteList(getState().auth.profile.email));
    }
}



export interface NoteState {
    selectedNote: INote | null,
    allNotes: INote[],
    trashNotes: ITrashNote[]
}

const initialState:NoteState = {
    selectedNote: null,
    allNotes: [
        // {
        //     id:"Note ID",
        //     title:"Note Title",
        //     body: 'Note Description',
        //     user: 'user@gmail.com',
        //     favourite: false,
        //     trash: false
        // }
    ],
    trashNotes: [],
}

export const NoteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        loadAllNotes:(state, action:PayloadAction<INote[]>) => {
            state.allNotes=action.payload
        },
        loadTrashNotes:(state, action:PayloadAction<ITrashNote[]>) => {
            state.trashNotes=action.payload
        },
        selectNote:(state, action:PayloadAction<INote|null>) => {
            state.selectedNote=action.payload
        },
        markFavouriteNote: (state, action:PayloadAction<boolean>) => {
            if(state.selectedNote) 
                state.selectedNote.favourite=action.payload
        },
    },
})

export const {loadAllNotes, selectNote, loadTrashNotes, markFavouriteNote} = NoteSlice.actions;
export default NoteSlice.reducer;