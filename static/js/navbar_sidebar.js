const sidebar = document.getElementById('sidebar');
const sidebarToggler = document.querySelector('.sidebar-toggler');
const closeBtn = document.getElementById('close-btn');
const mainContent = document.getElementById('main-content');

// Open sidebar when toggler is clicked
sidebarToggler.addEventListener('click', (event) => {
    sidebar.classList.toggle('show');
    event.stopPropagation(); // Prevent event from propagating to document
});

// Close sidebar when close button is clicked
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('show');
});

// Close sidebar when clicking outside of it (only in mobile view)
document.addEventListener('click', (event) => {
    if (window.innerWidth <= 767.98) { // Check if mobile view
        if (!sidebar.contains(event.target) && !sidebarToggler.contains(event.target)) {
            sidebar.classList.remove('show');
        }
    }
});