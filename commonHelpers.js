import{S as b,N as d,i as p,a as w}from"./assets/vendor-f1d7103a.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const P="45042225-41fd9f6f9757e1f3272f741dc",S="https://pixabay.com/api/",h=40;let c="",a=1;const u=document.querySelector(".search-form"),n=document.querySelector("button.hidden"),f=document.querySelector("#gallery"),m=document.querySelector(".loader"),N=new b(".gallery-item a",{captionsData:"alt",captionDelay:250});u&&u.addEventListener("submit",q);n&&n.addEventListener("click",E);async function q(o){if(o.preventDefault(),c=o.currentTarget.elements.searchQuery.value.trim(),c===""){d.Notify.failure("Please enter a search query.");return}a=1,f.innerHTML="",n.classList.add("hidden");try{const t=await g(c,a);t.length===0?p.error({title:"Sorry",message:"No images found. Please try again!",position:"topRight"}):(y(t),n.classList.remove("hidden"))}catch(t){console.error(t),d.Notify.failure("Something went wrong. Please try again.")}u.reset()}async function E(){a+=1;try{const o=await g(c,a);y(o);const t=Math.ceil(o.totalHits/h);a>=t&&(n.classList.add("hidden"),p.info({title:"End",message:"You have reached the end of search results.",position:"topRight"}));const{height:r}=f.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}catch(o){console.error(o),d.Notify.failure("Something went wrong. Please try again.")}}async function g(o,t){m.classList.remove("hidden");const r=await w.get(S,{params:{key:P,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:h}});return m.classList.add("hidden"),r.data.hits}function y(o){const t=o.map(({webformatURL:r,largeImageURL:l,tags:e,likes:s,views:i,comments:v,downloads:L})=>`
        <div class="gallery-item">
            <a href="${l}">
                <img src="${r}" alt="${e}" class="gallery-item__image"/>
            </a>
            <div class="info">
                <div class="info-column">
                    <p class="label">Likes</p>
                    <p class="value">${s}</p>
                </div>
                <div class="info-column">
                    <p class="label">Views</p>
                    <p class="value">${i}</p>
                </div>
                <div class="info-column">
                    <p class="label">Comments</p>
                    <p class="value">${v}</p>
                </div>
                <div class="info-column">
                    <p class="label">Downloads</p>
                    <p class="value">${L}</p>
                </div>
            </div>
        </div>
    `).join("");f.insertAdjacentHTML("beforeend",t),N.refresh()}
//# sourceMappingURL=commonHelpers.js.map
