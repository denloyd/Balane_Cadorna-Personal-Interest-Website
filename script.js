// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const startContainer = document.querySelector('.start-container');
    startContainer.classList.add('enter');
});

// Video intro handling
document.getElementById('intro-video').addEventListener('ended', function() {
    document.getElementById('video-intro').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('video-intro').style.display = 'none';
    }, 1000);
});

// Enhanced start selection function with animation
function startSelection() {
    const startContainer = document.querySelector('.start-container');
    startContainer.classList.add('exit');
    
    setTimeout(() => {
        startContainer.style.display = 'none';
        document.getElementById('hero-selection').style.display = 'block';
    }, 1500);
}

// Optional: Add dynamic brightness based on mouse movement
function addMouseEffects() {
    const startContainer = document.querySelector('.start-container');
    
    startContainer.addEventListener('mousemove', (e) => {
        const rect = startContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // Create a subtle light effect following the cursor
        const brightness = 0.7 + (1 - Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2)) * 0.3;
        startContainer.style.setProperty('--mouse-brightness', brightness);
    });
}

let storiesVisible = false;

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

    // Hide the arrow button when a category is selected
    const arrowButton = document.getElementById('arrow-button');
    if (arrowButton) {
        arrowButton.classList.add('hide-arrow');
    }
     
}

// Toggle the visibility of the story section
function toggleStories() {
    const arrowButton = document.getElementById('arrow-button');
    const storiesSection = document.getElementById('stories-section');
    const arrowIcon = document.getElementById('arrow-icon');
  
    // Toggle stories visibility
    storiesVisible = !storiesVisible;
  
    if (storiesVisible) {
        storiesSection.style.display = 'block';
        arrowIcon.innerHTML = '&#8595;'; // Change to arrow down
    } else {
        storiesSection.style.display = 'none';
        arrowIcon.innerHTML = '&#8593;'; // Change to arrow up
    }

    // Show the arrow button again if stories are toggled off
    if (!storiesVisible) {
        arrowButton.classList.remove('hide-arrow');
    }
}

// Optionally reset visibility of the arrow button and stories section
function closeCategory() {
    const arrowButton = document.getElementById('arrow-button');
    const storiesSection = document.getElementById('stories-section');
    
    // Reset states
    storiesVisible = false;
    if (arrowButton) arrowButton.classList.remove('hide-arrow');
    if (storiesSection) storiesSection.style.display = 'none';

    const arrowIcon = document.getElementById('arrow-icon');
    if (arrowIcon) arrowIcon.innerHTML = '&#8593;'; // Set back to arrow up
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
    // Reset all hero sections
    hideHeroSections();

    // Clear hero details
    resetHeroDetails();

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

    // Ensure the arrow button is visible again
    const arrowButton = document.getElementById('arrow-button');
    if (arrowButton) {
        arrowButton.classList.remove('hide-arrow');
    }
}

// Function to hide all hero sections
function hideHeroSections() {
    const sections = document.querySelectorAll('.hero-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

// Function to reset hero details
function resetHeroDetails() {
    document.getElementById('hero-name').innerText = '';
    document.getElementById('hero-image').src = '';
    document.getElementById('hero-info').innerText = '';

    // Clear skins
    const skinImage = document.getElementById('skin-image');
    const skinName = document.getElementById('skin-name');
    if (skinImage) skinImage.src = '';
    if (skinName) skinName.textContent = '';

    // Clear skills
    const skillsList = document.getElementById('skills-list');
    if (skillsList) skillsList.innerHTML = '';

    // Clear gameplay videos
    const gameplayContainer = document.getElementById('gameplay-video-container');
    if (gameplayContainer) gameplayContainer.innerHTML = '';
}

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
        selectedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})

const button = document.querySelector('.arrow-button');
    button.addEventListener('click', () => {
      if (button.classList.contains('arrow-up')) {
        button.classList.remove('arrow-up');
        button.classList.add('arrow-down');
        button.innerHTML = '<span class="arrow"></span>Scroll Down';
      } else {
        button.classList.remove('arrow-down');
        button.classList.add('arrow-up');
        button.innerHTML = '<span class="arrow"></span>Scroll to Top';
      }
    }); 

    