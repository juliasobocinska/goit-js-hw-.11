import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as h,S as p}from"./assets/vendor-5ObWk2rO.js";/* empty css                      */const n=document.querySelector(".loader"),s=document.querySelector(".gallery");let i;document.getElementById("searchButton").addEventListener("click",function(r){r.preventDefault();const l=document.getElementById("searchInput").value;n.style.display="block";const o=new URLSearchParams({key:"46327041-9a6335f12388e2a1236167102",q:l,image_type:"photo",orientation:"horizontal",safesearch:!0});console.log(o.toString());const a=`https://pixabay.com/api/?${o}`;console.log(a),fetch(a).then(e=>{if(!e.ok)throw new Error(e.error);return e.json()}).then(e=>{if(s.innerHTML="",Array.isArray(e.hits)&&e.hits.length===0)h.error({title:!1,message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});else{const c=e.hits.map(t=>`
                    <div class= "card">
                    <a href="${t.largeImageURL}" class="lightbox" title="${t.tags}">
                    <img src="${t.webformatURL}" alt="${t.tags}"></img>
                    </a>
                    <p>Likes: ${t.likes}</p>
                    <p>Views: ${t.views}</p>
                    <p>Comments: ${t.comments}</p>
                    <p>Downloads: ${t.downloads}</p>
                    </div>
                    `).join("");s.innerHTML=c,i=new p(".gallery a",{captionsData:"alt",sourceAttr:"href",captions:!0,captionDelay:250}),i.refresh()}}).catch(e=>{console.error("There has been a problem with your fetch operation:",e)}).finally(()=>{n.style.display="none"})});document.addEventListener("keydown",r=>{r.key==="Escape"&&instance.visible()&&instance.close()});
//# sourceMappingURL=page-2.js.map
