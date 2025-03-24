document.addEventListener("DOMContentLoaded", function () {
    
    var cityName = document.getElementById("current_city").textContent;
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












// Toggle the main dropdown visibility
function toggleList(id, clickedElement) {
    let ul = document.getElementById(id);
    ul.style.display = ul.style.display === "block" ? "none" : "block";

    // Remove the 'active' class from all buttons or divs
    let allElements = document.querySelectorAll('.menu_btn');
    allElements.forEach(el => el.classList.remove('active'));

    let allsubMenu = document.querySelectorAll('.sub_menu');
    allsubMenu.forEach(el => el.classList.remove('active'));

    // Add the 'active' class to the clicked element if its dropdown is visible
    if (ul.style.display === "block") {
        clickedElement.classList.add('active');
    }

    // Hide all sub-options when the main list is toggled
    document.querySelectorAll('.sub_options').forEach(sub => sub.style.display = 'none');
}

// Toggle the sub-option visibility
function toggleSubOptions(id, clickedElement) {
    let subList = document.getElementById(id);
    if (subList.style.display === "block") {
        subList.style.display = "none";
        clickedElement.classList.remove('active');
    } else {
        document.querySelectorAll('.sub_options').forEach(sub => sub.style.display = 'none');

        // Remove the 'active' class from all sub-menu buttons
        let allElements = document.querySelectorAll('.sub_menu');
        allElements.forEach(el => el.classList.remove('active'));

        // Add the 'active' class to the clicked sub-menu element
        clickedElement.classList.add('active');

        subList.style.display = "block";
    }
}