let map, userMarker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                map.setCenter(userLocation);

                if (userMarker) {
                    userMarker.setPosition(userLocation);
                } else {
                    userMarker = new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: "You are here!"
                    });
                }
            },
            function (error) {
                console.error("Geolocation error:", error);

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                    default:
                        alert("An unknown error occurred.");
                        break;
                }
            }
        );
    } else {
        alert("Error: Your browser doesn't support geolocation.");
    }
}
