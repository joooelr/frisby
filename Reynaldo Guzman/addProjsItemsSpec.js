/*
	Adding 10 projs
	Adding 10 Items
*/

var frisby = require ('frisby');

frisby.globalSetup({
	request:{
		headers:{
			'Authorization' :'Basic cmV5bmFsZGl0b0BnbWFpbC5jb206QiFnc2gwdjNs'
		},
		//proxy: 'http://172.20.240.5:8080'
	}
});
var projsQuantity = 10;
var itemsQuantity = 10;

	for (var i = 0;i < projsQuantity;i++){
		frisby.create('Creating a bunch of projects')
			.post('https://todo.ly/api/projects.json',{"Content" : "Project# "+(i+1),"Icon" : 4},{json: true})
			.expectJSONTypes({Id : Number})
			.inspectJSON()
			.toss();
	}
	
	for (var j = 0; j < projsQuantity;j++){
		frisby.create('Creating a bunch of projects')
			.post('https://todo.ly/api/items.json',{"Content" : "Item# "+(j+1),"Icon" : 4},{json: true})
			.expectJSONTypes({Id : Number})
			.inspectJSON()
			.toss();
	}
	