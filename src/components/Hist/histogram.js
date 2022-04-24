import React, { Component }  from 'react';
import draw from './hist';
import './hist.css';

export default class Histogram extends Component {
//function Histogram({ data, nBin}) {

  componentDidMount() {
      console.log("Did Mount?");
      draw(this.props);
  }

  componentDidUpdate(preProps) {
      console.log("Update?");
      draw(this.props);
  }

  render() {
    return (
      <div id='hist'/>
    )
  }
}



// <svg
//   className='blah'
//   style={{
//     height: 350,
//     width: 500,
//     transform: "rotate(90deg)",
//     transformOrigin: 150
//   }}
// />
