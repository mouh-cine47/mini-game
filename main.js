const games = [
    {
        id: 1,
        title: "memory blocks",
        description: "Test your memory skills !",
        category: "Puzzle",
        background: "memory.png",
        thumbnail: "memory.png",
        gamePath: "games/memoryblocks.html"
    },
    {
        id: 2,
        title: "Snake game",
        description: "eat to grow up but not your self",
        category: "Action",
        background: "snake.png",
        thumbnail: "snake.png",
        gamePath: "games/snake.html"
    },
    {
        id: 3,
        title: "tic tac toe",
        description: "Because adulting is hard, lets play X O",
        category: "Puzzle",
        background: "xo.png",
        thumbnail: "xo.png",
        gamePath: "games/tic.html"
    },
    {
        id: 4,
        title: "car rcing",
        description: "Speed to victory!",
        category: "Sport",
        background: "racing.png",
        thumbnail: "racing.png",
        gamePath : "games/car.html"
    },
    {
        id: 5,
        title: "Rock Paper Scissors",
        description: "Smash, Cut, Cover! ",
        category: "Action",
        background: "rock.png",
        thumbnail: "rock.png",
        gamePath: "games/rock_paper_scissors.html"
    }
];

let currentCategory = 'all';
let selectedGame = games[0];
let currentCardIndex = 0;

// Initialize the carousel
function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const filteredGames = currentCategory === 'all'
        ? games
        : games.filter(game => game.category === currentCategory);

    track.innerHTML = filteredGames.map((game, index) => `
        <div class="mini-card" data-id="${game.id}" data-index="${index}">
            <img src="${game.thumbnail}" alt="${game.title}">
            <div class="card-content">
                <h3>${game.title}</h3>
            </div>
        </div>
    `).join('');

    currentCardIndex = 0;
    updateFeaturedGame(filteredGames[currentCardIndex]); // Set the first card as featured
    setupEventListeners(filteredGames);
}
// Function to toggle the visibility of the menu on smaller screens
function toggleMenu() {
    const menu = document.querySelector('.nav-categories');
    const hamburger = document.querySelector('.hamburger');
    
    // Toggle the 'show' class to show/hide the menu
    menu.classList.toggle('show');
    
    // Toggle hamburger animation
    hamburger.classList.toggle('open');
}

// Add an event listener to close the menu if a category is clicked
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            const menu = document.querySelector('.nav-categories');
            const hamburger = document.querySelector('.hamburger');
            menu.classList.remove('show');
            hamburger.classList.remove('open');
        }
    });
});
document.addEventListener('click', (e) => {
    if (!document.querySelector('.navbar').contains(e.target)) {
        const menu = document.querySelector('.nav-categories');
        const hamburger = document.querySelector('.hamburger');
        menu.classList.remove('show');
        hamburger.classList.remove('open');
    }
});

// Update the featured game display
function updateFeaturedGame(game) {
    const featuredSection = document.querySelector('.featured-game');
    const featuredCard = document.querySelector('.game-card.featured');

    featuredSection.style.backgroundImage = `url(${game.background})`;
    featuredCard.innerHTML = `
        <h2>${game.title}</h2>
        <p>${game.description}</p>
        <button class="play-btn" onclick="redirectToGame('${game.gamePath}')">Play Now</button>
    `;
}

function redirectToGame(gamePath) {
    window.location.href = gamePath; // Redirects to the game's main HTML file
}


// Setup event listeners
function setupEventListeners(filteredGames) {
    const track = document.querySelector('.carousel-track');
    const cardWidth = track.querySelector('.mini-card').offsetWidth;

    // Scroll left
    document.querySelector('.scroll-btn.left').addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            updateCarouselPosition(filteredGames, track, cardWidth);
        }
    });

    // Scroll right
    document.querySelector('.scroll-btn.right').addEventListener('click', () => {
        if (currentCardIndex < filteredGames.length - 1) {
            currentCardIndex++;
            updateCarouselPosition(filteredGames, track, cardWidth);
        }
    });

    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.category-btn.active').classList.remove('active');
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            currentCardIndex = 0; // Reset to the first card
            initializeCarousel();
        });
    });

    // Mini-card click event
    document.querySelectorAll('.mini-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = parseInt(card.dataset.id);
            selectedGame = games.find(g => g.id === gameId);
            updateFeaturedGame(selectedGame);
        });
    });
}

// Update carousel position and change featured game
function updateCarouselPosition(filteredGames, track, cardWidth) {
    track.style.transform = `translateX(-${currentCardIndex * cardWidth}px)`;
    const centeredGame = filteredGames[currentCardIndex];
    updateFeaturedGame(centeredGame);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', initializeCarousel);


