// import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createSlice } from "@reduxjs/toolkit";

const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        // setCategories(state, action){
        //     state.categories = action.payload
        // },
        fetchCategoriesStart(state, action){
            state.isLoading = true
        },
        fetchCategoriesSuccess(state, action){
            state.categories = action.payload;
            state.isLoading = false
        },
        fetchCategoriesFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false
        }
    }
});

export const { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

// export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
//     const { type, payload } = action;

//     switch(type) {
//         case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
//             return { ...state, isLoading: true };
//         case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//             return { ...state, categories: payload, isLoading: false };
//         case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
//             return { ...state, error: payload, isLoading: false };
//         default:
//             return state;
//     }
// }