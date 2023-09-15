   
   function optionChanged(selectedSampleId){
    // Load the data from the URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
      // Get the metadata
      const metadata = data.metadata;
  
      // Find the metadata for the selected sample ID
      const selectedMetadata = metadata.filter(item => item.id == selectedSampleId)[0];
  
      // Display the demographic info in the panel
      const metadataPanel = d3.select("#sample-metadata");
      metadataPanel.html(""); // Clear previous data
  
      // Iterate over the metadata and display key-value pairs
      for (const [key, value] of Object.entries(selectedMetadata)) {
        metadataPanel.append("p").text(`${key}: ${value}`);
      }
    
   // Get the washing frequency data
   const washingFrequency = selectedMetadata.wfreq;

    // Create the gauge chart
    const gaugeTrace = {
    type: "indicator",
    mode: "gauge+needle",
    value: washingFrequency,
    title: {
      text: "Belly Button Washing Frequency<br><sup>Scrubs per Week</sup>",
      font: {
        size: 18
      }
    },
    gauge: {
      axis: { range: [null, 9], tickwidth: 1, tickcolor: "black" },
      bar: { color: "#3366cc" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
          { range: [0, 1], color: "#FFFFFF" }, 
          { range: [1, 2], color: "#E6FFE6" },
          { range: [2, 3], color: "#CCFFCC" },
          { range: [3, 4], color: "#B3FFB3" },
          { range: [4, 5], color: "#99FF99" },
          { range: [5, 6], color: "#80FF80" },
          { range: [6, 7], color: "#66FF66" },
          { range: [7, 8], color: "#4DFF4D" },
          { range: [8, 9], color: "#33FF33" },
      ],
    },
  };

    const gaugeLayout = {
    margin: { t: 0, b: 0 },
    paper_bgcolor: "lightgray",
    };

  Plotly.newPlot("gauge", [gaugeTrace], gaugeLayout);
})