import React from "react";
import { connect } from "react-redux";
import logo from "../../honey.png";
import api from "../../api";
import { getUser, deleteUser } from "../../actions/user";

class Settings extends React.Component {
  state = { email: null, passwordNew: null, passwordOld: null };
  async componentDidMount() {
    await this.props.getUser();
  }
  handleSubmit = async event => {
    event.preventDefault();
    const { email, passwordNew, passwordOld } = this.state;
    if (email === null) {
      this.setState({ email: this.props.user.email });
    }
    const res = await api.patch("/users/update",{
        email,
        passwordOld,
        passwordNew
      },{
        headers: {
          "x-auth-token": this.props.token
        }
      }
    );
    setTimeout(()=> window.location='/', 3000);
  };
  render() {
    const {deleteUser, token} = this.props;
    return ( token ?
     ( <div className="container" style={{ marginTop: 150 }}>
        <div className="ui one column stackable center aligned page grid">
          <div className="column twelve wide">
            <img alt="hooney_logo" src={logo} style={{ maxWidth: 80 }} />
            <h1>Settings</h1>
            <div className="row">
              <form className="input-field" onSubmit={this.handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <div className="row">
                  <div className="input-field">
                    <input
                      type="password"
                      placeholder="Old Password is required"
                      required
                      onChange={e =>
                        this.setState({ passwordOld: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field">
                    <input
                      type="password"
                      placeholder="New Password"
                      onChange={e =>
                        this.setState({ passwordNew: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button className="ui button">Update</button>
              </form>
                  <div>
                    <button className="ui button red" onClick={(e)=> {deleteUser(token)}}>Delete Account</button>
                </div>
            </div>
          </div>
        </div>
      </div>) : (<div><h1 style={{marginTop: 150}}>Sorry u cannot acces this page</h1> {setTimeout(()=> window.location='/', 5000)}</div>)
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    user: state.profile.current
  };
};

export default connect(mapStateToProps, { getUser, deleteUser })(Settings);
