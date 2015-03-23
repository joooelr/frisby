/*
	Delete all projects of the account, If there is no projects, display a message.
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