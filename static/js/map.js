document.addEventListener("DOMContentLoaded", function () {
    
    var cityName = "Nashik";

    fetch(`/platforms_amenities?city=${encodeURIComponent(cityName)}`)
        .then(response => response.json())
        .then(data => {
            let platformMenu = document.getElementById("platform_list_1");
            platformMenu.innerHTML = ""; // Clear existing list

            data.forEach(platform => {
                let platformId = `platform_${platform.platform_number.replace(/\s/g, "_")}`; // Sanitize ID
                let platformNumber = platform.platform_number;
                let amenities = platform.amenities || [];

                let platformDiv = document.createElement("div");
                platformDiv.className = "px-2 p-1";

                let amenitiesHTML = amenities.map(amenity => `
                  <div class="p-2 platform_list_sub_option" 
                    onclick="redirectToMap(${amenity.latitude}, ${amenity.longitude}, '${amenity.name}')">
                    <img src="../static/img/sidebar/Group 1000004628.svg"> ${amenity.name}
                  </div>
                `).join("");

                platformDiv.innerHTML = `
                    <div class="sidebar_menu p-2 sub_menu" onclick="toggleSubOptions('${platformId}', this)">
                        <img class="me-2" src="../static/img/sidebar/Rectangle 110655.svg">
                        ${platformNumber}
                    </div>
                    <div id="${platformId}" class="sub_options m-1">
                        ${amenities.length > 0 ? amenitiesHTML : "<div class='p-2'>No amenities available</div>"}
                    </div>
                `;

                platformMenu.appendChild(platformDiv);
            });
        })
        .catch(error => console.error("Error fetching platforms:", error));
});



function redirectToMap(lat, lng, amenityName) {
    window.location.href = `/map?lat=${lat}&lng=${lng}&amenity=${encodeURIComponent(amenityName)}&city=${encodeURIComponent(amenityName)}`;
}



window.initMap = function () {
    const customStyle = [
        { "featureType": "water", "stylers": [{ "color": "#50B6FF" }] },
        { "featureType": "landscape", "stylers": [{ "color": "#F1F9FF" }] },
        { "featureType": "road", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
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

    var mapOptions = {
        zoom: 18,
        center: { lat: 19.9482, lng: 73.8421 },
        mapTypeControl: false,
        streetViewControl: false,
        styles: customStyle, // Apply the custom style here
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Get the pinpoints data from the HTML script element
    var pinpoints = JSON.parse(document.getElementById("pinpoints-data").textContent);

    console.log("here pinpoints----------->", pinpoints)

    // Create markers from pinpoints
    let markers = []; // Initialize the global markers array

    function createMarkers(points) {
        clearMarkers(); // Clear existing markers before creating new ones

        console.log("Here one point ----> ",points)

        points.forEach(point => {
            var iconUrl = point.category; // Use the category field as the icon URL

            // Create the marker icon (image)
            var markerIcon = document.createElement('img');
            markerIcon.src = iconUrl;
            markerIcon.style.width = '30px'; // Adjust size as needed
            markerIcon.style.height = '30px'; // Adjust size as needed

            // Create a div to hold the marker and the place name
            var markerContainer = document.createElement('div');
            markerContainer.style.position = 'absolute';
            markerContainer.style.textAlign = 'center';

            // Append the icon to the container
            markerContainer.appendChild(markerIcon);

            // Create the place name element and append it below the icon
            var placeName = document.createElement('div');
            placeName.innerHTML = point.place_name;
            placeName.style.fontSize = '10px';
            placeName.style.fontWeight = '600';
            placeName.style.marginTop = '5px';
            placeName.style.color = '#2D336B';
            markerContainer.appendChild(placeName);

            // Create a custom marker using the div container
            var marker = new google.maps.Marker({
                position: { lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) },
                map: map,
                title: point.place_name,
                icon: { 
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"></svg>'),
                    anchor: new google.maps.Point(20, 40), // Anchor at the bottom center
                }
            });

            // Add the custom marker to the map by overlaying it on the correct position
            var overlay = new google.maps.OverlayView();
            overlay.onAdd = function () {
                var layer = this.getPanes().overlayLayer;
                layer.appendChild(markerContainer);
            };

            overlay.draw = function () {
                var projection = this.getProjection();
                var position = projection.fromLatLngToDivPixel(marker.getPosition());
                markerContainer.style.left = (position.x - markerContainer.offsetWidth / 2) + 'px'; // Center horizontally
                markerContainer.style.top = (position.y - markerContainer.offsetHeight) + 'px'; // Place name below the icon
            };

            overlay.setMap(map);

            // Add marker to global array for tracking visibility
            markers.push({ marker, overlay, markerContainer });
        });
    }

    // Function to handle zoom level and display markers accordingly
    function handleZoomChanged() {
        const zoomLevel = map.getZoom();
        let visiblePinpoints = [];

        // Define the ranges for showing markers
        if (zoomLevel >= 21) {
            visiblePinpoints = pinpoints; // Show all markers
        } 
        else if (zoomLevel >= 20 && zoomLevel < 21) {
            visiblePinpoints = pinpoints.slice(0, 40);
        } 
        else if (zoomLevel >= 19 && zoomLevel < 20) {
            visiblePinpoints = pinpoints.slice(0, 30);
        } 
        else if (zoomLevel >= 18 && zoomLevel < 19) {
            visiblePinpoints = pinpoints.slice(0, 20); // Show the first 20 markers
        } 
        else if (zoomLevel >= 15 && zoomLevel < 18) {
            visiblePinpoints = pinpoints.slice(0, 10); // Show the first 10 markers
        } 
        else {
            visiblePinpoints = []; // Hide all markers
        }

        clearMarkers(); // Clear existing markers
        if (visiblePinpoints.length > 0) {
            createMarkers(visiblePinpoints); // Create markers based on zoom level
        }
    }

    // Function to clear all existing markers and associated overlays from the map
    function clearMarkers() {
        if (markers && markers.length > 0) {
            markers.forEach(({ marker, overlay, markerContainer }) => {
                marker.setMap(null); // Remove the marker
                markerContainer.remove(); // Remove the custom HTML marker container from the DOM
            });
        }
        markers = []; // Clear the markers array
    }

    // Set an event listener for zoom changes
    google.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);

    // Initial call to display markers based on initial zoom level
    handleZoomChanged();

    console.log('pinpoints-------', pinpoints);
};



















// window.initMap = function () {
//     var mapOptions = {
//         zoom: 18,
//         center: { lat: 19.9482, lng: 73.8421 },
//         mapTypeControl: false,
//         streetViewControl: false,
//     };

//     var map = new google.maps.Map(document.getElementById("map"), mapOptions);

//     // Get the pinpoints data from the HTML script element
//     var pinpoints = JSON.parse(document.getElementById("pinpoints-data").textContent);
   
//     pinpoints.forEach(point => {
//         var iconUrl = point.category;

//         var marker = new google.maps.Marker({
//             position: { lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) },
//             map: map,
//             title: point.place_name,
//             icon: iconUrl,
//             label: {
//                 text: point.place_name,  // Use place name as label text
//                 fontSize: '14px', // Set the font size of the label
//                 color: 'black', // Set the label color
//                 className: 'place-label', // Optional: apply custom styles with CSS
//                 fontWeight: 'bold'
//             }
//         });
       
//         // var infoWindow = new google.maps.InfoWindow({
//         //     content: `<b>${point.place_name}</b><br>${point.platform}, ${point.station}, ${point.city}, ${point.state}<br>Category: ${point.category}`
//         // });

//         var infoWindow = new google.maps.InfoWindow({
//             content: `
//                 <div style="text-align: center;">
//                     <img src="${iconUrl}" alt="${point.place_name}" style="width: 30px; height: 30px;">
//                     <br>
//                     <b>${point.place_name}</b> <!-- Display the place name below the icon -->
//                     <br>${point.platform}, ${point.station}, ${point.city}, ${point.state}<br>
//                     Category: ${point.category}
//                 </div>`
//         });

//         marker.addListener('click', function () {
//             infoWindow.open(map, marker);
//         });
//     });
//     console.log('pinpoints-------',pinpoints)
// };






