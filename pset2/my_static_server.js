const format = require('node.date-time');
var http = require('http');
var fs = require('fs');

var Counter = require('./Counter');
var Counter = new Counter();

function logTime() {
      return new Date().format("Y-M-d h:m:S")+' ';
};


server = http.createServer(function(req, res){
    var info = 'index.html';
    var counter =0;

    var fname = "OutputLog.out";
    var count = Counter.newRequest();
   	
fs.open(fname, "a+", 0644, function(err, file_handle) {
    if(!err){    
        if(req.url == '/'){
            fs.readFile(info, function(err, info){
                if(err){
                    res.writeHead(200, { 'Content-Type': 'text/html ; charset=UTF-8' });
                    console.error(err);
                    res.statusCode = 500;
                    res.end("На сервере произошла ошибка!");
                    return;
                } else {
                    res.end(info);
                
                    fs.appendFile(fname, logTime() + 'запрос №   ' + count + '\n', function(err, written) {
                        if (!err) {
                            console.log("Текст успешно записан в файл");
                        } else {
                            console.log("Произошла ошибка при записи");
                        }
                    });
                }
            })
        } else {
            console.log(" Нет index.html   !!!  ");
        }

    } else {
	    console.log("Произошла ошибка при открытии Лог-файла!!!");
    }
});               //       для fs.open(fname, "w+" */
 
}).listen(3000);      // для server = http.createServer

console.log('Server running on port 3000');
