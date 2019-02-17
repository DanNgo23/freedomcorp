/*
*    main.js
*    Mastering Data Visualization with D3.js
*    FreedomCorp Dashboard
*/

var parseTime = d3.timeParse("%m/%d/%Y");
var formatTime = d3.timeFormat("%m/%d/%Y");

d3.json("data/calls2.json").then(function(data){    
    
    data.map(function(d){
        d.call_revenue = +d.call_revenue;
        d.units_sold = +d.units_sold;
        d.call_duration = +d.call_duration;
        d.date = parseTime(d.date);
        return d;
    });

    allCalls = data;

    calls = data;

    nestedCalls = d3.nest()
        .key(function(d){
            return d.category;
        })
        .entries(calls);

    donut = new DonutChart("#company-size");

    revenueBar = new BarChart("#revenue", "call_revenue", "Average call revenue (USD)");
    durationBar = new BarChart("#call-duration", "call_duration", "Average call duration (seconds)");
    unitBar = new BarChart("#units-sold", "units_sold", "Units sold per call");

    stackedArea = new StackedAreaChart("#stacked-area");

    timeline = new Timeline("#timeline");

    $("#var-select").on("change", function(){
        stackedArea.wrangleData();
    });
})



function brushed() {
    var selection = d3.event.selection || timeline.x.range();
    var newValues = selection.map(timeline.x.invert);
    changeDates(newValues);
}

function changeDates(values) {
    calls = allCalls.filter(function(d){
        return ((d.date > values[0]) && (d.date < values[1]));
    });
    
    nestedCalls = d3.nest()
        .key(function(d){
            return d.category;
        })
        .entries(calls);

    $("#dateLabel1").text(formatTime(values[0]));
    $("#dateLabel2").text(formatTime(values[1]));

    donut.wrangleData();
    revenueBar.wrangleData();
    unitBar.wrangleData();
    durationBar.wrangleData();
    stackedArea.wrangleData();
}

 
 // Get the modal
var modal = document.getElementById('myModal'),
modal2 = document.getElementById('myModal2');

// Get the button that opens the modal
var btn = document.getElementById("get-started"),
btn2 = document.getElementById("instructions");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0],
span2 = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
};

btn2.onclick = function() {
  modal2.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

span2.onclick = function() {
  modal2.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if ((event.target == modal) || (event.target == modal2)) {
    modal.style.display = "none";
    modal2.style.display = "none";
  }
};
