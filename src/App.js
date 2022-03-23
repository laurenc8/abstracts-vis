import './App.css';
import React from 'react';
import Histogram from './components/histogram';

function App() {
  const data = [{frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}]
  return (
    <div>
      <Histogram data={data}/>
    </div>
  );
}

export default App;
