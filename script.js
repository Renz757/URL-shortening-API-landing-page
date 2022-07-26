const button = document.querySelector("#api-button");
const url = document.querySelector("#api-input");
const shortLinkList = document.querySelector("#shortLinkList");





button.addEventListener('click', async () => {
    if (!url.value || url.value == " ") {
        url.style.border = "1px solid red";
        console.error("Please Enter Valid Url");
    } else {
        url.style.border = "none";
        const newLink = await generateLink(url.value);
        // linkArray.push(newLink)

        const shortLink = document.createElement('li');
        shortLink.classList = "d-flex flex-column flex-md-row justify-content-md-between align-items-md-center rounded";
        shortLink.innerHTML = `
            <div class="text-start">
                <p class="m-0">${url.value}</p>  
            </div>
            <span class="border-bottom mt-2"></span>
            <div id="divCount" class="d-flex flex-column flex-md-row rounded p-0 align-items-md-center">
                <p class="newCopyLink text-start mt-2 link-color">${newLink}</p>
                <button id="copyButton" class="button rounded p-2 my-1 my-md-0 mx-md-4">Copy</button>    
            </div>
            `;
        shortLinkList.appendChild(shortLink);
        url.value = " ";


    }

});

shortLinkList.addEventListener('click', function (event) {
    if (event.target.id === 'copyButton') {
        //selecting text of sibling element of button
        let currentLink = event.target.parentNode.firstElementChild.outerText;
        copyLink(currentLink);

        let currentButton = event.target;
        currentButton.classList.add = 'copied rounded p-2 my-1 my-md-0 mx-md-4';
        currentButton.innerHTML = 'Copied!';

        // let buttonList = document.querySelectorAll('.copied')
        // for (i = 0; i < buttonList.length; i++) {
        //     if (!currentButton.className === 'copied rounded p-2 my-1 my-md-0 mx-md-4') {
        //         buttonList[i].className = 'button rounded p-2 my-1 my-md-0 mx-md-4';
        //     } 
        // }
        
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


