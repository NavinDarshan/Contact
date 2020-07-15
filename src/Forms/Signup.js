import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../Actions/userActions';

class Signup extends React.Component{
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
        console.log(username);
        this.props.userReq("/api/user/signup", {username, password}, this.props.history)
        event.preventDefault();
    }
    render(){
        const {flash , flashMessage} = this.props;
        let view;
        if(flash){
            view = <p className="flash bg-success">{flashMessage}</p>
            setTimeout(() => {
              this.props.resetFlash();
            }, 1000);
          }
        return(
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
                            <input type="text" className="form-control" name = "username" placeholder="username" onChange={this.changehandle}required/>

                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-key"></i></span>
                            </div>
                            <input type="password" className="form-control" name = "password" placeholder="password" onChange = {this.changehandle}required/>
                        </div>
                        <div className="row align-items-center remember">
                            <input type="checkbox"/>Remember Me
                        </div>
                        <div className="form-group">
                            <input type="submit" value="SignUp" className="btn float-right login_btn"/>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                         Have an account?<a href="/login">Login</a>
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
export default connect(mapStateToProps , mapDispatchToProps)(Signup);