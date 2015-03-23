/*
	Items in same project
*/
var frisby = require ('frisby');

frisby.globalSetup({
	request:{
		headers:{
			'Authorization' :'Basic cmV5bmFsZGl0b0BnbWFpbC5jb206QiFnc2gwdjNs'
		},
		//proxy: 'http://172.20.240.5:8080',
	}
});

frisby.create('Given I don\'t have any project created in my account')
	.get('https://todo.ly/api/projects.json')
	.expectStatus(200)
	.afterJSON(function(json){
		for(var i=0; i<json.length;i++){
			var myId = json[i].Id;
			var totalProjects = json.length;
			var totalDeleted = 0;
			frisby.create('Delete project with ID:'+json[i].Id)
			.delete('https://todo.ly/api/projects/'+myId+'.json')
			//.inspectJSON()
			.expectJSON({
				Deleted: true
			})
			.afterJSON(function(data){
				totalDeleted++;
				if(totalProjects == totalDeleted){
					var now = new Date();
					var projId=0;
					var project = {"Content" : "Project " + now.getTime(),"Icon" : 4};
					frisby.create('When I create a project')
					.post('https://todo.ly/api/projects.json',project,{json:true})
					.expectJSON(project)
					.inspectJSON()
					.afterJSON(function(projData){
						 projId = projData.Id;
						for (var j=0;j<2;j++){
							var item = {"ProjectId": projId ,"Content" : "Item-RG" + (j+1)};
							frisby.create ('And I create 2 items for that project')
							.post('https://todo.ly/api/items.json',item,{json:true})
							.toss();
						}
						frisby.create ('Then those items should have same projectId when retrieving project data')
						.get('https://todo.ly/api/items.json')
						.afterJSON(function(jsonItems){
							for(var k=0; k<jsonItems.length;k++){
								var proId = jsonItems[k].ProjectId;
								var Item = jsonItems[k].Id;
								if(projId==proId){
								frisby.create('Display Item')
								.get('https://todo.ly/api/items/'+Item+'.json')
								.inspectJSON()
								.toss();
								}
							}
						
						})
						.toss();
					})
					.toss();
				}
			})
			.toss();
		}
	})
.toss();