import './App.css';
import React, { useState } from 'react';
import Histogram from './components/Hist/histogram';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import DatatablePage from './components/table';
import Papa from "papaparse";
import NumHist from './components/NumHist.js'

function App() {

  const [showData, setShowData] = useState(false);

  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the displayed/filtered values
  const [values, setValues] = useState([]);

  //State to store if inputting CSV is hidden
  const [showCSVInput, setShowCSVInput] = useState('file');

  //State to filter values
  const [showFilterInput, setShowFilterInput] = useState('hidden');

  const [allValues, setAllValues] = useState('');

  const [adjData, setAdjData] = useState([])
  const [nounData, setNounData] = useState([])

  const [currentNouns, setCurrentNouns] = useState([]);

  const [currentInputNoun, setCurrentInputNoun] = useState('');

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

        setShowData(true);

        // Show Filter input
        setShowFilterInput('text');

        updateBarCharts(valuesArray);
      },
    });
  };

  const displayResults = () => {
    if (currentNouns.length === 0) {
      setValues(allValues);
      updateBarCharts(allValues);
    }
    else {
      let newValues = allValues.filter(d => {
        return currentNouns.map(x => d[3] === x).some(x => x);
      })
      updateBarCharts(newValues);
      setValues(newValues);
    }
  }

  const addNoun = () => {
    let tempNouns = currentNouns;
    let newNoun = currentInputNoun.toLowerCase();
    setCurrentInputNoun('');
    if (!tempNouns.includes(newNoun)) {
      tempNouns.push(newNoun);
      setCurrentNouns(tempNouns);
      displayResults();
    }
  }

  const removeNoun = (noun) => {
    return () => {
      let tempNouns = currentNouns;
      let tempIndex = tempNouns.indexOf(noun);
      tempNouns.splice(tempIndex, 1);
      setCurrentNouns(tempNouns);
      displayResults();
    }
  }

  const filterNoun = (event) => {
    const curNoun = event.target.value;
    setCurrentInputNoun(curNoun);
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
      if (row[2] !== "") {
        if (newAdjs.has(row[2])) {
          newAdjData[row[2]] = newAdjData[row[2]] + 1
        } else {
          newAdjData[row[2]] = 1
          newAdjs.add(row[2])
        }
      }
    }
    let finalAdjData = []
    newAdjs.forEach(key => {
      finalAdjData.push({category: key, frequency: newAdjData[key]})
    })
    setAdjData(finalAdjData);

    let newNounData = {}
    let newNouns = new Set()
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      if (row[3] !== "") {
        if (newNouns.has(row[3])) {
          newNounData[row[3]] = newNounData[row[3]] + 1
        } else {
          newNounData[row[3]] = 1
          newNouns.add(row[3])
        }
      }
    }
    let finalNounData = []
    newNouns.forEach(key => {
      finalNounData.push({category: key, frequency: newNounData[key]})
    })
    setNounData(finalNounData);
  }

  function valuetext(value) {
    setnBin(value)
  }

  return (
    <div style={{margin: 20}} className="font-link">
      <h1 style={{display: "flex", justifyContent: "center"}}>
        PICO Extractor
      </h1>

      <p className="font-link">
      Welcome to PICO Extractor! This application will help you explore the Populations from randomized control trial studies. Scroll through the table below to see the relevant phrases from various abstracts. The search feature allows you to filter the results based on noun, and then display the distributions of the numbers and adjectives associated with that noun. The value next to each bar in the chart shows how many abstracts use that adjective. Click the link in the PMID column to see the original paper.
      </p>

      <div style={{display: "flex", justifyContent: "center"}}>
        <input
          type={showCSVInput}
          name="file"
          onChange={changeHandler}
          accept=".csv"
          className="font-link"
        />
      </div>

      {showData ?
        <div>

          <div style={{display: "flex", justifyContent: "center", margin: 20}}>
            <input
              type={showFilterInput}
              name="filter"
              value={currentInputNoun}
              onChange={filterNoun}
              className="font-link"
              id='nounText'
            />
            <button onClick={addNoun} className="font-link">
              Add Noun
            </button>
          </div>

          {currentNouns.length === 0 ? null :
            <div style={{display: "flex", justifyContent: "center"}}>
              <table>
                <thead>
                  <tr>
                    <th> Nouns </th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {currentNouns && currentNouns.map(noun =>
                      <tr key={noun}>
                          <td>{noun}</td>
                          <td onClick={removeNoun(noun)}>&#10006;</td>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>
          }

          <DatatablePage tableRows={tableRows} values={values}/>

          <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <h4>Number</h4>
            <h4>Descriptor</h4>
            <h4>Noun</h4>
          </div>

          <div style={{marginLeft: 40, marginTop: -30}}>
            <div style={{display: "flex"}}>
              <p style={{marginTop: 43, marginRight: -30}}># of Bins</p>

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
            <div />
            <div />
          </div>

          <div style={{display: "flex", justifyContent: "center"}}>
            <Histogram data={values} nBin={nBin}/>
            <NumHist width="460" height="400" data={adjData}/>
            <NumHist width="460" height="400" data={nounData}/>
          </div>
        </div>
        : null
      }

  </div>

  );
}

export default App;
