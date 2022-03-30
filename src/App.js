import './App.css';
import React, { useState } from 'react';
import Histogram from './components/histogram';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Test from './components/test';
import DatatablePage from './components/table';

function App() {
  const [nBin, setnBin] = useState(30)
  const data = [{
    name: 'Tiger Nixon',
    position: 'System Architect',
    office: 'Edinburgh',
    age: '61'
  },
  {
    name: 'Garrett Winters',
    position: 'Accountant',
    office: 'Tokyo',
    age: '63'
  },
  {
    name: 'Ashton Cox',
    position: 'Junior Technical Author',
    office: 'San Francisco',
    age: '66'
  },
  {
    name: 'Cedric Kelly',
    position: 'Senior Javascript Developer',
    office: 'Edinburgh',
    age: '22'
  },
  {
    name: 'Airi Satou',
    position: 'Accountant',
    office: 'Tokyo',
    age: '33'
  },
  {
    name: 'Brielle Williamson',
    position: 'Integration Specialist',
    office: 'New York',
    age: '61'
  },
  {
    name: 'Herrod Chandler',
    position: 'Sales Assistant',
    office: 'San Francisco',
    age: '59'
  },
  {
    name: 'Rhona Davidson',
    position: 'Integration Specialist',
    office: 'Tokyo',
    age: '55'
  },
  {
    name: 'Colleen Hurst',
    position: 'Javascript Developer',
    office: 'San Francisco',
    age: '39'
  }]
  // [{frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 150}, {frequency: 75}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 150}, {frequency: 50}]
  function valuetext(value) {
    setnBin(value)
  }
  const data1 = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Position',
        field: 'position',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Office',
        field: 'office',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Age',
        field: 'age',
        sort: 'asc',
        width: 100
      }
    ],
    rows: data
  };


  //idk how to turn data into a list of just ages for the histogram :(

//   const ageList = data.map(ages => {
//   return (
//   <p>{ages.age}</p>
//   )
// });
//   console.log(data.getElementById('age'))

  return (
    <div>
      <h1>Clinical Trials Dashboard</h1>
      <DatatablePage data = {data1} nbins = {nBin}/>
      <div style={{display: "flex", justifyContent: "center"}}>
        <p style={{marginTop: 43, marginRight: -30}}>Number of Bins</p>
        <Box sx={{ width: 300, margin: 5, marginBottom: 0 }}>
          <Slider
            aria-label="Number of Bins"
            defaultValue={10}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={20}
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
