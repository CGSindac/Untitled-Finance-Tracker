
async function fetchData() {
    try {
        const res = await fetch("http://localhost:3000/api/articles");

        if (!res.ok) {
            throw new Error("Could not Fetch Data");
        }

        const data = await res.json();
        console.log(data);

        return data;

    } catch (err) {
        console.error(err);
    }
}

async function createNewBlog(data) {
    const URL = "http://localhost:3000/api/articles";

    try{
        const res = await fetch(URL, 
            {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            }
        )

        if (!res.ok) {
            throw new Error(`HTTP ERROR! STATUS ${res.status}`);
        }

        const result = await res.json();
    } catch (err) {
        console.Error(err);
    }

}

export {
    fetchData,
    createNewBlog
}