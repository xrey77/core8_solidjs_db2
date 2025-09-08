window.history.pushState(null, "", document.URL);
window.onpopstate = function() {
    window.history.pushState(null, "", document.URL)
}; 
