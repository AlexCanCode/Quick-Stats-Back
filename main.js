'use strict' 
//for server
const http = require('http');
const stats = require('./formattedStatsObject.js');
const port = process.env.PORT || 3000; //CHANGE BACK TO 8080? 

http.createServer(function(req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify(stats));
	res.end()
}).listen(port, function() {
	console.log("server started");
});

//for scraping job
const fs = require('fs'); //Unused module? 
const {PythonShell} = require('python-shell');
const scriptPath = "./scraper/webScraper.py";

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
		const finalFormattedStats = require('./format.js'); //need to import the written JSON file from the formatter.
		const finalStatObjectJSON = JSON.stringify(finalFormattedStats);

		console.log("scraped at " + scrapeDate);
	})
}

dailyScrape();



let CronJob = require('cron').CronJob;
new CronJob('0 3 * * *', function() {
	dailyScrape();
}, null, true, 'America/Denver');







