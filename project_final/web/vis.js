// Asks JavaScript to show more errors.
"use strict";

/*
 * # Boilerplate jQuery
 * This code loads the file `res/scores.json` and calls the `visualize` function
 * as soon as the JSON file is loaded.
 */
 $(function() {
   $.getJSON("res/countries.json")
    .done(function (data) { visualize(data); })
    .fail(function() { alert("Failed to load the JSON file!\n(Did your Python run?)"); });
 });

/*
 * # d3.js visualization
 * All of the code to create our visualization will be contained in the `visualize` function,
 * which is called once the data for the visualization has been loaded by the boilerplate
 * jQuery code.
 */
var visualize = function(data) {
  /*
   * # Boilerplate Code for d3.js
   */
var margin = { top: 0, right: 100, bottom: 0, left: 100 },
  width = 960 - margin.left - margin.right,
  height = 780 - margin.top - margin.bottom,
  centered,
  scale0 = (width - 1) / 2 / Math.PI;






var svg = d3.select("#map")
           .append("svg")
           .attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom)
           .style("width", width + margin.left + margin.right)
           .style("height", height + margin.top + margin.bottom)
           .append("g")
           .attr("transform", "translate(" + margin.left + "," + (margin.top) + ")")




var colorRed = d3.interpolateOrRd;
var colorBlue = d3.interpolateGnBu;
var colorPurple = d3.interpolateBuPu;
var colorGreen = d3.interpolateBuGn;
var coloryellowOrange = d3.interpolateYlOrRd;

var projection = d3.geoMercator()
                    .scale(width/ 2 / Math.PI)
                    .translate([width / 2, height/ 2])


var path = d3.geoPath().projection(projection);

//var fillCountries = function(year) {
  d3.json("web/worldmap.topo.json", function(err, world) {
  if (err) { alert("Failed to load topojson. :("); throw err; }


  var countries = topojson.feature(world, world.objects.countries).features;


    svg.selectAll(".country")
         .data(countries)
         .enter()
         .insert("path")
         .attr("class", "country")
         .attr("d", path)
         //.on("click", clicked)
         .attr("title", function(d,i) {
           return console.log(d.properties.name);
         })
         //.transition()
         //.delay(750)
         .attr("fill", "black");
    svg.append("path")
    //.datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
    //.attr("id", "country-borders")
    //.attr("d", path);
});
         /*
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});
           console.log(e)

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
                  if (e['values'][year] < -100000 ){
                    return 'hsla(0, 100%, 20%, 1)';
                  }
                  if (e['values'][year] < -50000 && e['values'][year] > -100000){
                    return 'hsla(0, 100%, 30%, 1)';
                  }
                  if (e['values'][year] < -20000 && e['values'][year] > -50000){
                    return 'hsla(0, 100%, 40%, 1)';
                  }
                  if (e['values'][year] < -10000 && e['values'][year] > -20000){
                    return 'hsla(0, 100%, 60%, 1)';
                  }
                  if (e['values'][year] < 0 && e['values'][year] > -10000){
                    return 'hsla(0, 100%, 70%, 1)';}
                  if (e['values'][year] < 10000 && e['values'][year] > 0){
                    return 'hsla(240, 100%, 70%, 1)';
                  }
                  if (e['values'][year] < 20000 && e['values'][year] > 10000){
                    return 'hsla(240, 100%, 60%, 1)';
                  }
                  if (e['values'][year] < 50000 && e['values'][year] > 20000){
                    return 'hsla(240, 100%, 50%, 1)';
                  }
                 if (e['values'][year] < 100000 && e['values'][year] > 50000){
                    return 'hsla(240, 100%, 40%, 1)';
                  }
                  if (e['values'][year] < 150000 && e['values'][year] > 100000){
                    return 'hsla(240, 100%, 30%, 1)';
                  }
                  if (e['values'][year] > 150000){
                     return 'hsla(240, 100%, 20%, 1)';
                   }
                }
              else   { return "black"; }
            })
            */



//};
var x = d3.scaleLinear()
      .domain([1975, 2013])
      .range([0, width])
      .clamp(true);
var slider = d3.select("#slider3")
              .append("svg")
           .attr("width", width + margin.left + margin.right)
           .attr("height", 140 + margin.top + margin.bottom)
           .style("width", width + margin.left + margin.right)
           .style("height", 140 + margin.top + margin.bottom)
           .append("g")
           .attr("class", "slider")
           .attr("transform", "translate(" + margin.left + "," + 140 / 2 + ")");
slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { 
          
          //hue(x.invert(d3.event.x));
          var year = Math.round(x.invert(d3.event.x));
          handle.attr("cx", x(year));
          console.log(year);
          fillCountries(year);
          }));

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
  .data(x.ticks(10))
  .enter().append("text")
    .attr("x", x)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);
/*
slider.transition() // Gratuitous intro!
    .duration(750)
    .tween("hue", function() {
      var i = d3.interpolate(0, 70);
      return function(t) { hue(i(t)); };
    });

function hue(h) {
  handle.attr("cx", x(h));
  svg.style("background-color", d3.hsl(h, 0.8, 0.8));
}
*/

//d3.select('#slider3')
  //.append()
  //.call(d3.slider());

  // Scales
var linear = d3.scaleLinear()
  .domain([0,150])
  .range(['hsla(240, 100%, 70%, 1)', 'hsla(240, 100%, 20%, 1)']);

svg.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(20,10)");

var legendLinear = d3.legendColor()
  .shapeWidth(30)
  .cells([10, 20, 50, 100, 150])
  .orient('horizontal')
  .scale(linear);

svg.select(".legendLinear")
  .call(legendLinear);

var linear2 = d3.scaleLinear()
  .domain([0,150])
  .range(['hsla(0, 100%, 70%, 1)', 'hsla(0, 100%, 20%, 1)']);

svg.append("g")
  .attr("class", "legend2")
  .attr("transform", "translate(600,10)");

var legend2 = d3.legendColor()
  .shapeWidth(30)
  .cells([10, 20, 50, 100, 150])
  .orient('horizontal')
  .scale(linear2);

svg.select(".legend2")
  .call(legend2);


  var fillCountries = function(year) {

    svg.selectAll(".country")
         .attr("title", function(d,i) {
           return console.log(d.properties.name);
          })
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});
           console.log(e)

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
                  if (e['values'][year] < -100000 ){
                    return 'hsla(0, 100%, 20%, 1)';
                  }
                  if (e['values'][year] < -50000 && e['values'][year] > -100000){
                    return 'hsla(0, 100%, 30%, 1)';
                  }
                  if (e['values'][year] < -20000 && e['values'][year] > -50000){
                    return 'hsla(0, 100%, 40%, 1)';
                  }
                  if (e['values'][year] < -10000 && e['values'][year] > -20000){
                    return 'hsla(0, 100%, 60%, 1)';
                  }
                  if (e['values'][year] < 0 && e['values'][year] > -10000){
                    return 'hsla(0, 100%, 70%, 1)';}
                  if (e['values'][year] < 10000 && e['values'][year] > 0){
                    return 'hsla(240, 100%, 70%, 1)';
                  }
                  if (e['values'][year] < 20000 && e['values'][year] > 10000){
                    return 'hsla(240, 100%, 60%, 1)';
                  }
                  if (e['values'][year] < 50000 && e['values'][year] > 20000){
                    return 'hsla(240, 100%, 50%, 1)';
                  }
                 if (e['values'][year] < 100000 && e['values'][year] > 50000){
                    return 'hsla(240, 100%, 40%, 1)';
                  }
                  if (e['values'][year] < 150000 && e['values'][year] > 100000){
                    return 'hsla(240, 100%, 30%, 1)';
                  }
                  if (e['values'][year] > 150000){
                     return 'hsla(240, 100%, 20%, 1)';
                   }
                }
              else   { return "black"; }

            })

    svg.select("text")
      .attr("text-anchor", "middle")
      .attr("x", 600/2)
      .attr("y", 100/2)
      .text(year)
      .attr("fill", "black")
      .attr("font-size", "16px")
      .attr("transform", "translate(100)")

  };
/*
function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 1.5;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  svg.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  svg.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

*/

};






