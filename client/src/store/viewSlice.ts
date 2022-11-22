import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";


interface ViewSliceType {
    currentView: string,
    selectedScreen: string
}

const initialState:ViewSliceType = {
    currentView: 'noteList',
    selectedScreen: 'all-notes',
}

export const ViewSlice = createSlice({
    name: 'view',
    initialState: initialState,
    reducers: {
        selectScreen: (state, action:PayloadAction<string>) => {
            state.selectedScreen=action.payload
        },
        selectCurrentView: (state, action:PayloadAction<string>) => {
            state.currentView=action.payload
        },
    }
})


export const {selectScreen, selectCurrentView} = ViewSlice.actions
export default ViewSlice.reducer
