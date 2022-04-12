// ---------- Imports ---------- //
const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
const {sort} = require("./js/sorting");
const { performance } = require('perf_hooks');




// ---------- Functions ---------- //
const createPath = (page) => path.resolve(__dirname, "html", `${page}.ejs`);

function makeANiceLine(array) {
    var string = "[ ";
    for(let i = 0; i < array.length - 1; i++) {
        string += (array[i]+", ");
    }
    string += array[array.length-1] + " ]";
    return string;
}




// ---------- Creating Server ---------- //
const server = express();
const PORT = 3000;
server.set('view engine', 'ejs');
server.listen(PORT, 'localhost', (error) => {
    if(error) console.log(error);
    else console.log(`listening port ${PORT}`)});




// ---------- Middlewares ---------- //
server.use(express.static('css'));
server.use(express.static("img"));
server.use(express.static("js"));
server.use(express.urlencoded({extended:false}));
server.use(fileUpload({}));




// ---------- Routing ---------- //
server.get('/', (req, res) => {
    res.render(createPath("index"));
});

server.get('/me', (req, res) => {
    res.redirect('/');
});

server.get('/graphs', (req, res) => {
    res.render(createPath("index3"))
})

server.post('/result', (req, res) => {
    if(req.files !== null){
        req.files.file.mv('JSONfiles/'+req.files.file.name);
        var obj;

        fs.readFile('JSONfiles/'+req.files.file.name, "utf8", (err, data) => {
            obj = JSON.parse(data);
            var ready = obj.arrays[0];
            var startTime = performance.now();
            var sorted = sort(ready);
            var endTime = performance.now()
            var time = (endTime - startTime).toFixed(2);
            fs.unlinkSync('./JSONfiles/'+req.files.file.name ,function(err) {
                if(err) return console.log(err);
                console.log('file deleted successfully');
           });  
            res.render(createPath("index2"), {ready: makeANiceLine(ready), sorted: makeANiceLine(sorted) , time});
        });
    }
    else{
        var {array, generate, numberOfElements} = req.body;
        generate = generate === 'true';
        if(generate){
            numberOfElements = parseInt(numberOfElements);
            var ready = [];
            for(let i = 0; i < numberOfElements; i++){
                ready.push(parseFloat((Math.random()*100).toFixed(i%2)));
            }
            var startTime = performance.now();
            var sorted = sort(ready)
            var endTime = performance.now()
            var time = (endTime - startTime).toFixed(2);
            
            res.render(createPath("index2"), {ready: makeANiceLine(ready), sorted: makeANiceLine(sorted), time});
        }
        else{
            newArray = array.split(/\s*[,_ ]+\s*/);
            var ready = newArray.map(x => parseFloat(x));
            var startTime = performance.now();
            var sorted = sort(ready);
            var endTime = performance.now()
            var time = (endTime - startTime).toFixed(2);

            res.render(createPath("index2"), {ready: makeANiceLine(ready), sorted: makeANiceLine(sorted) , time});
        }
    }
})




// ---------- Middlewares ---------- //
server.use((req, res) => {
    res.statusCode = 404;
    res.send("error");
})

