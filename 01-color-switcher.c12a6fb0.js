!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");e.setAttribute("disabled","");var n=null,r=function(){t.setAttribute("disabled",""),e.removeAttribute("disabled"),n=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)},o=function(){e.setAttribute("disabled",""),clearInterval(n),t.removeAttribute("disabled")};t.addEventListener("click",r),e.addEventListener("click",o)}();
//# sourceMappingURL=01-color-switcher.c12a6fb0.js.map
