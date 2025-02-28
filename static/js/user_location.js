let map, userMarker;

function initMap() {
    // Create the map but don't set the center yet
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12
    });

    // Try to get the current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Set the map's center to the user's location
            map.setCenter(userLocation);

            // Create a marker for the user's current location
            if (userMarker) {
                userMarker.setPosition(userLocation);
            } else {
                userMarker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "You are here!"
                });
            }
        }, function () {
            alert("Error: The Geolocation service failed.");
        });
    } else {
        alert("Error: Your browser doesn't support geolocation.");
    }
}