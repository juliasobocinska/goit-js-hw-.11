import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as p,S as h}from"./assets/vendor-5ObWk2rO.js";/* empty css                      */const n=document.querySelector(".loader"),r=document.querySelector(".gallery");let c;document.getElementById("searchButton").addEventListener("click",function(t){t.preventDefault();const l=document.getElementById("searchInput").value;n.style.display="block";const a=new URLSearchParams({key:"46327041-9a6335f12388e2a1236167102",q:l,image_type:"photo",orientation:"horizontal",safesearch:!0});console.log(a.toString());const o=`https://pixabay.com/api/?${a}`;console.log(o),fetch(o).then(e=>{if(!e.ok)throw new Error(e.error);return e.json()}).then(e=>{if(r.innerHTML="",Array.isArray(e.hits)&&e.hits.length===0)p.error({title:!1,message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});else{const i=e.hits.map(s=>`
                    <div class= "card">
                    <a href="${s.largeImageURL}" class="lightbox" title="${s.tags}">
                    <img src="${s.webformatURL}" alt="${s.tags}"></img>
                    </a>
                    <div class="container-box">
                    <p class="desc"><span class="count">Likes:</span> ${s.likes}</p>
                    <p class="desc"><span class="count">Views:</span> ${s.views}</p>
                    <p class="desc"><span class="count">Comments:</span> ${s.comments}</p>
                    <p class="desc"><span class="count">Downloads:</span> ${s.downloads}</p>
                    </div>
                    </div>
                    `).join("");r.innerHTML=i,c=new h(".gallery a",{captionsData:"alt",sourceAttr:"href",captions:!0,captionDelay:250}),c.refresh()}}).catch(e=>{console.log("There has been a problem with your fetch operation:",e)}).finally(()=>{n.style.display="none"})});document.addEventListener("keydown",t=>{t.key==="Escape"&&instance.visible()&&instance.close()});
//# sourceMappingURL=page-2.js.map
