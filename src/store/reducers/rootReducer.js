import authReducer from './authReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    chat: chatReducer
})  

const persistConfig = {
    key: 'messengerappbasic',
    storage,
    whitelist: ["auth", "user", "chat"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store =  createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};