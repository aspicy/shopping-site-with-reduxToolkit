import { takeLatest, put, call, all } from 'redux-saga/effects';

// import { USER_ACTION_TYPES } from './user.types';

import { 
    signInSuccess, 
    signInFailed, 
    signUpSuccess, 
    signUpFailed, 
    signOutSuccess,
    signOutFailed
} from './user.reducer';

import { 
    getCurrentUser, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        // console.log('userSnapshot: ', userSnapshot);
        // console.log(userSnapshot.data());
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch(error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}


export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUp({ payload }) {
    const { email, password, displayName } = payload;
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess({ user,  displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* signInAfterSignUp({ payload }) {
    const { user } = payload;
    const additionalDetails = { displayName: payload.displayName };
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
    yield takeLatest('user/googleSignInStart', signInWithGoogle);
}

export function* onCheckUserSession() {
    yield takeLatest('user/checkUserSession', isUserAuthenticated)
}

export function* onEmailSignInStart() {
    yield takeLatest('user/emailSignInStart', signInWithEmail);
}

export function* onSignUpStart() {
    yield takeLatest('user/signUpStart', signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest('user/signUpSuccess', signInAfterSignUp);
}

export function* onSignOutStart() {
    yield takeLatest('user/signOutStart', signOut);
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ]);
}


