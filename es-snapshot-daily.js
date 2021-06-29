const fs = require('fs');
const http = require('http');
const JSON = require('JSON');
const schedule = require('node-schedule');
const {Client} = require('@elastic/elasticsearch');

const logger = require('./logger');
const getNextDay = require('./util_date');
const config = require('./config.json');

const esClient = new Client({
	node : [config.esAddr],
	keepAlive: true,
	keepAliveInterval: 1000
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown(){
    logger.info('forcefully shutting down');
    process.exit(1);
}

var start_date_for_snapshot = getNextDay(new Date(), -1);
var j = schedule.scheduleJob(config.schedule_cron, async function(){

	var today = new Date();
	await makeSnapshot(esClient, config.index_prefix, start_date_for_snapshot.yyyymmdddot()).then((res)=>{
		console.log( res )
	}).catch((err)=> {
		console.log( err )
	});

	start_date_for_snapshot = getNextDay(start_date_for_snapshot, 1);
	//	reporting for RSO
	//////////////////////////////////////////////////////////////
});

async function bExistsInIndices(_client, _ind){
	try{
		const res = await _client.indices.exists({index:_ind});
		return res.body;
	}catch(err){
		return false;
	}
}

async function bExistsOnSnapshotRepository(_client, _name)
{
	try{
		const res = await _client.snapshot.status({repository:config.esRepoName, snapshot:_name});
		console.log( res.statusCode );
		if(res.statusCode === 200)
			return true;	//	exists the snapshot named "_name"
		else
			return false;
	}catch(err){
		console.log( err );	//	snapshot_missing_exception 
		return false;
	}
}

function makeSnapshot(_client, _idx_name_prefix, _day){
	return new Promise(async (resolve,reject) => {
		var ss_info = {
			"repository": config.esRepoName,
			"snapshot": config.snapshot_prefix + _idx_name_prefix + _day,
			"wait_for_completion": true,
			"body": {
				"indices" : _idx_name_prefix + _day
			}
		};

		if( await bExistsInIndices(_client, ss_info.body.indices) !== false && await bExistsOnSnapshotRepository(_client, ss_info.snapshot) === false){
			console.log(" START snapshot !!" ,ss_info.body.indices);
			await _client.snapshot.create(ss_info).then((res)=>{
			    resolve(res);
			}).catch((err,result) => {
				reject(" snapshot ERROR : " + _idx_name_prefix + _day  + " , error message :  " + err);
			});
		}else{
			reject("incorrect indices [" + ss_info.body.indices + "]");
		}
	});
}