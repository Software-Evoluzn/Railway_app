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