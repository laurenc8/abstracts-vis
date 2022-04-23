import React from 'react';
import './table.css';

const DatatablePage = ( {tableRows, values, passSelectedRow} ) => {

  return (
    <div class="scroll">
    <table>
      <thead>
        <tr>
          {tableRows.map((rows, index) => {
            return <th key={index}>{rows}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {values.map((value, index) => {
          return (
            <tr key={index} onClick={() => {passSelectedRow(value)}}>
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
