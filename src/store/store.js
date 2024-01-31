// import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { rootReducer } from "./root-reducer";
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
// import { thunk } from 'redux-thunk';
// import { loggerMiddleware } from './middleware/logger';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
    process.env.NODE_ENV !== 'production' && logger, 
    sagaMiddleware
].filter(Boolean);

// const composeEnhancer = 
//     (process.env.NODE_ENV !== 'production' && 
//     window && 
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
//     compose;

// const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

// export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(middlewares),
})

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);




