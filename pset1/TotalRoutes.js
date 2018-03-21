// Программа TotalRoutes.js
//
// Запускать программу node TotalRoutes.js a_example.in
// Запускать программу node TotalRoutes.js b_should_be_easy.in
//
 	
var fs = require('fs')
var file = process.argv[2]
//
// Процедура вывода исходных данных на экран монитора
//
function OutputData() {
fs.readFile(file, function (err, contents) {
    var lines = contents.toString().split('\n').length - 1
    console.log("Кол-во переносов: "+lines)
    console.log(contents.toString())
  });
};
//
// Вычисления длины одной исходной ездки SourceRoute
//
function LRoute(arg1,arg2,arg3,arg4) {
    return Math.abs(arg1-arg3)+Math.abs(arg2-arg4)
    };
//
// Наша функция сравнения маршрутов по длине
function CompareLengthRoute(ArgA, ArgB) {
    return ArgA.LengthRoute - ArgB.LengthRoute;
  };

//   
// Создание массива исходный данных
//
var SourceRoute = [];
var TotalsRoutes = [];

var Data=fs.readFileSync(file).toString().split('\n');
//console.log(Data);

// Вывод исходных данных на экран монитора:
//
//OutputData();

var rows=Number(Data[0].split(" ")[0]);
var columns=Number(Data[0].split(" ")[1]);
var cars=Number(Data[0].split(" ")[2]);
var rides=Number(Data[0].split(" ")[3]);
var bonus=Number(Data[0].split(" ")[4]);
var steps=Number(Data[0].split(" ")[5]);
for (var j=1;j<Data.length-1;j++) {
    SourceRoute[j-1] = {
        StartIntersectionX : Data[j].split(" ")[0],
        StartIntersectionY : Data[j].split(" ")[1],
        FinisfIntersectionX : Data[j].split(" ")[2],
        FinisfIntersectionY : Data[j].split(" ")[3],
        EarliestStart : Data[j].split(" ")[4],
        LatestFinish : Data[j].split(" ")[5],
        LengthRoute : LRoute(Data[j].split(" ")[0],Data[j].split(" ")[1],Data[j].split(" ")[2],Data[j].split(" ")[3]),
        TagName : j-1,
        TagBusy : false
    };
};

for (var j = 0; j <= cars-1; j++) {
  TotalsRoutes[j] = {
      TagAllRoute : '',
      LengthRoute : 0,
      account : 0
  };
};    

// Функция формирования для каждой из машин одной ездки
//

  function FormationTotalsRoutes(flag, num, TotalDistance, StartIntersectionX0, StartIntersectionY0, distance, score, TotalScore, RouteTagName) {
    
    var Marshroot = SourceRoute.map((Route) => {    
    if (flag !== true) {
        if (Route.TagBusy !== true) {    

            distance = (Math.abs(StartIntersectionX0 - Route.StartIntersectionX) + Math.abs(StartIntersectionY0 - Route.StartIntersectionY)) <= 0 ?  0 : (Math.abs(StartIntersectionX0 - Route.StartIntersectionX) + Math.abs(StartIntersectionY0 - Route.StartIntersectionY));
            TotalDistance = TotalDistance + distance + Number(Route.LengthRoute) + Number(Route.EarliestStart);
            if ((TotalDistance <= steps) && (flag !== true)) {
      
              BonusEarliestStart = (distance - Route.EarliestStart <= 0 ? bonus : 0);
              Score = ((distance + Route.LengthRoute - Route.LatestFinish) <= 0 ? Number(Route.LengthRoute) : 0);
              TotalScore = TotalScore + BonusEarliestStart + Score;
              StartIntersectionX0 = Route.FinisfIntersectionX;
              StartIntersectionY0 = Route.FinisfIntersectionY; 
              
              RouteTagName = RouteTagName + String(Route.TagName) + ',';
              SourceRoute[Route.TagName].TagBusy = true;
                 
              TotalsRoutes[num].TagAllRoute = RouteTagName;
              TotalsRoutes[num].LengthRoute = TotalDistance;
              TotalsRoutes[num].account = TotalScore;

              flag = true;
              return Route.TagName;
            };

        };
    };
   
    });  
    console.log(TotalsRoutes[num]);
  };

function ArrayFormationTotalsRoutes(j1) {
       
  var StartIntersectionX0 = 0;
  var StartIntersectionY0 = 0;
  var distance = 0;
  var TotalDistance = 0;
  var score = 0;
  var TotalScore = 0;
  var RouteTagName = "";
  var flag = false;


     var OneMarshroot = FormationTotalsRoutes(flag, j1, TotalDistance, StartIntersectionX0, StartIntersectionY0, distance, score, TotalScore, RouteTagName);
     return TotalsRoutes;
};

// Начало выполнения поставленой задачи.
// Для каждой из машин выполняем следующее:
//
for (j = 0; j <= cars-1; j++) {
//  console.log('         Маршрут для Машины ' + j + ' : ');
  var aa = ArrayFormationTotalsRoutes(j);
    };
//
// Запись полкченных результатов в файл "Output.out"
//
var fname = "Output.out";
fs.open(fname, "w+", 0644, function(err, file_handle) {
	if (!err) {
        fs.write(file_handle, JSON.stringify(aa, null, 2), function(err, written) { 
        if (!err) {
	            console.log("Текст успешно записан в файл");
	        } else {
	            console.log("Произошла ошибка при записи");
	        }
	    });
	} else {
		console.log("Произошла ошибка при открытии");
	}
});   