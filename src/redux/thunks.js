import axios from 'axios';
import { isLoggedIn, loader, chat } from './action';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'


let baseUrl="https://thirdeyep.azurewebsites.net/"

export const getResponse=(prompt)=>async (dispatch, getState)=>{
    axios.get(baseUrl+"chat?prompt="+prompt).then(response=>{
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
        // console.log(response.data);
        if(response.data.data.status=="success"){
            dispatch(isLoggedIn(true));
        }
        // dispatch(stylizedImage(baseUrl+"showImage?file="+response.data))
    }).catch(err=>{
        console.log(err);
    })
}