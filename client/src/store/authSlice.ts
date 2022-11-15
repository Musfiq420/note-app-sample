import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "."
import { AuthState } from "../interfaces";

const initialState: AuthState = {
    clientId: '710219937683-dkv6sovkkq4bkkvsllpv13bijm3he293.apps.googleusercontent.com',
    profile: null
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadProfile:(state: AuthState, action:PayloadAction<object | null>) => {
            state.profile=action.payload;
            console.log(state.profile)
        }
    },
})



export const {loadProfile } = AuthSlice.actions;
export default AuthSlice.reducer;