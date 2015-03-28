/**
As a user I would like check a note as done so that to have note in performed tasks
	Given I don't have any project created in my account
	When I create a project
	And I create a note that project
	Then I set note as done
*/
var frisby = require ('frisby');
// GlobalConfiguration
frisby. globalSetup({
	request:{
		headers:{
			'Authorization':'am9vb2VsckBnbWFpbC5jb206UEBzc3cwcmQ='
		},
		//json : true,
		inspectOnFailure : true,
		//proxy :'http://172.20.240.5:8080'
	}
});



frisby.create('Given I dont have any project created in my account')
	.get('https://todo.ly/api/projects.json') //resource  or service
	.expectStatus(200)
	.afterJSON(function(json){
		var totalProject = json.length;
		var totalDeleted = 0;
		if(totalProject>0){
			for(j = 0;j < json.length;j++ ){
				console.log("Este es el Id"+json[j].Id);
				frisby.create('Delete project')
					.delete('https://todo.ly/api/projects/' + json[j].Id + '.json',{json: true})
					.expectJSON({
						Deleted: true
					})
					.afterJSON(function (data){
						totalDeleted++;
						if (totalDeleted == totalProject){
							//Create a new project
							createProject("PROJECT"+ parseInt(Math.random() * 100000));							
						}					
					})
				.toss();
			}
		}
		else{
			createProject("PROJECT"+ parseInt(Math.random() * 1000));
		}

	})
.toss();

var createProject = function(nameProject){
	// Json to create Project
	var jsonProject = {
		Content:nameProject
	};
		
	frisby.create('When I create a project')
		.post('https://todo.ly/api/projects.json',jsonProject,{json: true})
		.afterJSON(function(jsonProjectResp){
			var jsonItem = 	{
				"Content":'Item1',
				"ProjectId":jsonProjectResp.Id
			}
			// Json to create Items
			console.log('>>>>'+jsonProjectResp.Id)
			frisby.create('And I create a note that project')
				.post('http://todo.ly/API/Items.json',jsonItem,{json: true})
				.afterJSON(function(jsonItemResp){
					var jsonDone = {
						"Checked":true
					} 
					frisby.create('Then I set note as done')
						.put('http://todo.ly/API/Items/'+jsonItemResp.Id+'.json',jsonDone,{json: true})
						.afterJSON(function(jsonDone){
							//var givenDone = true;
							expect(jsonDone.Checked).toBe(true);
						})
					.toss();
				})
				.toss();
		})
	.toss();
}