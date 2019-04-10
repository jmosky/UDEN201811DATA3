var url = "http://127.0.0.1:5000/data/osmp_lands"
d3.json(url).then(function(response) {

  let yesPublicAccess = response.filter(data => {
    return data.publicAccess === "y";
  })

  let noPublicAccess = response.filter(data => {
    return data.publicAccess === "n";
  })
  
  var trace1 = {
    x: noPublicAccess.map(data => data.Manager), 
    y: noPublicAccess.map(data => data.sumAcres),
    name: 'Public Access: No',
    type: 'bar'
  };

  var trace2 = {
    x: yesPublicAccess.map(data => data.Manager),
    y: yesPublicAccess.map(data => data.sumAcres), 
    name: 'Public Access: Yes', 
    type: 'bar'
  };

  var data = [trace1, trace2];

  var layout = {barmode: 'stack'};

  Plotly.newPlot('plot', data, layout);
});
