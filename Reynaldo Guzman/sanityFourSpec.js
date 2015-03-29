/*
Sanity testing, verify that an error is generated when attempting to delete an account that doesn't exist.
*/

var frisby = require ('frisby');

frisby.globalSetup({
	request:{
		headers:{
			'Authorization' :'Basic cmV5bmFsZGl0b0BnbWFpbC5jb206QiFnc2gwdjNs123'
		},
		//proxy: 'http://172.20.240.5:8080'
	}
});

	frisby.create('Deleting user')
		.delete('https://todo.ly/api/user/0.json')
		.expectJSON({ErrorCode : 105})
		.expectJSON({ErrorMessage: "Account doesn't exist"})
		.inspectJSON()
	.toss();