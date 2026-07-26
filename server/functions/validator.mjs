const validateEntry = (req, res, next) => {
    const { body } = req;

    if (!body) {
        return res.status(400).send({ mssg: "Cannot Get Request Body "});
    }

    // Check if all fields has value
    if (!("title" in body && "entry" in body)) {
        return res.send({mssg: "Error Missing Fields"});
    }  

    // Check if empty string
    if (body.title.trim().length === 0) return res.status(400).send({mssg: "Error Empty Field"});
    if (body.entry.trim().length === 0) return res.status(400).send({mssg: "Error Empty Field"});

    next();
} 

export {
    validateEntry
}