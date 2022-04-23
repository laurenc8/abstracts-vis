import './App.css';
import React, { useState } from 'react';
import Histogram from './components/histogram';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
// import Test from './components/test';
// import DatatablePage from './components/table';
import Papa from "papaparse";
import NumHist from './components/NumHist.js'

function App() {

  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  //State to store if inputting CSV is hidden
  const [showCSVInput, setShowCSVInput] = useState('file');

  //State to filter values
  const [showFilterInput, setShowFilterInput] = useState('hidden');

  const [allValues, setAllValues] = useState('');

  const [adjData, setAdjData] = useState([])
  const [nounData, setNounData] = useState([])

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
        setAllValues(valuesArray);

        // Hide CSV Input
        setShowCSVInput('hidden');

        // Show Filter input
        setShowFilterInput('text');

        updateBarCharts([[0, 0, 0, "patients"], [0, 0, 0, "patients"], [0, 0, 0, "participants"], [0, 0, 0, "smokers"]])
      },
    });
  };

  const filterNoun = (event) => {
    const curNoun = event.target.value;
    setValues(allValues.filter(d => {
      return d[3].startsWith(curNoun);
    }))
  }

  const [nBin, setnBin] = useState(30)

  const updateBarCharts = (data) => {
    let newAdjData = {}
    let newAdjs = new Set()
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      if (row[3] !== "") {
        if (newAdjs.has(row[3])) {
          newAdjData[row[3]] = newAdjData[row[3]] + 1
        } else {
          newAdjData[row[3]] = 1
          newAdjs.add(row[3])
          console.log(newAdjs)
        }
      }
    }
    let finalAdjData = []
    newAdjs.forEach(key => {
      finalAdjData.push({category: key, frequency: newAdjData[key]})
    })
    // console.log(finalAdjData)
    setAdjData(finalAdjData)
  }

  function valuetext(value) {
    setnBin(value)
  }

  return (
    <div style={{margin: "20px"}} className="font-link">
      <h1 style={{display: "flex", justifyContent: "center"}}>
        PICO Extractor
      </h1>

      {/* <p className="font-link">
      Upload csv data below!
      </p> */}

      <div style={{display: "flex", justifyContent: "center"}}>
        <input
          type={showCSVInput}
          name="file"
          onChange={changeHandler}
          accept=".csv"
        />
      </div>

      <input
        type={showFilterInput}
        name="filter"
        onChange={filterNoun}
        style={{ display: "block", margin: "10px auto" }}
        label="hi"
      />

      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

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
        {/* {console.log(values[0])} */}
        <Histogram data={values} nBin={nBin}/>
        <NumHist width="400" height="220" data={adjData}/>
      </div>
    </div>

  );
}

export default App;
