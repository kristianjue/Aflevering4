function changeRatingArray() {

    var types = document.getElementById("mySelect").value
    console.log(types)
    if (types == 1) {
        ratingArray.sort((a, b) => d3.descending(a.rating, b.rating));
        console.log(ratingArray);
        removesvg();
        buildsvg(ratingArray)
    }
    else if (types == 2) {
        ratingArray.sort((a, b) => d3.ascending(a.rating, b.rating));
        console.log(ratingArray);
        removesvg();
        buildsvg(ratingArray);
    }
};

let albumArray = [];
let ratingArray = [];
let yearArray = [];


fetchContent("albums.json").then((data) => {

    for (i = 0; i < data.length; i++) {
        ratingArray.push({ rating: data[i].rating, albumName: data[i].albumName });
    }

    changeRatingArray();
});


function removesvg() {
    d3.select("svg")
        .remove()
};


function buildsvg(data) {

    var w = 1000;
    var h = 200;
    var barPadding = 1;

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)

        .attr("x", function (d, i) {
            return i * (w / data.length);
        })
        .attr("y", function (d) {
            return h - (d.rating * 25);
        })
        .attr("width", w / data.length - barPadding)
        .attr("height", function (d) {
            return d.rating * 25;
        })
        .attr("fill", function (d) {
            return "rgb(0,0, " + Math.round(d.rating * 25) + ")";
        });


    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)
        .text(function (d) {
            return d.rating;
        })
        .attr("x", function (d, i) {
            return i * (w / data.length) + (w / data.length - barPadding) / 2;
        })
        .attr("y", function (d) {
            return h - (d.rating * 25) + 18;
        })
        .attr("fill", "white")
        .attr("text-anchor", "middle");


    svg.selectAll(".albumName")
        .data(data)
        .enter()
        .append("text")
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)
        .attr("transform", function(d, i){
            var y = (i + 1) * 17;
            var x = (i-20)- 20;
            return "translate("+x+","+y+"),rotate(345)";
        })
        .attr("class", "albumName") // Add a class for styling if needed
        .text(function (d) {
            return d.albumName; // Get the album name from the data object
        })
        .attr("x", function (d, i) {
            return i * (w / data.length) + (w / data.length - barPadding) / 3 + 20
        })
        .attr("y", function (d) {
            return h - (d.rating * 25) /2 + 2; // This should be adjusted based on the bar height
        })
        .attr("text-anchor", "middle") // Center the text vertically
        .attr("fill", "white") // Use white text for better contrast
        .style("font-size", "10px") // Adjust the font size as needed
        
};





//Magi - det taler vi om senere!!
async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
}