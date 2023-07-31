import React, { Component } from "react";
import { connect } from 'react-redux';
import { template } from "../redux/action";
import { Navigate } from 'react-router-dom';
import "./global.css";
import {ReactComponent as Refresh} from "../refresh.svg";
import {ReactComponent as Help} from "../Help.svg";
import {ReactComponent as Upload} from "../Upload.svg";
import {ReactComponent as Notification} from "../notification.svg";
import {ReactComponent as User} from "../user.svg";
import {ReactComponent as ThirdEyeLogo} from "../ThirdEyeLogo.svg";
import {ReactComponent as Menu} from "../Menu.svg";
import "./login.css";
import "./template.css";
import { uploadFiles } from "../redux/thunks";
import "bootstrap/dist/css/bootstrap.min.css";

class Template extends Component{

    constructor(props){
        super(props);
        this.state={
            template:'',
            temp:false,
            files:[]
        }
    }

    addTemplate=(e)=>{
        this.setState({
            template:e.target.value
        })
        // console.log(this.state.template)
    }

    addFiles=(e)=>{
        // console.log(e.target.files);
        this.setState({
            files:e.target.files
        })
    }

    sendFiles=()=>{
        // console.log(this.state.files);
        this.props.uploadDocs(this.state.files,this.props.userid);
    }

    setTemplate=(status)=>{
        if(status){
            if(this.state.template!=null && this.state.template!=''){
                this.props.setTemplate(this.state.template)
            }
        }else{
            this.props.setTemplate("NA")
        }
        this.setState({
            temp:true
        })
    }

    render(){
        console.log(this.props)
        if(this.props.template!=null && this.props.template!=''){
            return <Navigate to='/chat' />
        }else if(this.props.uploaded){
            return <Navigate to='/docs' />
        }
        else{
            return(
                <div className="container-fluid chatbot-body">
                    {/* <div className="row header ">
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
                    </div> */}


<div className="col-12 chatbot-header">
                    <img className="mx-3" src="/assets/images//Robot.svg" alt="EY" />
                    <div className="chatbot-header-text">Third Eye</div></div>


                    <div className="row">
                        {/* <div className="col-md-3"></div> */}
                        <div className="col-md-12 float-left">
                            <div className="col-md-2 float-left"></div>
                            <div className="col-md-10 float-left actionLabel">
                            <h3>Choose Action</h3>
                            </div>
                            <div className="row">
                            <div className="col-md-12 float-left">
                                <div className="col-md-5 float-left" style={{top:'90px'}}>
                                <div class="row">
                                            <div className="col-md-12 float-left scratchBox ">
                                        <div className="scratchLabel">
                                            <h4 style={{color:'white'}}>Create from Scratch</h4>
                                        </div>
                                        <div className="scratchMessage">
                                            <span className="scratchMessage1">Interact with Delphi</span>
                                            <span className="scratchMessage2">Give prompts to Delphi, our AI enabled chatbot to generate business proposals</span>
                                        </div>
                                        <div className="textForm">
                                        <textarea onChange={this.addTemplate} rows="6" cols="50" style={{marginBottom:'20px',marginLeft:'45px'}}></textarea>
                                        </div>
                                        <div className="col-md-6 float-left scratchBtn">
                                            <div className="col-md-3 float-left btn1Div">
                                            <input type="button"  className="exampleBtn" value="Proceed with Example" onClick={()=>this.setTemplate(false)} />
                                            </div>
                                            <div className="col-md-3 float-left btn2Div">
                                            <input type="button" className="proceedBtn" value="Proceed" onClick={()=>this.setTemplate(true)} />
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                </div>
                                <div className="col-md-2 float-left"></div>
                                <div className="col-md-5 float-left" style={{top:'90px', left:'60px'}}>
                                <div class="row">
                                            <div className="col-md-12 float-left scratchBox " style={{paddingBottom: '45px'}}>
                                        <div className="scratchLabel">
                                            <h4 style={{color:'white'}}>Continue your Work</h4>
                                        </div>
                                        <div className="scratchMessage">
                                            <span className="scratchMessage1">Use Pre-made Components</span>
                                            <span className="scratchMessage2">Use pre-made prompts in form of text files to get started quickly</span>
                                        </div>
                                        <input type="file" name="file[]" class="uploadFile" multiple onChange={this.addFiles} accept=".txt"></input>
                                        <div className="scratchBox" style={{left:'0', width:'60%',padding:'5px',top:'12px'}}>
                                        <h5 style={{textAlign:'center'}}>Upload Files</h5>
                                        <div style={{display:'flex',justifyContent:'center'}}>
                                        
                                        <Upload fill="black" style={{width:'80px',height: '80px',}}/></div>                                        
                                        <span class="continueMsg1">Drop files here or click on this tile</span>
                                        <span class="continueMsg2">Files are supported in .txt format</span>
                                        </div>
                                        <div className="col-md-6 float-left scratchBtn" >
                                            <div className="col-md-3 float-left continueBtnDiv">
                                            <input type="button" className="proceedBtn" value="Proceed" onClick={this.sendFiles} />
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                </div>

                                </div>
                            </div>
                            <div className="col-md-2 float-left"></div>
                        </div>
                        {/* <div className="col-md-12 actionLabel float-left">
                            <h1>Choose Action</h1>
                        </div> */}
                        {/* <div className="row">
                                    <div className="col-md-5 float-left">
                                        <div class="row">
                                            <div className="col-md-10 float-left loginBox "></div>
                                            <div className="col-md-10 float-left loginBox ">
                                        <div className="loginLabel">
                                            <h4>Create from Scratch</h4>
                                        </div>
                                        <div className="loginMessage">
                                            <span className="welcomeMessage1">Interact with Delphi</span>
                                            <span className="welcomeMessage2">Give prompts to Delphi, our AI enabled chatbot to generate business proposals</span>
                                        </div>
                                        <div className="loginForm">
                                        <textarea onChange={this.addTemplate} rows="6" cols="30" style={{marginBottom:'20px',marginLeft:'45px'}}></textarea>
                                        </div>
                                        <div className="loginBtn">
                                            <input type="button" style={{background: '#7F39FB',padding: '8px 96px', border:'2px', color:'#FFFFFF'}} value="Proceed with Example" onClick={()=>this.setTemplate(false)} />
                                            <input type="button" style={{background: '#7F39FB',padding: '8px 96px', border:'2px', color:'#FFFFFF'}} value="Proceed" onClick={()=>this.setTemplate(true)} />
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                </div> */}
                        {/* <div className="col-md-5"> */}
                            {/* <div className="row" style={{margin:'40px 0px 20px 0px',textAlign:'center'}}>
                                <h4>Please provide a template for your proposal</h4>
                            </div>
                            <div className="row">
                                <textarea onChange={this.addTemplate} rows="6" cols="30" style={{marginBottom:'20px',marginLeft:'45px'}}></textarea>
                            </div> */}
                            {/* <div className="row">
                                <div className="row" style={{marginLeft:'30px'}}>
                                <div className="col-md-6">
                                    <input type="button" value="Proceed" className="btn1" onClick={()=>this.setTemplate(true)}/>
                                </div>
                                <div className="col-md-6">
                                    <input type="button" value="Proceed With Default" className="btn1" onClick={()=>this.setTemplate(false)}/>
                                </div>
                                </div>
                            </div> */}
                            {/* <input type="button" value="Proceed" onClick={()=>this.setTemplate(true)}/>
                            <input type="button" value="Proceed With Default" onClick={()=>this.setTemplate(false)}/> */}
                            
                            {/* <input type="file" name="file[]" multiple onChange={this.addFiles} accept=".txt"></input>
                            <input type="button" value="Send" className="btn1" onClick={this.sendFiles}></input> */}
                        {/* </div> */}
                        {/* <div className="col-md-2"></div> */}
                        {/* <div className="col-md-5">
                        <div className="row" style={{margin:'40px 0px 20px 0px',textAlign:'center'}}>
                                <h4>Please Upload files</h4>
                            </div>
                        <div className="row upload-btn-wrapper">
                            <input type="button" value="Send" className="btn1" onClick={this.sendFiles}></input>
                            <input type="file" name="file[]" multiple onChange={this.addFiles} accept=".txt"></input>
                        </div>
                        </div> */}
                    </div>
                </div>
            )
        }
    }

}

const mapStateToProps = state => ({
    template:state.template,
    userid:state.userid,
    uploaded:state.uploaded
});

const mapDispatchToProps=dispatch=>({
    setTemplate:(temp)=>{
        dispatch(template(temp))
    },
    uploadDocs:(files,id)=>{
        dispatch(uploadFiles(files,id))
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Template);