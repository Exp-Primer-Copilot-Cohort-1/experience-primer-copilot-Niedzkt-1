//Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const comments = [];

http.createServer(function (req, res) {
    //Parse the request URL
    const urlObj = url.parse(req.url, true);
    //Get the path name
    const pathName = urlObj.pathname;
    //Get the query string as a JSON object
    const query = urlObj.query;

    if (pathName === '/comment') {
        //Get the comment from the query string
        const comment = query.comment;
        //Add the comment to the list
        comments.push(comment);
        //Redirect to the home page
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    } else {
        //Read the home page file
        fs.readFile('index.html', function (err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.end('Page not found');
            } else {
                //Write the home page
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write('<!DOCTYPE html>');
                res.write('<html>');
                res.write('<head>');
                res.write('<title>Comments</title>');
                res.write('</head>');
                res.write('<body>');
                res.write('<h1>Comments</h1>');
                res.write('<ul>');
                //Write the comments
                for (let i = 0; i < comments.length; i++) {
                    res.write('<li>' + comments[i] + '</li>');
                }
                res.write('</ul>');
                res.write('<form action="/comment" method="get">');
                res.write('<input type="text" name="comment">');
                res.write('<input type="submit" value="Add Comment">');
                res.write('</form>');
                res.write('</body>');
                res.write('</html>');
                res.end();
            }
        });
    }
}).listen(3000, function () {
    console.log('Server is running at http://localhost:3000');
});

//Run the server
// node comments.js
//Open a web browser and go to http://localhost:3000
//Enter a comment and click the Add Comment button
//The comment will be added to the list of comments