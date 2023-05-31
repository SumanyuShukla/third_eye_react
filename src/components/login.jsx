import React, { Component } from "react";
import { login } from "../redux/thunks";
import { connect } from 'react-redux';
import { isLoggedIn, loader, chat } from "../redux/action";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import "./login.css";
import {ReactComponent as ThirdEyeLogo} from "../ThirdEyeLogo.svg";
import {ReactComponent as Genie} from "../Genie.svg";
import {ReactComponent as Person} from "../person.svg";
import {ReactComponent as EY} from "../EY_logo_2019.svg";
import Loader from "./loader";
import { ReactNotifications,Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { Navigate } from 'react-router-dom';
import Carousel from "./carousel";
import { FaLock } from 'react-icons/fa';

class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    changeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }



    loginRequest=()=>{
        if(this.state.username!='' || this.state.password!=''){
            this.props.login(this.state.username,this.state.password);
        }else{
            Store.addNotification({
                title: "Invalid Credentials",
                message: "Please check your credentials!",
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


    render(){
        if(this.props.isLoggedIn){
            return <Navigate to='/chat' />
        }else{
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 sidebarPanel">
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4" style={{marginLeft:'28px'}}>
                                <ThirdEyeLogo fill="white"/>
                            </div>
                        </div>
                        <div className="row">
                             <Genie height='100%'/>
                        </div>
                        <div className="row">
                            <div className="col-md-12 carousel-caption">
                                <h3>Create tailored business proposals!</h3>
                                <p>Craft compelling proposals tailored to your clients' needs and win more business with ease using our user-friendly magic business proposal.</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <div className="row" style={{height:'10%'}}></div>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-8">
                                <div className="row">
                                    <Person fill="#7F39FB"/>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 loginBox">
                                        <div className="loginLabel">
                                            <h1>Login</h1>
                                        </div>
                                        <div className="loginMessage">
                                            <span className="welcomeMessage1">Login to your account</span>
                                            <span className="welcomeMessage2">Thank You for coming back to Third Eye. Lets create some magic business proposals for you.</span>
                                        </div>
                                        <div className="loginForm">
                                            <form>
                                                <input type="text" name="username" onChange={this.changeHandler}/><span><FaLock/></span>
                                                <input type="text" name="password" onChange={this.changeHandler}/><span><FaLock/></span>
                                            </form>
                                        </div>
                                        <div className="actionLinks">
                                            <div className="rememberMe">
                                                <input type="checkbox" name="" id=""/>
                                                <span>Remember Me</span>
                                            </div>
                                            <div className="forgotPassword">
                                                <a href="/test" style={{color: '#7F39FB'}}>Forgot Password?</a>
                                            </div>
                                        </div>
                                        <div className="loginBtn">
                                            <input type="button" style={{backgroundColor: '#7F39FB',padding: '8px 96px'}} value="Login" onClick={this.loginRequest} />
                                        </div>
                                        <div className="registeration">
                                            <span>Don't have an account?</span>
                                            <span style={{color: '#7F39FB'}}>Register instead</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2" style={{marginLeft:'40px'}}>
                        <EY/>
                    </div>
                </div>
                {/* <div className="row header">
                    <div className="col-md-1">
                        <img src={thirdEye} style={{color:'white'}} alt="SVG"/>
                    </div>
                    <div className="col-md-8">
                        <h4 style={{paddingTop:'7px',marginLeft:'-30px'}}>Third Eye</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" name="username" onChange={this.changeHandler}/>
                            </div>
                            <div className="col-md-12">
                                <input type="text" name="password" onChange={this.changeHandler}/>
                            </div>
                            <div className="col-md-12">
                                <input type="button" className="btn1" value="Login" onClick={this.loginRequest} />
                            </div>
                        </div>
                    </div> 
                </div>   */}
            </div>
        )
        }
    }
}

const mapStateToProps = state => ({
    isLoggedIn:state.isLoggedIn
});

const mapDispatchToProps=dispatch=>({
    login:(username,password)=>{
        dispatch(login(username,password))
    }
});


export default connect(mapStateToProps,mapDispatchToProps)(Login);