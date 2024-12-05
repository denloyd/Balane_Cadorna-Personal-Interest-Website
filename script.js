// Function to start the hero selection after clicking 'Get Started'
function startSelection() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('hero-selection').style.display = 'block';
}

// Function to show a category of heroes
function showCategory(category) {
    const selectText = document.getElementById('select-text');
    if (selectText) selectText.style.display = 'none';

    const categories = document.querySelectorAll('.hero-category');
    categories.forEach(cat => cat.style.display = 'none');

    const selectedCategory = document.getElementById(category);
    if (selectedCategory) selectedCategory.style.display = 'block';

    const backButton = document.getElementById('back-button');
    backButton.style.display = 'inline-block';

    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => btn.style.display = 'none');
}

// Skin slider variables
let currentSkinIndex = 0;
let skins = [];

// Function to update the skin display
function updateSkinDisplay() {
    const skinImage = document.getElementById('skin-image');
    const skinName = document.getElementById('skin-name');

    if (skins.length > 0) {
        skinImage.src = skins[currentSkinIndex].image;
        skinName.textContent = skins[currentSkinIndex].name;
    } else {
        skinImage.src = '';
        skinName.textContent = 'No skins available';
    }
}

// Function to handle skin slider navigation
function changeSkin(direction) {
    if (skins.length > 0) {
        currentSkinIndex = (currentSkinIndex + direction + skins.length) % skins.length;
        updateSkinDisplay();
    }
}

// Function to select a hero and show details
function selectHero(category, name, image, info, skinsData = [], skills = [], gameplay = '') {
    // Set hero basic details
    document.getElementById('hero-name').innerText = `${name} (${category})`;
    document.getElementById('hero-image').src = image;
    document.getElementById('hero-info').innerText = info;

    // Initialize skins slider
    skins = skinsData;
    currentSkinIndex = 0;
    updateSkinDisplay();

    // Populate hero skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = ''; // Clear previous skills
    skills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill-item');
        skillDiv.innerHTML = `
            <img src="${skill.image}" alt="${skill.name}" class="skill-image">
            <div>
                <h5>${skill.name}</h5>
                <p>${skill.description}</p>
            </div>
        `;
        skillsList.appendChild(skillDiv);
    });

    const gameplayContainer = document.getElementById('gameplay-video-container');
gameplayContainer.innerHTML = ''; // Clear previous videos
if (Array.isArray(gameplay)) {
    gameplay.forEach(videoUrl => {
        const iframe = document.createElement('iframe');
        iframe.src = videoUrl;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.width = '100%';
        iframe.style.height = '300px';
        iframe.style.marginBottom = '20px';
        gameplayContainer.appendChild(iframe);
    });
} else {
    gameplayContainer.innerHTML = '<p>No gameplay videos available.</p>';
}

    // Hide hero selection, show selected hero details
    document.getElementById('hero-selection').style.display = 'none';
    document.getElementById('selected-hero').style.display = 'block';
}

// Function to go back to hero selection
function goBack() {
    const selectText = document.getElementById('select-text');
    if (selectText) selectText.style.display = 'block';

    const categories = document.querySelectorAll('.hero-category');
    categories.forEach(cat => cat.style.display = 'none');

    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => btn.style.display = 'inline-block');

    const backButton = document.getElementById('back-button');
    backButton.style.display = 'none';

    document.getElementById('hero-selection').style.display = 'block';
    document.getElementById('selected-hero').style.display = 'none';
}

// Video end event to show start screen
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('intro-video');
    const videoIntro = document.getElementById('video-intro');
    const startScreen = document.getElementById('start-screen');

    if (video && videoIntro && startScreen) {
        video.addEventListener('ended', function() {
            videoIntro.style.display = 'none';
            startScreen.style.display = 'block';
        });
    }
});

// Scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function showSection(sectionId) {
    // Hide all hero sections
    const sections = document.querySelectorAll('.hero-section');
    sections.forEach(section => section.style.display = 'none');

    // Display the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'flex';
        // Scroll smoothly to the selected section
        selectedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}