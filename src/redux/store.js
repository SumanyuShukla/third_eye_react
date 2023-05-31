import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { stylizedImage, loader, chat, isLoggedIn } from './reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const reducers={
    stylizedImage,
    loader,
    chat,
    isLoggedIn
};

const rootReducer=combineReducers(reducers);

export const store=()=>createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
