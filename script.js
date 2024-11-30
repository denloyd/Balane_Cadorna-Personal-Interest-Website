// Function to start the hero selection after clicking 'Get Started'
function startSelection() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('hero-selection').style.display = 'block';
}

function showCategory(category) {
    const categories = document.querySelectorAll(".hero-category");
    categories.forEach(cat => cat.style.display = "none");
    document.getElementById(category).style.display = "block";
}
// Function to select a hero and show the selected hero's details
function selectHero(category, name, image, info) {
    document.getElementById('hero-selection').style.display = 'none';
    document.getElementById('selected-hero').style.display = 'block';

    document.getElementById('hero-name').innerText = name + " (" + category + ")";
    document.getElementById('hero-image').src = image;
    document.getElementById('hero-info').innerText = info;
}

// Function to go back to the hero selection screen
function goBack() {
    document.getElementById('selected-hero').style.display = 'none';
    document.getElementById('hero-selection').style.display = 'block';
}

// Wait until the video ends, then hide the video intro and show the start screen
const video = document.getElementById('intro-video');
const startScreen = document.getElementById('start-screen');
const videoIntro = document.getElementById('video-intro');

// Video ends event listener
video.addEventListener('ended', function() {
    videoIntro.style.display = 'none';  // Hide the video intro
    startScreen.style.display = 'block'; // Show the start screen
});


