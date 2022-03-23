import './App.css';
import React from 'react';
import Histogram from './components/histogram';

function App() {
  const data = [{price: 15}, {price: 20}, {price: 20}, {price: 250}, {price: 350}]
  return (
    <div>
      <Histogram data={data}/>
    </div>
  );
}

export default App;
