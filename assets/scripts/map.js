var index = 0;
var active_slideshow = null;

function initialSlide(slideshow) {
    if (active_slideshow == null) {
        active_slideshow = document.querySelectorAll(slideshow);
    } else {
        active_slideshow[index].style.display = "none";
        active_slideshow[index].parentElement.style.display = "none";
        active_slideshow = document.querySelectorAll(slideshow);
    }
    index = 0;
    let parent = active_slideshow[index].parentElement;
    parent.style.display = "block";
    active_slideshow[index + 1].style.display = "none";
    active_slideshow[index].style.display = "block";
}

function pickSlide(next) {
    if (next == 0) {
        active_slideshow[index].style.display = "none";    
        index -= 1;
        active_slideshow[index].style.display = "block"
    } else {
        active_slideshow[index].style.display = "none";    
        index += 1;
        active_slideshow[index].style.display = "block"
    }
}
