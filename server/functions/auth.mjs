import base64 from 'base-64'
const {decode} = base64;

function decodeCredentials(authHeader){

    // Auth Header is Basic {CREDENTIALS}
    // Remove the Basic and parse {CREDENTIALS}

    const encodedCredentials = authHeader
        .trim()
        .replace(/Basic\s+/i , '');


    // {CREDENTIALS} are encoded in base64 so decode
    const decodedCredentials = decode(encodedCredentials);
    return decodedCredentials.split(":");
}

export function authMiddleWare (req, res, next) {
    const [username, password] = decodeCredentials(req.headers.authorization || '');
    
    // Deconstruct the check

    if (username == "Admin" && password == "Admin") {
        return next();
    }

    // Send Response with the following header to implement Basic Authentication
    // 'user_pages' can be anything
    /*
    *
    * 'user_pages' is the string assigned by the server to identify the protection space. (RFC 7617)
    * 
    */
    res.set("WWW-Authenticate", "Basic realm='user_pages'");
    res.status(401).send('Auth Required');
}   