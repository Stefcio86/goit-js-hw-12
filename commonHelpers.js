import{S as v,N as d,i as h,a as w}from"./assets/vendor-f1d7103a.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const P="45042225-41fd9f6f9757e1f3272f741dc",S="https://pixabay.com/api/",p=40;let l="",a=1;const u=document.querySelector(".search-form"),n=document.querySelector("button.hidden"),f=document.querySelector("#gallery"),m=document.querySelector(".loader"),N=new v(".gallery-item a",{captionsData:"alt",captionDelay:250});u&&u.addEventListener("submit",q);n&&n.addEventListener("click",E);async function q(o){if(o.preventDefault(),l=o.currentTarget.elements.searchQuery.value.trim(),l===""){d.Notify.failure("Please enter a search query.");return}a=1,f.innerHTML="",n.classList.add("hidden");try{const t=await g(l,a);t.length===0?h.error({title:"Sorry",message:"No images found. Please try again!",position:"topRight"}):(y(t),n.classList.remove("hidden"))}catch(t){console.error(t),d.Notify.failure("Something went wrong. Please try again.")}}async function E(){a+=1;try{const o=await g(l,a);y(o);const t=Math.ceil(o.totalHits/p);a>=t&&(n.classList.add("hidden"),h.info({title:"End",message:"You have reached the end of search results.",position:"topRight"}));const{height:i}=f.firstElementChild.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}catch(o){console.error(o),d.Notify.failure("Something went wrong. Please try again.")}}async function g(o,t){m.classList.remove("hidden");const i=await w.get(S,{params:{key:P,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:p}});return m.classList.add("hidden"),i.data.hits}function y(o){const t=o.map(({webformatURL:i,largeImageURL:c,tags:e,likes:r,views:s,comments:L,downloads:b})=>`
        <div class="gallery-item">
            <a href="${c}">
                <img src="${i}" alt="${e}" class="gallery-item__image"/>
            </a>
            <div class="info">
                <p><b>Likes:</b> ${r}</p>
                <p><b>Views:</b> ${s}</p>
                <p><b>Comments:</b> ${L}</p>
                <p><b>Downloads:</b> ${b}</p>
            </div>
        </div>
    `).join("");f.insertAdjacentHTML("beforeend",t),N.refresh()}
//# sourceMappingURL=commonHelpers.js.map
