// Function to update the page when a new sample is selected
function optionChanged(selectedSampleId) {
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
  
      // Get the samples data
      const samples = data.samples;
  
      // Find the sample for the selected sample ID
      const selectedSample = samples.filter(sample => sample.id == selectedSampleId)[0];
  
 

    
      // Slice the top 10 OTUs for the bar chart
      const top10OTUs = selectedSample.sample_values.slice(0, 10);
      const otuIDs = selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`);
      const otuLabels = selectedSample.otu_labels.slice(0, 10);
  
      // Create the horizontal bar chart
      const barTrace = {
        type: "bar",
        x: top10OTUs.reverse(),
        y: otuIDs.reverse(),
        text: otuLabels.reverse(),
        orientation: "h",
      };
  
      const barLayout = {
        title: `Top 10 OTUs for Sample ${selectedSampleId}`,
        xaxis: { title: "Sample Values" },
      };
  
      Plotly.newPlot("bar", [barTrace], barLayout);
  
      // Create the bubble chart
      const bubbleTrace = {
        type: "scatter",
        x: selectedSample.otu_ids,
        y: selectedSample.sample_values,
        mode: "markers",
        marker: {
          size: selectedSample.sample_values,
          color: selectedSample.otu_ids,
        },
        text: selectedSample.otu_labels,
      };
  
      const bubbleLayout = {
        title: `OTU Bubble Chart for Sample ${selectedSampleId}`,
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Values" },
      };
  
      Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
    });
  }
  
  // Function to initialize the page
  function init() {
    // Load the data from the URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
      // Get the dropdown select element
      const dropdownSelect = d3.select("#selDataset");
  
      // Get the sample IDs
      const sampleIds = data.names;
  
      // Populate the dropdown menu with sample IDs
      sampleIds.forEach(function (sampleId) {
        dropdownSelect.append("option").text(sampleId).property("value", sampleId);
      });
  
      // Use the first sample ID to initially populate the page
      const firstSampleId = sampleIds[0];
      optionChanged(firstSampleId);
    });
  }
  
  // Initialize the page
  init();
  