function startSelection() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('hero-selection').style.display = 'block';
}

function selectHero(category, name, image, info) {
    document.getElementById('hero-selection').style.display = 'none';
    document.getElementById('selected-hero').style.display = 'block';

    document.getElementById('hero-name').innerText = name + " (" + category + ")";
    document.getElementById('hero-image').src = image;
    document.getElementById('hero-info').innerText = info;
}

function goBack() {
    document.getElementById('selected-hero').style.display = 'none';
    document.getElementById('hero-selection').style.display = 'block';
}