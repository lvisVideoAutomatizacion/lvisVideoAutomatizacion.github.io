// Get the container by its ID
const container = document.getElementById('copyright');

// Get the <p> inside the container
const paragraph = container.querySelector('p');

// Get current year
const currentYear = new Date().getFullYear();

// Replace the year dynamically
if (paragraph) {
    paragraph.textContent = paragraph.textContent.replace(/© \d{4}/, `© ${currentYear}`);
}
