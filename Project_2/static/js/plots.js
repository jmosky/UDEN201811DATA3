

function osmpLands() {
  
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

    // var updatemenus = [
    //   {
    //     buttons: [
    //         {
    //             args: ['barmode', 'stack'],
    //             label: 'Stacked Bar Chart',
    //             method: 'restyle'
    //         },
    //         {
    //             args: ['barmode', 'group'],
    //             label:'Unstacked Bar Chart',
    //             method:'restyle'
    //         }
    //     ],
    //     // direction: 'right',
    //     //pad: {'r': 0, 't': 0},
    //     showactive: true,
    //     type: 'buttons',
    //     x: -.25,
    //     xanchor: 'left',
    //     y: 1.5,
    //     //yanchor: 'left'
    //   }
    //   ]

    var layout =
        { 
          // updatemenus: updatemenus,
          barmode:'group',
          title: {
            text:'OSMP Lands',
            font: {
              size: 24
            },
            xref: 'paper',
            xanchor: 'center',
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
}

function prairieDogs() {
  var url = "http://127.0.0.1:5000/data/plot_data"

  d3.json(url).then(function(response) {

    var layout = {
      title:'Line and Scatter Plot'
    };
    console.log(response)
    data = response

    Plotly.newPlot('plot',data, layout)

    

  });
}