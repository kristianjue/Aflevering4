function changeRatingArray() {

    var types = document.getElementById("mySelect").value
    console.log(types)
    if (types == 1) {
        ratingArray.sort(d3.descending);
        console.log(ratingArray);
        removesvg();
        buildsvg(ratingArray);
    }
    else if (types == 2) {
        ratingArray.sort(d3.ascending);
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
        ratingArray.push(data[i].rating);
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
            return h - (d * 25);
        })
        .attr("width", w / data.length - barPadding)
        .attr("height", function (d) {
            return d * 25;
        })
        .attr("fill", function (d) {
            return "rgb(0,0, " + Math.round(d * 25) + ")";
        });


    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)
        .text(function (d) {
            return d;
        })
        .attr("x", function (d, i) {
            return i * (w / data.length) + (w / data.length - barPadding) / 2;
        })
        .attr("y", function (d) {
            return h - (d * 25) + 18;
        })
        .attr("fill", "white")
        .attr("text-anchor", "middle");
};





//Magi - det taler vi om senere!!
async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
}