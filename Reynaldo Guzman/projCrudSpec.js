//Frisby tests

var frisby = require ('frisby');

frisby.globalSetup({
	request:{
		headers:{
			'Authorization' :'Basic cmV5bmFsZGl0b0BnbWFpbC5jb206QiFnc2gwdjNs'
		},
		//proxy: 'http://172.20.240.5:8080'
	}
});

frisby.create('Creating a new project')
	.post('https://todo.ly/api/projects.json',{"Content" : "Frisby test","Icon" : 4},{json: true})
	.expectJSONTypes({Id : Number})
	.afterJSON(function (body) {
        var myId = body.Id;
		frisby.create('Editing prj using frisby')
			.put('https://todo.ly/api/projects/'+myId+'.json',{"Icon" : 5},{json: true})
			.inspectJSON()
			.afterJSON(function(json){
				console.log('Deleting proj: '+json.Id);
				frisby.create('Deleting prj using frisby')
				.delete('https://todo.ly/api/projects/'+myId+'.json')
				.inspectJSON()
				.toss();
			})
			.toss();
	  })
	.inspectJSON()
.toss();