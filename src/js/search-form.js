// Opisany w dokumentacji
import iziToast from "izitoast";
// Opcjonalny import stylów
import "izitoast/dist/css/iziToast.min.css";

// Opisany w dokumentacji
import SimpleLightbox from "simplelightbox";
// Opcjonalny import stylów
import "simplelightbox/dist/simple-lightbox.min.css";

const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
let lightbox;

document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault();
    const keyWord = document.getElementById('searchInput').value;

    loader.style.display = 'block';
    
    const searchParams = new URLSearchParams ({
        key: "46327041-9a6335f12388e2a1236167102",
        q: keyWord,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });
    
    console.log(searchParams.toString());
    const url = `https://pixabay.com/api/?${searchParams}`;

    console.log(url);

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.error);
            }
            return response.json()
        })
        .then((data) => {
            gallery.innerHTML = '';

            if (Array.isArray(data.hits) && data.hits.length === 0) {
                // Jeśli otrzymano pustą tablicę
                iziToast.error({
                    title: 'Przepraszamy!',
                    message: 'Nie ma obrazów zgodnych z wyszukiwaniem. Spróbuj ponownie!',
                    position: 'topRight'
                });
            } else {
                const markup = data.hits.map((image) => {
                    return `
                    <div class= "card">
                    <a href="${image.largeImageURL}" class="lightbox" title="${image.tags}">
                    <img src="${image.webformatURL}" alt="${image.tags}"></img>
                    </a>
                    <p>Likes: ${image.likes}</p>
                    <p>Views: ${image.views}</p>
                    <p>Comments: ${image.comments}</p>
                    <p>Downloads: ${image.downloads}</p>
                    </div>
                    `;
                })
                .join("");

                gallery.innerHTML = markup;

                lightbox = new SimpleLightbox('.gallery a', {
                    captionsData: "alt",
                    sourceAttr: "href",
                    captions: true,
                    captionDelay: 250
                });

                lightbox.refresh();

            }
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        })
        .finally(() => {
            loader.style.display = 'none';
        })
});

document.addEventListener("keydown", e => {
    if(e.key === "Escape" && instance.visible()) {
        instance.close();
    }
})