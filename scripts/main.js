import { addPhotoF, inputFilePhotoExport, publishPostE, closeModal, countPhoto, previewOfPostE } from './modalW.js';
addPhotoF();
inputFilePhotoExport();
publishPostE();
closeModal();
previewOfPostE();

const itemTemplate = document.querySelector('#post-template');
const containerForContent = document.querySelector('.photos__content');
const containerOfPhotosEmpty = document.querySelector('.photos__empty-content');

export let numberOfPost = 0;

function preparePostItem(postItem) {

    const { id, text, image, tags, comments } = postItem;

    const item = itemTemplate.content.cloneNode(true);
    const containerPost = item.querySelector(".post");
    containerPost.setAttribute("numberOfPost", numberOfPost);
    item.querySelector("img").src = image;
    return item;
}

export function exportFetch() {
    fetch('https://c-gallery.polinashneider.space/api/v1/users/me/posts', {

            method: "GET",
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5MzEwNDE1LCJpYXQiOjE2ODQ0NzIwMTUsImp0aSI6ImZiNzczMDY4Mjk5YjQ1YWZhZjgyMGI1YzA0NTkyMGFiIiwidXNlcl9pZCI6NDB9.49_6gGk7w-r9a9o_4A7L1HI2CGhjztGZadKw2JIKh6k'
            }
        })
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            countPhoto.textContent = data.length;
            if (data.length === 0) {
                containerOfPhotosEmpty.classList.remove('hidden');
            } else {
                data.forEach((item) => {
                    containerForContent.append(preparePostItem(item));
                    numberOfPost++;
                });
            }

            console.log(data);

        })
        .catch((error) => {

        })
        .finally(() => {

        });
}