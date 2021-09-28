/**
 * Map Functions
 */

function initMap() {
  // Check if we have the coordinates
  if (!!map_location.lat && !!map_location.lng) {
    generateMap(map_location);
  } else {
    // Else, geocode it
    gGeocode = new google.maps.Geocoder();
    gGeocode.geocode(
      { address: map_location.address },
      function (result, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map_location.lat = Number(result[0].geometry.location.lat());
          map_location.lng = Number(result[0].geometry.location.lng());

          console.log("Geocode Location:", map_location);
          generateMap(map_location);
        }
      }
    );
  }
}

function generateMap(location) {
  // Settings
  var zoomLevel = 17;
  var latOffset = 0;
  var mapMarker = wpAssetUrl + "/assets/img/icn_map_pin.svg";

  var infoContent =
    "<h4>" + location.name + "</h4>" + "<p>" + location.address + "</p>";

  var style = [
    {
      elementType: "geometry",
      stylers: [{ saturation: -100 }, { lightness: 40 }],
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ saturation: -100 }, { lightness: 25 }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ saturation: -100 }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ saturation: -100 }],
    },
  ];

  // Draw Map
  var gMap = new google.maps.Map(document.getElementById("office-map"), {
    zoom: zoomLevel,
    mapTypeControl: false,
    streetViewControl: false,
    center: new google.maps.LatLng(location.lat + latOffset, location.lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  // Set the Map in Greyscale
  var mapType = new google.maps.StyledMapType(style, { name: "Greyscale" });
  gMap.mapTypes.set("grey", mapType);
  gMap.setMapTypeId("grey");

  // Draw Map Marker
  var markerLatLng = new google.maps.LatLng(location.lat, location.lng);
  var gMarker = new google.maps.Marker({
    position: markerLatLng,
    map: gMap,
    icon: mapMarker,
  });

  // Create Info Window
  gInfoWindow = new google.maps.InfoWindow({ content: infoContent });
  //gInfoWindow.open(gMap, gMarker)

  // Click listener to map marker
  gMarker.addListener("click", function () {
    gInfoWindow.open(gMap, gMarker);
  });
}
