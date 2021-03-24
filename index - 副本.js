var request = require('request');
const cheerio = require('cheerio');
var write = require('fs');
write.writeFile('JS/data/covid.js', "var covid = ", (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
var sets = [];
request('http://www.worldwideoutbreak.com/', function (error, response, body) {
  const $ = cheerio.load(body);
  for (var i = 0;i <= 218;i++){
    var col = $("#table_36_row_" + i).children('td');
    var cnt = -1;
    var cout = {};
    col.each(function(){
        cnt++;
        if (cnt == 1)   cout["country"] = $(this).text();
        if (cnt == 2)   cout["active"] = $(this).text();
        if (cnt == 3)   cout["confirmed"] = $(this).text();
        if (cnt == 4)   cout["death"] = $(this).text();
        if (cnt == 5)   cout["deathrate"] = $(this).text();
        if (cnt == 6)   cout["recovered"] = $(this).text();
        if (cnt == 7)   cout["critical"] = $(this).text();
    });   
    sets.push(cout);
  }
    const datasets = JSON.stringify(sets);
    write.appendFile('JS/data/covid.js', datasets, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
        var url  = require("url"),
        fs=require("fs"),
        http=require("http"),
        path = require("path");
        http.createServer(function (req, res) {
            var pathname=__dirname+url.parse(req.url).pathname;
            if (path.extname(pathname)=="") {
                pathname+="/";
            }
            if (pathname.charAt(pathname.length-1)=="/"){
                pathname+="index.html";
            }
         
            fs.exists(pathname,function(exists){
                if(exists){
                    switch(path.extname(pathname)){
                        case ".html":
                            res.writeHead(200, {"Content-Type": "text/html"});
                            break;
                        case ".js":
                            res.writeHead(200, {"Content-Type": "text/javascript"});
                            break;
                        case ".css":
                            res.writeHead(200, {"Content-Type": "text/css"});
                            break;
                        case ".gif":
                            res.writeHead(200, {"Content-Type": "image/gif"});
                            break;
                        case ".jpg":
                            res.writeHead(200, {"Content-Type": "image/jpeg"});
                            break;
                        case ".png":
                            res.writeHead(200, {"Content-Type": "image/png"});
                            break;
                        default:
                            res.writeHead(200, {"Content-Type": "application/octet-stream"});
                    }
                    fs.readFile(pathname,function (err,data){
                        res.end(data);
                    });
                } else {
                    res.writeHead(404, {"Content-Type": "text/html"});
                    res.end("<h1>404 Not Found</h1>");
                }
            });
        }).listen(80);
        console.log("Server running at localhost");
    });
});



