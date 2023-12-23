const addArticleButton = document.querySelector('#addArticle');
const cancelButton = document.querySelector('#cancel');
const editCancelButton = document.querySelector('#editCancel');
const editInputFields = document.querySelector('.editInputFields');
const inputFields = document.querySelector('.inputFields');
const blurBg = document.querySelector('.blurBg');
const editBlurBg = document.querySelector('.editBlurBg');
const form = document.getElementById('form');


addArticleButton.addEventListener('click', function () {
    inputFields.classList.toggle('show');
    blurBg.classList.toggle('show');
});

cancelButton.addEventListener('click', function () {
    inputFields.classList.toggle('show');
    blurBg.classList.toggle('show');
});

blurBg.addEventListener('click', function () {
    // editInputFields.classList.toggle('show');
    inputFields.classList.toggle('show');
    blurBg.classList.toggle('show');
});

editBlurBg.addEventListener('click', function () {
    editInputFields.classList.toggle('show');
    editBlurBg.classList.toggle('show');
});

editCancelButton.addEventListener('click', function () {
    const editInputFields = document.querySelector('.editInputFields');
    editInputFields.classList.toggle('show');
    editBlurBg.classList.toggle('show');
});