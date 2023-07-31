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
import { FaRegPaperPlane } from 'react-icons/fa';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
            // console.log(this.props.template);
            this.props.getResponse(this.state.prompt,this.props.template);
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
            if(c.sender=="delphi" && (!c.message.includes("How can I assist you today") && !c.message.includes("Hello") && !c.message.includes("Hi") && !c.message.includes("Hey"))){
                // let obj={}
                let attr="p"+count;
                data[attr]=c.message;
                count++;
                // data.push(obj);
            }
        })
        // console.log(data);
        if(Object.entries(data).length>0){
            window.location.href="https://dragonfly-third-eye.azurewebsites.net/getDoc?data="+JSON.stringify(data);
            // window.location.href="http://127.0.0.1:5000/getDoc?data="+JSON.stringify(data);
        }
    }


    render(){
        // if(!this.props.isLoggedIn){
        //     return <Navigate to='/' />
        // }else{
        let chat=<div style={{height:'400px', overflow:"hidden"}}></div>;
        if(this.props.chat.chat !=''&&this.props.chat.chat!=null){
        chat=this.props.chat.chat.map((c,index)=>{return c.sender=="delphi"?<div className="row" key={index}><div className="col-md-1"><img src="/assets/images//Robot.svg" alt="EY" style={{marginLeft:'70px'}} /></div><div className="col-md-4 msg rcvd" style={{whiteSpace: "pre-line",marginLeft:"55px"}}>{c.message}</div>
        </div>
        :<div className="row" key={index}><div className="col-md-8"></div><div className="col-md-4 msg sent" style={{whiteSpace: "pre-line"}}>{c.message}</div></div>})
        }
        return(
            <div className="container-fluid">
                {/* <div className="row header ">
                <div className="col-md-2 float-left sidebar">
                <Menu className="menuIcon"/>
                    </div>
                    <div className="col-md-4 float-left topPanel">
                    <ThirdEyeLogo fill="#7F39FB" style={{width:'20px',height: '20px',margin:'10px 0 0 50px'}}/>
                        <span className="thirdEyeLabel">Third Eye</span>
                    </div>
                    <div className="col-md-6 float-left userMenuPanel">
                    </div>
                    </div> */}
                    <div className="col-12 chatbot-header">
                    <img className="mx-3" src="/assets/images//Robot.svg" alt="EY" />
                    <div className="chatbot-header-text">Third Eye</div>
                    {/* <div className="col mx-3">
                        <span
                            className="bi bi-arrow-clockwise pull-right cursor-pointer text-white"
                            title="Clear Chat"
                            // onClick={clearChat}
                        >
                            <span className="mx-auto">Clear Chat</span>
                        </span>
                    </div> */}
                </div>
                    {/* <div className="row header topPanel">
                    
                    <div className="col-md-2 float-left">
                        
                    </div>
                </div> */}
                <div className="row chatbot-body">
                   {chat}
                </div>
                <div className="row chatbot-text">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-10 modal-new-message-box">
                                <input type="text" className="message-text message" id="text" onChange={this.setPrompt} placeholder="Enter your message here (use Shift + Enter for next line)"/>
                            </div>
                            <div className="col-md-1">
                                <button className="bi bi-send-fill send-btn" value="Send" onClick={this.sendRequest} ></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button className="bi bi-download send-btn" value="Download" onClick={this.createDoc} ></button>
                    </div>  
                </div>  
            </div>
        )
        // }
    }
}

const mapStateToProps = state => ({
    getLoader:state.loader,
    chat:state.chat,
    isLoggedIn:state.isLoggedIn,
    template:state.template
});

const mapDispatchToProps=dispatch=>({
    getResponse:(prompt,template)=>{
        dispatch(getResponse(prompt,template))
    },
    setLoader:(val)=>{
        dispatch(loader(val))
    },
    setChat:(val)=>{
        dispatch(chat(val))
    }
});


export default connect(mapStateToProps,mapDispatchToProps)(Home);