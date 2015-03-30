/*
Sanity testing, verify if user can check if account has items or not.
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

frisby.create ('Getting all items')
	.get('https://todo.ly/api/items.json')
	.inspectJSON()
	.expectJSONTypes('*',{
		Id : Number
	})
	.afterJSON(function(json){
		
		if(json.length == 0){
			console.log ('There is no items in the account at the moment');
		}
			
		else{
			console.log ('Total items in account: '+json.length);
		}
	})
.toss();