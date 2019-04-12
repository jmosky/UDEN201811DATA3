layer1 = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
})

layer2 =   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
})

// Creating map object
var map = L.map("map", {
  center: [40.014984, -105.270546],
  zoom: 11,
  layers:[
    layer1,
    layer2
  ]
});

var link =  'https://www-static.bouldercolorado.gov/docs/opendata/OSMPManagementAreas.GeoJSON?_ga=2.177582950.2110561214.1553967684-646607836.1553818032'

// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(MGMT_AREA) {
  switch (MGMT_AREA) {
  case "Natural Area":
    return "orange";
  case "Habitat Conservation Area":
    return " #6b5d81";
  case "Passive Recreation Area":
    return "#4e1526";
  case "Agricultural Area":
    return "#f2e7eb";
  case "Natural Area - Conditional":
    return "purple";
  case "Habitat Conservation Area - Conditional":
      return  "pink";
  case "Passive Recreation Area - Conditional":
      return "blue";
  case "Agricultural Area - Conditional":
      return "white";
  case "TBD":
      return "gray";
  default:
    return "black";
  }
}

$.getJSON({
  url: "https://cors-anywhere.herokuapp.com/https://www-static.bouldercolorado.gov/docs/opendata/OSMPManagementAreas.GeoJSON",

  success: function( response ) {
    // i am here

        // Creating a geoJSON layer with the retrieved data
  L.geoJson(response, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.MGMT_AREA),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.MGMT_AREA + "</h1> <hr> <h2>" + feature.properties.ZONENAME + "</h2>");

    }
  }).addTo(map);

      console.log( response ); // server response
  }

});