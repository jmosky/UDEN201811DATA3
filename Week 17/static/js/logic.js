// Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.
// Include popups that provide additional information about the earthquake when a marker is clicked.
// Create a legend that will provide context for your map data.
// Your visualization should look something like the map above.

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the earthquake
    // function onEachFeature(feature, layer) {
    //     layer.bindPopup("<h3>" + feature.properties.place +
    //         "</h3><hr><p>" +
    //         "<b> Magnitude: </b>" + feature.properties.mag + "<br><br>" +
    //         "<b> Date: </b>" + new Date(feature.properties.time) + "<br><br>" +
    //         "<b> # Felt: </b>" + feature.properties.felt + "</p>");
    // }

    // Create a function that defines the color of each magnitude.
    // We will use this to create the legend.
    function getColor(d) {
        return d > 9 ? '#FF2300' :
            d > 8 ? '#FF5700' :
                d > 7 ? '#FF8C00' :
                    d > 6 ? '#FFC100' :
                        d > 5 ? '#FFF600' :
                            d > 4 ? '#D4FF00' :
                                d > 3 ? '#9FFF00' :
                                    d > 2 ? '#6AFF00' :
                                        d > 2 ? '#35FF00' :
                                            '#00FF00';
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object.
    var earthquakes = L.geoJSON(earthquakeData, {
        // Add circle markers with color encoding based base magnitude.
        // TODO: Colors defined by "getColor" function above.
        pointToLayer: function (feature, latlng) {
            let color;
            if (feature.properties.mag > 9) {
                color = "#FF2300"
            } else if (feature.properties.mag > 8) {
                color = "#FF5700"
            } else if (feature.properties.mag > 7) {
                color = "#FF8C00"
            } else if (feature.properties.mag > 6) {
                color = "#FFC100"
            } else if (feature.properties.mag > 5) {
                color = "#FFF600"
            } else if (feature.properties.mag > 4) {
                color = "#D4FF00"
            } else if (feature.properties.mag > 3) {
                color = "#9FFF00"
            } else if (feature.properties.mag > 2) {
                color = "#6AFF00"
            } else if (feature.properties.mag > 1) {
                color = "#35FF00"
            } else {
                color = "#00FF00"
            }
            // Create the circle markers.
            return L.circleMarker(latlng, {
                radius: Math.round(feature.properties.mag) * 3,
                fillColor: color,
                color: color,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" +
                "<b> Magnitude: </b>" + feature.properties.mag + "<br><br>" +
                "<b> Date: </b>" + new Date(feature.properties.time) + "<br><br>" +
                "<b> # Felt: </b>" + feature.properties.felt + "</p>")
        }
    });

    // // Adding legend.
    // var legend = L.control({ position: 'bottomright' });

    // legend.onAdd = function (map) {

    //     var div = L.DomUtil.create('div', 'info legend'),
    //         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
    //         labels = [];

    //     // loop through our density intervals and generate a label with a colored square for each interval
    //     for (var i = 0; i < grades.length; i++) {
    //         div.innerHTML +=
    //             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
    //             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    //     }

    //     return div;
    // };

    // legend.addTo(map);
    // // End of legend.

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}
