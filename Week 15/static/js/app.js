function buildMetadata(sample) {

  d3.json(`metadata/${sample}`).then(function(data){
    d3.select('#sample-metadata').html('')
    let myHtmlBlock = d3.select('#sample-metadata')
    Object.keys(data).forEach(key => {
      myHtmlBlock.append('p').text(key + " " + data[key])
    })
  })

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  let url = `samples/${sample}`;
  
  d3.json(url).then(function(data){
    let myValues = data.sample_values.slice(0,10);
    let myLabels = data.otu_ids.slice(0,10);

  console.log(myValues)

  var StaticData = [{
    values: myValues,
    labels: myLabels,
    type: 'pie'
  }];
  
  var layout = {
    title: 'OTU Top Samples',
    height: 600,
    width: 700
  };
  
  Plotly.newPlot('pie', StaticData, layout);
  });
  
  // Create scatterplot.a
  
  d3.json(url).then(function (data) {
    let sampleValues = data.sample_values;
    let otuIds = data.otu_ids;
    let otuLabels = data.otu_labels;
    
    console.log(sampleValues)
    var trace1 = {
      y: sampleValues,
      x: otuIds,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: otuIds,
        size: sampleValues
      }
    };

    var data = [trace1];

    var layout = {    
      title: 'OTU vs Sample Values',
      showlegend: false,
      yaxis: {
          autorange: true}
    };

    Plotly.newPlot('bubble', data, layout);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
