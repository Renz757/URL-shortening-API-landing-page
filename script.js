const button = document.querySelector("#api-button");
const url = document.querySelector("#api-input");
const shortLinkList = document.querySelector("#shortLinkList");

button.addEventListener('click', async function testFunc() {
    const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${url.value}`
    );

    const data = await response.json();
    console.log(data.result.short_link)

    //set input to empty string 
    
    //create element for short link
    const shortLink = document.createElement('li');
    shortLink.innerHTML = `<p>${url.value}</p>  <p>${data.result.short_link}</p> `;
    shortLinkList.appendChild(shortLink);
    url.value = "";
});




