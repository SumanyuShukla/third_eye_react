
const initialState = {
    chat: [],
    chatdoc:[]
  }

export const stylizedImage=(state='',action)=>{
    const {type,payload}=action;

    switch(type){
        case "success": {
            return {...state,payload}
        }
        default:{
            return state
        }
    }
}

export const loader=(state=false,action)=>{
    const {type,payload}=action;

    switch(type){
        case "loader": {
            return payload
        }
        default:{
            return state
        }
    }
}

export const isLoggedIn=(state=false,action)=>{
    const {type,payload}=action;

    switch(type){
        case "loggedIn": {
            return payload
        }
        default:{
            return state
        }
    }
}

export const uploaded=(state=false,action)=>{
    const {type,payload}=action;

    switch(type){
        case "uploaded": {
            return payload
        }
        default:{
            return state
        }
    }
}

export const userid=(state='',action)=>{
    const {type,payload}=action;
    console.log(payload)
    switch(type){
        case "userid": {
            return payload
        }
        default:{
            return state
        }
    }
}

export const chat=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case "set": {
            return {
                ...state,
                chat:[...state.chat,payload]
            }
        }
        default:{
            return state
        }
    }
}

export const chatdoc=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case "setdoc": {
            return {
                ...state,
                chatdoc:[...state.chatdoc,payload]
            }
        }
        default:{
            return state
        }
    }
}

export const template=(state='',action)=>{
    const {type,payload}=action;
    switch(type){
        case "setTemplate": {
            return payload
        }
        default:{
            return state
        }
    }
}