'use strict' 
//for server
const http = require('http');
let stats = require('./formattedStatsObject.js'); //need to change this everytime dailyScrape runs..
const port = process.env.PORT || 3000; //CHANGE BACK TO 8080? 

//for scraping job
const fs = require('fs'); 
const {PythonShell} = require('python-shell');
const scriptPath = "./scraper/webScraper.py";

//for formating 
const formatter = require('./format.js');
const csvFilePath = './stats/players.csv';
const advCsvFilePath = './stats/Advplayers.csv';
const playerURLs = './stats/URLplayers.csv';
const csv = require('csvtojson');

dailyScrape(); //set json object to most updated stats when the server is spun up

//create server
http.createServer(function(req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify(stats));
	res.end()
}).listen(port, function() {
	console.log("server started");
});

function dailyScrape() {
	const pyshell = new PythonShell(scriptPath);
	const scrapeDate = new Date();

	pyshell.on('message', function(message) {
		console.log(message);
	});

	pyshell.end(function (err) {
		if(err){
			throw err;
		}
		//get csvs from scrape and format to be sent out
		csv()
		.fromFile(csvFilePath)
		.then((jsonObj) => {
		    csv()
		    .fromFile(advCsvFilePath)
		    .then((advJsonObj) => {
		        csv()
		        .fromFile(playerURLs)
		        .then((playerURLsObj) => {
		            stats = formatter.format(jsonObj, advJsonObj, playerURLsObj); //reassign stats to newly scraped and formatted stats
		            console.log("writting file");
		             fs.writeFileSync("./formattedStatsObject.js", `let formattedStatsObjectJSON = ${JSON.stringify(stats)}\n module.exports = formattedStatsObjectJSON`, function(err) {
                			if(err){
                    			console.log(err);
                			};
            			});
		        	});
		    	});
			});
		console.log("scraped at " + scrapeDate);
	})
}

let CronJob = require('cron').CronJob;
new CronJob('27,30 * * * *', function() {
	dailyScrape();
}, null, true, 'America/Denver');
