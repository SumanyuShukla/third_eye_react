import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { template, loader, chat, isLoggedIn, chatdoc, uploaded, userid } from './reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const reducers={
    loader,
    chat,
    chatdoc,
    isLoggedIn,
    template,
    uploaded,
    userid
};

const rootReducer=combineReducers(reducers);

export const store=()=>createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
