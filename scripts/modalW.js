let body = document.querySelector('body');
let bodyOverlay = document.querySelector('.body-overlay');

let addPhoto = document.querySelector('#add-photo');
let addPostModal = document.querySelector('.add-post-modal');

addPhoto.addEventListener("click", () => {
    addPostModal.classList.add('active');
    body.classList.add('with-overlay');
    bodyOverlay.classList.add('active');
});

let countPhoto = +(document.querySelector('#photo-count'));
console.log(countPhoto);

if (countPhoto === 0) {
    addPostModal.classList.add('active');
    body.classList.add('with-overlay');
    bodyVlay.classList.add('active');
};

//let addPostStep1 = document.querySelector('.add-post-modal__step-1');