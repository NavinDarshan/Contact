import React from 'react';
import { connect } from 'react-redux';
import * as noteActions from '../Actions/noteAction';
import * as userActions from '../Actions/userActions'

class user extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      number: "",
      email: "",
      toShow: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit(event) {
    this.setState({ name: "" })
    this.setState({ number: "" })
    this.setState({ email: "" })
    console.log(this.state.number)
    this.props.postRequest("/api/notes/", { text: this.state.name, number: this.state.number, email: this.state.email, username: this.props.username, toShow: this.state.toShow })
    event.preventDefault()

  }
  handleDelete(id, event) {
    this.props.deleteRequest("/api/notes/", { data: { id: id }, username: this.props.username }, this.props.history)
    event.preventDefault();
  }
  componentDidMount() {
    this.props.getRequest("/api/notes/", this.props.username)
  }
  render() {
    const { islogged, mname, flash, flashMessage } = this.props;

    if (!islogged) {
      this.props.history.push("/");
    }
    let view;
    if (flash) {
       view = <p className="flash bg-success">{flashMessage}</p>
      setTimeout(() => {
        this.props.resetFlash();
      }, 1000);
    }
    return (
      <div className="userbgimage">
        <nav className="navbar bg-primary">
          <a className="navbar-brand-success" href="/">Home</a>
          <p className="text-center font-text">Logged in as {this.props.username}</p>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <input className="form-control mr-sm-2 mb-2" type="text" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} required/>
            <input className="form-control mr-sm-2 mb-2" type="text" placeholder="Mobile.no" value={this.state.number} name="number" onChange={this.handleChange} required/>
            <input className="form-control mr-sm-2 mb2" type="text" placeholder="email" value={this.state.email} name="email" onChange={this.handleChange}/>
            <button className="btn btn-outline-danger my-2 md-sm-5 my-sm-0" type="submit">Save</button>
          </form>
        </nav>
        {view}
        <div className = "card-content">
          <div className="text-center row">
            {mname.map((note, i) => {
              return (
                <div className="col-md-3 col-sm-6" key={note._id}>
                  <div className="carduser">
                    <div className="card-body">
                      <h5 className="card-text ">{note.text}</h5>
                      <p className="card-text ">{note.number}</p>
                      <p className="card-text ">{note.email}</p>
                      <button className="btn btn-light" onClick={this.handleDelete.bind(this, note._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              )
            }
            )}

          </div>
        </div>
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    mname: state.note.data,
    islogged: state.user.islogged,
    username: state.user.username,
    id: state.user.id,
    flashMessage: state.user.flashMessage,
    flash: state.user.flash
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postRequest: (url, body) => dispatch(noteActions.postdata(url, body)),
    getRequest: (url, body) => dispatch(noteActions.getdata(url, body)),
    deleteRequest: (url, body) => dispatch(noteActions.deleteData(url, body)),
    resetFlash: () => dispatch(userActions.resetFlash())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(user);
