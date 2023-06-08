import React, { Component } from "react";
import { connect } from 'react-redux';
import { template } from "../redux/action";
import { Navigate } from 'react-router-dom';
import "./global.css";
import {ReactComponent as Refresh} from "../refresh.svg";
import {ReactComponent as Help} from "../Help.svg";
import {ReactComponent as Notification} from "../notification.svg";
import {ReactComponent as User} from "../user.svg";
import {ReactComponent as ThirdEyeLogo} from "../ThirdEyeLogo.svg";
import {ReactComponent as Menu} from "../Menu.svg";
import "./login.css";
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
                    <div className="row">
                        {/* <div className="col-md-3"></div> */}
                        <div className="col-md-5">
                            <div className="row" style={{margin:'40px 0px 20px 0px',textAlign:'center'}}>
                                <h4>Please provide a template for your proposal</h4>
                            </div>
                            <div className="row">
                                <textarea onChange={this.addTemplate} rows="6" cols="30" style={{marginBottom:'20px',marginLeft:'45px'}}></textarea>
                            </div>
                            <div className="row">
                                <div className="row" style={{marginLeft:'30px'}}>
                                <div className="col-md-6">
                                    <input type="button" value="Proceed" className="btn1" onClick={()=>this.setTemplate(true)}/>
                                </div>
                                <div className="col-md-6">
                                    <input type="button" value="Proceed With Default" className="btn1" onClick={()=>this.setTemplate(false)}/>
                                </div>
                                </div>
                            </div>
                            {/* <input type="button" value="Proceed" onClick={()=>this.setTemplate(true)}/>
                            <input type="button" value="Proceed With Default" onClick={()=>this.setTemplate(false)}/> */}
                            
                            {/* <input type="file" name="file[]" multiple onChange={this.addFiles} accept=".txt"></input>
                            <input type="button" value="Send" className="btn1" onClick={this.sendFiles}></input> */}
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5">
                        <div className="row" style={{margin:'40px 0px 20px 0px',textAlign:'center'}}>
                                <h4>Please Upload files</h4>
                            </div>
                        <div className="row upload-btn-wrapper">
                            <input type="button" value="Send" className="btn1" onClick={this.sendFiles}></input>
                            <input type="file" name="file[]" multiple onChange={this.addFiles} accept=".txt"></input>
                        </div>
                        </div>
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