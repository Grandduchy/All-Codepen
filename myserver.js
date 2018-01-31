var express = require("express"),
bodyParser = require("body-parser"),
app = express();
app.get("/", (req,res) => {
	console.log(req.headers);
});	
app.listen(8000);
console.log("on http://localhost:8000");