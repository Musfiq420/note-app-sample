
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { load, save } from "redux-localstorage-simple";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { TaskSlice } from "./taskSlice";



// const localStorageMiddleware:Middleware = (api) =>  
//     (next) => (action) => {
//       const result = next(action);
//       if(action.type==='tasks/addTask')
//         localStorage.setItem('applicationState', JSON.stringify(api.getState()));
//       return result;
//     };
  
//   const reHydrateStore = () => {
//     if (localStorage.getItem('applicationState') !== null) {
//       return JSON.parse(localStorage.getItem('applicationState')!); // re-hydrate the store
//     }
//   };




export const store:EnhancedStore= configureStore({
    reducer: {
        tasks: TaskSlice.reducer
    },
    //preloadedState: load({ states: ["tasks.tasks"] }),
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save({ states: ["tasks.tasks"] }), thunk )

})






export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;