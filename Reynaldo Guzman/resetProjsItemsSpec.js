/*
	Delete all projects in account
	Delete all Items in account
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
			
		for(var i=0; i<json.length;i++){
			var myId = json[i].Id;
			frisby.create('Deleting All Items')
				.delete('https://todo.ly/api/items/'+myId+'.json')
				.inspectJSON()
			.toss();
			}
	})
.toss();


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
			
		for(var i=0; i<json.length;i++){
			var myId = json[i].Id;
			frisby.create('Deleting All projects')
				.delete('https://todo.ly/api/projects/'+myId+'.json')
				.inspectJSON()
				.expectJSON({
					Deleted: true
				})
			.toss();
			}
	})
.toss();