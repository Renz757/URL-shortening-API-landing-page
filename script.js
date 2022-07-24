const button = document.querySelector("#api-button");
const url = document.querySelector("#api-input");
const shortLinkList = document.querySelector("#shortLinkList");

button.addEventListener('click', async () => {
    let newLink = await generateLink();
    
    const shortLink = document.createElement('li');
    shortLink.classList = "d-flex flex-column flex-md-row justify-content-md-between align-items-md-center rounded";
    shortLink.innerHTML = `
    <div class="text-start">
        <p class="m-0">${url.value}</p>  
    </div>
    <span class="border-bottom mt-2"></span>
    <div class="d-flex flex-column flex-md-row rounded p-0 align-items-md-center">
        <p class="text-start mt-2 link-color">${newLink}</p>
        <button class="copyButton button rounded p-2 my-1 my-md-0 mx-md-4">Copy</button>
    </div>
     `;
    shortLinkList.appendChild(shortLink);
    url.value = " ";
});



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

        console.log(data.result.short_link)

        return data.result.short_link;

    }
};

const copyText = () => {
    // /* Select the text field */
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */

    //  /* Copy the text inside the text field */
    // navigator.clipboard.writeText(copyText.value);

    // /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
}


