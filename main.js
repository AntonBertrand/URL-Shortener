const mobileNavBtn = document.querySelector(".mobile-nav");
const mobileNav = document.querySelector(".mobile-menu");
const shortenURLBtn = document.querySelector(".shorten-url");
const urlOutput = document.querySelector(".generated-links");

let numberOfLinks = 0;

function openMobileNav(){
    console.log("boom");
    mobileNav.style.display = "block";
}

function closeMobileNav() {
    console.log("pow");
    mobileNav.style.display = "none";
}


async function shortenURL() {
    console.log("Bow");
    let input = document.querySelector(".url-input").value;
    let response = await fetch(`https://api.shrtco.de/v2/shorten/?url=${input}`);
    let data = await response.json();

    outputURL(data.result.short_link, input)

}

function outputURL(shortLink, fullLink) {

let generatedHTML = '';
let generatedURL = document.createElement("generated-link");
        

        generatedHTML += 
        `
        <div class="generated-link">
            <p class="long-url">${fullLink}</p>
            <p class="short-url" >${shortLink}</p>
            <button id="${numberOfLinks+1}" onClick="copyClipboard(this.id)" >Copy</button>
        </div>
        `


    generatedURL.innerHTML = generatedHTML;
    urlOutput.appendChild(generatedURL);
    numberOfLinks = numberOfLinks + 1;
}



function copyClipboard(clickedID) {

    let copyBtn = document.getElementById(`${clickedID}`);

    copyBtn.innerHTML = ("Copied!");
    copyBtn.style.background = "rgba(58,48,83,255)"

    setTimeout(function () {
        copyBtn.innerHTML = ("Copy");
        copyBtn.style.background = "var(--primary)"
    }, 3000);
    
    navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);
    
}