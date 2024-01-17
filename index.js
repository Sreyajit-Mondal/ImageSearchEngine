let accessKey = "58wucs5kl93_rDPs6C7q4wTxfMWi5DpWCTHV-a-6yJ8";
let searchForm = document.querySelector("#search-form");
let searchBox = document.querySelector("#search-box");
let searchResult = document.querySelector("#search-result");
let showMoreBtn = document.querySelector("#show-more-btn");

let keyword = "";
let page = 1;

async function searchImage() {
    try {
        keyword = searchBox.value;
        let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        let data = await response.json();
        // console.log(data);
        
        if (page === 1) {
            searchResult.innerHTML = "";
        }
        
        let results = data.results;//---->results is the array

        results.map((result) => {
            let image = document.createElement("img");
            image.src = result.urls.small;
            let imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        showMoreBtn.style.display = "block";
    } catch (error) {
        console.error('Error:', error);
        // Handle the error, display an error message, or perform necessary actions
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
});
