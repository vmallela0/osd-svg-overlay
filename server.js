
// randomly select an image
images = [ "./test_vcg_image2021/dzc_output.dzi"]
var image_main = images[Math.floor(Math.random() * images.length)];
console.log(image_main)

var viewer = OpenSeadragon({
    id: "image_main",
    prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
    tileSources: "./test_vcg_image2021/dzc_output.dzi",
});

var overlay = viewer.svgOverlay(); // init svg overlay
var pointerTracker = d3.select(overlay.node()) // overlay for cursor and triangles

// set random colors for each triangle
color1 = '#' + Math.floor(Math.random()*16777215).toString(16);
color2 = '#' + Math.floor(Math.random()*16777215).toString(16);
color3 = '#' + Math.floor(Math.random()*16777215).toString(16);

function generatePolygon(data, color, distance, x_pos, y_pos, scale, id){

    poly = data

    var area = d3.polygonArea(poly) // get area of polygon
    var centroid = d3.polygonCentroid(poly) // get centroid coordinates

    function pointVertex(x, y) { // function that colors data points
        d3.select(overlay.node()).append("rect")
            .style('fill', 'black') 
            .attr("x", x)
            .attr("y", y)
            .attr("width", 0.005)
            .attr('height', 0.005)
            .style("opacity", 1);
    }


    for(i=0; i < poly.length; i++){ // circle vertices
        if(poly.length>3){
            pointVertex(poly[i][0], poly[i][1]) 
        }
    } 
    
    poly = d3.polygonHull(poly) // get the polygon hull of the points

    var svg = d3.select(overlay.node())
        .append("svg")
        .attr("opacity", 0.6)
        .attr('stroke', color)
        
    svg.append("path") // fill area in of points
        .datum(poly)
        .attr("fill", color)
        .attr("stroke", "black")
        .attr("stroke-width", 0.001)
        .attr("id", id)
        .attr("d", d3.area()
            // .defined(d => !isNaN(d.value))
            .x0(function(d) { return d })
            // .y1(function(d) { return d[1] })
            .x1(function(d) { return d[0] })
            .y(function(d) { return d[1] })
        )
        .attr("transform", 
            // move triangle with mouse and apply angle rotation
            "translate(" + (x_pos) + ", " + (y_pos) + ")," + 
            "rotate("+ (distance[1] - 45) +")," + 
            'scale(' + scale + ')'
            )

    if(data.length <= 3){ // make triangles on svg disappear
        if(distance[0] < 0.15){
            svg.attr('opacity', 0)
        }
    }

    return centroid

}

// coordinate data
var poly = [
    [0.01 * (Math.floor(Math.random() * 20) + 5), 0.01 * (Math.floor(Math.random() * 10) + 42)],
    [0.01 * (Math.floor(Math.random() * 25) + 20), 0.01 * (Math.floor(Math.random() * 8) + 42)],
    [0.01 * (Math.floor(Math.random() * 30) + 44), 0.01 * (Math.floor(Math.random() * 8) + 52)],
    [0.01 * (Math.floor(Math.random() * 20) + 5), 0.01 * (Math.floor(Math.random() * 10) + 42)],
    [0.01 * (Math.floor(Math.random() * 25) + 20), 0.01 * (Math.floor(Math.random() * 8) + 42)],
    [0.01 * (Math.floor(Math.random() * 30) + 44), 0.01 * (Math.floor(Math.random() * 8) + 52)],
    [0.01 * (Math.floor(Math.random() * 20) + 0), 0.01 * (Math.floor(Math.random() * 10) + 42)],
    [0.01 * (Math.floor(Math.random() * 25) + 50), 0.01 * (Math.floor(Math.random() * 8) + 42)],
    [0.01 * (Math.floor(Math.random() * 30) + 44), 0.01 * (Math.floor(Math.random() * 8) + 52)],
    [0.01 * (Math.floor(Math.random() * 20) + 5), 0.01 * (Math.floor(Math.random() * 10) + 42)],
    [0.01 * (Math.floor(Math.random() * 25) + 20), 0.01 * (Math.floor(Math.random() * 8) + 42)],
    [0.01 * (Math.floor(Math.random() * 30) + 44), 0.01 * (Math.floor(Math.random() * 8) + 52)],
]

var poly2 = [
    [0.01 * (Math.floor(Math.random() * 40) + 55), 0.01 * (Math.floor(Math.random() * 10) + 12)],
    [0.01 * (Math.floor(Math.random() * 25) + 50), 0.01 * (Math.floor(Math.random() * 8) + 22)],
    [0.01 * (Math.floor(Math.random() * 30) + 44), 0.01 * (Math.floor(Math.random() * 8) + 12)],
    [0.01 * (Math.floor(Math.random() * 20) + 65), 0.01 * (Math.floor(Math.random() * 10) + 22)],
    [0.01 * (Math.floor(Math.random() * 25) + 50), 0.01 * (Math.floor(Math.random() * 8) + 12)],
]

var poly3 = [
    [0.01 * (Math.floor(Math.random() * 20)), 0.01 * (Math.floor(Math.random() * 10) + 12)],
    [0.01 * (Math.floor(Math.random() * 25)), 0.01 * (Math.floor(Math.random() * 8) + 22)],
    [0.01 * (Math.floor(Math.random() * 30)), 0.01 * (Math.floor(Math.random() * 8) + 12)],
    [0.01 * (Math.floor(Math.random() * 20)), 0.01 * (Math.floor(Math.random() * 10) + 22)],
    [0.01 * (Math.floor(Math.random() * 25)), 0.01 * (Math.floor(Math.random() * 8) + 12)],
]


triangleData = [
    [0.02, 0.03],
    [0.05, 0.03],
    [0, 0]
]

triangleData2 = [
    [0.02, 0.03],
    [0.08, 0.03],
    [0, 0.05]
]


var blankDistance = [0, 0] // apply no transform for svgs
t1 = generatePolygon(poly, color1, blankDistance);
t2 = generatePolygon(poly2, color2, blankDistance);
t3 = generatePolygon(poly3, color3, blankDistance)

var trianglePointer = d3.select(overlay.node())

var tracker = new OpenSeadragon.MouseTracker({ // init osd mouse tracking
    element: viewer.container,
    moveHandler: function(event) {
        var webPoint = event.position;
        var viewportPoint = viewer.viewport.pointFromPixel(webPoint);

        // console.log(viewportPoint)

        // circle around cursor
        d3.selectAll('circle').remove();

        pointerTracker.append("circle")
            .attr("r", 0.04)
            .attr("cx", 0)
            .attr("cy", 0)
            .attr('opacity', 0.2)
            // move circle with cursor
            .attr("transform", 
                "translate(" + viewportPoint.x + ", " + viewportPoint.y + ")")
    
            // console.log(createTriangle(viewportPoint.x, viewportPoint.y, t1, "triangleTracker1", triangleData, color1, 0, 0.08))
            createTriangle(viewportPoint.x, viewportPoint.y, t1, "triangleTracker1", triangleData, color1, 0, 0.08)
            createTriangle(viewportPoint.x, viewportPoint.y, t2, "triangleTracker2", triangleData, color2, 0.04, -0.04)
            createTriangle(viewportPoint.x, viewportPoint.y, t3, "triangleTracker3", triangleData, color3, -0.08, 0)
    }
});  

function createTriangle(x_position, y_position, polygon, id, data, color, transform_x, transform_y){

    distance = getDistance(x_position, y_position, polygon) // get the distance and angle to centroid
    
    d3.select("#" + id).remove() // delete the used polygons (prevents trailing triangles)

    scale = distance[0] * 2.5 // scale the triangle based on distance to centroid

    generatePolygon(data, color, distance, (x_position + transform_x), (y_position + transform_y), scale, id)

    return distance
}


function getDistance(cursor_x, cursor_y, centroid){ 
    // distance from cursor to point
    distance = Math.sqrt(Math.pow((cursor_x - centroid[0]), 2) + (Math.pow((cursor_y - centroid[1]), 2)))

    // angle from cursor to point
    angle = (Math.atan((cursor_y - centroid[1])/(cursor_x - centroid[0]))) * (180 / Math.PI)
    
    return([distance, angle])
}
