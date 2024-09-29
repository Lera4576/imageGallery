const accessKey = 'WSkcDLxtjEltI8J8-mCaaSotn9zmdDHwDzK0JrHf1GA'; 
const searchInput = document.getElementById('input');
const searchButton = document.getElementById('search');
const grid = document.getElementById('grid');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchImages(query);
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value;
        if (query) {
            fetchImages(query);
        }
    }
});

async function fetchImages(query) {
    try {
        console.log(`Fetching images for query: ${query}`);
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=12`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            displayImages(data.results);
        } else {
            console.log('No images found.');
            grid.innerHTML = 'No images found.';
        }
    } catch (error) {
        console.error('Ошибка при получении изображений:', error);
        grid.innerHTML = 'Ошибка при загрузке изображений.';
    }
}

function displayImages(images) {
    grid.innerHTML = ''; 
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.regular; 
        imgElement.alt = image.alt_description || 'Image';
        imgElement.classList.add('grid-item'); 
        grid.appendChild(imgElement);
    });
}

fetchImages('nature'); 

searchInput.focus();