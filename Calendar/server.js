const numberedDays = ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","tweleve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","twentyOne","twentyTwo","twentyThree","twentyFour","twentyFive","twentySix","twentySeven","twentyEight","twentyNine","thirty"];
const months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
var express = require("express"),
mongoose = require("mongoose"),
bodyParser = require("body-parser"),
app = express();
//our databse
mongoose.connect("mongodb://Test:test@ds031641.mlab.com:31641/calendar_data");
var CalendarSchema = new mongoose.Schema({
	day:Number,
	month:String,
	description:String
});
var Calendar = mongoose.model("Calendar",CalendarSchema)

app.set("view engine","ejs");
app.use("",express.static(__dirname,{fallthrough:true}) )
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req,res) => {
	var date = months[new Date().getMonth()];
	var m = []; 
	Calendar.find({},(err,info) => {
		if (err) {throw err;}
		m = info///
		var data = m.filter((obj) => {
			return obj.month == date;
		});
		var mainData = new Object();
		data.forEach((obj) => {
			mainData[numberedDays[obj.day-1]] = obj.description;
		})
		
		data = condense(data);
		//console.log(data);
		res.render("",{data:mainData}, (err,str) => {
			if (err) { 
				return res.send(str),err;
			}
			else {
				return res.send(str)
		}},m)
	});//res.end();
});	
app.get("/desc", (req,res) => {
	Calendar.find(req.query, (err,info) => {
		if (err) {throw err;}
		res.send(info);
	})
})
app.post("",bodyParser.urlencoded({extended:true}),(req,res) => {
	var item = Calendar(req.body).save((err) => {
	if (err) throw "Saving failed";
	});
});
	

app.delete("/", (req,res) => {
	var remove = req.query;
	Calendar.find(req.query).remove((err) => {
		if (err) {
			throw err;
		}
	})
	res.end();
});
app.listen(8000);
console.log("on http://localhost:8000");


function condense (arr) {
  var l = {};
  for (var x = 0;x<=arr.length;x++) {
    for (var y = x+1;y<=arr.length-1;y++) {
      if (l[arr[x].day] === undefined) {
        l[arr[x].day] = [arr[x]];
      }
      
      if (arr[x].day == arr[y].day) {
        l[arr[x].day].push(arr[y])
        //arr.splice(y,1);
      }
      
    }//for loops
  }
  remDups(l);
  return l;
}

function remDups(obj) {
	for (var entry in obj) {
		console.log("-----------------------------------------");
		//console.log(obj[entry]);
		for (var x = 0; x-1<=obj[entry].length;x++) {
			console.log(obj[entry].find(obj[entry][x]));
			/*if (obj[entry].findIndex(obj[entry][x])) {
				console.log("hi");
			}*/
			break;
		}
	}
	//console.log(obj[5]);
	return obj;
}

/*function condense (arr) {
  for (var x = 0;x<=arr.length-1;x++) {
    for (var y = x+1;y<=arr.length-1;y++) {
      
      try {
        var m = arr[x][0].day;
      }catch (e){}
      
      if (m) {
        if (arr[x].day == arr[y].day || m == arr[y].day) {
          arr[x] = [arr[x],arr[y]];
          arr.splice(y,1);
        }
      }
      else {
        if (arr[x].day == arr[y].day) {
          arr[x] = [arr[x],arr[y]];
          arr.splice(y,1);
        }
      }
      
      
    }
  }
  return arr;
  //return JSON.stringify(arr,null,1);
}*/