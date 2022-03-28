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
      <div style={{display: "flex", justifyContent: "center"}}>
        <p style={{marginTop: 43, marginRight: -30}}>Number of Bins</p>
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
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Histogram data={data} nBin={nBin}/>
        <Histogram data={data} nBin={nBin}/>
        <Histogram data={data} nBin={nBin}/>
      </div>
    </div>
  );
}

export default App;
