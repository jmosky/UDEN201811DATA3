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

  var layout = 
      // barmode: {'stack'}
      {
        title: {
          text:'OSMP Lands',
          font: {
            size: 24
          },
          xref: 'paper',
          xanchor: 'center'
        },
        xaxis: {
          title: {
            text: 'Land Manager',
            font: {
              size: 16,
              color: '#7f7f7f'
            }
          },
        },
        yaxis: {
          title: {
            text: 'Acres Under Management',
            font: {
              size: 16,
              color: '#7f7f7f'
            }
          }
        }
      };
   

  Plotly.newPlot('plot', data, layout);
});
