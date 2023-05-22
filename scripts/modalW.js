let body = document.querySelector('body');
let bodyOverlay = document.querySelector('.body-overlay');

let addPhoto = document.querySelector('#add-photo');
let addPostModal = document.querySelector('.add-post-modal');
let countPhoto = document.querySelector('#photo-count');

function makeOverLay() {
    addPostModal.classList.add('active');
    body.classList.add('with-overlay');
    bodyOverlay.classList.add('active');
}

export function addPhotoF() {
    addPhoto.addEventListener("click", () => {
        makeOverLay()
    });
    if (countPhoto.textContent === "0") {
        makeOverLay()
    };
}

let addPostStep1 = document.querySelector('.add-post-modal__step-1');
let addPostStep2 = document.querySelector('.add-post-modal__step-2');
let modalFooter = document.querySelector('.modal__footer');
let inputFilePhoto = document.querySelector('#file-upload');
let uploadedPhoto = document.querySelector('#uploaded-photo');

export function inputFilePhotoF() {
    inputFilePhoto.addEventListener("change", () => {
        addPostStep1.classList.add('hidden');
        addPostStep2.classList.remove('hidden');
        addPostStep2.classList.add('activ');
        modalFooter.classList.remove('hidden');

        //вставка нового фото
        const selectedFiles = [...inputFilePhoto.files];
        // for (const f of selectedFiles) {
        //     uploadedPhoto.src = f;
        // }

        var typedArray = selectedFiles;
        var blob = new Blob([typedArray], { type: 'application/octet-binary' });
        var url = URL.createObjectURL(blob);
        uploadedPhoto.src = url;

    });
}

let publishPost = document.querySelector('#post-publish');

// успешный результат отправки поста
const resultSendingSuccess = document.querySelector("#alert-success");

function prepareResultSuccess() {
    const resultSuccess = resultSendingSuccess.content.cloneNode(true);
    return resultSuccess;
}

// неуспешный результат отправки поста
const resultSendingFail = document.querySelector("#alert-fail");
let containerFail = resultSendingFail.querySelector('.alert--error');

function prepareResultFail() {
    const resultFail = resultSendingFail.content.cloneNode(true);
    containerFail.classList.remove('hidden');
    return resultFail;
}

// функция исчезания уведомления
function addHiddenAlert(result) {
    result.classList.add('hidden');
}


export function publishPostE() {
    publishPost.addEventListener("submit", (event) => {
        event.preventDefault();

        let sendText = areaText.value;
        let sendHashtag = areaHashtag.value;

        let formData = new FormData();
        formData.append(sendText, sendHashtag, inputFilePhoto);

        fetch('https://c-gallery.polinashneider.space/api/v1/posts/', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5MzEwNDE1LCJpYXQiOjE2ODQ0NzIwMTUsImp0aSI6ImZiNzczMDY4Mjk5YjQ1YWZhZjgyMGI1YzA0NTkyMGFiIiwidXNlcl9pZCI6NDB9.49_6gGk7w-r9a9o_4A7L1HI2CGhjztGZadKw2JIKh6k'
                },
                body: JSON.stringify(formData)
            })
            .then((result) => {
                setTimeout(addHiddenAlert(resultSendingSuccess), 2000);
                bodyOverlay.append(prepareResultSuccess());
                return result.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                formData.reset();
                bodyOverlay.append(prepareResultFail());
                setTimeout(addHiddenAlert(resultSendingFail), 2000);
                console.log(error);
            })
            .finally(() => {
                formData.reset();
            })
    });
}

export function closeModal() {
    bodyOverlay.addEventListener("click", (event) => {
        addPostModal.classList.remove('active');
        bodyOverlay.classList.remove('active');
        body.classList.remove('with-overlay');
    });
}