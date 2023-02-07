const mobileNavBtn = document.querySelector(".mobile-nav");
const mobileNav = document.querySelector(".mobile-menu");

function openMobileNav(){
    console.log("boom");
    mobileNav.style.display = "block";
}

function closeMobileNav() {
    console.log("pow");
    mobileNav.style.display = "none";
}