import{S as b,N as d,i as m,a as v}from"./assets/vendor-f1d7103a.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const w="45042225-41fd9f6f9757e1f3272f741dc",P="https://pixabay.com/api/",h=40;let c="",a=1;const S=document.querySelector(".search-form"),l=document.querySelector("button.hidden"),u=document.querySelector("#gallery"),f=document.querySelector(".loader"),N=new b(".gallery-item a",{captionsData:"alt",captionDelay:250});S.addEventListener("submit",q);l.addEventListener("click",E);async function q(o){if(o.preventDefault(),c=o.currentTarget.elements.searchQuery.value.trim(),c===""){d.Notify.failure("Please enter a search query.");return}a=1,u.innerHTML="",l.classList.add("hidden");try{const t=await p(c,a);t.length===0?m.error({title:"Sorry",message:"No images found. Please try again!",position:"topRight"}):(g(t),l.classList.remove("hidden"))}catch(t){console.error(t),d.Notify.failure("Something went wrong. Please try again.")}}async function E(){a+=1;try{const o=await p(c,a);g(o);const t=Math.ceil(o.totalHits/h);a>=t&&(l.classList.add("hidden"),m.info({title:"End",message:"You have reached the end of search results.",position:"topRight"}));const{height:s}=u.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}catch(o){console.error(o),d.Notify.failure("Something went wrong. Please try again.")}}async function p(o,t){f.classList.remove("hidden");const s=await v.get(P,{params:{key:w,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:h}});return f.classList.add("hidden"),s.data.hits}function g(o){const t=o.map(({webformatURL:s,largeImageURL:n,tags:e,likes:r,views:i,comments:y,downloads:L})=>`
        <div class="gallery-item">
            <a href="${n}">
                <img src="${s}" alt="${e}" class="gallery-item__image"/>
            </a>
            <div class="info">
                <p><b>Likes:</b> ${r}</p>
                <p><b>Views:</b> ${i}</p>
                <p><b>Comments:</b> ${y}</p>
                <p><b>Downloads:</b> ${L}</p>
            </div>
        </div>
    `).join("");u.insertAdjacentHTML("beforeend",t),N.refresh()}
//# sourceMappingURL=commonHelpers.js.map
