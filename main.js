'use strict' 
//for server
const http = require('http');
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

//s3 storage
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-east-1';
aws.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY }); 

dailyScrape(); 

//create server
http.createServer(function(req, res) { //make this a callable function to run after dailyscrape to make sure updates are had. 
		const s3 = new aws.S3()
		s3.getObject({
			Bucket: "quickstatsbacknbadatabucket", 
			Key: "nbaCurrentPlayerData"
		}, function (err, data) {
			if(err){
				console.log(err)
			}
			else {
				let s3Stats = JSON.parse(data.Body.toString());
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.write(JSON.stringify(s3Stats));
				res.end()
			}
		})
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
		        	const stats = formatter.format(jsonObj, advJsonObj, playerURLsObj); //reassign stats to newly scraped and formatted stats
		            const s3 = new aws.S3();
		            s3.putObject({
		            	Bucket: "quickstatsbacknbadatabucket",
		            	Key: 'nbaCurrentPlayerData', 
		            	Body: JSON.stringify(stats),
		            	ContentType: "application/json"
		            }, 
		            function (err, data) {
		            	if(err){
		            		console.log(err)
		            	}
		            	else {
		            		console.log(data)
		            	}
		            }
		            )
		        });
		    });
		});
		console.log("scraped and uploaded on/at  " + scrapeDate);
	})
}

let CronJob = require('cron').CronJob;
new CronJob('55 * * * *', function() {
	dailyScrape();
}, null, true, 'America/Denver');
