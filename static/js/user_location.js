let map, userMarker;

// Track the currently active image
let activeImg = null;

document.querySelectorAll('.toggle-img').forEach(img => {
    img.addEventListener('click', function () {
        // If there is an active image, reset it to the original state
        if (activeImg && activeImg !== img) {
            const currentActiveSrc = activeImg.getAttribute('src');
            const originalSrc = activeImg.getAttribute('data-img-src');
            activeImg.setAttribute('src', originalSrc);
            activeImg.setAttribute('data-img-src', currentActiveSrc);
        }

        // Toggle the clicked image
        const currentSrc = img.getAttribute('src');
        const newSrc = img.getAttribute('data-img-src');
        img.setAttribute('src', newSrc);
        img.setAttribute('data-img-src', currentSrc);

        // Update the active image to be the current one
        activeImg = img;
    });
});


function initMap() {

    const customStyle = [
        { "featureType": "water", "stylers": [{ "color": "#50B6FF" }] },
        { "featureType": "landscape", "stylers": [{ "color": "#F1F9FF" }] },
        { "featureType": "road", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
        // { "featureType": "landscape.natural", "stylers": [{ "color": "#BBFF9B" }] },
        { "featureType": "road.highway", "stylers": [{ "color": "#FFEBDE" }] },
        {
            featureType: "transit.line", // Targets railway tracks
            elementType: "geometry",
            stylers: [
                { color: "#FFC74E" }, // Change to your desired color
                { visibility: "simplified" }, // Simplify the line
                { weight: 4 }, // Adjust thickness
            ],
        },
        {
            featureType: "transit.line", // Targets railway tracks
            elementType: "labels",
            stylers: [{ visibility: "off" }], // Remove railway labels (optional)
        },
    ];

    const mapOptions = {
        zoomControl: false,
        zoom: 18,
        styles: customStyle,
        mapTypeControl: false,
        streetViewControl: false,


        fullscreenControl: false, // Disable fullscreen control (fullscreen button)

    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);


    // For nashik customisation
    const customLocation = {
        lat: 19.94806,
        lng: 73.84183
    };

    // Set the map center to the custom location
    map.setCenter(customLocation);

    // Check if the userMarker exists, if not, create it at the custom location
    if (userMarker) {
        userMarker.setPosition(customLocation); // Update position of the existing marker
    } else {
        userMarker = new google.maps.Marker({
            position: customLocation,
            map: map,
            title: "Custom Location", // Set a title for the marker
            icon: {
                url: "./static/img/street-view.png", // Custom marker for user
                scaledSize: new google.maps.Size(45, 45),
            },
        });
    }

    getCityName(customLocation.lat, customLocation.lng);

    console.log("Map centered at custom location: ", customLocation);


    // For getting user Current Location
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //         function (position) {
    //             const userLocation = {
    //                 lat: position.coords.latitude,
    //                 lng: position.coords.longitude
    //             };

    //             map.setCenter(userLocation);

    //             if (userMarker) {
    //                 userMarker.setPosition(userLocation);
    //             } else {
    //                 userMarker = new google.maps.Marker({
    //                     position: userLocation,
    //                     map: map,
    //                     title: "You are here!",
    // icon: {
    //     url: "./static/img/street-view.png", // Custom marker for user
    //         scaledSize: new google.maps.Size(45, 45),
    // },
    //                 });
    //             }
    //             getCityName(userLocation.lat, userLocation.lng);
    //         },

    //         function (error) {
    //             console.error("Geolocation error:", error);

    //             switch (error.code) {
    //                 case error.PERMISSION_DENIED:
    //                     alert("User denied the request for Geolocation.");
    //                     break;
    //                 case error.POSITION_UNAVAILABLE:
    //                     alert("Location information is unavailable.");
    //                     break;
    //                 case error.TIMEOUT:
    //                     alert("The request to get user location timed out.");
    //                     break;
    //                 case error.UNKNOWN_ERROR:
    //                 default:
    //                     alert("An unknown error occurred.");
    //                     break;
    //             }
    //         }
    //     );
    // } else {
    //     alert("Error: Your browser doesn't support geolocation.");
    // }

    // Function to get city name using Google Maps Geocoding API
    function getCityName(lat, lng) {
        const geocoder = new google.maps.Geocoder();
        const latlng = new google.maps.LatLng(lat, lng);

        geocoder.geocode({ location: latlng }, function (results, status) {
            if (status === "OK") {
                if (results[0]) {
                    let city = null;
                    for (let i = 0; i < results[0].address_components.length; i++) {
                        let component = results[0].address_components[i];
                        if (component.types.includes("locality")) {
                            city = component.long_name;
                            break;
                        }
                    }
                    if (city) {
                        // alert("Nearest city: " + city);
                        console.log("Nearest city: " + city);
                    } else {
                        alert("City name not found.");
                    }
                } else {
                    alert("No results found.");
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }

}
