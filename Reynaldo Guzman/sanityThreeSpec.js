/*
Sanity testing, verify if user is authenticated.
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
			.get('https://todo.ly/api/authentication/isauthenticated.json')
			.inspectJSON()
			.afterJSON(function(json){
			expect(json).toEqual(true);
			if(json == true)
			console.log("User is authenticated, true!!");
			
			else
			console.log("User is not authenticated, false!!");
			})
	.toss();