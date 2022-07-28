const button = document.querySelector("#api-button");
const url = document.querySelector("#api-input");
const shortLinkList = document.querySelector("#shortLinkList");
const hamburger = document.querySelector('#hamburger');


hamburger.addEventListener('click', (event) => {
    console.log('working')
    const mobileMenu = document.querySelector('#mobileMenu');
    if (mobileMenu.className == 'hidden mobileNav text-center flex-column justify-content-center d-md-none') {
        mobileMenu.className = 'mobileNav text-center flex-column justify-content-center d-md-none'
    } else {
        mobileMenu.className = 'hidden mobileNav text-center flex-column justify-content-center d-md-none';
    }
})

button.addEventListener('click', async () => {
    var validUrl = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const validator = new RegExp(validUrl);
    if (validator.test(url.value)) {
        url.style.border = "none";
        const newLink = await generateLink(url.value);

        const shortLink = document.createElement('li');
        shortLink.classList = "d-flex flex-column flex-md-row justify-content-md-between align-items-md-center rounded";
        shortLink.innerHTML = `
            <div class="text-start">
                <p class="m-0">${url.value}</p>  
            </div>
            <span class="border-bottom mt-2"></span>
            <div id="divCount" class="d-flex flex-column flex-md-row rounded p-0 align-items-md-center">
                <p class="newCopyLink text-start mt-2 link-color">${newLink}</p>
                <button id="copyButton" class="copyButton buttonStyle rounded p-2 my-1 my-md-0 mx-md-4">Copy</button>    
            </div>
            `;
        shortLinkList.appendChild(shortLink);
        url.value = " ";

    } else {
        url.style.border = "1px solid red";
        console.error("Please Enter Valid Url");
        
    }
});

shortLinkList.addEventListener('click', function (event) {
    if (event.target.id === 'copyButton') {
        //selecting text of sibling element of button
        let currentLink = event.target.parentNode.firstElementChild.outerText;
        copyLink(currentLink);

        let currentButton = event.target;

        //select all copyButton elements 
        let buttonList = document.querySelectorAll('.copyButton');
        //loop through all copyButton elements 
        for (i = 0; i < buttonList.length; i++) {
            //if link of the target button matches the currentLink
            if (buttonList[i].parentNode.firstElementChild.outerText == currentLink) {
                //add styling for the button that was clicked that also matches currentLink
                buttonList[i].innerHTML = 'Copied!';
                buttonList[i].className = 'copied copyButton rounded p-2 my-1 my-md-0 mx-md-4';
            } else {
                //remove styling for any button not clicked 
                buttonList[i].innerHTML = 'Copy';
                buttonList[i].className = 'copyButton buttonStyle rounded p-2 my-1 my-md-0 mx-md-4';
            }
        }
    }
});

const generateLink = async () => {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url.value}`)
    const data = await res.json();
    return data.result.short_link;
};

const copyLink = (str) => {
    navigator.clipboard.writeText(str);
}