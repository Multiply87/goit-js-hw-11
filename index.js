import{a as m,S as f,i as l}from"./assets/vendor-CucEYOFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const g="56799357-5764c9f004e69503c7bfa7d57",y="https://pixabay.com/api/";function d(s){return m.get(y,{params:{key:g,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data)}const h=new f(".gallery a",{captionsData:"alt",captionDelay:250}),c=document.querySelector(".gallery"),n=document.querySelector(".loader");function L(s){const r=s.map(({webformatURL:a,largeImageURL:o,tags:e,likes:t,views:i,comments:p,downloads:u})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${o}">
          <img class="gallery-image" src="${a}" alt="${e}" />
        </a>
        <div class="gallery-caption">
          <ul class="gallery-caption-list">
            <li class="gallery-caption-item"><span class="caption-label">Likes</span><span>${t}</span></li>
            <li class="gallery-caption-item"><span class="caption-label">Views</span><span>${i}</span></li>
            <li class="gallery-caption-item"><span class="caption-label">Comments</span><span>${p}</span></li>
            <li class="gallery-caption-item"><span class="caption-label">Downloads</span><span>${u}</span></li>
          </ul>
        </div>
      </li>
    `).join("");c.innerHTML=r,h.refresh()}function b(){c.innerHTML=""}function v(){n&&n.classList.add("active")}function P(){n&&n.classList.remove("active")}const S=document.querySelector(".form");S.addEventListener("submit",s=>{s.preventDefault();const r=s.target.elements["search-text"].value.trim();if(!r){l.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}b(),v(),d(r).then(a=>{if(!a.hits||a.hits.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(a.hits)}).catch(a=>{console.error(a),l.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}).finally(()=>{P(),s.target.reset()})});
//# sourceMappingURL=index.js.map
