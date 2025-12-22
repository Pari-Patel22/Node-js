const http = require("http");
const port = 2208

const portHandler = (req, res) => {
    res.write("Hello this is node server" )
    res.end();
}

const server = http .createServer(portHandler);

server.listen(port, (err) => {
    err ? console.log("Error in server setup") : console.log(`Server is running on port ${port}`);
});