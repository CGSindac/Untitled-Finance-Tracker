import { fetchData, createNewBlog, updateBlog, deleteBlog } from "../frontend/apiHandler.js";

// Variables
let newBlogBttn = document.getElementById("new-blog-bttn");

let blogForms = document.getElementById("blog-form");
let formIdentifier = document.getElementById("form-identifier");
let formControler = new AbortController();


const blogContainer = document.getElementById("blog-container");


// Initialization
fetchData().then(entry => {

    if (entry) {
        entry.forEach(element => {

        if (!element.deleted) {

                // Create new element
                const newElement = document.createElement("div");
                newElement.innerHTML= `
                <div class="entry-header">
                    <h2 class="entry-title">${element.title}</h2> 
                    <div>
                    <button id="focus-bttn">Check Id</button>
                    <button id="delete-bttn">Delete</button>
                    </div>
                </div>
                <p class="entry-date">Date Created: ${element.date} </p>
                <p class="entry-main"> ${element.entry} </p>
                <p id="blog-id" hidden>${element.id}</p>
                
                `;
                newElement.classList.add("entry-content");

                let blogId = newElement.querySelector('#blog-id');
                let focusBttn = newElement.querySelector('#focus-bttn');
                let deleteBttn = newElement.querySelector('#delete-bttn');

                // Add Update & Delete logic to buttons
                focusBttn.addEventListener('click', (event) => {
                    initUpdateBlogForm(event, element);
                });

                deleteBttn.addEventListener('click', (event) => {
                    handleBlogDeletion(blogId.innerHTML);
                });

                // Add element to page
                blogContainer.appendChild(newElement);
            }
        });
    }
    else {
        throw new Error();
    }
}).catch(err => {
    console.log(err);

    const newElement = document.createElement("div");
            newElement.innerHTML= `
            <h1>COULD NOT CONNECT TO SERVER</h1> 
            `;
            newElement.classList.add("entry-content");
            blogContainer.appendChild(newElement);
});
initNewBlogForm();
newBlogBttn.addEventListener('click', initNewBlogForm);

// Event Listeners
function initNewBlogForm(event) {
    formControler.abort();
    formControler = new AbortController();
    blogForms.addEventListener('submit', handleBlogCreation, { signal : formControler.signal });

    formIdentifier.innerHTML = "Create New Blog";
    document.getElementById("title").value = "";
    document.getElementById("entry").innerHTML = "";
    document.getElementById("blogId").value = "";
    document.getElementById("submit-bttn").style.backgroundColor = "var(--create-color)";
    document.getElementById("submit-bttn").innerHTML = "Create BLOG";
}
function handleBlogCreation(event) {
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
            if(res) alert("Created New Blog!");
            else alert("Could Not Connect To Server!");
        })
        .catch(err => {
            console.log(err);
        });
}
function initUpdateBlogForm(event, blogData) {

    formControler.abort();
    formControler = new AbortController();
    blogForms.addEventListener('submit', handleBlogUpdate, { signal : formControler.signal });
    
    formIdentifier.innerHTML = "Updating Blog";
    document.getElementById("title").value = blogData.title || "No Title";
    document.getElementById("entry").innerHTML = blogData.entry || "No Entry";
    document.getElementById("blogId").value = blogData.id || "";

    document.getElementById("submit-bttn").style.backgroundColor = "var(--update-color)";
    document.getElementById("submit-bttn").innerHTML = "Update Blog";

}
function handleBlogUpdate(event) {
    event.preventDefault();

    // Get Form Body
    const formData = new FormData(blogForms);
    const formBody = Object.fromEntries(formData);

    console.log(formBody);

    // Check Request Body [Proper Fields]
    if (!("title" in formBody && "entry" in formBody && "blogId" in formBody)) {
        alert("Incomplete request, re-enter the form");
        return;
    }

    // Update
    updateBlog(formBody)
        .then(res => {
            if(res) alert("Updated Blog");
            else alert("Could Not Connect To Server!");
        })
        .catch(err => {
            console.log(err);
        })
}
function handleBlogDeletion(blogId){

    if (blogId === "") return alert("Cannot get blog ID");

    deleteBlog(blogId)
        .then(res => {
             if (res) alert(`Deleting Blog #${blogId}`);
            else  alert("Could Not Connect To Server!");
              
        }) 
        .catch(err => {
            console.log(err);
        })
}
