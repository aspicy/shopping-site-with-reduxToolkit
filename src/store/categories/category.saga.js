import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments, addCollectionAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.reducer';
// import { CATEGORIES_ACTION_TYPES } from './category.types';


export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        // console.log(categoriesArray);
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
       yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest('categories/fetchCategoriesStart', fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}
