/*
Sanity testing, verify if user can check if account has projects or not.
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


frisby.create ('Getting all projects')
	.get('https://todo.ly/api/projects.json')
	.inspectJSON()
	.expectJSON('*',{
		Deleted : false
	})
	.afterJSON(function(json){
		
		if(json.length == 0){
			console.log ('There is no projects in the account at the moment');
		}
			
		else{
			console.log ('Total projects in account: '+json.length);
			}
	})
.toss();