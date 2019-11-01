function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.csv('/Users/sethjacobson/DENVDEN201905DATA4/Homework/12 Plotly 9-17/Instructions/DataSets/belly_button_metadata.csv').then(function(d){
    var data = d3.select('#sample-metadata');
    // Use `.html("") to clear any existing metadata
    data.html('');
    // Use `Object.entries` to add each key and value pair to the panel
    Object.defineProperties(d).forEach(function ([key, value]){
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
      let datapoint = data.append('p');
      datapoint.text(`${key}: ${value}`);
    })
  })
}; 

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.csv('/Users/sethjacobson/DENVDEN201905DATA4/Homework/12 Plotly 9-17/Instructions/DataSets/belly_button_metadata.csv').then(function(data){
    // @TODO: Build a Bubble Chart using the sample data 
    var bubbles = {
      y: data.otu_ids,
      x: data.sample_values,
      text: data.otu_labels,
      mode: marker,
      marker: {
        color: data.otu_ids,
        size: data.sample_values
      }
    }
    var bubblesData = [bubbles];
    var layout = {
      xaxis: {title: 'OTU ID'}
    };
    // @TODO: Build a Bubble Chart using the sample data
    Plotly.newPlot('bubble', bubblesData, layout)

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    var pies = {
      labels: data.otu_ids.slice(0,10),
      values: data.sample_values.slice(0,10),
      hovertext: data.otu_labels.slice(0,10),
      type: 'pie'
    }
    var pieLayout = {
      height: 450,
      width: 600
    }

    var piesData = [pies];

    Plotly.newPlot('pie', piesData, pieLayout);
  });
};

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
