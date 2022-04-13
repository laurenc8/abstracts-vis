// import { useD3 } from '../hooks/useD3';
// import React from 'react';
import * as d3 from 'd3';

function Histogram({ data, nBin}) {
  console.log(nBin)
  var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  const ref = useD3(
    (svg) => {
      // X axis: scale and draw:
      var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.frequency }) + 10])
        .range([30, width]);
      svg.append("g")
        .attr("transform", "translate(0," + (height+10) + ")")
        .call(d3.axisBottom(x));

      // Y axis: initialization
      var y = d3.scaleLinear()
        //.domain([0, d3.max(data, function(d) { return d.length; })])
        .range([height, 0]);
      var yAxis = svg.append("g")
         .attr("transform", "translate(30, 10)")

      // A function that builds the graph for a specific value of bin
      function update(nBin) {
        console.log(nBin);

        // set the parameters for the histogram
        var histogram = d3.histogram()
          .value(function(d) { return d.frequency; })   // I need to give the vector of value
          .domain(x.domain())  // then the domain of the graphic
          .thresholds(x.ticks(nBin)); // then the numbers of bins

        // And apply this function to data to get the bins
        var bins = histogram(data);

        // Y axis: update now that we know the domain
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
        yAxis
          .transition()
          .duration(1000)
          .call(d3.axisLeft(y));

        // Join the rect with the bins data
        var u = svg.selectAll("rect")
          .data(bins)

        // Manage the existing bars and eventually the new ones:
        u
          .enter()
          .append("rect") // Add a new rect for each new elements
          .merge(u) // get the already existing elements as well
          .transition() // and apply changes to all of them
          .duration(1000)
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + (y(d.length)+10) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) - 4 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("stroke", "#dcd0ff")
          .style("stroke-width", "3px")
          .style("fill", "#dcd0ff")


        // If less bar in the new histogram, I delete the ones not in use anymore
        u
          .exit()
          .remove()

      }

      update(nBin)
    });

  return (
    <svg
      ref={ref}
      style={{
        height: 350,
        width: 500,
        transform: "rotate(90deg)",
        transformOrigin: 150
      }}
    />
  );
}

export default Histogram;
