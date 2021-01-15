function buildCharts(sample) {
  d3.json("samples.json").then(function(data) {
    var values = data.samples[0].sample_values.slice(0,10).reverse();
    var labels =  data.samples[0].otu_labels.slice(0,10);

    var OTU_top = (data.samples[0].otu_ids.slice(0, 10)).reverse();
    var OTU_id = OTU_top.map(d => "OTU " + d);


    var trace1 = {
      x: values,
      y: OTU_id,
      text: labels,
      type: "bar",
      orientation: "h"
    };

    var data1 = [trace1];
    Plotly.newPlot("bar", data1);
  }); 

  // Use samples.json to fetch the sample data for the plots
  d3.json("samples.json").then(function (data) {
  // Build a Bubble Chart 
    var x_values = data.samples[0].otu_ids;
    var y_values = data.samples[0].sample_values;
    var size = data.samples[0].sample_values;
    var color = data.samples[0].otu_ids;
    var text = data.samples[0].otu_labels;
  
    var trace2 = {
      x: x_values,
      y: y_values,
      text: text,
      mode: `markers`,
      marker: {
        size: size, 
        color: color
      }
    };
    var data2 = [trace2];
  
    Plotly.newPlot("bubble", data2);
  })};

  function getMetadata(id) {
    // read the json file to get data
    d3.json("samples.json").then((data)=> {
    // get the metadata info for the demographic panel
      var metadata = data.metadata;

          // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

          // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
            
         // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");
    
         // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
      });
    } 

function init() {
  // select dropdown menu 
  var dropdown = d3.select("#selDataset");

  // read the data 
  d3.json("samples.json").then((data)=> {
      console.log(data)

      // get the id data to the dropdwown menu
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      // call the functions to display the data and the plots to the page
      buildCharts(data.names[0]);
      getMetadata(data.names[0]);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  }

init();