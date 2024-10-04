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

//zmienna lightbox
let lightbox;

//wyszukanie przycisku przez ID i dodanie zdarzenia na kliknięciu
document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault();

    //wartość inputa
    const keyWord = document.getElementById('searchInput').value;

    //ustawienie loadera na widoczny przed wysłaniem żądania
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
                    title: false,
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight'
                });
            } else {
                const markup = data.hits.map((image) => {
                    return `
                    <div class= "card">
                    <a href="${image.largeImageURL}" class="lightbox" title="${image.tags}">
                    <img src="${image.webformatURL}" alt="${image.tags}"></img>
                    </a>
                    <div class="container-box">
                    <p class="desc"><span class="count">Likes:</span> ${image.likes}</p>
                    <p class="desc"><span class="count">Views:</span> ${image.views}</p>
                    <p class="desc"><span class="count">Comments:</span> ${image.comments}</p>
                    <p class="desc"><span class="count">Downloads:</span> ${image.downloads}</p>
                    </div>
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

                //odświeżnie, gdy np. dodamy nowy element
                lightbox.refresh();

            }
        })
        .catch((error) => {
            console.log('There has been a problem with your fetch operation:', error);
        })

        //loader niewidoczny po tym jak żądanie zostało przetworzone
        .finally(() => {
            loader.style.display = 'none';
        })
});

//zamykanie okna modalnego za pomocą klawiszy
document.addEventListener("keydown", e => {
    if(e.key === "Escape" && instance.visible()) {
        instance.close();
    }
})