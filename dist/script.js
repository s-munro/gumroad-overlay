"use strict";const stylesheets=["style"],addSheet=e=>{const t=document.createElement("link");t.rel="stylesheet",t.href=`https://unpkg.com/samroad-overlay@1.1.5/stylesheets/${e}.css`,document.head.appendChild(t)},addSheets=e=>{for(var t of e)addSheet(t)},showError=e=>{e.classList.add("samroad-toast"),e.textContent="Error! Looks like the url is invalid :(",document.body.appendChild(e),requestAnimationFrame(()=>setTimeout(()=>{e.style.opacity=1})),setTimeout(()=>{e.style.opacity=0},2e3),setTimeout(()=>{e.remove()},2500)},addModal=(e,t)=>{const a=document.createElement("div"),o=document.createElement("div"),s=document.createElement("iframe"),d=document.createElement("div");/(https:\/\/gumroad\.com\/)|(https:\/\/gumroad\.com\/l\/)|(https:\/\/gum\.co\/l\/)|(https:\/\/gum\.co\/)/g.test(t)?(s.id="samroad-iframe",s.src=t,o.appendChild(s),o.classList.add("samroad-modal"),o.id="samroad-modal",a.appendChild(o),a.id="samroad-overlay",a.classList.add("samroad-overlay"),document.body.appendChild(a),e.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),requestAnimationFrame(()=>setTimeout(()=>{a.style.opacity=1,a.style.zIndex=1})),addClickAwayListener("samroad-overlay",a)})):e.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),showError(d)})},addClickAwayListener=(e,t)=>{const a=document.getElementById(e);a.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),t.style.opacity=0,setTimeout(()=>{a.remove()},200)})},addListeners=a=>{a.addEventListener("mouseover",function(e){var t=a.href;addModal(a,t)})};(()=>{var e;addSheets(stylesheets);for(e of document.getElementsByClassName("samroad-button"))"false"===e.getAttribute("data-show")&&e.remove(),addListeners(e)})();
