import './App.css';
import React, { useState } from 'react';
import Histogram from './components/histogram';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Test from './components/test';
import DatatablePage from './components/table';
import Papa from "papaparse";
import { Layout} from 'antd';
import 'antd';
function App() {

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

        // Show Filter input
        setShowFilterInput('text');
      },
    });
  };

  const displayResults = () => {
    if (currentNouns.length == 0) {
      setValues(allValues);
    }
    else {
      setValues(allValues.filter(d => {
        return currentNouns.map(x => d[3] == x).some(x => x);
      }))
    }
  }

  const addNoun = (event) => {
    let tempNouns = currentNouns;
    tempNouns.push(currentInputNoun);
    setCurrentNouns(tempNouns);
    setCurrentInputNoun('');
    displayResults();
  }

  const filterNoun = (event) => {
    const curNoun = event.target.value;
    setCurrentInputNoun(curNoun);
    setValues(allValues.filter(d => {
      return d[3].startsWith(curNoun);
    }))
  }

  const [nBin, setnBin] = useState(30)

  // [{frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 150}, {frequency: 75}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 150}, {frequency: 50}]
  function valuetext(value) {
    setnBin(value)
  }

  var col0 = values.map(d => d[2]);
  console.log(col0);

  return (
    <div>
      <input
        type={showCSVInput}
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />
      <div style={{ display: "block", margin: "10px auto" }}>
        <input
          type={showFilterInput}
          name="filter"
          value={currentInputNoun}
          onChange={filterNoun}
          id='nounText'
        />
        <button onClick={addNoun}>
          Add Noun
        </button>
      </div>


      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.slice(0,nBin).map((value, index) => {
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

    <h1>Clinical Trials Dashboard</h1>
    <Layout style={{ height: 20 }}>
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", margin: "10px auto" }}
        />
        <br />
        <br />



</Layout>
      <Layout style={{ height: 500 }}>

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
        <Histogram data={values.slice(0,nBin)} nBin={nBin}/>
      </div>

    </Layout>

    <Layout style={{ height: 920 }}>
    <DatatablePage tableRows={tableRows} values={values}/>
    </Layout>

    </div>

  );
}

export default App;
