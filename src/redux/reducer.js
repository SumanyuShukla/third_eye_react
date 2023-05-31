
const initialState = {
    chat: [],
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
        case "set": {
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