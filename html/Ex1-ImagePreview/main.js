// const current = document.querySelector('#current');
// const imgs = document.querySelectorAll('.imgs img');

const opacity = 0.6;
//ES6
const [current, imgs] = [document.querySelector('#current'), document.querySelectorAll('.imgs img')]
// Set first Image opacity

imgs[0].style.opacity = opacity;

imgs.forEach(img => img.addEventListener('click', imgClick));

function imgClick(e) {
    // reset all opacities back to full.
    imgs.forEach(img => (img.style.opacity = 1));

    //  Chnage current image to the src of clicked image
    current.src = e.target.src;

    // Add fadeIn class
    current.classList.add('fade-in');

    // Remove fade-in class after 0.5

    setTimeout(() => current.classList.remove('fade-in'), 500);

    //Change theopacity to the var opacity.
    e.target.style.opacity = opacity;
}