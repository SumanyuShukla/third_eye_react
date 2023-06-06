import React, { Component } from "react";
import { getResponse } from "../redux/thunks";
import { connect } from 'react-redux';
import Image from "./image";
import { isLoggedIn, loader, chat } from "../redux/action";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import "./chat.css";
import {ReactComponent as Refresh} from "../refresh.svg";
import {ReactComponent as Help} from "../Help.svg";
import {ReactComponent as Notification} from "../notification.svg";
import {ReactComponent as User} from "../user.svg";
import {ReactComponent as ThirdEyeLogo} from "../ThirdEyeLogo.svg";
import Loader from "./loader";
import {ReactComponent as Menu} from "../Menu.svg";
import { ReactNotifications,Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { Navigate } from 'react-router-dom';

class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            prompt:''
        }
    }

    setPrompt=(e)=>{
        this.setState({
            prompt:e.target.value
        })
    }



    sendRequest=()=>{
        if(this.state.prompt!=''){
            let obj={"sender":"user","message":this.state.prompt};
            this.props.setChat(obj);
            document.getElementById("text").value="";
            this.props.getResponse(this.state.prompt);
        }else{
            Store.addNotification({
                title: "No Message",
                message: "Please write some message!",
                type: "warning",
                insert: "bottom",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
        }
        
    }

    createDoc=()=>{
        let data={};
        let chat=this.props.chat.chat;
        let count=0;
        chat.forEach((c,i)=>{
            if(c.sender=="delphi" && (!c.message.includes("How can I assist you today") || !c.message.includes("Hello"))){
                // let obj={}
                let attr="p"+count;
                data[attr]=c.message;
                count++;
                // data.push(obj);
            }
        })
        // console.log(data);
        if(Object.entries(data).length>0){
            window.location.href="https://thirdeyep.azurewebsites.net/getDoc?data="+JSON.stringify(data);
        }
    }


    render(){
        if(!this.props.isLoggedIn){
            return <Navigate to='/' />
        }else{
        let chat=<div style={{height:'400px', overflow:"hidden"}}></div>;
        if(this.props.chat.chat !=''&&this.props.chat.chat!=null){
        chat=this.props.chat.chat.map((c,index)=>{return c.sender=="delphi"?<div className="row" key={index}><div className="col-md-4 delphiMessage" style={{whiteSpace: "pre-line",marginLeft:"55px"}}>{c.message}</div>
        </div>
        :<div className="row" key={index}><div className="col-md-8"></div><div className="col-md-4 userMessage" style={{whiteSpace: "pre-line"}}>{c.message}</div></div>})
        }
        return(
            <div className="container-fluid">
                <div className="row header ">
                <div className="col-md-2 float-left sidebar">
                <Menu className="menuIcon"/>
                    </div>
                    <div className="col-md-4 float-left topPanel">
                    <ThirdEyeLogo fill="#7F39FB" style={{width:'20px',height: '20px',margin:'10px 0 0 50px'}}/>
                        <span className="thirdEyeLabel">Third Eye</span>
                    </div>
                    <div className="col-md-6 float-left userMenuPanel">
                    <Refresh fill="white" style={{width:'20px',height: '20px',}}/>
                    <Help fill="white" style={{width:'20px',height: '20px', margin:'0 0 0 10px'}}/>
                    <Notification  fill="white" style={{width:'20px',height: '20px', margin:'0 0 0 10px'}}/>
                    <User fill="white" style={{width:'20px',height: '20px', margin:'0 0 0 10px'}}/>
                    </div>
                    </div>
                    {/* <div className="row header topPanel">
                    
                    <div className="col-md-2 float-left">
                        
                    </div>
                </div> */}
                <div className="row">
                   {chat}
                </div>
                <div className="row buttonDiv">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 textDiv">
                        <div className="row">
                            <div className="col-md-10">
                                <input type="text" className="text" id="text" onChange={this.setPrompt}/>
                            </div>
                            <div className="col-md-1">
                                <input type="button" className="btn1" value="Send" onClick={this.sendRequest} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="button" className="btn1" value="Download" onClick={this.createDoc} />
                    </div>  
                </div>  
            </div>
        )
        }
    }
}

const mapStateToProps = state => ({
    getLoader:state.loader,
    chat:state.chat,
    isLoggedIn:state.isLoggedIn
});

const mapDispatchToProps=dispatch=>({
    getResponse:(prompt)=>{
        dispatch(getResponse(prompt))
    },
    setLoader:(val)=>{
        dispatch(loader(val))
    },
    setChat:(val)=>{
        dispatch(chat(val))
    }
});


export default connect(mapStateToProps,mapDispatchToProps)(Home);