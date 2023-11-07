let albumArray = [];
let ratingArray = [];
let yearArray = [];

fetchContent("albums.json").then((data) => {

    var w = 500;
    var h = 150;
    var barPadding = 1;

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    albumArray = data;
    console.log(albumArray);

    for (i = 0; i < data.length; i++) {
        ratingArray.push(data[i].rating);
    }

    console.log(ratingArray);

    svg.selectAll("rect")
        .data(ratingArray)
        .enter()
        .append("rect")
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)

        .attr("x", function (d, i) {
            return i * (w / ratingArray.length);
        })
        .attr("y", function (d) {
            return h - (d * 25);
        })
        .attr("width", w / ratingArray.length - barPadding)
        .attr("height", function (d) {
            return d * 25;
        })
        .attr("fill", function (d) {
            return "rgb(0,0, " + Math.round(d * 25) + ")";
        });

    svg.selectAll("text")
        .data(ratingArray)
        .enter()
        .append("text")
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)
        .text(function (d) {
            return d;
        })
        .attr("x", function (d, i) {
            return i * (w / ratingArray.length) + (w / ratingArray.length - barPadding) / 2;
        })
        .attr("y", function (d) {
            return h - (d * 25) + 18;
        })
        .attr("fill", "white")
        .attr("text-anchor", "middle");
})



d3.select("sortByValue")
    .on("click", function () {



    });


/*
d3.select("sortByValue")
.on("click", function () {

})
//Her tilføjes der eventlisteners til knapperne
d3.selectAll("#sortByValue, #sortByDate, #sortByMeasureTime").on(
"click",
function (e) {
    // Find hvilken knap der blev trykket på
    let id = e.target.id;
    //Log id'et til konsollen
    console.log(id);
    let isFastest = false;
    if (id === "sortByMeasureTime") {
        isFastest = true;
    }
    //Data sorteres baseret på hvilken knap der blev trykket på
    sortData(id);
    //Efter sorteringen er færdig, logges det sorterede datasæt til konsollen
    console.log("Sorted data by " + id + " : ", dataset);
    //Data animeres
    animateData(dataset, isFastest);
}
)

function init(dataset, isFastest) {
//Først skal de dynamiske værdier sættes op
setUp(dataset, isFastest);
//Her oprettes det første chart som vises som standard når siden loades
createDefaultChart(dataset);
//Akser tilføjes
addAxes();
}

function setUp(dataset, isFastest) {
//Skaleringsfunktioner
yScale = createScaleY(dataset);
xScale = createScaleX(dataset);
//Akser
xAxis = createAxisX(xScale, isFastest);
yAxis = createAxisY(yScale);
}
function createDefaultChart(dataset) {
/**
 * Bar chart laves herunder
 * Vi bruger 'xScale' til at placere søjler langs x-aksen.
 * Vi bruger 'yScale' til at bestemme højden af søjlerne
 * Vi giver også hver søjle en unik key.
 * Derudover kommer vi akser og labels på også.
 * */
/** }*/










function change() {
    var w = 500;
    var h = 300;
    var barPadding = 1;

    let yearArray = []
    for (let i = 0; i < albumArray.length; i++) {
        yearArray.push(albumArray[i].productionYear);
    }

    /*
    yearArray.sort(function (a, b) {
        return b - a;
    });*/


    const yScale = d3.scaleLinear()
        .domain([1975, 2023])
        .nice()
        .range([50, 255]);


    /*
const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.fullPlays)])
  .nice()
  .range([height - margin.bottom, margin.top]);
 
svg.selectAll("rect")
  .data(data)
  .enter().append("rect")
  .attr("x", d => xScale(d.albumName))
  .attr("y", d => yScale(d.fullPlays))
  .attr("width", xScale.bandwidth())
  .attr("height", d => height - margin.bottom - yScale(d.fullPlays))
  .attr("fill", "steelblue");

      svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
    */

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(yearArray)
        .enter()
        .append("rect")
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)

        .attr("x", function (d, i) {
            return i * (w / yearArray.length);
        })
        .attr("y", function (d) {
            return h - yScale(d);
        })
        /*.attr("y", d => yScale(d.yearArray))*/
        .attr("width", w / yearArray.length - barPadding)
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", function (d) {
            return "rgb(0,0, " + Math.round(((d - 1960) / (2023 - 1960)) * 255) + ")";
        });

    svg.selectAll("text")
        .data(yearArray)
        .enter()
        .append("text")
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)
        .text(function (d) {
            return d;
        })
        .attr("x", function (d, i) {
            return i * (w / yearArray.length) + (w / yearArray.length - barPadding) / 2;
        })
        .attr("y", function (d) {
            return h - yScale(d) + 25;
        })

        .attr("fill", "white")
        .attr("text-anchor", "middle");

}

function sortByYear() {
    for (let i = 0; i < albumArray.length; i++) {
        yearArray.push(albumArray[i].productionYear)
    }
    yearArray.sort(function (a, b) {
        return b - a;
    })
    console.log(yearArray);
    return yearArray[i];
}
//Magi - det taler vi om senere!!
async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
}
