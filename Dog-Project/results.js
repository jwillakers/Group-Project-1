console.log("loaded");
var latitude = "";
var longitude = "";
var map, infoWindow;

$("#submit").on("click", function() {
  initMap();
  console.log("keyword");
 });

// Initializes the map
 function initMap() {
       // IF statement stating IF submit button selected and there is no data in "near" box THEN 
       // use geolocation for search area bounds. ELSE use data in "near" box for search area bounds
      
        
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 15
        });
        // 
        // sets variable for object to access google API
        var geocoder = new google.maps.Geocoder();
        // runs geocodeAddress function when submit button clicked
        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
         });
        }

        function geocodeAddress(geocoder, resultsMap) {
          // set variable that gets value of string in address box
          var address = document.getElementById('address').value;
          geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
              resultsMap.setCenter(results[0].geometry.location);
              
              var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
              });
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
         });
        
        var keyword = $("#keyword option:selected").val();

        var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

        var request = {
          location: pyrmont,
          radius: '500',
          query: keyword,
          };
        // variable that makes the little window that pops up above markers
        var infowindow = new google.maps.InfoWindow();
        // creates places service
        var service = new google.maps.places.PlacesService(map);
        // creates a text search
        service.textSearch(request, callback);

        // callback function of the text search
        function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            }
          }
        }
        // function that makes the markers based on the text search results
        function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        // when the marker is clicked, the infowindow pops up with info
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
          });
        }
// requests details of spot on map
        // service.getDetails({
        //   placeId: place.placeId
        // }, function(place, status) {
        //   if (status === google.maps.places.PlacesServiceStatus.OK) {
        //     var marker = new google.maps.Marker({
        //       map: map,
        //       position: place.geometry.location
        //     });
        //     // makes info window when marker is clicked
        //     google.maps.event.addListener(marker, 'click', function() {
        //       // requests name, place id then format address based on place id
        //       infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        //         'Place ID: ' + place.place_id + '<br>' +
        //         place.formatted_address + '</div>');
        //       infowindow.open(map, this);
        //     });
        //   }
        // });
        function createMarkers(places) {
        var bounds = new google.maps.LatLngBounds();
        var placesList = document.getElementById('submit');

        for (var i = 0, place; place = places[i]; i++) {
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });

          var li = document.createElement('li');
          li.textContent = place.name;
          placesList.appendChild(li);
          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
      }
      }

//  $("#submit").on("click", function() {
//   initialize;
//   console.log(keyword);
//  });

// var initialize = initialize();

// function initialize() {

//   var keyword = $("#keyword option:selected").val();
//   var pyrmont = new google.maps.LatLng(latitude,longitude);

//   map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 15
//     });

//   var request = {
//     location: pyrmont,
//     radius: '500',
//     query: keyword
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.textSearch(request, callback);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }

//         function initMap() {
//           map = new google.maps.Map(document.getElementById('map'), {
//             center: {lat: -34.397, lng: 150.644},
//             zoom: 18
//           });
          
//            var service = new google.maps.places.PlacesService(map);
//             service.nearbySearch({
//             location: pyrmont,
//             radius: 500,
//             type: ['store']
//             }, processResults);
            
//             function processResults(results, status, pagination) {
//             if (status !== google.maps.places.PlacesServiceStatus.OK) {
//             return;
//             } else {
//             createMarkers(results);

//             if (pagination.hasNextPage) {
//             var moreButton = document.getElementById('more');

//             moreButton.disabled = false;

//             moreButton.addEventListener('click', function() {
//             moreButton.disabled = true;
//             pagination.nextPage();
//         });
//       }
//     }
// }
// } // End initmap
        
        //   infoWindow = new google.maps.InfoWindow;

        //   // Try HTML5 geolocation.
        //   if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(function(position) {
        //       var pos = {
        //         lat: position.coords.latitude,
        //         lng: position.coords.longitude,
          
        //       };
        // longitude = position.coords.longitude;
        // latitude = position.coords.latitude;
        // console.log(latitude);
        // console.log(longitude);
        //       infoWindow.setPosition(pos);
        //       infoWindow.setContent('Location found.');
        //       infoWindow.open(map);
        //       map.setCenter(pos);
        //     }, function() {
        //       handleLocationError(true, infoWindow, map.getCenter());
        //     });
        //   } else {
        //     // Browser doesn't support Geolocation
        //     handleLocationError(false, infoWindow, map.getCenter());
        //   }
        // // };

        // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        //   infoWindow.setPosition(pos);
        //   infoWindow.setContent(browserHasGeolocation ?
        //                         'Error: The Geolocation service failed.' :
        //                         'Error: Your browser doesn\'t support geolocation.');
        //   infoWindow.open(map);
        // };
     


//working on code to convert lat and long to physical address. How do I make it wait to locate lat and long before running this function
//http://techslides.com/convert-latitude-and-longitude-to-a-street-address
//want to print street address in sidebar beside map
//function addressConvert() {
  
  //var queryUrl = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=false"

  //$.ajax({
      //url: queryURL,
      //method: "GET"
    //  }).done(function(response) {
        //console.log(respone);
    //  });
  //};

//addressConvert();
