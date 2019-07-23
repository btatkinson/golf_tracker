import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { confirm } from '../../actions/auth';

class Confirmation extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      loading:true,
      success:false
    }
  }

componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div>
        {loading && (
          <div>
            <div className="preload">
                <div className="preload-status">
                    <div className="preload-status-bar"></div>
                    <div className="preload-status-info">LOADING</div>
                </div>
            </div>
          </div>
        )}

        {!loading && success &&
          (<div>
              <h5>Thank you, your account has been confirmed.</h5>
              <Link to="/dashboard">Go to your dashboard</Link>
            </div>)
        }
        {!loading && !success &&
          (<div>
              <h5>Oops, invalid token.</h5>
              <Link to="/dashboard">Go to your dashboard</Link>
            </div>)
        }
      </div>
    );
  }
}

Confirmation.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params:PropTypes.shape({
      token:PropTypes.string.isRequired  }).isRequired
    }).isRequired
}

export default connect(null, { confirm })(Confirmation);
