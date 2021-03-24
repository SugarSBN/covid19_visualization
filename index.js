var request = require('request');
const cheerio = require('cheerio');
var write = require('fs');
const csv=require('csvtojson');
write.writeFile('JS/data/covid_confirmed.js', "var covid_confirmed=", (err) => {
    if (err) {
        throw err;
    }
});

request({'url' : 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv', 'proxy' : 'http://localhost:1080'},function (error, response, body) {
    //console.log(body);
    csv({
        noheader:true,
        output: "csv"
    })
    .fromString(body)
    .then((csvRow)=>{ 
        write.appendFile('JS/data/covid_confirmed.js', JSON.stringify(csvRow), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved."); 
        });
    });
});

write.writeFile('JS/data/covid_death.js', "var covid_death=", (err) => {
    if (err) {
        throw err;
    }
});
request({'url' : 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv', 'proxy' : 'http://localhost:1080'},function (error, response, body) {
    //console.log(body);
    csv({
        noheader:true,
        output: "csv"
    })
    .fromString(body)
    .then((csvRow)=>{ 
        write.appendFile('JS/data/covid_death.js', JSON.stringify(csvRow), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved."); 
        });
    });
});

write.writeFile('JS/data/covid_recovered.js', "var covid_recovered=", (err) => {
    if (err) {
        throw err;
    }
});	
request({'url' : 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv', 'proxy' : 'http://localhost:1080'},function (error, response, body) {
    //console.log(body);
    csv({
        noheader:true,
        output: "csv"
    })
    .fromString(body)
    .then((csvRow)=>{ 
        write.appendFile('JS/data/covid_recovered.js', JSON.stringify(csvRow), (err) => {
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
});





