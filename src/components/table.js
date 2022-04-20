import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';

const DatatablePage = ( {tableRows, values, nbins} ) => {

  return (
    <div class="scroll">
    <table>
      <thead>
        <tr>
          {tableRows.map((rows, index) => {
            return <th key={index}>{rows}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {values.slice(0,nbins).map((value, index) => {
          console.log(index)
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
    </div>
  );
}

export default DatatablePage;


//
// <MDBDataTable
//   scrollY
//   //scrollX
//   maxHeight="200px"
//   striped
//   bordered
//   small
//   paging={false}
//   data={ndata}
//   searching={false}
// />
// );
