import { fetchData, createNewBlog } from "../frontend/apiHandler.js";

// Get BLogs
const blogContainer = document.getElementById("blog-container");

fetchData().then(entry => {
    entry.forEach(element => {

        if (!element.deleted) {
            const newElement = document.createElement("div");
            newElement.innerHTML= `
            <h2 class="entry-title">${element.title}</h2> 
            <p class="entry-date">Date Created: ${element.date} </p>
            <p class="entry-main"> ${element.entry} </p>
            `;
            newElement.classList.add("entry-content")
            blogContainer.appendChild(newElement);
        }
    });
}).catch(err => console.log(err));

// Init Forms
let blogForms = document.getElementById("blog-form");

blogForms.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(blogForms);
    const formBody = Object.fromEntries(formData);

    // Check Request Body [Proper Fields]
    if (!("title" in formBody && "entry" in formBody)) {
        alert("Incomplete request, re-enter the form");    
        return;
    }

    // Make Post Request to API
    createNewBlog(formBody)
    .then(res => {
        alert("Created New Blog!");
    })
    .catch(err => {
        console.log(err)
    });
});

