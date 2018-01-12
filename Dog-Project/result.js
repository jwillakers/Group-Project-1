
var map;
var keyword = $("#keyword option:selected").val();

$("#submit").on("click", function() {
        initMap();
        console.log(keyword);
        });

      function initMap() {
        // Create the map.
        var pyrmont = {lat: 32.776, lng: -96.796};
        map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 17
        });

        // Create the places service.
        var service = new google.maps.places.PlacesService(map);
       
        // create variable for value of input user is searching for
        var keyword = $("#keyword option:selected").val();
        // create a text search based on value of input
        service.textSearch(
            {location: pyrmont, 
             radius: 400, 
             query: keyword}, processResults);
            }
        // create a function to do something with the text search that was just done
      function processResults(results, status, pagination) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        } else {
          createMarkers(results);
          // creates a "more" button to go to next page after results are returned
          if (pagination.hasNextPage) {
            var moreButton = document.getElementById('more');

            moreButton.disabled = false;

            moreButton.addEventListener('click', function() {
              moreButton.disabled = true;
              pagination.nextPage();
            });
          }
        }
      }
      // makes markers on map and also on the results list
      function createMarkers(places) {
        var bounds = new google.maps.LatLngBounds();
        var placesList = document.getElementById('searchResult');

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
          
          // function return(){
          //   var li = document.createElement('li');
          //   li.setContent('<strong>' + place.name + '</strong>');
          //   placesList.appendChild(li);
          // }

          var li = document.createElement('li');
          li.innerHTML = ('<strong>' + place.name + '</strong><br>' + 'Rating: ' + place.rating + 
            '<br>' + 'Address: ' + place.formatted_address);
          placesList.appendChild(li);

          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
      }

 

     