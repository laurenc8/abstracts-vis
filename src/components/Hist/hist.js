import * as d3 from 'd3';
import './hist.css';

const draw = (props) => {

    d3.select('#hist > *').remove();
    var arr = props.data;

    var data = [];
    for (let i = 0; i < arr.length; i++) {
      data.push(parseInt(arr[i][1]));
    }

    // var min = d3.min(data);
    // var max = d3.max(data);
    // var domain = [min,max];

    var nBin = props.nBin;

    var margin = {top: 10, right: 20, bottom: 70, left: 70},
      width = 500 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
      .domain([0, 900])
      .range([30, 400]);

    var histogram = d3.histogram()
      .value(function(d){return d})
      .domain(x.domain())
      .thresholds(x.ticks(nBin));

    var bins = histogram(data);

    // X axis: scale and draw:
    let svg = d3.select("#hist")
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("transform", "translate(0," + (height+10) + ")")
      .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
      .range([height, 0])
      .domain([0,d3.max(bins,function(d) {return d.length;})]);

    svg.append("g").call(d3.axisLeft(y));
      // Join the rect with the bins data
    svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect") // Add a new rect for each new elements
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) - 5 ; })
        .attr("height", function(d) {return height - y(d.length); })
        .style("fill", "#6495ED")
        .style("stroke", "black")

    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", 380)
      .attr("y", height + 50)
      .text("Size of Population");

    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -50)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Frequency");

}

export default draw;
