import React , {Component} from 'react';
import {connect} from 'react-redux'
import './login.css';
import * as actions from '../Actions/userActions';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username :"",
            password:""
        };
        this.changehandle = this.changehandle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    changehandle(event){
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit(event){
        const {username , password} = this.state;
        this.props.userReq("/api/user/login" ,{username, password}, this.props.history)
    event.preventDefault();
    }
    render() {
        const {flash , flashMessage} = this.props;
        console.log(flash)
        console.log(flashMessage)
        let view;
        if(flash){
            view = <p className="flash bg-danger text-center">{flashMessage}</p>
            setTimeout(() => {
              this.props.resetFlash();
            }, 1000);
          }
        return (
            <div className = "bg-image">
                {view}
            <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-body">
                    <form onSubmit = {this.handleSubmit}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user"></i></span>
                            </div>
                            <input type="text" className="form-control" name = "username" placeholder="username" onChange= {this.changehandle} required/>

                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-key"></i></span>
                            </div>
                            <input type="password" className="form-control" name = "password" placeholder="password" onChange={this.changehandle} required/>
                        </div>
                        <div className="row align-items-center remember">
                            <input type="checkbox"/>Remember Me
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn float-right login_btn"/>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Don't have an account?<a href = "/signup">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
        );
    }
}
const mapStateToProps = (state) =>{
    console.log(state)
    return{
    username: state.user.username,
    islogged: state.user.islogged,
    flashMessage: state.user.flashMessage,
    flash: state.user.flash
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        userReq : (url, body, history) => dispatch(actions.userIn(url, body, history)),
        resetFlash: () => dispatch(actions.resetFlash())
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Login);

//this is login page

