const mobileNavBtn = document.querySelector(".mobile-nav");
const mobileNav = document.querySelector(".mobile-menu");
const shortenURLBtn = document.querySelector(".shorten-url");
const urlOutput = document.querySelector(".generated-links");

let savedLinks = [];
let numberOfLinks = 0;

loadCookies();

function openMobileNav(){
    mobileNav.style.display = "block";
}

function closeMobileNav() {
    mobileNav.style.display = "none";
}


async function shortenURL() {

    let input = document.querySelector(".url-input").value;


    if(!validateURL(input)) {

        let input = document.querySelector(".url-input").value;

        console.log("valid");
        let response = await fetch(`https://api.shrtco.de/v2/shorten/?url=${input}`);
        let data = await response.json();
    
        outputURL(data.result.short_link, input)
    }         


}

function validateURL(input) {

    if (!input) {
        const urlInput = document.querySelector(".url-input");
        urlInput.placeholder = "Enter a valid URL";
        urlInput.style.border = "solid 2px red";

        setTimeout(function () {
            urlInput.style.border = "none";
        }, 3000);


        return true;
    } else {
        return false;
    }
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


    /* Save to cookies */

    let savedLink = {
        longLink: fullLink,
        shortenedLink: shortLink,
    }

    savedLinks.push(savedLink);

    document.cookie = 'savedLinks=' + JSON.stringify(savedLinks);

}

 function loadCookies() {

    let tempSavedLinks = getCookie();
    

    if (tempSavedLinks != null) {
        for (i = 0 ; i < tempSavedLinks.length; i++) {


            let generatedHTML = '';
            let generatedURL = document.createElement("generated-link");
            
    
            generatedHTML += 
            `
            <div class="generated-link">
                <p class="long-url">${tempSavedLinks[i].longLink}</p>
                <p class="short-url" >${tempSavedLinks[i].shortenedLink}</p>
                <button id="${numberOfLinks+1}" onClick="copyClipboard(this.id)" >Copy</button>
            </div>
            `
    
    
        generatedURL.innerHTML = generatedHTML;
        urlOutput.appendChild(generatedURL);
        numberOfLinks = numberOfLinks + 1;
    
    
        } 
    } else {
        console.log("No saved searches to store");
    }

    
} 

function read_cookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
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

function getCookie() {
    
    let cookieValue = '';
    let cookieArray = new Array();
    let result = new Array();
  
    //Get cookie
    cookieValue = document.cookie;
  
    //Divide the cookie into an array and convert them to JSON
    if(cookieValue){
      cookieArray = cookieValue.split(';');
        
      cookieArray.forEach(data => {
        data = data.split('=');
  
        //data[0]: Cookie name
        //data[1]: Cookie value
  
        result[data[0]] = JSON.parse(data[1]);
      });
    }
    return result['savedLinks'];
  }

  function clearCookies() {

    console.log("Cookies Cleared");

    // retrieve all cookies
    var Cookies = document.cookie.split(';');
    // set past expiry to all cookies
    for (var i = 0; i < Cookies.length; i++) {
       document.cookie = Cookies[i] + "=; expires="+ new Date(0).toUTCString();
    }
  }





  
