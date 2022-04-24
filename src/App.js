import './App.css';
import React, { useState } from 'react';
import Histogram from './components/Hist/histogram';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
// import Test from './components/test';
import DatatablePage from './components/table';
import Papa from "papaparse";
import NumHist from './components/NumHist.js'
import { Layout} from 'antd';
import 'antd';
const { Sider, Content, Footer } = Layout;

function App() {

  const [selectedRow, setSelectedRow] = useState([]);

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

        updateBarCharts([[0, 0, 0, "patients"], [0, 0, 0, "patients"], [0, 0, 0, "participants"], [0, 0, 0, "smokers"]])
      },
    });
  };

  const displayResults = () => {
    if (currentNouns.length === 0) {
      setValues(allValues);
    }
    else {
      setValues(allValues.filter(d => {
        return currentNouns.map(x => d[3] === x).some(x => x);
      }))
    }
  }

  const addNoun = (event) => {
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
    return (event) => {
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
      if (row[3] !== "") {
        if (newAdjs.has(row[3])) {
          newAdjData[row[3]] = newAdjData[row[3]] + 1
        } else {
          newAdjData[row[3]] = 1
          newAdjs.add(row[3])
          // console.log(newAdjs)
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

  var col0 = values.map(d => d[2]);
  // console.log(col0);

  return (
    <div style={{margin: "20px"}} className="font-link">
      <h1 style={{display: "flex", justifyContent: "center"}}>
        PICO Extractor
      </h1>

      <p className="font-link">
      Welcome to PICO Extractor! This application will help you explore the Populations from randomized control trial studies. Scroll through the table below to see the relevant phrases from various abstracts. The search feature allows you to filter the results based on noun, and then display the distributions of the numbers and adjectives associated with that noun. The value next to each bar in the chart shows how many abstracts use that adjective.
      </p>

      <div style={{display: "flex", justifyContent: "center"}}>
        <input
          type={showCSVInput}
          name="file"
          onChange={changeHandler}
          accept=".csv"
        />
      </div>

      {showData ?
        <div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <input
              type={showFilterInput}
              name="filter"
              value={currentInputNoun}
              onChange={filterNoun}
              id='nounText'
            />
            <button onClick={addNoun} className="font-link">
              Add Noun
            </button>
          </div>

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
              <Histogram data={values} nBin={nBin}/>
              <NumHist width="400" height="220" data={adjData}/>
            </div>

          </Layout>
        </div>
        : null
      }

      <Layout style={{ height: 920 }}>
        <DatatablePage tableRows={tableRows} values={values} passSelectedRow={setSelectedRow}/>
      </Layout>

  </div>

  );
}

export default App;
