/*
Sanity testing, verify user is not authenticated, based on a wrong password.
*/

var frisby = require ('frisby');

frisby.globalSetup({
	request:{
		headers:{
			'Authorization' :'Basic cmV5bmFsZGl0b0BnbWFpbC5jb206QiFnc2gwdjNsWRONG'
		},
		//proxy: 'http://172.20.240.5:8080'
	}
});

	frisby.create("Verify if new user is authenticated")
		.get('https://todo.ly/api/authentication/isauthenticated.json')
		.inspectJSON()
		.afterJSON(function(json){
		expect(json).toBeFalsy();
		console.log("User is not authenticated, false!!");
		)
	.toss();