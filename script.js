const button = document.querySelector("#api-button");
const url = document.querySelector("#api-input");
const shortLinkList = document.querySelector("#shortLinkList");




const generateLink = async () => {
    // var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    // console.log(valid);

    if (!url.value) {
        url.style.border = "1px solid red";
        console.error("Please Enter Valid Url");
    } else {
        url.style.border = "none";
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url.value}`)
        const data = await res.json();

        const shortLink = document.createElement('li');
        shortLink.classList = "d-flex flex-column flex-md-row justify-content-between rounded container";
        shortLink.innerHTML = `
        <div>
            <p class="text-start">${url.value}</p>  
        </div>
        <div class="d-flex flex-column flex-md-row rounded container p-0">
            <p class="text-start">${data.result.short_link}</p>
            <button class="button rounded p-2">Hello</button>
        </div>
         `;
        shortLinkList.appendChild(shortLink);

        url.value = " ";
    }
};

button.addEventListener('click', generateLink);