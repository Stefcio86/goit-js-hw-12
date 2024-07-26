import{i as s,a as b,S as w}from"./assets/vendor-b11e2a50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function u(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=u(e);fetch(e.href,r)}})();const L="45042225-41fd9f6f9757e1f3272f741dc",v="https://pixabay.com/api/";let l=1,c="",f=0;const P=document.querySelector("#search-form"),d=document.querySelector(".gallery"),n=document.querySelector(".load-more");n.style.display="none";P.addEventListener("submit",S);n.addEventListener("click",H);async function S(o){if(o.preventDefault(),c=o.currentTarget.elements.searchQuery.value.trim(),c===""){s.warning({message:"Please enter a search query."});return}l=1,d.innerHTML="",n.style.display="none";try{const t=await y(c,l);t.totalHits===0?s.info({message:"Sorry, there are no images matching your search query. Please try again!"}):(f=t.totalHits,m(t.hits),n.style.display="block",s.success({message:`Hooray! We found ${t.totalHits} images.`}))}catch(t){console.error(t),s.error({message:"Something went wrong. Please try again later."})}}async function H(){l+=1;try{const o=await y(c,l);m(o.hits);const{height:t}=d.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),d.children.length>=f&&(n.style.display="none",s.info({message:"We're sorry, but you've reached the end of search results."}))}catch(o){console.error(o),s.error({message:"Something went wrong. Please try again later."})}}async function y(o,t){return(await b.get(v,{params:{key:L,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:40}})).data}function m(o){const t=o.map(({webformatURL:i,largeImageURL:e,tags:r,likes:a,views:g,comments:p,downloads:h})=>`
    <div class="photo-card">
      <a href="${e}">
        <img src="${i}" alt="${r}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes</b> ${a}</p>
        <p><b>Views</b> ${g}</p>
        <p><b>Comments</b> ${p}</p>
        <p><b>Downloads</b> ${h}</p>
      </div>
    </div>
  `).join("");d.insertAdjacentHTML("beforeend",t),new w(".gallery a").refresh()}
//# sourceMappingURL=commonHelpers.js.map
