// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});

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

function createFeatures(earthquakeData) {

    // Create a GeoJSON layer containing the features array on the earthquakeData object.
    var earthquakes = L.geoJSON(earthquakeData, {
        // Add circle markers with color encoding based base magnitude.
        // Colors defined by "getColor" function above.
        pointToLayer: function (feature, latlng) {
            // Create the circle markers with radius and color reflecting magnitude.
            return L.circleMarker(latlng, {
                radius: Math.round(feature.properties.mag) * 1.5,
                fillColor: getColor(feature.properties.mag),
                color: getColor(feature.properties.mag),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.4
                // Add a text pop up with details about the earthquake.
            }).bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" +
                "<b> Magnitude: </b>" + feature.properties.mag + "<br><br>" +
                "<b> Date: </b>" + new Date(feature.properties.time) + "<br><br>" +
                "<b> # Felt: </b>" + feature.properties.felt + "</p>")
        }
    });

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
        zoom: 3,
        layers: [streetmap, earthquakes]
    });

    // Adding legend.
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 2, 4, 6, 8, 10],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);
    // End of legend.

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}
