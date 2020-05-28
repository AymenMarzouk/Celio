const https = require('https');
var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended : false}) ;
var fs = require('fs');

router.use(express.static(__dirname + '/'));
//router.set('views', __dirname + '/public/views');
router.engine('html', require('ejs').renderFile);
router.set('view engine', 'html');

router.get('/',function(req,res){
	 //res.writeHead(200, {"Content-Type": "text/html"});
          //  res.write(HTMLLoginPage);
	res.sendFile(__dirname + '/loginpage.html');
});
var clientid ;
var secret ;
router.post('/authenticate',urlEncodedParser,function(req,res){
	console.log('1');
	var N2 = [] ;
	 clientid = req.body.identifiant ; 
	 secret = req.body.secret ;
	const data = JSON.stringify({clientid : clientid,

 secret : secret , 

 gettype : "list",
 
 scope:"firstcontainer"

});
	
	console.log('2');
 var options = {
  hostname: 'getblobtestaymen.azurewebsites.net',
  path: '/api/HttpExample?code=Nzba1DSjM1QjiGa9PnQa5YfIe0R3mE6iI6A8lVJsJvelsHRzwVKsmw==',
  port: 443,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};
console.log('3');
var req1 = https.request(options, (res1) => {
  console.log(`statusCode: ${res1.statusCode}`);

  res1.on('data', (d) => {
	  //console.log(d);
	  var d1 = JSON.parse(d);
	  d1.forEach(item => {
		  N = [] ;
		 var nb = ((item.Name).split("/").length - 1) ;
		  if( nb === 0){
			  
			  var N1 = {Name : item.Name ,obj :{}};
			  N2.push(N1);
			 
		  }
		  else {
			  for (i = 0; i <= nb; i++) { 
		N[i] = {Name : getstring(item.Name,i,nb) ,obj :{}};
		
					}
					for(i = 0; i < nb; i++) {
				
			  N[nb-i-1].obj = N[nb-i];
			
		  }
		  N2.push(N[0]);
					
		  }	 
})
 console.log('4');
console.log(N2) //value
 res.render(__dirname + '/datapage.html',{data : req.body , names : N2 });
  // process.stdout.write(d)
  })
 
 
})
console.log('5');
req1.on('error', (error) => {
  res.render(error);
})
console.log('6');
	req1.write(data);
console.log('7');
req1.end();



 
});
router.get('/download', function(req, res) {
    var filePath = req.query.file;
    
	
	const data = JSON.stringify({clientid : clientid,

 secret : secret , 

 gettype : "file",
 
 scope: "firstcontainer/"+filePath

});
	
 var options = {
  hostname: 'getblobtestaymen.azurewebsites.net',
  path: '/api/HttpExample?code=Nzba1DSjM1QjiGa9PnQa5YfIe0R3mE6iI6A8lVJsJvelsHRzwVKsmw==',
  port: 443,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

var req1 = https.request(options, (res1) => {
  console.log(`statusCode: ${res1.statusCode}`);

  res1.on('data', (d) => {
	  //console.log(d);
 
 res.send(d) ;
  // process.stdout.write(d)
  })
 
 
})
console.log('5');
req1.on('error', (error) => {
 console.log(error);
})
console.log('6');
	req1.write(data);
console.log('7');
req1.end();
	
	
	
	
	
	
	
	
});

  function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}
           function getstring(string, index,nb) {
	if(index === 0) {
		return string.substring(
    0, 
   getPosition(string,"/",index+1)
);
	}
	else if(index != nb) {
  return string.substring(
    getPosition(string,"/",index)+1, 
     getPosition(string,"/",index+1)
);
	} else {
		return string.substring(
    getPosition(string,"/",index)+1, 
	string.length
   );
	}
}

router.listen(1200) ;
