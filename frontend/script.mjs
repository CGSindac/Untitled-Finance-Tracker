import { fetchData } from "../frontend/apiHandler.js";

// Init Data
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

