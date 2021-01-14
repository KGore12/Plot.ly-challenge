// create the function that gets the data and creates the plots for the id 
function getPlot(id) {
    
    // get the data from the json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)