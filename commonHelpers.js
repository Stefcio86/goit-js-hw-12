import{S as b,N as u,i as h,a as w}from"./assets/vendor-f1d7103a.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const P="45042225-41fd9f6f9757e1f3272f741dc",S="https://pixabay.com/api/",c=40;let l="",a=1,f=0;const N=document.querySelector(".search-form"),d=document.querySelector(".load-more"),p=document.querySelector("#gallery"),m=document.querySelector(".loader"),q=new b(".gallery-item a",{captionsData:"alt",captionDelay:250});N.addEventListener("submit",E);d.addEventListener("click",_);async function E(o){if(o.preventDefault(),l=o.currentTarget.elements.searchQuery.value.trim(),l===""){u.Notify.failure("Please enter a search query.");return}a=1,p.innerHTML="",d.classList.add("hidden"),f=0;try{const t=await g(l,a);f=t.totalHits,t.hits.length===0?h.error({title:"Sorry",message:"No images found. Please try again!",position:"topRight"}):(y(t.hits),t.hits.length>=c&&d.classList.remove("hidden"))}catch(t){console.error(t),u.Notify.failure("Something went wrong. Please try again.")}}async function _(){a+=1;try{const o=await g(l,a);y(o.hits),(a*c>=f||o.hits.length<c)&&(d.classList.add("hidden"),h.info({title:"End",message:"You have reached the end of search results.",position:"topRight"}));const{height:t}=p.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*3,behavior:"smooth"})}catch(o){console.error(o),u.Notify.failure("Something went wrong. Please try again.")}}async function g(o,t){m.classList.remove("hidden");const r=await w.get(S,{params:{key:P,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:c}});return m.classList.add("hidden"),r.data}function y(o){const t=o.map(({webformatURL:r,largeImageURL:n,tags:e,likes:s,views:i,comments:v,downloads:L})=>`
    <div class="gallery-item">
      <a href="${n}">
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
  `).join("");p.insertAdjacentHTML("beforeend",t),q.refresh()}
//# sourceMappingURL=commonHelpers.js.map
