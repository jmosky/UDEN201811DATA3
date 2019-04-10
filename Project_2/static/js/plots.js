// var trace1 = {
//     x: ['giraffes', 'orangutans', 'monkeys'],
//     y: [20, 14, 23],
//     name: 'SF Zoo',
//     type: 'bar'
//   };
  
// var trace2 = {
//     x: ['giraffes', 'orangutans', 'monkeys'],
//     y: [12, 18, 29],
//     name: 'LA Zoo',
//     type: 'bar'
//   };
  
//   var data = [trace1, trace2];
  
//   var layout = {barmode: 'stack'};
  
//   Plotly.newPlot('plot', data, layout);

var url = "http://127.0.0.1:5000/data/osmp_lands"

d3.json(url, function(error, data) {
  if (error) return console.warn(error);
  var layout = {barmode: 'group'};
  
 Plotly.newPlot('plot', data.data, layout);
});