import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      <div>
      {!this.props.isConfirmed && <ConfirmEmailMessage />}
      </div>
    );
  }
}

Dashboard.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state){
  return {
    isConfirmed: !!state.user.confirmed
  }
}


export default connect(mapStateToProps)(Dashboard);
