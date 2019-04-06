// Creating map object
var map = L.map("map", {
    center: [40.014984, -105.270546],
    zoom: 11
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);
  
  var link =  'https://www-static.bouldercolorado.gov/docs/opendata/OSMPManagementAreas.GeoJSON?_ga=2.177582950.2110561214.1553967684-646607836.1553818032'
  
  // Function that will determine the color of a neighborhood based on the borough it belongs to
  function chooseColor(mgmt_area) {
    switch (mgmt_area) {
    case "Natural Area":
      return "yellow";
    case "Habitat Conservation Area":
      return "red";
    case "Passive Recreation Area":
      return "orange";
    case "Agricultural Area":
      return "green";
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
  
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      style: function(feature) {
        return {
          color: "white",
          // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
          fillColor: chooseColor(feature.properties.mgmt_area),
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
        layer.bindPopup("<h1>" + feature.properties.zonename + "</h1> <hr> <h2>" + feature.properties.mgmt_area + "</h2>");
  
      }
    }).addTo(map);
  }); 