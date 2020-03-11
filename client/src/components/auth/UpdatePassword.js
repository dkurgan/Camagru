import React from "react";
import {connect} from 'react-redux';
import logo from '../../honey.png'
import { patchPassword } from '../../actions/user';


class PatchPassword extends React.Component {
    state =  {password: null}
    handleSubmit = async(e) => {
        e.preventDefault();
        await this.props.patchPassword(this.props.match.params.id,this.state.password);
        window.location='/login';
    }
  render() {
    return ( this.props.isAuth ? <h1 style={{marginTop:150}}>Why are u here??))</h1> :
      (<div className="container" style={{ marginTop: 150 }}>
        <div className="ui one column stackable center aligned page grid">
          <div className="column twelve wide">
            <img alt="hooney_logo" src={logo} style={{ maxWidth: 80 }} />
            <h3>Welcome back!Type new password here!</h3>
            <div className="row">
              <form className="input-field" onSubmit={this.handleSubmit}>
                <input
                  type="password"
                  placeholder="New Password"
                  onChange={e => this.setState({ password: e.target.value })}
                  required
                />
                <button className="ui button">Reset</button>
              </form>
            </div>
          </div>
        </div>
      </div>)
    );
  }
}

const mapStateToProps = state =>{
    return {
        isAuth: state.user.token
    }
}

export default connect(mapStateToProps, {patchPassword})(PatchPassword)