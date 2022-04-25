import React, { Component }  from 'react';
import draw from './hist';
import './hist.css';

export default class Histogram extends Component {

  componentDidMount() {
      draw(this.props);
  }

  componentDidUpdate(preProps) {
      draw(this.props);
  }

  render() {
    return (
      <div id='hist'/>
    )
  }
}