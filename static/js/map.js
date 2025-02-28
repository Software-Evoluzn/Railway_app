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

    pinpoints.forEach(point => {
        var iconUrl = point.category; // Use the category field as the icon URL

        // Create the marker icon (image)
        var markerIcon = document.createElement('img');
        markerIcon.src = iconUrl;
        markerIcon.style.width = '40px';  // Adjust size as needed
        markerIcon.style.height = '40px'; // Adjust size as needed

        // Create a div to hold the marker and the place name
        var markerContainer = document.createElement('div');
        markerContainer.style.position = 'absolute';
        markerContainer.style.textAlign = 'center';

        // Append the icon to the container
        markerContainer.appendChild(markerIcon);

        // Create the place name element and append it below the icon
        var placeName = document.createElement('div');
        placeName.innerHTML = point.place_name;
        placeName.style.fontSize = '12px';
        placeName.style.fontWeight = '600';
        placeName.style.marginTop = '5px';
        placeName.style.color = '#2D336B';
        markerContainer.appendChild(placeName);

        // Create a custom marker using the div container
        var marker = new google.maps.Marker({
            position: { lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) },
            map: map,
            title: point.place_name,
            icon: { // Use a blank SVG icon (this hides the default marker icon)
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"></svg>'),
                anchor: new google.maps.Point(20, 40),  // Anchor at the bottom center
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
    });

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






