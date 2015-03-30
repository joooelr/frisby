/*
Sanity testing, verify if there is existing filters in account.
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

	frisby.create("Verify if new user is authenticated")
		.get('https://todo.ly/api/filters.json')
		.inspectJSON()
		.afterJSON(function(json){
			console.log("There are "+json.length+" Filters in the account");
		})
	.toss();