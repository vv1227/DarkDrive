// Get references to each page
const homePage = document.getElementById('home-page');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const lastPage = document.getElementById('last-page');

// Initially, show the home page
homePage.classList.remove('hidden');

// Navigation to Page 2
document.getElementById('goToPage2').addEventListener('click', function() {
    homePage.classList.add('hidden');
    page2.classList.remove('hidden');
});

// Navigation to Page 3
document.getElementById('goToPage3').addEventListener('click', function() {
    page2.classList.add('hidden');
    page3.classList.remove('hidden');
});

// Navigation to Last Page
document.getElementById('goToLastPage').addEventListener('click', function() {
    page3.classList.add('hidden');
    lastPage.classList.remove('hidden');
});

// Back to Home from Last Page
document.getElementById('backToHome').addEventListener('click', function() {
    lastPage.classList.add('hidden');
    homePage.classList.remove('hidden');
});
