import './App.css';
import React, { useState } from 'react';
import Histogram from './components/Hist/histogram';
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

  //State to store the values
  const [values, setValues] = useState([]);

  //State to store if inputting CSV is hidden
  const [showCSVInput, setShowCSVInput] = useState('file');

  //State to filter values
  const [showFilterInput, setShowFilterInput] = useState('hidden');

  const [allValues, setAllValues] = useState('');

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

  const filterNoun = (event) => {
    const curNoun = event.target.value;
    setValues(allValues.filter(d => {
      return d[3].startsWith(curNoun);
    }))
  }

  const [nBin, setnBin] = useState(30)

  function valuetext(value) {
    setnBin(value)
  }

  var col0 = values.map(d => d[2]);
  console.log(col0);

  return (
    <div>
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
      <Layout style={{ height: 600 }}>

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
