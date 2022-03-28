import './App.css';
import React, { useState } from 'react';
import Histogram from './components/histogram';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function App() {
  const [nBin, setnBin] = useState(30)
  const data = [{frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}]
  function valuetext(value) {
    setnBin(value)
  }
  
  return (
    <div>
      <Box sx={{ width: 300, margin: 5, marginBottom: 0 }}>
        <Slider
          aria-label="Number of Bins"
          defaultValue={20}
          getAriaValueText={valuetext}
          valueLabelDisplay="on"
          step={1}
          marks
          min={1}
          max={50}
        />
      </Box>
      <Histogram data={data} nBin={nBin}/>
    </div>
  );
}

export default App;
