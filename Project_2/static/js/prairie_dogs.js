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
  

  
  $.getJSON({
    url: "https://cors.io/?https://www-static.bouldercolorado.gov/docs/opendata/OSMPPrairieDogColonies.GeoJSON?_ga=2.72783824.2110561214.1553967684-646607836.1553818032",
  
    success: function (locations) {
      // i am here
      L.geoJSON(locations, {
           function (feature) {return feature.properties.coordinates
  
  
        }
  
  
  
      }).addTo(map);
   
  
    }
  })
  
  
  
  