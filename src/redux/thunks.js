import axios from 'axios';
import { isLoggedIn, loader, chat, chatdoc, userid, uploaded } from './action';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'


let baseUrl="https://dragonfly-third-eye.azurewebsites.net/"
// let baseUrl="http://127.0.0.1:5000/"

export const getResponse=(prompt,template)=>async (dispatch, getState)=>{
    let formData=new FormData();
    formData.append("prompt",prompt);
    formData.append("template",template);
    axios.post(baseUrl+"chat",formData).then(response=>{
        // console.log(response.data);
        let obj={"sender":"delphi","message":response.data.content}
        dispatch(chat(obj));
        // dispatch(stylizedImage(baseUrl+"showImage?file="+response.data))
    }).catch(err=>{
        dispatch(loader(false));
        Store.addNotification({
            title: "Processing Failed!",
            message: err.message,
            type: "danger",
            insert: "bottom",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
        // console.log(err);
    })
}

export const login=(username,password)=>async (dispatch, getState)=>{
    let formData=new FormData();
    formData.append("username",username);
    formData.append("password",password);
    axios.post(baseUrl+"login",formData).then(response=>{
        console.log(response.data.data.id);
        if(response.data.data.status=="success"){
            dispatch(userid(response.data.data.id));
            dispatch(isLoggedIn(true));
        }
        // dispatch(stylizedImage(baseUrl+"showImage?file="+response.data))
    }).catch(err=>{
        console.log(err);
    })
}

export const uploadFiles=(files,id)=>async (dispatch, getState)=>{
    // console.log(files[0]);
    let formData=new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    formData.append("id",id);
    axios.post(baseUrl+"uploadDocs",formData).then(response=>{
        console.log(response.data);
        dispatch(uploaded(true));
        // let obj={"sender":"delphi","message":response.data.content}
        // dispatch(chat(obj));
        // dispatch(stylizedImage(baseUrl+"showImage?file="+response.data))
    }).catch(err=>{
        // dispatch(loader(false));
        Store.addNotification({
            title: "Processing Failed!",
            message: err.message,
            type: "danger",
            insert: "bottom",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
        // console.log(err);
    })
}

export const getDocResponse=(prompt,id)=>async (dispatch, getState)=>{
    let formData=new FormData();
    formData.append("prompt",prompt);
    formData.append("id",id);
    axios.post(baseUrl+"chatDoc",formData).then(response=>{
        console.log(response.data.result);
        let obj={"sender":"delphi","message":response.data.result}
        dispatch(chatdoc(obj));
        // dispatch(stylizedImage(baseUrl+"showImage?file="+response.data))
    }).catch(err=>{
        dispatch(loader(false));
        Store.addNotification({
            title: "Processing Failed!",
            message: err.message,
            type: "danger",
            insert: "bottom",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
        // console.log(err);
    })
}
