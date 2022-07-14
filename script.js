const button = document.querySelector("#api-button");
const url = document.querySelector("#api-input");
const shortLinkList = document.querySelector("#shortLinkList");




const generateLink = () => {
    // var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    // console.log(valid);

    if (!url.value) {
        url.style.border = "1px solid red";
        console.error("Please Enter Valid Url");
    } else {
        url.style.border = "none";
        fetch(`https://api.shrtco.de/v2/shorten?url=${url.value}`)
            .then(response => response.json())
            .then(data => console.log(data.result));

        url.value = "";
    }



    //set input to empty string 

    //create element for short link
    // const shortLink = document.createElement('li');
    // shortLink.innerHTML = `<p>${url.value}</p>  <p>${data.result.short_link}</p> `;
    // shortLinkList.appendChild(shortLink);
    // url.value = "";
};

button.addEventListener('click', generateLink);