
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

export {fetchData}