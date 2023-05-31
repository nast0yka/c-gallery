import { exportFetch, numberOfPost } from './main.js';

const body = document.querySelector('body');
const bodyOverlay = document.querySelector('.body-overlay');

const addPhoto = document.querySelector('#add-photo');
const addPostModal = document.querySelector('.add-post-modal');
export const countPhoto = document.querySelector('#photo-count');

function makeOverLay() {
    addPostModal.classList.add('active');
    body.classList.add('with-overlay');
    bodyOverlay.classList.add('active');
}

function awayOverLay() {
    addPostModal.classList.remove('active');
    body.classList.remove('with-overlay');
    bodyOverlay.classList.remove('active');
}

export function addPhotoF() {
    addPhoto.addEventListener("click", () => {
        makeOverLay()
    });
    if (countPhoto.textContent === "0") {
        makeOverLay()
    };
}

const addPostStep1 = document.querySelector('.add-post-modal__step-1');
const addPostStep2 = document.querySelector('.add-post-modal__step-2');
const modalFooter = document.querySelector('.modal__footer');
const inputFilePhoto = document.querySelector('#file-upload');
const uploadedPhoto = document.querySelector('#uploaded-photo');
const areaText = document.querySelector('#post-text');
const areaHashtag = document.querySelector('#post-hashtags');

export function inputFilePhotoExport() {

    inputFilePhoto.addEventListener("change", () => {
        addPostStep1.classList.add('hidden');
        addPostStep2.classList.remove('hidden');
        addPostStep2.classList.add('activ');
        modalFooter.classList.remove('hidden');

        //отображение нового фото
        const file = inputFilePhoto.files[0];
        uploadedPhoto.src = URL.createObjectURL(file);

    });
}

//функция закрытия модально окна по клику
export function closeModal() {
    bodyOverlay.addEventListener("click", (event) => {
        awayOverLay();
    });
}

const publishPost = document.querySelector('#post-publish');

// успешный результат отправки поста
const resultSendingSuccess = document.querySelector("#alert-success");
const containerSuccess = document.querySelector('.alert--success');

function prepareResultSuccess() {
    const resultSuccess = resultSendingSuccess.content.cloneNode(true);
    return resultSuccess;
}

// неуспешный результат отправки поста
const resultSendingFail = document.querySelector("#alert-fail");
const containerFail = document.querySelector('.alert--error');

function prepareResultFail() {
    const resultFail = resultSendingFail.content.cloneNode(true);
    containerFail.classList.remove('hidden');
    return resultFail;
}


export function publishPostE() {
    publishPost.addEventListener("click", (event) => {
        event.preventDefault();
        let sendText = areaText.value;
        let sendHashtag = areaHashtag.value;
        const formData = new FormData();
        formData.append('image', inputFilePhoto.files[0]);
        formData.append('text', sendText);
        formData.append('tags', sendHashtag);

        fetch('https://c-gallery.polinashneider.space/api/v1/posts/', {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5MzEwNDE1LCJpYXQiOjE2ODQ0NzIwMTUsImp0aSI6ImZiNzczMDY4Mjk5YjQ1YWZhZjgyMGI1YzA0NTkyMGFiIiwidXNlcl9pZCI6NDB9.49_6gGk7w-r9a9o_4A7L1HI2CGhjztGZadKw2JIKh6k'
                },
                body: formData
            })
            .then((result) => {
                body.append(prepareResultSuccess());

                setTimeout(function removeElement() {
                    let removable = document.querySelector('.alert--success');
                    removable.remove();
                }, 2000);

                return result.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                body.append(prepareResultFail());
                console.log(error);

                setTimeout(function removeElement() {
                    let removable = document.querySelector('.alert--error');
                    removable.remove();
                }, 2000);
            })
            .finally(() => {
                areaText.textContent = "";
                areaHashtag.textContent = "";
                uploadedPhoto.src = '';
                awayOverLay();
                addPostStep1.classList.remove('hidden');
                addPostStep2.classList.add('hidden');
                addPostStep2.classList.remove('activ');
                modalFooter.classList.add('hidden');

            })
    });
}

//открытие превью поста

const modalPreview = document.querySelector(".preview-post-modal");
const previewAllContent = document.querySelector('.photos__content');
const modalContent = document.querySelector('.modal__content');

function getDataForViewPost() {
    exportFetch();
};

export function previewOfPostE() {
    previewAllContent.addEventListener("click", (event) => {
        event.preventDefault();
        modalPreview.classList.toggle('active');
        let target = event.target;
        let numberChoosedPost = target.closest('numberOfPost');

        getDataForViewPost()
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                console.log(data);
                data.forEach((item) => {
                    const { id, text, image, tags, comments } = item;

                    if (id === numberChoosedPost) { //не знаю , что писать в сравнение
                        let modalImg = modalContent.querySelector('img');
                        modalImg.src = image;

                        let modalText = modalContent.querySelector('.post-text');
                        modalText.textContent = text;

                        tags.forEach((item) => {
                            let modalHasgtags = modalContent.querySelector('.post-hashtags');
                            const tagOfModalPost = document.createElement("a");
                            tagOfModalPost.textContent = item;
                            modalHasgtags.append(tagOfModalPost);
                        });

                    } else {}
                });
            })
    });
}















// const textOfPost = document.createElement("p");
// textOfPost.textContent = text;
// containerPost.append(textOfPost);

// const tagsOfPost = document.createElement("span");
// tagsOfPost.textContent = tags;
// containerPost.append(tagsOfPost);

// const comentsOfPost = document.createElement("div"); 
// comentsOfPost.textContent = comments;
// containerPost.append(comentsOfPost);