import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = ( {data, nbins} ) => {
  // const data = [{frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 250}, {frequency: 350}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 150}, {frequency: 75}, {frequency: 15}, {frequency: 20}, {frequency: 20}, {frequency: 150}, {frequency: 50}]
  // const hi = ;
  // console.log(hi)
  const ndata = {
    columns: data.columns,
    rows:data.rows.slice(0,nbins)
  }

  return (

    <MDBDataTable
      scrollY
      //scrollX
      maxHeight="200px"
      striped
      bordered
      small
      paging={false}
      data={ndata}
      searching={false}
    />
  );
}

export default DatatablePage;
