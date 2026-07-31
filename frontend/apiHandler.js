
const credentials = "QWRtaW46QWRtaW4=";
// This is just the string "Admin:Admin" as Base64
// This is just like API Tokens
// Add 'Authorization': `Basic ${credentials}` to headers in the request body to pass it to backend sever

async function fetchData() {
    try {
        const res = await fetch("http://localhost:3000/api/articles", 
            {
                method : "GET",
                headers : {
                    'Authorization': `Basic ${credentials}`
                }
            }
        );

        if (!res.ok) {
            throw new Error("Could not Fetch Data");
        }

        const data = await res.json();
        console.log(data);

        return data;

    } catch (err) {
        console.error(err);
        return null;
    }
}

async function createNewBlog(data) {
    const URL = "http://localhost:3000/api/articles";

    try{
        const res = await fetch(URL, 
            {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': `Basic ${credentials}`
                },
                body : JSON.stringify(data)
            }
        )

        if (!res.ok) {
            throw new Error(`HTTP ERROR! STATUS ${res.status}`);
        }

        const result = await res.json();

        return true; // For this project, responses only returns true if succeeded | Currently studying response bodies
    } catch (err) {
        console.log(err);
    }
}

async function updateBlog(data) {
    const URL = `http://localhost:3000/api/articles/${data.blogId}`;

    try{
        const res = await fetch(URL, 
            {
                method: 'PATCH',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': `Basic ${credentials}`
                },
                body : JSON.stringify(data)
            }
        )

        if (!res.ok) {
            throw new Error(`HTTP ERROR! STATUS ${res.status}`);
        }

        const result = await res.json();
        return true; // For this project, responses only returns true if succeeded | Currently studying response bodies
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function deleteBlog(blogId) {
    const URL = `http://localhost:3000/api/articles/${blogId}`;

    try{
        const res = await fetch(URL, 
            {
                method: 'DELETE',
                headers : {
                    'Authorization': `Basic ${credentials}`
                }
            }
        )

        if (!res.ok) {
            throw new Error(`HTTP ERROR! STATUS ${res.status}`);
        }

        const result = await res.json();
        return true; // For this project, responses only returns true if succeeded | Currently studying response bodies
    } catch (err) {
        console.log(err);
        return false;
    }
}

export {
    fetchData,
    createNewBlog,
    updateBlog,
    deleteBlog
}