import { createSelector } from '@reduxjs/toolkit'

export const selectCurrentUser = (state) => state.user.currentUser;

export const selectIsSignedIn = (state) => state.user.isSignedIn;

export const selectRedirectLocation = (state) => state.user.redirectLocation;