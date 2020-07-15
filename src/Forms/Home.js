import React from 'react'
import {Button} from 'react-bootstrap'
import history from '../history'

class Home extends React.Component{
    render(){
        return(
            <div className = "Home">
            <form>
            <h3 className = "lander">Store all your Contacts in one place</h3>
            <a className = "btn btn-success" href="/login">Get Started</a>
            </form>
            </div>
        )
    }
}
export default Home;