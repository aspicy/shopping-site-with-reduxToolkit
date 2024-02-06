// import { USER_ACTION_TYPES } from "./user.types";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
    isSignedIn: false,
    redirectLocation: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        },
        checkUserSession(){},
        googleSignInStart(){},
        emailSignInStart(state, action){},
        signInSuccess(state, action){
            state.currentUser = action.payload;
            state.isSignedIn = true
        },
        signInFailed(state, action){
            state.error = action.payload
            state.isSignedIn = false
        },
        signUpStart(state, action){},
        signUpSuccess(state, action){},
        signUpFailed(state, action){
            state.error = action.payload
        },
        signOutStart(){},
        signOutSuccess(state, action){
            state.currentUser = null;
            state.isSignedIn = false
        },
        signOutFailed(state, action){
            state.error = action.payload
        },
        setRedirectLocation(state, action) {
            state.redirectLocation = action.payload
        }
    }
});

export const { 
    setCurrentUser,  
    checkUserSession,
    googleSignInStart,
    emailSignInStart,
    signInSuccess,
    signInFailed,
    signUpStart,
    signUpSuccess,
    signUpFailed,
    signOutStart,
    signOutSuccess,
    signOutFailed,
    setRedirectLocation
} = userSlice.actions;

export const userReducer = userSlice.reducer;

// export const userReducer = (state = INITIAL_STATE, action) => {
//     // console.log('dispatched');
//     // console.log(action);
//     const { type, payload } = action;

//     switch(type) {
//         case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//             return {
//                 ...state,
//                 currentUser: payload
//             }

//         case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//             return {
//                 ...state,
//                 currentUser: null
//             }

//         case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//         case USER_ACTION_TYPES.SIGN_IN_FAILED:
//         case USER_ACTION_TYPES.SIGN_UP_FAILED:
//             return {
//                 ...state,
//                 error: payload
//             }
            
//         default:
//             return state;
//     }
// }


