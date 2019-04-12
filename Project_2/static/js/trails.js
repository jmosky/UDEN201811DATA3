// Creating map object
var map = L.map("map", {
  center: [40.014984, -105.270546],
  zoom: 11,
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = 'https://www-static.bouldercolorado.gov/docs/opendata/OSMPTrails.GeoJSON'

var trailIcon = L.icon({
  iconUrl: '../static/images/trail_icon.png',

  iconSize: [25, 30], // size of the icon
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});



$.getJSON({
  url: "https://cors-anywhere.herokuapp.com/https://www-static.bouldercolorado.gov/docs/opendata/OSMPTrails.GeoJSON",

  success: function (locations) {
    // i am here
    L.geoJSON(locations, {
      style: function (feature) {
        switch (feature.properties.Bicycles) {
          case 'Yes': return { color: "green" };
          case 'No': return { color: "red" };
        }
      },

      onEachFeature: function (feature, layer) {
        // Set mouse events to change map styling
        layer.on({

          // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
          click: function (event) {
            map.fitBounds(event.target.getBounds());
          }
        });
        var info = L.control({
          position: "bottomright"
        });

        layer.bindPopup("<h1>" + feature.properties.TrailName + "</h1> <hr> <h2>" + feature.properties.TrailType + "</h2>");

      }

    }).addTo(map);
    console.log(locations); // server response

  }
})

$.getJSON({
  url: "https://cors-anywhere.herokuapp.com/https://www-static.bouldercolorado.gov/docs/opendata/OSMPTrailheads.GeoJSON?_ga=2.239917760.2110561214.1553967684-646607836.1553818032",

  success: function (locations) {
    // i am here
    L.geoJSON(locations, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: trailIcon })


      }



    }).addTo(map);
    console.log(locations); // server response

  }
})



// Adding legend.
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = ["Bikes Permitted", "Bikes Prohibited"],
    labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(grades[i]) + '"></i> ' +
      grades[i] + '<br>';
  }

  return div;
};

legend.addTo(map);

function getColor(d) {
  if (d == "Bikes Permitted") {
    return "green"
  } else {
    return "red"
  }
}