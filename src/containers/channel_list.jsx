/* eslint no-bitwise:off */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMessages } from '../actions/index';
import { Link } from 'react-router-dom';

class ChannelList extends Component {

  componentWillReceiveProps(nextProps) {
    // if next props (channel) are different from the ones I have now then fetchMessages again with the new props
    if (nextProps.channelFromParams !== this.props.channelFromParams) {
      this.props.fetchMessages(nextProps.channelFromParams);
    }
  }

  renderChannel = (channel) => {
    return (
      <li
        key={channel}
        className={channel === this.props.channelFromParams ? 'active' : null}
        role="presentation"
      >
      <Link to={`/${channel}`}> 
        #{channel}
      </Link>
      </li>
    );
  }

  render() {
    return (
      <div className="channels-container">
        <span>Chat</span>
        <ul>
          {this.props.channels.map(this.renderChannel)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    channels: state.channels
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
